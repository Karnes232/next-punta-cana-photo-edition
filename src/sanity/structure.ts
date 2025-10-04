import type { StructureResolver } from "sanity/structure"

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("General Layout")
        .child(
          S.document()
            .schemaType("generalLayout")
            .title("General Layout")
            .documentId("generalLayout"),
        ),
      S.listItem()
        .title("Page SEO")
        .child(
          S.documentList()
            .schemaType("pageSeo")
            .title("Page SEO")
            .filter("_type == 'pageSeo'"),
        ),
      S.listItem()
        .title("Home Page")
        .child(
          S.list()
            .title("Home Page")
            .items([
              S.listItem()
                .title("Hero")
                .child(
                  S.document()
                    .schemaType("hero")
                    .title("Hero")
                    .documentId("hero"),
                ),
              S.listItem()
                .title("Section Titles")
                .child(
                  S.document()
                    .schemaType("sectionTitles")
                    .title("Section Titles")
                    .documentId("sectionTitles"),
                ),
              S.listItem()
                .title("Gallery")
                .child(
                  S.document()
                    .schemaType("homePageGallery")
                    .title("Gallery")
                    .documentId("homePageGallery"),
                ),
              S.listItem()
                .title("Testimonials")
                .child(
                  S.documentList()
                    .schemaType("testimonial")
                    .title("Testimonials")
                    .filter("_type == 'testimonial'"),
                ),
            ]),
        ),
      S.listItem()
        .title("Services Offered")
        .child(
          S.documentList()
            .title("Services Offered")
            .filter("_type == 'servicesOffered'")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }]),
        ),
    ])
