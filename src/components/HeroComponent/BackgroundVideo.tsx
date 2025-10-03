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
          {/* Background overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none"></div>
          
          {/* Text content with enhanced styling */}
          <div className="relative z-10 max-w-6xl mx-auto">
            {title && (
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className={`${coromantGaramond.className} text-pureWhite text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 leading-tight tracking-wide`}
                style={{
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.1)'
                }}
              >
                {title}
              </motion.h1>
            )}
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className={`${MontserratFont.className} text-pureWhite text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium leading-relaxed max-w-4xl mx-auto`}
                style={{
                  textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0 0 15px rgba(0,0,0,0.4)'
                }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
</div>
<div className={`${blankDivHeight}`}></div>
    </>
  )
}

export default BackgroundVideo
