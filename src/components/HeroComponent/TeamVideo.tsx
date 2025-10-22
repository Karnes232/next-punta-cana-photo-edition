"use client"
import React from "react"
import { motion } from "framer-motion"

const TeamVideo = ({ heroVideo }: { heroVideo: string }) => {
  const height = "h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh]"

  const cloudName = "dswevrfuh"
  const base = `https://res.cloudinary.com/${cloudName}/video/upload`

  return (
    <div className={`relative w-full ${height} overflow-hidden`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 2,
          delay: 0.5,
        }}
        className="relative w-full h-full"
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source
            src={`${base}/q_auto,f_auto,vc_auto,ac_none,w_1920/${heroVideo}.mp4`}
            type="video/mp4"
            media="(min-width: 1920px)"
          />
          <source
            src={`${base}/q_auto,f_auto,vc_auto,ac_none,w_1440/${heroVideo}.mp4`}
            type="video/mp4"
            media="(min-width: 1440px)"
          />
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
          Your device does not support video playback.
        </video>

        {/* Overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </motion.div>
    </div>
  )
}

export default TeamVideo
