import { defineField, defineType } from "sanity"
import { Star } from "lucide-react"

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: Star,
  fields: [
    defineField({
      name: "name",
      title: "Client Name",
      type: "string",
      validation: Rule => Rule.required().min(2),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "role",
      title: "Role / Relationship",
      type: "localizedString",
      description: "e.g. Bride, Groom, Event Planner, Corporate Client",
    }),
    defineField({
      name: "shortQuote",
      title: "Short Quote",
      type: "localizedText",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "photo",
    },
  },
})
