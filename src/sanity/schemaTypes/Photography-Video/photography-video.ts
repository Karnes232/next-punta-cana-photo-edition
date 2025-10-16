import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "photography-video",
  title: "Photography Video",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "Hero",
      title: "Hero",
    },
    {
      name: "Paragraphs",
      title: "Paragraphs",
    },
    {
      name: "Gallery",
      title: "Gallery",
    },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
      group: "Hero",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph1",
      title: "Paragraph 1",
      type: "localizedBlock",
      group: "Paragraphs",
      validation: Rule => Rule.required(),
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
      group: "Gallery",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "packageTitle",
      title: "Package Title",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "packageSubtitle",
      title: "Package Subtitle",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2",
      type: "localizedBlock",
      group: "Paragraphs",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "hero.title.en",
    },
  },
})
