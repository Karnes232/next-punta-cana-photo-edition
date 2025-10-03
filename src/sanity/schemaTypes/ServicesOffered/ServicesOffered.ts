import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "servicesOffered",
  title: "Services Offered",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
      },
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({
        name: "alt",
        title: "Alternative Text",
        type: "string",
      })] }],
      description: "Add images",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
})

