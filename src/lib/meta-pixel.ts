export const fbq = (event: string, data?: Record<string, any>) => {
  if (typeof window === "undefined") return
  if (!(window as any).fbq) return

  ;(window as any).fbq("track", event, data)
}