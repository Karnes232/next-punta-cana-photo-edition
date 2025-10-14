import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "weddings",
  title: "Weddings",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
    }),
    defineField({
      name: "paragraph1",
      title: "Paragraph 1",
      type: "localizedBlock",
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2",
      type: "localizedBlock",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "Wedding",
    },
  },
})
