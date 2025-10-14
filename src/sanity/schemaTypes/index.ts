import { type SchemaTypeDefinition } from "sanity"

//Localization
import {
  localizedBlock,
  localizedString,
  localizedText,
} from "./Localized/localized"

import faqComponent from "./FaqComponent/FaqComponent"

//SEO
import seo from "./SEO/seo"
import PageSeo from "./SEO/PageSeo"
//General
import GeneralLayout from "./GeneralLayout/GeneralLayout"

//HomePage
import Homepage from "./HomePage/Homepage"
import Hero from "./HomePage/Hero"
import SectionTitles from "./HomePage/SectionTitles"
import HomePageGallery from "./HomePage/Gallery"
import Testimonials from "./HomePage/Testimonials"
import ContentBlock from "./HomePage/ContentBlock"

//Photoshoots
import Photoshoots from "./Photoshoots/Photoshoots"
import PhotoshootsPackages from "./Photoshoots/PhotoshootsPackages"

//Weddings
import Weddings from "./Weddings/Wedding"

//Photography Video
import PhotographyVideo from "./Photography-Video/photography-video"

//ServicesOffered
import ServicesOffered from "./ServicesOffered/ServicesOffered"

//Wedding Planning
import WeddingPlanning from "./Wedding-Planning/WeddingPlanning"

//Proposal
import Proposal from "./Proposal/Proposal"

//Corporate Events
import CorporateEvents from "./CorporateEvents/CorporateEvents"

//Stories
import stories from "./stories/stories"

//About
import About from "./About/About"

//Contact
import Contact from "./contact/contact"

//FAQs
import FAQs from "./faqs/faqs"

//Policies
import Policies from "./policies/policies"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //Localized
    localizedString,
    localizedText,
    localizedBlock,
    faqComponent,

    //SEO
    seo,
    PageSeo,

    //General
    GeneralLayout,

    //HomePage
    Homepage,
    Hero,
    SectionTitles,
    HomePageGallery,
    Testimonials,
    ContentBlock,

    //Photoshoots
    Photoshoots,
    PhotoshootsPackages,

    //Weddings
    Weddings,

    //Photography Video
    PhotographyVideo,

    //Wedding Planning
    WeddingPlanning,

    //Proposal
    Proposal,

    //Corporate Events
    CorporateEvents,

    //Stories
    stories,

    //About
    About,

    //Contact
    Contact,

    //FAQs
    FAQs,

    //Policies
    Policies,

    //ServicesOffered
    ServicesOffered,
  ],
}
