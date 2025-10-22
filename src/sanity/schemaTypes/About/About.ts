import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "Hero",
      title: "Hero",
    },
    {
      name: "Text Block",
      title: "Text Block",
    },
    {
      name: "Gallery",
      title: "Gallery",
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
      name: "brandStory",
      title: "Brand Story",
      type: "localizedBlock",
      group: "Text Block",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "galleryTitle",
      title: "Gallery Title",
      type: "localizedString",
      group: "Gallery",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "localizedBlock",
      group: "Text Block",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "teamVideo",
      title: "Team Video",
      type: "string",
      description: "Upload Videos to Cloudinary, then paste video ID here",
      group: "Gallery",
    }),
  ],
  preview: {
    select: {
      title: "hero.title.en",
    },
  },
})
