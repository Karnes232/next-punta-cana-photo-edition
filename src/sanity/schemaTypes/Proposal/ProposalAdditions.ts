import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "proposalAdditions",
  title: "Proposal Additions",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "additionName",
      title: "Addition Name",
      type: "localizedString",
    }),
    defineField({
      name: "additionPrice",
      title: "Addition Price",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "additionName.en",
    },
  },
})
