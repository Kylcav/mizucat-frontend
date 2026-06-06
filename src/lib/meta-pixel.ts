export const META_PIXEL_ID = "1000113249482372"

type MetaPixelEvent =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Purchase"

export const fbq = (
  event: MetaPixelEvent,
  data?: Record<string, any>
) => {
  if (typeof window === "undefined") return
  if (!(window as any).fbq) return

  ;(window as any).fbq("track", event, data)
}