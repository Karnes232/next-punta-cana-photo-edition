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
    {
      name: "Hero",
      title: "Hero",
    },
    {
      name: "Paragraphs",
      title: "Paragraphs",
    },
    {
      name: "Gallery",
      title: "Gallery",
    },
    {
      name: "Additions",
      title: "Additions",
    },
    {
      name: "SEO",
      title: "SEO",
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
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
      group: "Hero",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph1",
      title: "Paragraph 1",
      type: "localizedBlock",
      group: "Paragraphs",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "photoGallery",
      title: "Photo Gallery",
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
      description: "Minimum 8 images",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "paragraph2",
      title: "Paragraph 2",
      type: "localizedBlock",
      group: "Paragraphs",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "additions",
      title: "Additions",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "proposalAdditions" }],
        },
      ],
      group: "Additions",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "SEO",
    }),
  ],
  preview: {
    select: {
      title: "packageName.en",
    },
  },
})
