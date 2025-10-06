import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "faqComponent",
  title: "FAQ Component",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "localizedText",
    }),
  ],
})
