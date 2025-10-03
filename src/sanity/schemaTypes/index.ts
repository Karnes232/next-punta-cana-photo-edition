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

    //ServicesOffered
    ServicesOffered,
  ],
}
