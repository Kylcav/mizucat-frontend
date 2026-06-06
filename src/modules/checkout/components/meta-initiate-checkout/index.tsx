"use client"

import { fbq } from "@lib/meta-pixel"
import { HttpTypes } from "@medusajs/types"
import { useEffect } from "react"

export default function MetaInitiateCheckout({
  cart,
}: {
  cart: HttpTypes.StoreCart
}) {
  useEffect(() => {
    fbq("InitiateCheckout", {
      content_ids: cart.items?.map((item) => item.variant_id) || [],
      content_type: "product",
      value: cart.total || 0,
      currency: cart.currency_code?.toUpperCase() || "CHF",
      num_items: cart.items?.length || 0,
    })
  }, [cart.id])

  return null
}