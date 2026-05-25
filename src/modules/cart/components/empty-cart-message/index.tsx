import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div
      className="py-32 px-4 flex flex-col justify-center items-start"
      data-testid="empty-cart-message"
    >
      <Heading
        level="h1"
        className="flex flex-row text-3xl font-bold gap-x-2 items-baseline"
      >
        Votre panier est vide
      </Heading>

      <Text className="text-base mt-4 mb-6 max-w-[32rem] leading-7 text-[#5f5a55]">
        Vous n’avez encore ajouté aucun produit à votre panier.
        Découvrez notre boutique et trouvez la fontaine parfaite pour votre chat.
      </Text>

      <div>
        <InteractiveLink href="/store">
          Découvrir les produits
        </InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
