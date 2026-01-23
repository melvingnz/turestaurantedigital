'use client'

import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface OrderSuccessProps {
  onClose: () => void
}

export function OrderSuccess({ onClose }: OrderSuccessProps) {
  useEffect(() => {
    // Simple confetti effect using CSS animations
    const confetti = document.createElement('div')
    confetti.className = 'fixed inset-0 pointer-events-none z-50'
    confetti.innerHTML = Array.from({ length: 50 }, () => {
      const left = Math.random() * 100
      const delay = Math.random() * 2
      const duration = 2 + Math.random() * 2
      return `
        <div class="absolute w-2 h-2 bg-primary rounded-full" 
             style="left: ${left}%; top: -10px; animation: fall ${duration}s ${delay}s linear forwards;">
        </div>
      `
    }).join('')
    
    document.body.appendChild(confetti)

    // Add CSS animation if not already present
    if (!document.getElementById('confetti-styles')) {
      const style = document.createElement('style')
      style.id = 'confetti-styles'
      style.textContent = `
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }

    return () => {
      setTimeout(() => {
        document.body.removeChild(confetti)
      }, 5000)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <CheckCircle className="h-24 w-24 text-primary mx-auto animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ¡Pedido Realizado!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Gracias por tu pedido. Te contactaremos pronto para confirmar los detalles.
        </p>
        <Button
          onClick={onClose}
          className="bg-primary hover:bg-primary/90 h-12 px-8 text-lg"
        >
          Continuar Comprando
        </Button>
      </div>
    </div>
  )
}
