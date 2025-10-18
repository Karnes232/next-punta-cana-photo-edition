import { ProposalPackages } from "@/sanity/queries/Proposal/ProposalPackages"
import React from "react"
import ProposalPackageCard from "./ProposalPackageCard"
import { Montserrat } from "next/font/google"
import { getTranslations } from "next-intl/server"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const ProposalComponent = async ({
  proposalPackages,
  locale,
}: {
  proposalPackages: ProposalPackages[]
  locale: "en" | "es"
}) => {
  const t = await getTranslations("ProposalPackages")
  if (!proposalPackages || proposalPackages.length === 0) {
    return (
      <div className="text-center py-12">
        <p className={`${montserrat.className} text-gray-600`}>
          {t("noProposalPackagesAvailable")}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {proposalPackages.map(proposalPackage => (
        <ProposalPackageCard
          key={proposalPackage._id}
          proposalPackage={proposalPackage}
          locale={locale}
        />
      ))}
    </div>
  )
}

export default ProposalComponent
