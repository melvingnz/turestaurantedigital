'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
const FORM_STYLE =
  'border border-[#E5E5E5] bg-white text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus-visible:ring-2 focus-visible:ring-[#FF6B00] focus-visible:border-[#FF6B00] rounded-lg'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="text-[#1A1A1A] font-medium">
            Nombre
          </Label>
          <Input
            id="contact-name"
            type="text"
            required
            placeholder="Tu nombre"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={FORM_STYLE}
            disabled={status === 'sending'}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email" className="text-[#1A1A1A] font-medium">
            Email
          </Label>
          <Input
            id="contact-email"
            type="email"
            required
            placeholder="tu@email.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={FORM_STYLE}
            disabled={status === 'sending'}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-phone" className="text-[#1A1A1A] font-medium">
          Teléfono
        </Label>
        <Input
          id="contact-phone"
          type="tel"
          placeholder="+1 (809) 000-0000"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className={FORM_STYLE}
          disabled={status === 'sending'}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message" className="text-[#1A1A1A] font-medium">
          Mensaje
        </Label>
        <textarea
          id="contact-message"
          required
          rows={5}
          placeholder="¿En qué podemos ayudarte?"
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className={`w-full px-3 py-2 text-sm ${FORM_STYLE} resize-y min-h-[120px]`}
          disabled={status === 'sending'}
        />
      </div>
      {status === 'success' && (
        <p className="text-[#1A1A1A] text-sm font-medium text-center sm:text-left">
          Mensaje enviado. Te contactaremos pronto.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm font-medium text-center sm:text-left">
          No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por email.
        </p>
      )}
      <Button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold h-12 px-8 rounded-lg"
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar Mensaje'}
      </Button>
    </form>
  )
}
