// schemas/generalLayout.ts
import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "localizedString",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
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
      description:
        "If video is used, no need to add images, but if not, add images",
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Video",
      type: "string",
      description: "Upload Videos to Cloudinary, then paste video ID here",
    }),
    defineField({
      name: "fullSize",
      title: "Full Size",
      type: "boolean",
      initialValue: true,
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
