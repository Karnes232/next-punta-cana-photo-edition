import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "proposal",
  title: "Proposal",
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
      name: "Testimonials",
      title: "Testimonials",
    },
    {
      name: "New Arrivals",
      title: "New Arrivals",
    },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
      group: "Hero",
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
      name: "titleTestimonials",
      title: "Title Testimonials",
      type: "localizedString",
      group: "Testimonials",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "Testimonials",
      of: [{ type: "testimonial" }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "newArrivalsTitle",
      title: "New Arrivals Title",
      type: "localizedString",
      group: "New Arrivals",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "newArrivalsSubtitle",
      title: "New Arrivals Subtitle",
      type: "localizedString",
      group: "New Arrivals",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "newArrivalsBadge",
      title: "New Arrivals Badge",
      type: "localizedString",
      group: "New Arrivals",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "newArrivalImages",
      title: "New Arrival Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative Text",
              type: "localizedString",
              validation: Rule => Rule.required(),
            }),
          ],
        },
      ],
      group: "New Arrivals",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "hero.title.en",
    },
  },
})
