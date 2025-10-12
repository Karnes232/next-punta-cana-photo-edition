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
    {
      name: "FAQ Component",
      title: "FAQ Component",
    },
    {
      name: "SEO",
      title: "SEO",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      group: "Card Info",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
      },
      group: ["Card Info", "Page Info"],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localizedText",
      group: "Card Info",
      validation: Rule => Rule.required(),
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
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "includedItems",
      title: "Included Items",
      type: "array",
      of: [{ type: "localizedString" }],
      group: "Card Info",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "startingPrice",
      title: "Starting Price",
      type: "number",
      group: "Card Info",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "heroImages",
      title: "Hero Images",
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
      group: "Page Info",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "localizedString",
      group: "Page Info",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "localizedString",
      group: "Page Info",
    }),
    defineField({
      name: "paragraph1",
      title: "Paragraph 1",
      type: "localizedBlock",
      group: "Page Info",
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
      group: "Page Info",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "faqComponent",
      title: "FAQ Component",
      type: "array",
      of: [{ type: "faqComponent" }],
      group: "FAQ Component",
      validation: Rule => Rule.required(),
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
      title: "title.en",
    },
  },
})
