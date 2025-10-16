import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "photography-video-packages",
  title: "Photography Video Packages",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "Package Card",
      title: "Package Card",
    },
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
    {
      name: "SEO",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      group: "Package Card",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
      },
      group: "Package Card",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      group: "Package Card",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "startingPrice",
      title: "Starting Price",
      type: "number",
      group: "Package Card",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
      group: "Hero",
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


    defineField({ name: "seo", type: "seo", group: "SEO" }),
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
})
