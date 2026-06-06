import { Text } from "@medusajs/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />

        {/* Mobile */}
        <div className="mt-4 flex flex-col txt-compact-medium md:hidden">
          <Text
            className="text-ui-fg-subtle leading-7 h-[72px] overflow-hidden"
            data-testid="product-title"
          >
            {product.title}
          </Text>

          <div className="mt-3 flex items-center justify-end gap-x-2 text-ui-fg-muted">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex mt-4 items-start justify-between gap-x-6 txt-compact-medium">
          <Text
            className="min-w-0 flex-1 text-ui-fg-subtle"
            data-testid="product-title"
          >
            {product.title}
          </Text>

          <div className="shrink-0 whitespace-nowrap text-ui-fg-muted">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}