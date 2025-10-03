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
            ]),
        ),
      S.listItem()
        .title("Services Offered")
        .child(
          S.documentList()
            .title("Services Offered")
            .filter("_type == 'servicesOffered'")
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
    ])
