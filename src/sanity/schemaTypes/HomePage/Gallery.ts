import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "homePageGallery",
  title: "Home Page Gallery",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({
        name: "alt",
        title: "Alternative Text",
        type: "string",
      })] }],
    }),
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
})