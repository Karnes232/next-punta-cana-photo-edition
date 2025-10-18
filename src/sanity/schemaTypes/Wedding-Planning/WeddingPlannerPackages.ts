import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "wedding-planner-packages",
  title: "Wedding Planner Packages",
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
      name: "includedItems",
      title: "Included Items",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "mostPopular",
      title: "Most Popular",
      type: "boolean",
      initialValue: false,
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
})
