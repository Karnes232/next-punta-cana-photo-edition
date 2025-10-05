import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "proposal",
  title: "Proposal",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
    }),
  ],
})
