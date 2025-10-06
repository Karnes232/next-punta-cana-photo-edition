import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "photoshoots",
  title: "Photoshoots",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "Hero",
      title: "Hero",
    },
    {
      name: "Gallery",
      title: "Gallery",
    },
    {
      name: "Text Block",
      title: "Text Block",
    },
    {
      name: "Content Block",
      title: "Content Block",
    },
    {
      name: "Testimonials",
      title: "Testimonials",
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
      name: "paragraph1",
      title: "paragraph 1",
      type: "localizedBlock",
      group: "Text Block",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "contentBlock",
      title: "Content Block",
      type: "contentBlock",
      group: "Content Block",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph2",
      title: "paragraph 2",
      type: "localizedBlock",
      group: "Text Block",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [{ type: "testimonial" }],
      group: "Testimonials",
    }),
  ],
  preview: {
    select: {
      title: "hero.pageName",
    },
  },
})
