import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "policies",
  title: "Policies",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      name: "Hero",
      title: "Hero",
    },
    {
      name: "Terms and Conditions",
      title: "Terms and Conditions",
    },
    {
      name: "Privacy Policy",
      title: "Privacy Policy",
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
      name: "termsAndConditions",
      title: "Terms and Conditions",
      type: "localizedBlock",
      group: "Terms and Conditions",
    }),
    defineField({
      name: "privacyPolicy",
      title: "Privacy Policy",
      type: "localizedBlock",
      group: "Privacy Policy",
    }),
  ],
  preview: {
    select: {
      title: "hero.pageName",
    },
  },
})
