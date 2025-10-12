'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Send, User, Mail, Phone, Calendar, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  telephone: string
  date: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  telephone?: string
  date?: string
  message?: string
}

const PhotoshootPackageForm = ({ page, locale }: { page: string, locale: "en" | "es" }) => {
  const t = useTranslations('BookingForm')
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    telephone: '',
    date: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('requiredField')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('requiredField')
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('invalidEmail')
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = t('requiredField')
    }

    if (!formData.date) {
      newErrors.date = t('requiredField')
    }

    if (!formData.message.trim()) {
      newErrors.message = t('requiredField')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Create form body for Netlify
      const myForm = e.currentTarget
      const formData = new FormData(myForm)
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      })
      
      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
      
      if (response.ok) {
        setSubmitStatus('success')
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          telephone: '',
          date: '',
          message: '',
        })
      } else {
        throw new Error(`Form submission failed with status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="bg-gradient-to-br from-pureWhite to-elegantSilver/30 rounded-2xl shadow-xl p-8 md:p-12 border border-elegantSilver/50">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-darkGray mb-3 font-crimsonPro">
            {t('title')}
          </h2>
          <p className="text-darkGray/70 text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800">{t('successMessage')}</p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{t('errorMessage')}</p>
          </div>
        )}

        {/* Form */}
        <form 
          name="photoshoot-booking"
          method="POST"
          action="/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          {/* Hidden fields for Netlify */}
          <input type="hidden" name="form-name" value="photoshoot-booking" />
          <input type="hidden" name="package" value={page} />
          <input type="hidden" name="locale" value={locale} />
          
          {/* Honeypot field for spam protection */}
          <p style={{ display: 'none' }}>
            <label>
              Don't fill this out if you're human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          {/* Name Field */}
          <div>
            <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2">
              <User className="w-4 h-4 text-darkGray" />
              {t('name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('namePlaceholder')}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise'
              } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email and Telephone Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2">
                <Mail className="w-4 h-4 text-darkGray" />
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('emailPlaceholder')}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise'
                } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Telephone Field */}
            <div>
              <label htmlFor="telephone" className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2">
                <Phone className="w-4 h-4 text-darkGray" />
                {t('telephone')}
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder={t('telephonePlaceholder')}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.telephone 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise'
                } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors`}
              />
              {errors.telephone && (
                <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
              )}
            </div>
          </div>

          {/* Date Field */}
          <div>
            <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2">
              <Calendar className="w-4 h-4 text-darkGray" />
              {t('date')}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.date 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise'
              } bg-pureWhite text-darkGray focus:outline-none focus:ring-2 transition-colors`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="flex items-center gap-2 text-sm font-semibold text-darkGray mb-2">
              <MessageSquare className="w-4 h-4 text-darkGray" />
              {t('message')}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('messagePlaceholder')}
              rows={5}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.message 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                  : 'border-elegantSilver focus:border-caribbeanTurquoise focus:ring-caribbeanTurquoise'
              } bg-pureWhite text-darkGray placeholder-darkGray/40 focus:outline-none focus:ring-2 transition-colors resize-none`}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-caribbeanTurquoise to-caribbeanTurquoise/80 hover:from-caribbeanTurquoise/90 hover:to-caribbeanTurquoise/70 disabled:from-elegantSilver disabled:to-elegantSilver/80 text-darkGray font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-darkGray border-t-transparent rounded-full animate-spin" />
                {t('sending')}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {t('submit')}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PhotoshootPackageForm