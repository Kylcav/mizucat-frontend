export default function ConditionsGeneralesPage() {
  const sections = [
    {
      number: "01.",
      title: "Objet",
      text: "Les présentes conditions générales de vente régissent les commandes passées sur le site MizuCat.",
    },
    {
      number: "02.",
      title: "Produits",
      text: "MizuCat propose des produits destinés aux chats d’intérieur. Les caractéristiques principales des produits sont présentées sur chaque fiche produit.",
    },
    {
      number: "03.",
      title: "Prix",
      text: "Les prix sont indiqués en CHF. MizuCat se réserve le droit de modifier ses prix à tout moment, sans effet sur les commandes déjà validées.",
    },
    {
      number: "04.",
      title: "Commande",
      text: "En validant sa commande, le client confirme avoir vérifié le contenu de son panier et accepte les présentes conditions générales de vente.",
    },
    {
      number: "05.",
      title: "Paiement",
      text: "Le paiement est exigible au moment de la commande. Les transactions sont traitées via un prestataire sécurisé. MizuCat ne conserve pas les données complètes de carte bancaire.",
    },
    {
      number: "06.",
      title: "Livraison",
      text: "Les commandes sont livrées à l’adresse indiquée par le client lors du passage de commande. Les délais de livraison sont donnés à titre indicatif.",
    },
    {
      number: "07.",
      title: "Retours",
      text: "Le client dispose d’un délai de 14 jours après réception de la commande pour signaler un produit défectueux ou endommagé. Les demandes de retour ou de remboursement sont étudiées uniquement en cas de défaut avéré du produit ou de problème lié à la commande. Les produits retournés doivent être complets, non utilisés et dans leur emballage d’origine.",
    },
    {
      number: "08.",
      title: "Contact",
      text: "Pour toute question concernant une commande ou les présentes conditions générales de vente, contactez-nous à :",
      email: "contact@mizucat.ch",
    },
  ]

  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#171412]">
      <div className="mx-auto max-w-5xl px-6 py-14 small:px-10 small:py-20">
        {/* TOP BAR */}
        <div className="mb-24 flex justify-end">
          <a
            href="/dk/checkout?step=review"
            className="rounded-full border border-[#e7ddd3] bg-white px-5 py-2.5 text-sm font-semibold text-[#6a5b50] shadow-sm transition hover:bg-[#f4ede6]"
          >
            ← Retour
          </a>
        </div>

        {/* HERO */}
        <section className="mb-28 max-w-4xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-[#b08a68]">
            INFORMATIONS LÉGALES & COMMANDES
          </p>

          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.08] tracking-tight small:text-7xl">
            Conditions générales de vente
          </h1>

          <p className="mt-10 max-w-3xl text-xl leading-9 text-[#665d57]">
            Nous voulons que votre expérience d’achat soit simple, claire et
            rassurante. Vous trouverez ici les informations importantes liées à
            vos commandes, paiements, livraisons et retours.
          </p>
        </section>

        {/* TRUST BLOCKS */}
        <section className="mb-24 grid gap-10 border-b border-[#eadfd5] pb-14 small:grid-cols-3">
          <div>
            <div className="mb-5 h-px w-16 bg-[#c7a589]" />

            <h2 className="text-xl font-bold">
              Paiement sécurisé
            </h2>

            <p className="mt-5 pb-4 text-base leading-8 text-[#665d57]">
              Vos transactions sont traitées par un prestataire de paiement
              sécurisé.
            </p>
          </div>

          <div>
            <div className="mb-5 h-px w-16 bg-[#c7a589]" />

            <h2 className="text-xl font-bold">
              Livraison en Suisse
            </h2>

            <p className="mt-5 pb-4 text-base leading-8 text-[#665d57]">
              Les commandes sont préparées avec soin et livrées à l’adresse
              indiquée lors de votre commande.
            </p>
          </div>

          <div>
            <div className="mb-5 h-px w-16 bg-[#c7a589]" />

            <h2 className="text-xl font-bold">
              Support client
            </h2>

            <p className="mt-5 pb-4 text-base leading-8 text-[#665d57]">
              Une question concernant votre commande ? Nous restons disponibles
              pour vous accompagner.
            </p>
          </div>
        </section>

        {/* CONTENT */}
        <section>
          {sections.map((section) => (
            <article
              key={section.title}
              className="border-b border-[#eadfd5] py-14"
            >
              {/* TITLE */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-extrabold tracking-tight text-[#b08a68] small:text-4xl">
                  {section.number}
                </span>

                <h2 className="text-3xl font-extrabold tracking-tight small:text-4xl">
                  {section.title}
                </h2>
              </div>

              {/* TEXT */}
              <p className="mt-5 mb-6 max-w-4xl text-lg leading-9 text-[#5f5a55]">
                {section.text}
              </p>

              {section.email && (
                <a
                  href={`mailto:${section.email}`}
                  className="mt-8 inline-flex rounded-full bg-[#171412] px-7 py-3.5 text-base font-bold text-white transition hover:bg-[#3a3029]"
                >
                  {section.email}
                </a>
              )}
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}