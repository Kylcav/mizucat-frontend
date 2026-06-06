"use client"

import { fbq } from "@lib/meta-pixel"
import { HttpTypes } from "@medusajs/types"
import { useEffect } from "react"

export default function MetaViewContent({
  product,
}: {
  product: HttpTypes.StoreProduct
}) {
  useEffect(() => {
    const variant = product.variants?.[0]
    const price = variant?.calculated_price

    fbq("ViewContent", {
      content_ids: product.variants?.map((v) => v.id) || [product.id],
      content_name: product.title,
      content_type: "product",
      contents:
        product.variants?.map((v) => ({
          id: v.id,
          quantity: 1,
          item_price: v.calculated_price?.calculated_amount,
        })) || [],
      value: price?.calculated_amount,
      currency: price?.currency_code?.toUpperCase() || "CHF",
    })
  }, [product])

  return null
}