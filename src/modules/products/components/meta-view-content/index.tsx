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
    fbq("ViewContent", {
      content_ids: [product.id],
      content_name: product.title,
      content_type: "product",
      currency: "CHF",
    })
  }, [product.id, product.title])

  return null
}