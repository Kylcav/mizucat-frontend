"use client"

import { fbq } from "@lib/meta-pixel"
import { HttpTypes } from "@medusajs/types"
import { useEffect } from "react"

export default function MetaPurchase({
  order,
}: {
  order: HttpTypes.StoreOrder
}) {
  useEffect(() => {
    const storageKey = `meta_purchase_${order.id}`

    if (sessionStorage.getItem(storageKey)) return
    sessionStorage.setItem(storageKey, "true")

    const eventId = `purchase_${order.id}`

    fbq(
      "Purchase",
      {
        content_ids: order.items?.map((item) => item.variant_id) || [],
        content_type: "product",
        contents:
          order.items?.map((item) => ({
            id: item.variant_id,
            quantity: item.quantity,
            item_price: item.unit_price,
          })) || [],
        value: order.total,
        currency: order.currency_code?.toUpperCase() || "CHF",
        num_items:
          order.items?.reduce(
            (sum, item) => sum + item.quantity,
            0
          ) || 0,
        order_id: order.id,
      },
      {
        eventID: eventId,
      }
    )
  }, [order])

  return null
}