import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <>
      {/* Mobile */}
      <div className="bg-white small:hidden">
        <Heading level="h2" className="txt-xlarge mb-4">
          Vous avez déjà un compte ?
        </Heading>

        <div className="flex items-center justify-between gap-4">
          <Text className="txt-medium text-ui-fg-subtle">
            Connectez-vous pour une meilleure expérience.
          </Text>

          <LocalizedClientLink href="/account">
            <Button
              variant="secondary"
              className="h-10 shrink-0"
              data-testid="sign-in-button"
            >
              Se connecter
            </Button>
          </LocalizedClientLink>
        </div>
      </div>

      {/* Desktop inchangé */}
      <div className="hidden small:flex bg-white items-center justify-between">
        <div>
          <Heading level="h2" className="txt-xlarge">
            Vous avez déjà un compte ?
          </Heading>

          <Text className="txt-medium text-ui-fg-subtle mt-2">
            Connectez-vous pour une meilleure expérience.
          </Text>
        </div>

        <div>
          <LocalizedClientLink href="/account">
            <Button
              variant="secondary"
              className="h-10"
              data-testid="sign-in-button"
            >
              Se connecter
            </Button>
          </LocalizedClientLink>
        </div>
      </div>
    </>
  )
}

export default SignInPrompt