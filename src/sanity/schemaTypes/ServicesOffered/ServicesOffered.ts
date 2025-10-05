import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "servicesOffered",
  title: "Services Offered",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "Home Page Card",
      title: "Home Page Card",
    },
    {
      name: "Page Content",
      title: "Page Content",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: Rule => Rule.required(),
      group: "Home Page Card",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "localizedString",
      validation: Rule => Rule.required(),
      group: "Home Page Card",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
      },
      validation: Rule => Rule.required(),
      group: "Home Page Card",
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
      description: "Add images",
      validation: Rule => Rule.required(),
      group: "Home Page Card",
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
      group: "Page Content",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
})
