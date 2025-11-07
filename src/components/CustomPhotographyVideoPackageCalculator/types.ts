import { useTranslations } from "next-intl"

export type Locale = "en" | "es"

export type TranslationFn = ReturnType<typeof useTranslations>

export type SubmitStatus = "idle" | "success" | "error"

export type Addition = {
  title: {
    en: string
    es: string
  }
  price: number
  fixedorhourly: string
}

export type SelectedItem = {
  title: Addition["title"]
  isHourly: boolean
  unitPrice: number
  quantity: number
  lineTotal: number
}

export interface ContactFormState {
  name: string
  email: string
  telephone: string
  date: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  telephone?: string
  date?: string
  message?: string
}
