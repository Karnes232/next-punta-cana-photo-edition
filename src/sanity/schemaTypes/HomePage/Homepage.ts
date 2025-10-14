import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "Hero",
      title: "Hero",
    },
    {
        name: "Section Titles",
        title: "Section Titles",
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
        name: "Content Block",
        title: "Content Block",
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
        name: "titleServicesOffered",
        title: "Title Services Offered",
        type: "localizedString",
        group: "Section Titles",
        validation: Rule => Rule.required(),
    }),
    defineField({
        name: "titleGallery",
        title: "Title Gallery",
        type: "localizedString",
        group: "Gallery",
        validation: Rule => Rule.required(),
    }),
    defineField({
        name: "galleryImages",
        title: "Gallery Images",
        type: "array",
        group: "Gallery",
        validation: Rule => Rule.required(),
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
        name: "contentBlock",
        title: "Content Block",
        type: "contentBlock",
        group: "Content Block",
        validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subtitle: "subtitle.en",
      media: "heroImage[0].asset.url",
    },
  },
})