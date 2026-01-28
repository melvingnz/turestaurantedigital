import { Navbar } from '@/components/marketing/navbar'
import { Footer } from '@/components/marketing/footer'
import { ContactForm } from '@/components/marketing/contact-form'
import { MessageCircle, Phone, MapPin, Heart } from 'lucide-react'

export const metadata = {
  title: 'Contacto | Tu Restaurante Digital',
  description:
    'Estamos aquí para potenciar tu cocina. Soporte local en República Dominicana por WhatsApp y teléfono.',
}

const PHONE_DISPLAY = '849-440-7500'
const WHATSAPP_NUMBER = '18098494407500'
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-gradient-to-b from-white to-[#FFF7F2] py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-4 sm:mb-5 leading-tight">
            Estamos aquí para potenciar tu cocina
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#1A1A1A]/75 leading-relaxed max-w-2xl mx-auto">
            ¿Preguntas, ideas o necesitas ayuda con tu restaurante? Escríbenos o contáctanos por
            WhatsApp o teléfono. Te respondemos pronto.
          </p>
        </div>
      </section>

      {/* Form + Direct Support */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form – centered, prominent */}
            <div className="lg:col-span-3">
              <div className="p-6 sm:p-8 md:p-10 rounded-2xl border border-[#E5E5E5] bg-white shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-2">
                  Envíanos un mensaje
                </h2>
                <p className="text-[#1A1A1A]/70 text-sm sm:text-base mb-6">
                  Completa el formulario y te contestamos a la brevedad.
                </p>
                <ContactForm />
              </div>
            </div>

            {/* Direct Support */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1A1A]">
                Soporte directo
              </h2>
              <p className="text-[#1A1A1A]/75 text-sm sm:text-base leading-relaxed">
                Ofrecemos asistencia local en República Dominicana. Escríbenos por WhatsApp o
                llámanos y te atendemos con prioridad.
              </p>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 sm:p-5 rounded-xl border-2 border-[#E5E5E5] hover:border-[#FF6B00]/40 bg-[#FFF7F2]/50 hover:bg-[#FFF7F2] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366]/15 shrink-0">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#1A1A1A]">WhatsApp</p>
                  <p className="text-sm text-[#1A1A1A]/70">{PHONE_DISPLAY}</p>
                </div>
              </a>

              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="flex items-center gap-4 p-4 sm:p-5 rounded-xl border-2 border-[#E5E5E5] hover:border-[#FF6B00]/40 bg-[#FFF7F2]/50 hover:bg-[#FFF7F2] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] group-hover:bg-[#FF6B00]/15 shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-[#1A1A1A]">Teléfono</p>
                  <p className="text-sm text-[#1A1A1A]/70">{PHONE_DISPLAY}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-[#E5E5E5] bg-[#F5F5F5]/50">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A1A]">República Dominicana</p>
                  <p className="text-sm text-[#1A1A1A]/70">
                    Soporte local. Hecho con ❤️ en RD.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer badge */}
      <div className="w-full bg-[#FFF7F2] py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <span className="inline-flex items-center gap-2 text-sm text-[#1A1A1A]/70">
            <Heart className="h-4 w-4 text-[#FF6B00]" aria-hidden />
            Hecho con ❤️ en República Dominicana
          </span>
        </div>
      </div>

      <Footer />
    </div>
  )
}
