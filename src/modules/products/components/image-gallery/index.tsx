"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  product: HttpTypes.StoreProduct
}

const ImageGallery = ({ images, product }: ImageGalleryProps) => {
  const searchParams = useSearchParams()
  const variantId = searchParams.get("v_id")

  const image = useMemo(() => {
    const selectedVariant = product?.variants?.find(
      (variant) => variant.id === variantId
    )

    const variantImage = (selectedVariant as any)?.images?.[0]

    return variantImage || images?.[0]
  }, [product?.variants, variantId, images])

  if (!image?.url) {
    return null
  }

  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        <Container
          key={image.url}
          className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
          id={image.id ?? image.url}
        >
          <Image
            src={image.url}
            priority
            className="absolute inset-0 rounded-rounded"
            alt="Product image"
            fill
            sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
            style={{
              objectFit: "cover",
            }}
          />
        </Container>
      </div>
    </div>
  )
}

export default ImageGallery