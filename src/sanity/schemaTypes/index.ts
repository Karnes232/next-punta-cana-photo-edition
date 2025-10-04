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

//ServicesOffered
import ServicesOffered from "./ServicesOffered/ServicesOffered"

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

    //ServicesOffered
    ServicesOffered,
  ],
}
