import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "corporate-events",
  title: "Corporate Events",
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
    {
      name: "Testimonials",
      title: "Testimonials",
    },
    {
      name: "FAQ Component",
      title: "FAQ Component",
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
      name: "galleryTitle",
      title: "Gallery Title",
      type: "localizedString",
      group: "Gallery",
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
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "Testimonials",
      of: [{ type: "CorporateEventTestimonials" }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "corporateFaqs",
      title: "FAQ Component",
      type: "array",
      group: "FAQ Component",
      of: [{ type: "categorizedFaqs" }],
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "hero.title.en",
    },
  },
})
