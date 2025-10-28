"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface SelectedPackageContextType {
  selectedPackageTitle: string | null
  setSelectedPackageTitle: (title: string | null) => void
}

const SelectedPackageContext = createContext<
  SelectedPackageContextType | undefined
>(undefined)

interface SelectedPackageProviderProps {
  children: ReactNode
}

export const SelectedPackageProvider: React.FC<
  SelectedPackageProviderProps
> = ({ children }) => {
  const [selectedPackageTitle, setSelectedPackageTitle] = useState<
    string | null
  >(null)

  return (
    <SelectedPackageContext.Provider
      value={{ selectedPackageTitle, setSelectedPackageTitle }}
    >
      {children}
    </SelectedPackageContext.Provider>
  )
}

export const useSelectedPackage = (): SelectedPackageContextType => {
  const context = useContext(SelectedPackageContext)
  if (context === undefined) {
    throw new Error(
      "useSelectedPackage must be used within a SelectedPackageProvider",
    )
  }
  return context
}
