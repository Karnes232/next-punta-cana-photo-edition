import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "contentBlock",
  title: "Content Block",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
    }),
    defineField({
      name: "subTitle",
      title: "Sub Title",
      type: "localizedString",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "localizedText",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "localizedString",
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      subTitle: "subTitle.en",
      image: "image.asset.url",
    },
  },
})
