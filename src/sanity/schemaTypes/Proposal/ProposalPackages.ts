import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "proposalPackages",
  title: "Proposal Packages",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "Package Card",
      title: "Package Card",
    },
  ],
  fields: [
    defineField({
      name: "packageName",
      title: "Package Name",
      type: "localizedString",
      validation: Rule => Rule.required(),
      group: "Package Card",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "packageName.en",
      },
      validation: Rule => Rule.required(),
      group: "Package Card",
    }),
    defineField({
      name: "packageCardImage",
      title: "Package Card Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
      group: "Package Card",
    }),
    defineField({
      name: "packageCardIncludedItems",
      title: "Package Card Included Items",
      type: "array",
      of: [{ type: "localizedString" }],
      validation: Rule => Rule.required(),
      group: "Package Card",
    }),
    defineField({
      name: "packageCardStartingPrice",
      title: "Package Card Starting Price",
      type: "number",
      validation: Rule => Rule.required(),
      group: "Package Card",
    }),
  ],
  preview: {
    select: {
      title: "packageName.en",
    },
  },
})
