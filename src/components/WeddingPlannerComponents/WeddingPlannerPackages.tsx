import { WeddingPlannerPackages as WeddingPlannerPackagesType } from '@/sanity/queries/Wedding-Planning/WeddingPlannerPackages'
import React from 'react'
import WeddingPlannerPackageCard from './WeddingPlannerPackageCard'

interface WeddingPlannerPackagesProps {
  packages: WeddingPlannerPackagesType[]
  locale: 'en' | 'es'
}

const WeddingPlannerPackages: React.FC<WeddingPlannerPackagesProps> = ({ 
  packages, 
  locale 
}) => {
  // Sort packages to ensure most popular is in the right position
  const sortedPackages = React.useMemo(() => {
    const mostPopular = packages.find(pkg => pkg.mostPopular)
    const regularPackages = packages.filter(pkg => !pkg.mostPopular)
    
    if (!mostPopular) return packages
    
    // For mobile: most popular first
    // For desktop: most popular in middle (index 1)
    return [regularPackages[0], mostPopular, regularPackages[1]]
  }, [packages])

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sortedPackages.map((packageData) => (
          <WeddingPlannerPackageCard
            key={packageData._id}
            packageData={packageData}
            locale={locale}
          />
        ))}
      </div>
    </div>
  )
}

export default WeddingPlannerPackages