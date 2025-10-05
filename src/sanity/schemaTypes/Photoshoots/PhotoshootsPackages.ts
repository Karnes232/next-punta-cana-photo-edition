import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "photoshootsPackages",
  title: "Photoshoots Packages",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "Card Info",
      title: "Card Info",
    },
    {
      name: "Page Info",
      title: "Page Info",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      group: "Card Info",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
      },
      group: ["Card Info", "Page Info"],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      group: "Card Info",
    }),
    defineField({
      name: "cardImage",
      title: "Card Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "Card Info",
      fields: [
        defineField({
          name: "alt",
          title: "Alternative Text",
          type: "string",
        }),
      ],
    }),

  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
})