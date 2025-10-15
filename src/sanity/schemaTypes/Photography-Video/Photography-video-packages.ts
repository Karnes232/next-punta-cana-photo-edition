import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "photography-video-packages",
  title: "Photography Video Packages",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localizedString",
      validation: Rule => Rule.required(),
    }),
    defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
            source: 'title.en',
        },
        validation: Rule => Rule.required(),
    }),
    defineField({
        name: 'description',
        title: 'Description',
        type: 'localizedText',
        validation: Rule => Rule.required(),
    }),
    defineField({
        name: 'startingPrice',
        title: 'Starting Price',
        type: 'number',
        validation: Rule => Rule.required(),
    }),

  ],
  preview: {
    select: {
      title: "title.en",
    },
  },
})