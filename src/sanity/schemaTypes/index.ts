import { type SchemaTypeDefinition } from "sanity"

//Localization
import {
  localizedBlock,
  localizedString,
  localizedText,
} from "./Localized/localized"

//SEO
import seo from "./SEO/seo"
import PageSeo from "./SEO/PageSeo"
//General
import GeneralLayout from "./GeneralLayout/GeneralLayout"

//HomePage
import Hero from "./HomePage/Hero"
import SectionTitles from "./HomePage/SectionTitles"
import HomePageGallery from "./HomePage/Gallery"
import Testimonials from "./HomePage/Testimonials"
import ContentBlock from "./HomePage/ContentBlock"

//Photoshoots
import Photoshoots from "./Photoshoots/Photoshoots"

//Weddings
import Weddings from "./Weddings/Wedding"

//ServicesOffered
import ServicesOffered from "./ServicesOffered/ServicesOffered"

//Wedding Planning
import WeddingPlanning from "./Wedding-Planning/WeddingPlanning"

//Proposal
import Proposal from "./Proposal/Proposal"

//Corporate Events
import CorporateEvents from "./CorporateEvents/CorporateEvents"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //Localized
    localizedString,
    localizedText,
    localizedBlock,

    //SEO
    seo,
    PageSeo,

    //General
    GeneralLayout,

    //HomePage
    Hero,
    SectionTitles,
    HomePageGallery,
    Testimonials,
    ContentBlock,

    //Photoshoots
    Photoshoots,

    //Weddings
    Weddings,

    //Wedding Planning
    WeddingPlanning,

    //Proposal
    Proposal,

    //Corporate Events
    CorporateEvents,

    //ServicesOffered
    ServicesOffered,
  ],
}
