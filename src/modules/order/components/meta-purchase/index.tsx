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
    const key = `meta_purchase_${order.id}`

    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, "true")

    fbq("Purchase", {
      content_ids: order.items?.map((item) => item.variant_id) || [],
      content_type: "product",
      value: order.total || 0,
      currency: order.currency_code?.toUpperCase() || "CHF",
      num_items: order.items?.length || 0,
    })
  }, [order.id])

  return null
}