import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"
export default defineType({
  name: "pageSeo",
  title: "Page SEO",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "pageName",
      title: "Page Name",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "About", value: "about" },
          { title: "Contact", value: "contact" },
          { title: "Corporate Events", value: "corporate-events" },
          { title: "FAQ", value: "faq" },
          { title: "Photoshoots", value: "photoshoots" },
          { title: "Policies", value: "policies" },
          { title: "Proposals", value: "proposals" },
          { title: "Stories", value: "stories" },
          { title: "Wedding Planning", value: "wedding-planning" },
          { title: "Weddings", value: "weddings" },
          { title: "Weddings/Photography Video", value: "photography-video" },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: {
      title: "pageName",
    },
  },
})
