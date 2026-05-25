"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Informations produit",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Livraison & Retours",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Poids</span>
            <p>{product.weight ? `${product.weight / 1000} kg` : "-"}</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Dimensions</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}l x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Livraison rapide</span>
            <p className="max-w-sm">
              Votre colis arrivera sous 3 à 5 jours ouvrés, en point de retrait
              ou directement chez vous.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Échanges simples</span>
            <p className="max-w-sm">
              Le produit ne convient pas parfaitement ? Aucun souci, nous
              l’échangerons contre un nouveau.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Retours faciles</span>
            <p className="max-w-sm">
              Retournez simplement votre produit et nous vous rembourserons.
              Nous ferons le nécessaire pour rendre votre retour simple et sans
              stress.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs