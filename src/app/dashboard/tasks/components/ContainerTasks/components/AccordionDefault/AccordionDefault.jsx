import { Accordion } from "@chakra-ui/react"

export default function AccordionDefault({ Children, showAccordion }) {
  return (
    <Accordion.Root>
      <Accordion.Item open={showAccordion} onOpenChange={!showAccordion}>
        <Accordion.ItemContent>
          <Accordion.ItemBody> {Children}</Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  )
}
