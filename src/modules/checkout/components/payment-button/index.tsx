"use client"

import { isManual, isStripeLike } from "@lib/constants"
import { placeOrder } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { useSearchParams } from "next/navigation"
import React, { useCallback, useEffect, useRef, useState } from "react"
import ErrorMessage from "../error-message"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid": string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  switch (true) {
    case isStripeLike(paymentSession?.provider_id):
      return (
        <StripePaymentButton
          notReady={notReady}
          cart={cart}
          data-testid={dataTestId}
        />
      )

    case isManual(paymentSession?.provider_id):
      return (
        <ManualTestPaymentButton notReady={notReady} data-testid={dataTestId} />
      )

    default:
      return <Button disabled>Sélectionner une méthode de paiement</Button>
  }
}

const StripePaymentButton = ({
  cart,
  notReady,
  "data-testid": dataTestId,
}: {
  cart: HttpTypes.StoreCart
  notReady: boolean
  "data-testid"?: string
}) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const stripe = useStripe()
  const elements = useElements()
  const searchParams = useSearchParams()
  const hasHandledPaymentReturn = useRef(false)

  const countryCode =
    cart.shipping_address?.country_code?.toLowerCase() ||
    cart.region?.countries?.[0]?.iso_2?.toLowerCase() ||
    "ch"

  const returnUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${countryCode}/checkout?step=review&payment_return=1&cart_id=${cart.id}`
      : ""

  const onPaymentCompleted = useCallback(async () => {
    try {
      setSubmitting(true)
      setErrorMessage(null)

      await placeOrder(cart.id)
    } catch (err: any) {
      setErrorMessage(
        err?.message ||
          "Le paiement a été reçu, mais la commande n'a pas encore pu être confirmée."
      )
      setSubmitting(false)
    }
  }, [cart.id])

  useEffect(() => {
    const isPaymentReturn = searchParams.get("payment_return") === "1"
    const cartId = searchParams.get("cart_id")
    const redirectStatus = searchParams.get("redirect_status")

    if (!isPaymentReturn || hasHandledPaymentReturn.current) {
      return
    }

    hasHandledPaymentReturn.current = true

    if (redirectStatus === "failed" || redirectStatus === "canceled") {
      setErrorMessage("Le paiement a été annulé ou refusé.")
      setSubmitting(false)
      return
    }

    if (cartId && cartId !== cart.id) {
      setErrorMessage("Impossible de finaliser cette commande.")
      setSubmitting(false)
      return
    }

    onPaymentCompleted()
  }, [searchParams, cart.id, onPaymentCompleted])

  const disabled = !stripe || !elements || submitting

  const handlePayment = async () => {
    setSubmitting(true)
    setErrorMessage(null)

    if (!stripe || !elements || !cart) {
      setSubmitting(false)
      return
    }

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setErrorMessage(
        submitError.message || "Veuillez vérifier les informations de paiement."
      )
      setSubmitting(false)
      return
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
      redirect: "if_required",
    })

    if (result.error) {
      setErrorMessage(result.error.message || "Erreur lors du paiement")
      setSubmitting(false)
      return
    }

    const paymentIntent = result.paymentIntent

    if (
      paymentIntent &&
      (paymentIntent.status === "requires_capture" ||
        paymentIntent.status === "succeeded" ||
        paymentIntent.status === "processing")
    ) {
      await onPaymentCompleted()
      return
    }

    if (paymentIntent?.status === "requires_payment_method") {
      setErrorMessage(
        "Le paiement n'a pas été validé. Merci de choisir un autre moyen de paiement."
      )
      setSubmitting(false)
      return
    }

    setSubmitting(false)
  }

  return (
    <>
      <Button
        disabled={disabled || notReady}
        onClick={handlePayment}
        size="large"
        isLoading={submitting}
        data-testid={dataTestId}
      >
        Passer la commande
      </Button>

      <ErrorMessage
        error={errorMessage}
        data-testid="stripe-payment-error-message"
      />
    </>
  )
}

const ManualTestPaymentButton = ({ notReady }: { notReady: boolean }) => {
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((err) => {
        setErrorMessage(err.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  const handlePayment = () => {
    setSubmitting(true)
    onPaymentCompleted()
  }

  return (
    <>
      <Button
        disabled={notReady || submitting}
        isLoading={submitting}
        onClick={handlePayment}
        size="large"
        data-testid="submit-order-button"
      >
        Passer la commande
      </Button>

      <ErrorMessage
        error={errorMessage}
        data-testid="manual-payment-error-message"
      />
    </>
  )
}

export default PaymentButton
