import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "corporate-event-packages",
  title: "Corporate Event Packages",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "cardImage",
      title: "Card Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
          validation: Rule => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
})
