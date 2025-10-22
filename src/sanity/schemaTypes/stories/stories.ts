import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "stories",
  title: "Stories",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "Hero",
      title: "Hero",
    },
    {
      name: "Featured Post",
      title: "Featured Post",
    },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
      group: "Hero",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "featuredPost",
      title: "Featured Post",
      type: "reference",
      to: [{ type: "blogPost" }],
      options: {
        disableNew: true,
      },
      group: "Featured Post",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "hero.title.en",
    },
  },
})
