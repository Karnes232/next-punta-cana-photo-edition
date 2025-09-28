import { SocialLinks } from "@/sanity/queries/GeneralLayout/GeneralLayout"
import React from "react"
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaFacebookMessenger,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
const SocialMedia = ({ socialLinks }: { socialLinks: SocialLinks }) => {
  console.log(socialLinks)
  return (
    <div className="flex flex-row space-x-5 md:space-x-7 py-4 text-slate-400">
      {socialLinks.socialLinks.facebook && (
        <a
          href={socialLinks.socialLinks.facebook}
          target="_blank"
          aria-label="Facebook"
          rel="noreferrer"
        >
          <FaFacebookF className="text-xl md:text-3xl hover:text-caribbeanTurquoise" />
        </a>
      )}
      {socialLinks.socialLinks.xURL && (
        <a
          href={socialLinks.socialLinks.xURL}
          target="_blank"
          aria-label="X"
          rel="noreferrer"
        >
          <FaXTwitter className="text-xl md:text-3xl hover:text-caribbeanTurquoise" />
        </a>
      )}
      {socialLinks.socialLinks.instagram && (
        <a
          href={socialLinks.socialLinks.instagram}
          target="_blank"
          aria-label="Instagram"
          rel="noreferrer"
        >
          <FaInstagram className="text-xl md:text-3xl hover:text-caribbeanTurquoise" />
        </a>
      )}
      {socialLinks.telephone && (
        <a
          href={`tel:${socialLinks.telephone}`}
          target="_blank"
          aria-label="Call us"
          rel="noreferrer"
        >
          <FaPhone className="text-xl md:text-3xl hover:text-caribbeanTurquoise" />
        </a>
      )}
      {socialLinks.telephone && (
        <a
          href={`https://wa.me/${socialLinks.telephone}`}
          target="_blank"
          aria-label="WhatsApp"
          rel="noreferrer"
        >
          <FaWhatsapp className="text-xl md:text-3xl hover:text-caribbeanTurquoise" />
        </a>
      )}
      {socialLinks.email && (
        <a
          href={`mailto:${socialLinks.email}`}
          target="_blank"
          aria-label="Email"
          rel="noreferrer"
        >
          <FaEnvelope className="text-xl md:text-3xl hover:text-caribbeanTurquoise" />
        </a>
      )}
      {socialLinks.socialLinks.MessengerURL && (
        <a
          href={`${socialLinks.socialLinks.MessengerURL}`}
          target="_blank"
          aria-label="Messenger"
          rel="noreferrer"
        >
          <FaFacebookMessenger className="text-xl md:text-3xl hover:text-caribbeanTurquoise" />
        </a>
      )}
    </div>
  )
}

export default SocialMedia
