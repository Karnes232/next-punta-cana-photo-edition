import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "CorporateEventTestimonials",
  title: "Corporate Event Testimonials",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "clientRole",
      title: "Client Role",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "testimonial",
      title: "Testimonial",
      type: "localizedText",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "companyLogo",
      title: "Company Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt",
          type: "string",
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "companyName",
    },
  },
})
