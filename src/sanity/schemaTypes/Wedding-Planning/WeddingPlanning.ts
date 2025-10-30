import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "wedding-planning",
  title: "Wedding Planning",
  type: "document",
  icon: DocumentIcon,
  groups: [
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
      name: "Testimonials",
      title: "Testimonials",
    },
    {
      name: "Form",
      title: "Form",
    },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "hero",
      group: "Hero",
    }),
    defineField({
      name: "paragraph1",
      title: "Paragraph 1",
      type: "localizedBlock",
      group: "Paragraphs",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      group: "Gallery",
      validation: Rule => Rule.required(),
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
    }),
    defineField({
      name: "titleTestimonials",
      title: "Title Testimonials",
      type: "localizedString",
      group: "Testimonials",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "Testimonials",
      of: [{ type: "testimonial" }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "formTitle",
      title: "Form Title",
      type: "localizedString",
      group: "Form",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "formSubtitle",
      title: "Form Subtitle",
      type: "localizedString",
      group: "Form",
    }),
    defineField({
      name: "formSubmitText",
      title: "Form Submit Text",
      type: "localizedString",
      group: "Form",
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "hero.title.en",
    },
  },
})
