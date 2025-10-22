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
import PhotographyVideoPackages from "./Photography-Video/Photography-video-packages"
import PhotoPackagesAdditions from "./Photography-Video/PhotoPackagesAdditions"

//ServicesOffered
import ServicesOffered from "./ServicesOffered/ServicesOffered"

//Wedding Planning
import WeddingPlanning from "./Wedding-Planning/WeddingPlanning"
import WeddingPlannerPackages from "./Wedding-Planning/WeddingPlannerPackages"

//Proposal
import Proposal from "./Proposal/Proposal"
import ProposalPackages from "./Proposal/ProposalPackages"

//Corporate Events
import CorporateEvents from "./CorporateEvents/CorporateEvents"
import CorporateEventPackages from "./CorporateEvents/CorporateEventPackages"
import CorporateEventTestimonials from "./CorporateEvents/CorporateEventTestimonials"

//Stories
import stories from "./stories/stories"

//About
import About from "./About/About"

//Contact
import Contact from "./contact/contact"

//FAQs
import FAQs from "./faqs/faqs"
import FaqCategory from "./faqs/faqCategory"
import CategorizedFaqs from "./faqs/categorizedFaqs"

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
    PhotographyVideoPackages,
    PhotoPackagesAdditions,

    //Wedding Planning
    WeddingPlanning,
    WeddingPlannerPackages,

    //Proposal
    Proposal,
    ProposalPackages,

    //Corporate Events
    CorporateEvents,
    CorporateEventPackages,
    CorporateEventTestimonials,

    //Stories
    stories,

    //About
    About,

    //Contact
    Contact,

    //FAQs
    FAQs,
    FaqCategory,
    CategorizedFaqs,

    //Policies
    Policies,

    //ServicesOffered
    ServicesOffered,
  ],
}
