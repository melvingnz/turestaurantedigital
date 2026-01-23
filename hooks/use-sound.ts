'use client'

import { useCallback, useRef } from 'react'

/**
 * Hook to play notification sounds
 */
export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playSound = useCallback((soundUrl?: string) => {
    try {
      // Create a simple beep using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 800 // Frequency in Hz
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    } catch (error) {
      console.log('Error playing sound:', error)
      // Fallback: Try to play a simple beep using Audio element
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp3pVICw1JpN7y7F5JwU0hNryy3QpBSuBzvLZiTYIGWi77+efTRAMUKfj8LZjHAY4kdfyzHksBSR3x/DdkEAKFF606d6VSAsNSaTe8uxeScFNITa8st0KQUrgc7y2Yk2CBlou+/nn00QDFCn4/C2YxwGOJHX8sx5LAUkd8fw3ZBAC')
        audio.volume = 0.3
        audio.play().catch(() => {})
      } catch (fallbackError) {
        // Silently fail if sound cannot be played
      }
    }
  }, [])

  return { playSound }
}
