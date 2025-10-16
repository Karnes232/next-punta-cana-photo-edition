import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "photoPackagesAdditions",
  title: "Photo Packages Additions",
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
      name: "price",
      title: "Price",
      type: "number",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "fixedorhourly",
      title: "Fixed or Hourly",
      type: "string",
      options: {
        list: [
          { title: "Fixed", value: "fixed" },
          { title: "Hourly", value: "hourly" },
        ],
      },
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
})
