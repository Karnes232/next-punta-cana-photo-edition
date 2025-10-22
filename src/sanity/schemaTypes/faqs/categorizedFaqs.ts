import { defineField, defineType } from "sanity"
import { DocumentIcon } from "@sanity/icons"

export default defineType({
  name: "categorizedFaqs",
  title: "Categorized FAQs",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "localizedString",
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "localizedText",
    }),
  ],
  preview: {
    select: {
      question: "question.en",
      answer: "answer.en",
    },
    prepare({ question, answer }) {
      return {
        title: question,
      }
    },
  },
})
