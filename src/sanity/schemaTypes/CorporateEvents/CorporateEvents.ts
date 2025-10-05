import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "corporate-events",
  title: "Corporate Events",
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
