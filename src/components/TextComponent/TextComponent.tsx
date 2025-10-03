"use client"
import React from "react";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Montserrat } from "next/font/google";

const coromantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
  })

  const MontserratFont = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
  })


const TextComponent = ({ title, paragraph, className, pClassName }: { title?: string, paragraph?: string, className?: string, pClassName?: string }) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 3,
          delay: 0.3,
        }}
        className="flex flex-col items-center justify-center text-center max-w-5xl  lg:p-2 mx-auto"
      >
        {title && <h1 className={`${coromantGaramond.className} ${className}`}>{title}</h1>}

        {paragraph && (
          <p
            className={`${coromantGaramond.className} lg:text-lg text-gray-700 lg:mt-5 ${pClassName}`}
          >
            {paragraph}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default TextComponent;
