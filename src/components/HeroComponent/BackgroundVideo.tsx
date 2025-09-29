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

const BackgroundVideo = ({ heroVideo, fullSize, title, subtitle }: { heroVideo: string, fullSize: boolean, title: string, subtitle: string }) => {
    let height = "";
    let blankDivHeight = "";
    if (fullSize) {
      height = "h-screen";
      blankDivHeight = "h-[90vh]";
    } else {
      height = "h-[65vh]";
      blankDivHeight = "h-[55vh]";
    }

    const cloudName = "dswevrfuh";

    const base = `https://res.cloudinary.com/${cloudName}/video/upload`;
  


  return (
    <>
<div className={`absolute top-0 w-full ${height}`}>
<motion.div
          initial={{ filter: "brightness(0)" }}
          whileInView={{ filter: "brightness(0.6)" }}
          viewport={{ once: true }}
          transition={{
            duration: 6,
            delay: 0.5,
          }}
          className="absolute top-0 left-0 w-full h-full z-0 opacity-100 overflow-hidden brightness-[0.6]"
        >
          <video
            className="absolute top-0 left-0 bottom-0 right-0 w-full h-full object-cover object-center scale-[1.5]"
            // src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src={`${base}/q_auto,f_auto,vc_auto,ac_none,w_1080/${heroVideo}.mp4`}
              type="video/mp4"
              media="(min-width: 1024px)"
            />
            <source
              src={`${base}/q_auto,f_auto,vc_auto,ac_none,w_720/${heroVideo}.mp4`}
              type="video/mp4"
              media="(min-width: 640px)"
            />
            <source
              src={`${base}/q_auto,f_auto,vc_auto,ac_none,w_480/${heroVideo}.mp4`}
              type="video/mp4"
            />
            {`Your device does not support video playback.`}
          </video>
        </motion.div>
        {/* Centered content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
          {title && (
            <h1 className={`${coromantGaramond.className} text-pureWhite text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg`}>
              {title}
            </h1>
          )}
          {subtitle && (
            <p className={`${MontserratFont.className} text-pureWhite text-xl md:text-2xl lg:text-3xl drop-shadow-lg max-w-4xl`}>
              {subtitle}
            </p>
          )}
        </div>
</div>
    </>
  )
}

export default BackgroundVideo
