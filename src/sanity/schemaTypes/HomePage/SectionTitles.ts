// schemas/generalLayout.ts
import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "sectionTitles",
  title: "Section Titles",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "titleServicesOffered",
      title: "Title Services Offered",
      type: "localizedString",
    }),
    defineField({
      name: "titleGallery",
      title: "Title Gallery",
      type: "localizedString",
    }),
    defineField({
        name: "titleTestimonials",
        title: "Title Testimonials",
        type: "localizedString",
      }),
    
  ],
  preview: {
    select: {
      titleServicesOffered: "titleServicesOffered.en",
      titleGallery: "titleGallery.en",
      titleTestimonials: "titleTestimonials.en",
    },
  },
})