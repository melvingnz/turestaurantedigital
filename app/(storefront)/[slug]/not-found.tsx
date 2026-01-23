import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UtensilsCrossed } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <UtensilsCrossed className="h-24 w-24 text-gray-300 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Restaurante No Encontrado
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Lo sentimos, no pudimos encontrar este restaurante. Verifica la URL e intenta de nuevo.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/">Volver al Inicio</Link>
        </Button>
      </div>
    </div>
  )
}
