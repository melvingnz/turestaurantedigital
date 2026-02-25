import Link from 'next/link'
import { Navbar } from '@/components/marketing/navbar'
import { Footer } from '@/components/marketing/footer'
import { Button } from '@/components/ui/button'
import {
  Monitor,
  MessageCircle,
  LayoutGrid,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Shield,
  Headphones,
  DollarSign,
  Users,
} from 'lucide-react'

export const metadata = {
  title: 'Acerca de | Tu Restaurante Digital',
  description:
    'La evolución digital de tu cocina empieza aquí. Plataforma integral que pone el mando de tu restaurante en tus manos, optimizando cada orden y fortaleciendo la conexión con tus clientes.',
}

const roadmapPeek = [
  'Notificaciones WhatsApp avanzadas',
  'Pagos en línea integrados',
  'Exportación de reportes (CSV)',
  'Modificadores y variantes en productos',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Brand Purpose */}
      <section className="w-full bg-gradient-to-b from-white to-[#FFF7F2] py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-5 sm:mb-6 leading-tight tracking-tight">
              La evolución digital de tu cocina empieza aquí{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                👨‍🍳
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#1A1A1A]/80 leading-relaxed max-w-2xl mx-auto mb-8">
              Tu pasión merece el mejor respaldo técnico{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                💻
              </span>
              . Hemos diseñado una plataforma integral que pone el mando de tu restaurante en tus
              manos, optimizando cada orden y fortaleciendo la conexión con tus clientes{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                🤝
              </span>
              . Haz que tu marca brille con herramientas de élite{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                🌟
              </span>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold h-12 px-8 rounded-lg"
              >
                <a href="#roadmap">Descubre nuestro Roadmap</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#FFF7F2] h-12 px-8 rounded-lg"
              >
                <Link href="/#pricing">Ver planes</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#FFF7F2] h-12 px-8 rounded-lg"
              >
                <Link href="/contact">Contactar</Link>
              </Button>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E5E5] shadow-xl">
              <div className="w-12 h-12 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  📈
                </span>{' '}
                Maximiza tu Rentabilidad
              </h2>
              <p className="text-[#1A1A1A]/75 leading-relaxed text-sm sm:text-base">
                Precios claros, sin comisiones ocultas. Sabes exactamente qué entra y qué sale.
                Transparencia total en tu rentabilidad.
              </p>
            </div>
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E5E5] shadow-xl">
              <div className="w-12 h-12 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-4">
                <Monitor className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  ⚡
                </span>{' '}
                Eficiencia en Cocina (KDS)
              </h2>
              <p className="text-[#1A1A1A]/75 leading-relaxed text-sm sm:text-base">
                Pedidos en pantalla, prioridad clara. El KDS sincroniza cocina y sala, reduce errores
                y acelera los tiempos de entrega.
              </p>
            </div>
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E5E5] shadow-xl">
              <div className="w-12 h-12 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  💎
                </span>{' '}
                Tu Propia Comunidad
              </h2>
              <p className="text-[#1A1A1A]/75 leading-relaxed text-sm sm:text-base">
                Tus clientes, tus datos. Base de contactos, WhatsApp y fidelización bajo tu control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision – quote style */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <blockquote className="border-l-4 border-[#FF6B00] pl-6 sm:pl-8 py-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4 leading-tight">
              Misión y Visión: Empoderando tu cocina con tecnología
            </h2>
            <p className="text-[#1A1A1A]/80 leading-relaxed mb-4">
              <strong className="text-[#1A1A1A]">Misión:</strong> Democratizar la tecnología de
              punta y ponerla al alcance de cada restaurante pequeño y mediano. Accesible, fácil de
              usar y asequible, sin sacrificar robustez ni soporte.
            </p>
            <p className="text-[#1A1A1A]/80 leading-relaxed">
              <strong className="text-[#1A1A1A]">Visión:</strong> Transformar el paisaje
              gastronómico local, un restaurante digitalizado a la vez. Que los dueños de cocina
              sean dueños de su destino, no solo de sus fogones.
            </p>
          </blockquote>
        </div>
      </section>

      {/* Tu Canal Propio, Tu Marca */}
      <section className="w-full bg-gradient-to-b from-[#FFF7F2] to-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 text-center leading-tight">
            Tu canal propio, tu marca
          </h2>
          <p className="text-center text-[#1A1A1A]/75 max-w-2xl mx-auto mb-10 leading-relaxed">
            Las apps de terceros sirven para descubrirte. <strong className="text-[#1A1A1A]">Tu Restaurante Digital</strong> es
            donde tú dueñas la relación: te quedas con el <strong className="text-[#1A1A1A]">100% del ticket</strong>, construyes
            tu base de clientes y creces sin depender de intermediarios.
          </p>
          <div className="border-l-4 border-[#FF6B00] pl-6 sm:pl-8 py-2 bg-white/60 rounded-r-xl">
            <p className="text-[#1A1A1A]/85 italic leading-relaxed">
              Más que un ahorro en comisiones: un partner operativo que pone tu restaurante en el
              centro y a tus clientes leales a un clic de distancia.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <Button
              asChild
              className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold h-12 px-8 rounded-lg"
            >
              <Link href="/#pricing">Conocer planes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bento Grid – Workflow Excellence */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-10 sm:mb-12 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3 leading-tight">
              Excelencia en el flujo de trabajo
            </h2>
            <p className="text-[#1A1A1A]/70 max-w-2xl mx-auto">
              Herramientas que eliminan fricción y hacen que cocina y cliente estén alineados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {/* Card 1 – Large: KDS */}
            <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl border border-[#E5E5E5] bg-gradient-to-br from-white to-[#FFF7F2]/50 hover:border-[#FF6B00]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-4">
                <Monitor className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1A1A] mb-3">
                KDS: Cocina en sincronía
              </h3>
              <p className="text-[#1A1A1A]/75 leading-relaxed mb-6">
                Elimina el caos del papel: pedidos en pantalla, prioridad clara y tiempos de prep
                optimizados. La cocina trabaja en sintonía con el salón y delivery.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10 w-fit rounded-lg inline-flex items-center"
              >
                <Link href="/#features" className="inline-flex items-center gap-1.5">
                  Ver KDS <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Card 2 – WhatsApp */}
            <div className="p-6 sm:p-8 rounded-2xl border border-[#E5E5E5] bg-white hover:border-[#FF6B00]/30 transition-colors flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] mb-4">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-3">
                Pedidos por WhatsApp
              </h3>
              <p className="text-[#1A1A1A]/75 leading-relaxed flex-1">
                Del chat al sistema en un solo paso: el cliente ordena donde ya está, y tú recibes
                la orden confirmada sin reescribir ni perder detalles.
              </p>
            </div>

            {/* Card 3 – Dynamic Menu */}
            <div className="md:col-span-3 p-6 sm:p-8 rounded-2xl border border-[#E5E5E5] bg-white hover:border-[#FF6B00]/30 transition-colors md:flex md:items-center md:gap-8">
              <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] shrink-0 mb-4 md:mb-0">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1A1A] mb-2">
                  Menú dinámico
                </h3>
                <p className="text-[#1A1A1A]/75 leading-relaxed">
                  Actualiza precios y disponibilidad en tiempo real. Evita que el cliente escoja algo
                  agotado o con precio desactualizado; menos frustración y más confianza.
                </p>
              </div>
              <Button
                asChild
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold h-11 px-6 rounded-lg shrink-0 mt-4 md:mt-0"
              >
                <Link href="/#pricing">Probar gratis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Guarantee + Soporte local */}
      <section className="w-full bg-gradient-to-b from-[#FFF7F2] to-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8 text-center leading-tight">
            Garantía de servicio
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-[#FF6B00]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">Sin sorpresas</h3>
              </div>
              <p className="text-[#1A1A1A]/75 leading-relaxed mb-4">
                Sin comisiones ocultas, nunca. Precios claros para que más dinero se quede en tu
                restaurante.
              </p>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#FF6B00] shrink-0 mt-0.5" />
                <p className="text-[#1A1A1A]/80 text-sm font-medium">
                  Tus datos de clientes son tuyos, siempre.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E5E5] shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center">
                  <Headphones className="h-5 w-5 text-[#FF6B00]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A]">Soporte que habla tu idioma</h3>
              </div>
              <p className="text-[#1A1A1A]/75 leading-relaxed">
                Conocemos el mercado dominicano y el día a día de tu cocina. Asistencia local y
                priorizada para que operes con confianza.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Button
              asChild
              className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold h-12 px-8 rounded-lg"
            >
              <Link href="/contact">Hablar con el equipo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Culture – quote */}
      <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 leading-tight">
            Trabajamos al ritmo de tu cocina
          </h2>
          <blockquote className="border-l-4 border-[#FF6B00] pl-6 sm:pl-8 py-2">
            <p className="text-[#1A1A1A]/80 leading-relaxed">
              Entendemos el ritmo rápido y exigente de una cocina. Ofrecemos soluciones sólidas,
              confiables y un soporte local que conoce el contexto dominicano. Estamos contigo para
              que tu operación siga sin frenos.
            </p>
          </blockquote>
        </div>
      </section>

      {/* Roadmap Sneak Peek */}
      <section id="roadmap" className="w-full bg-gradient-to-b from-[#FFF7F2] to-white py-12 sm:py-16 md:py-20 lg:py-24 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-6 w-6 text-[#FF6B00]" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight">
              Roadmap en breve
            </h2>
          </div>
          <p className="text-[#1A1A1A]/70 mb-6">
            Evolución continua y compromiso a largo plazo. Algunas de las próximas mejoras:
          </p>
          <ul className="space-y-2 mb-8">
            {roadmapPeek.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-[#1A1A1A]/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-[#1A1A1A]/60 mb-6">
            Tu feedback nos guía. Si tienes ideas, escríbenos desde la página de contacto.
          </p>
          <Button
            asChild
            className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-semibold h-11 px-6 rounded-lg"
          >
            <Link href="/contact">Enviar sugerencias</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
