import { Metadata } from "next"
import Image from "next/image"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import ProductActionsWrapper from "@modules/products/templates/product-actions-wrapper"

export const metadata: Metadata = {
  title: "Fontaine à eau silencieuse pour chat | MizuCat",
  description: "Fontaine à eau premium pour chat. Silencieuse, design et livraison rapide en Suisse.",
}

export default async function Home(props: { params: Promise<{ countryCode: string }> }) {
  const { countryCode } = await props.params
  const region = await getRegion(countryCode)
  if (!region) return null

  const { response } = await listProducts({
    countryCode,
    queryParams: { limit: 1 },
  })

  const product = response.products[0]
  if (!product) return null

  const image = product.thumbnail || product.images?.[0]?.url

  return (
    <main className="bg-[#fbfaf7] text-[#171412]">
      <section className="relative min-h-[72vh] overflow-hidden small:min-h-[92vh]">
  <div className="absolute inset-0">
   {/* Vidéo desktop */}
<video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  className="hidden h-full w-full object-cover object-center small:block"
>
  <source src="/fontaine-a-eau-pour-chat.mp4" type="video/mp4" />
</video>

{/* Vidéo mobile */}
<video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  className="block h-full w-full object-cover object-center small:hidden"
>
  <source src="/fontaine-a-eau-pour-chat-mobile.mp4" type="video/mp4" />
</video>

<div className="absolute inset-0 bg-black/45" />
  </div>

  <div className="content-container relative z-10 flex min-h-[72vh] items-start pt-8 pb-6 small:min-h-[92vh] small:items-center small:pt-0 small:pb-0">
    <div className="max-w-xl text-white">
      <p className="mb-5 inline-flex rounded-full bg-white/20 px-5 py-3 text-[11px] font-bold uppercase tracking-widest backdrop-blur">
        Livraison rapide Suisse
      </p>

      <h1 className="text-[42px] font-bold leading-[0.95] tracking-[-0.04em] small:text-7xl">
        Aidez votre chat à boire plus naturellement.
      </h1>

      <p className="mt-6 text-[20px] leading-8 text-white/90 small:text-lg">
        Une fontaine à eau silencieuse, élégante et pensée pour garder une eau fraîche en permanence.
      </p>

      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-3 text-sm font-medium text-white">
        <span>✓ Silencieuse</span>
        <span>✓ Filtration avancée</span>
        <span>✓ Design élégant</span>
      </div>
    </div>
  </div>
</section>

      <section id="commander" className="content-container scroll-mt-20 py-12 small:py-24">
        <div className="grid grid-cols-1 gap-8 small:grid-cols-2 small:gap-16">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#eee5da]">
            <div className="aspect-[4/5]">
              {image && (
                <Image
                  src={image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a6f55]">
              Fontaine premium pour chat
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] small:text-5xl">
              {product.title}
            </h2>

            <p className="mt-5 text-base leading-7 text-[#5d5550]">
              Idéale pour les chats qui boivent peu. Son eau en mouvement attire naturellement votre chat et l’aide à mieux s’hydrater au quotidien.
            </p>

            <div className="mt-7 grid gap-3 text-sm">
              <div>✓ Ultra silencieuse</div>
              <div>✓ Design propre et moderne</div>
              <div>✓ Aide à encourager l’hydratation</div>
              <div>✓ Livraison rapide en Suisse</div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[#e7ded2] bg-white p-5 shadow-xl shadow-black/5">
              <ProductActionsWrapper id={product.id} region={region} />

              <p className="mt-4 text-center text-xs text-[#7b716b]">
                Paiement sécurisé · Garantie satisfaction · Expédition rapide
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 small:py-20">
        <div className="content-container grid grid-cols-1 gap-4 small:grid-cols-3">
          <div className="rounded-3xl border border-[#eee7df] p-6">
            <h3 className="font-bold">Hydratation</h3>
            <p className="mt-2 text-sm leading-6 text-[#6b625c]">
              L’eau en mouvement attire davantage les chats.
            </p>
          </div>

          <div className="rounded-3xl border border-[#eee7df] p-6">
            <h3 className="font-bold">Silence</h3>
            <p className="mt-2 text-sm leading-6 text-[#6b625c]">
              Pensée pour un appartement calme et confortable.
            </p>
          </div>

          <div className="rounded-3xl border border-[#eee7df] p-6">
            <h3 className="font-bold">Design</h3>
            <p className="mt-2 text-sm leading-6 text-[#6b625c]">
              Un produit premium qui s’intègre bien dans un intérieur moderne.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}