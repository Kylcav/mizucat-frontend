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
      contents:
        cart.items?.map((item) => ({
          id: item.variant_id,
          quantity: item.quantity,
          item_price: item.unit_price,
        })) || [],
      value: cart.total,
      currency: cart.currency_code?.toUpperCase() || "CHF",
      num_items: cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    })
  }, [cart])

  return null
}