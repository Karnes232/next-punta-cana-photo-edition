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
        .title("Services Offered")
        .child(
          S.documentList()
            .title("Services Offered")
            .filter("_type == 'servicesOffered'")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Home Page")
        .child(
          S.document()
            .schemaType("homepage")
            .title("Home Page")
            .documentId("homepage"),
        ),
      S.listItem()
        .title("Photoshoots")
        .child(
          S.list()
            .title("Photoshoots")
            .items([
              S.listItem()
                .title("Photoshoots")
                .child(
                  S.document()
                    .schemaType("photoshoots")
                    .title("Photoshoots")
                    .documentId("photoshoots"),
                ),
              S.listItem()
                .title("Photoshoots Packages")
                .child(
                  S.documentList()
                    .schemaType("photoshootsPackages")
                    .title("Photoshoots Packages")
                    .filter("_type == 'photoshootsPackages'"),
                ),
            ]),
        ),

      S.listItem()
        .title("Weddings")
        .child(
          S.document()
            .schemaType("weddings")
            .title("Weddings")
            .documentId("weddings"),
        ),

      S.listItem()
        .title("Photography Video")
        .child(
          S.list()
            .title("Photography Video")
            .items([
              S.listItem()
                .title("Photography Video")
                .child(
                  S.document()
                    .schemaType("photography-video")
                    .title("Photography Video Page")
                    .documentId("photography-video"),
                ),
              S.listItem()
                .title("Photography Video Packages")
                .child(
                  S.documentList()
                    .schemaType("photography-video-packages")
                    .title("Photography Video Packages")
                    .filter("_type == 'photography-video-packages'"),
                ),
            ]),
        ),
      S.listItem()
        .title("Wedding Planning")
        .child(
          S.list()
            .title("Wedding Planning")
            .items([
              S.listItem()
                .title("Wedding Planning")
                .child(
                  S.document()
                    .schemaType("wedding-planning")
                    .title("Wedding Planning")
                    .documentId("wedding-planning"),
                ),
              S.listItem()
                .title("Wedding Planner Packages")
                .child(
                  S.documentList()
                    .schemaType("wedding-planner-packages")
                    .title("Wedding Planner Packages")
                    .filter("_type == 'wedding-planner-packages'"),
                ),
            ]),
        ),

      S.listItem()
        .title("Proposal")
        .child(
          S.list()
            .title("Proposal")
            .items([
              S.listItem()
                .title("Proposal")
                .child(
                  S.document()
                    .schemaType("proposal")
                    .title("Proposal")
                    .documentId("proposal"),
                ),
              S.listItem()
                .title("Proposal Packages")
                .child(
                  S.documentList()
                    .schemaType("proposalPackages")
                    .title("Proposal Packages")
                    .filter("_type == 'proposalPackages'"),
                ),
            ]),
        ),
      S.listItem()
        .title("Corporate Events")
        .child(
          S.document()
            .schemaType("corporate-events")
            .title("Corporate Events")
            .documentId("corporate-events"),
        ),
      S.listItem()
        .title("Stories")
        .child(
          S.document()
            .schemaType("stories")
            .title("Stories")
            .documentId("stories"),
        ),
      S.listItem()
        .title("About")
        .child(
          S.document().schemaType("about").title("About").documentId("about"),
        ),
      S.listItem()
        .title("Contact")
        .child(
          S.document()
            .schemaType("contact")
            .title("Contact")
            .documentId("contact"),
        ),
      S.listItem()
        .title("FAQs")
        .child(
          S.document().schemaType("faqs").title("FAQs").documentId("faqs"),
        ),
      S.listItem()
        .title("Policies")
        .child(
          S.document()
            .schemaType("policies")
            .title("Policies")
            .documentId("policies"),
        ),
    ])
