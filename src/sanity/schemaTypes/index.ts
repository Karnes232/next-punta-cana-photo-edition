import { type SchemaTypeDefinition } from "sanity"

//Localization
import { localizedBlock, localizedString, localizedText } from "./Localized/localized"

//General
import GeneralLayout from "./GeneralLayout/GeneralLayout"

//HomePage
import Hero from "./HomePage/Hero"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    //Localized
    localizedString,
    localizedText,
    localizedBlock,

    //General  
    GeneralLayout,

    //HomePage
    Hero
  ],
}
