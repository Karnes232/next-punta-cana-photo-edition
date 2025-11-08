import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
  Calculator,
  Building2,
} from "lucide-react"

import {
  ContactFormErrors,
  ContactFormState,
  Locale,
  SubmitStatus,
  TranslationFn,
} from "./types"

type InquiryFormProps = {
  locale: Locale
  formState: ContactFormState
  formErrors: ContactFormErrors
  onFieldChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isSubmitting: boolean
  submitStatus: SubmitStatus
  t: TranslationFn
  totalEstimate: number
  currencyLabel: string
  summaryLines: string[]
  formatCurrency: (value: number) => string
  selectedHours: number
}

const InquiryForm = ({
  locale,
  formState,
  formErrors,
  onFieldChange,
  onSubmit,
  isSubmitting,
  submitStatus,
  t,
  totalEstimate,
  currencyLabel,
  summaryLines,
  formatCurrency,
  selectedHours,
}: InquiryFormProps) => (
  <section className="rounded-3xl border border-elegantSilver/50 bg-pureWhite shadow-xl">
    <div className="px-6 py-10 sm:px-10">
      <header className="mx-auto mb-10 max-w-3xl space-y-3 text-center">
        <h3 className="text-2xl font-bold text-darkGray sm:text-3xl font-crimsonPro">
          {t("formHeading")}
        </h3>
        <p className="text-base leading-relaxed text-darkGray/70">
          {t("formSubtitle")}
        </p>
      </header>

      {submitStatus === "error" && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <p>{t("errorMessage")}</p>
        </div>
      )}

      {submitStatus === "success" ? (
        <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-6 text-green-700">
          <CheckCircle className="h-6 w-6" />
          <div className="space-y-1">
            <p className="text-lg font-semibold">{t("successMessage")}</p>
            <p className="text-sm text-green-700/80">{t("successDetails")}</p>
          </div>
        </div>
      ) : (
        <form
          name="custom-photography-video-calculator"
          method="POST"
          action="/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={onSubmit}
          className="grid gap-6"
        >
          <input
            type="hidden"
            name="form-name"
            value="custom-photography-video-calculator"
          />
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" name="selectedHours" value={selectedHours} />
          <input type="hidden" name="estimatedTotal" value={totalEstimate} />
          <input type="hidden" name="addOns" value={summaryLines.join(" | ")} />

          <p style={{ display: "none" }}>
            <label>
              {t("honeypotLabel")}
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div>
            <label
              htmlFor="name"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-darkGray"
            >
              <User className="h-4 w-4" />
              {t("name")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formState.name}
              onChange={onFieldChange}
              placeholder={t("namePlaceholder")}
              className={`w-full rounded-xl border px-4 py-3 text-darkGray shadow-sm transition focus:outline-none focus:ring-2 ${
                formErrors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise/60"
              } placeholder-darkGray/40`}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-darkGray"
              >
                <Mail className="h-4 w-4" />
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={onFieldChange}
                placeholder={t("emailPlaceholder")}
                className={`w-full rounded-xl border px-4 py-3 text-darkGray shadow-sm transition focus:outline-none focus:ring-2 ${
                  formErrors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise/60"
                } placeholder-darkGray/40`}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="telephone"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-darkGray"
              >
                <Phone className="h-4 w-4" />
                {t("telephone")}
              </label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                value={formState.telephone}
                onChange={onFieldChange}
                placeholder={t("telephonePlaceholder")}
                className={`w-full rounded-xl border px-4 py-3 text-darkGray shadow-sm transition focus:outline-none focus:ring-2 ${
                  formErrors.telephone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise/60"
                } placeholder-darkGray/40`}
              />
              {formErrors.telephone && (
                <p className="mt-1 text-sm text-red-600">
                  {formErrors.telephone}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="date"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-darkGray"
              >
                <Calendar className="h-4 w-4" />
                {t("date")}
              </label>
              <input
                id="date"
                name="date"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={formState.date}
                onChange={onFieldChange}
                className={`w-full rounded-xl border px-4 py-3 text-darkGray shadow-sm transition focus:outline-none focus:ring-2 ${
                  formErrors.date
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise/60"
                }`}
              />
              {formErrors.date && (
                <p className="mt-1 text-sm text-red-600">{formErrors.date}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="hotel"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-darkGray"
              >
                <Building2 className="h-4 w-4" />
                {t("hotel")}
              </label>
              <input
                id="hotel"
                name="hotel"
                type="text"
                value={formState.hotel}
                onChange={onFieldChange}
                placeholder={t("hotelPlaceholder")}
                className={`w-full rounded-xl border px-4 py-3 text-darkGray shadow-sm transition focus:outline-none focus:ring-2 ${
                  formErrors.hotel
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise/60"
                } placeholder-darkGray/40`}
              />
              {formErrors.hotel && (
                <p className="mt-1 text-sm text-red-600">{formErrors.hotel}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-darkGray"
            >
              <MessageSquare className="h-4 w-4" />
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formState.message}
              onChange={onFieldChange}
              placeholder={t("messagePlaceholder")}
              className={`w-full rounded-xl border px-4 py-3 text-darkGray shadow-sm transition focus:outline-none focus:ring-2 ${
                formErrors.message
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise/60"
              } placeholder-darkGray/40 resize-none`}
            />
            {formErrors.message && (
              <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-caribbeanTurquoise/30 bg-caribbeanTurquoise/10 px-4 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 text-sm text-darkGray">
              <Calculator className="h-5 w-5 text-caribbeanTurquoise" />
              <span className="font-medium">
                {t("estimatedLabel")}: {formatCurrency(totalEstimate)}{" "}
                {currencyLabel}
              </span>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-caribbeanTurquoise px-6 py-3 text-sm font-semibold text-darkGray shadow-md transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-darkGray border-t-transparent" />
                  {t("sending")}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {t("submit")}
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  </section>
)

export default InquiryForm
