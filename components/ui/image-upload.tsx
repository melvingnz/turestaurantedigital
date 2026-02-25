'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  currentUrl?: string | null
  onUpload: (file: File) => Promise<{ url: string | null; error: string | null }>
  onUrlChange?: (url: string) => void
  onRemove?: () => void
  bucket: 'restaurant-logos' | 'product-images'
  /** Si es false, no se muestra la opción "O ingresa una URL externa" (solo subida de archivo). */
  allowExternalUrl?: boolean
  disabled?: boolean
  className?: string
  /** Etiqueta del campo (ej. "Logo del Restaurante", "Banner"). Por defecto según bucket. */
  label?: string
  /** Texto de ayuda con formato y tamaño (ej. "500×500 px. PNG, JPG o WEBP. Máximo 5 MB."). */
  hintText?: string
}

export function ImageUpload({
  currentUrl,
  onUpload,
  onUrlChange,
  onRemove,
  bucket,
  allowExternalUrl = true,
  disabled,
  className,
  label,
  hintText,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(currentUrl || null)
  const [externalUrl, setExternalUrl] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update preview when currentUrl changes
  useEffect(() => {
    if (currentUrl) {
      setPreview(currentUrl)
      // If it's not a data URL (local preview), set external URL
      if (!currentUrl.startsWith('data:')) {
        setExternalUrl(currentUrl)
      }
    } else {
      setPreview(null)
      setExternalUrl('')
    }
  }, [currentUrl])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const isProductImage = bucket === 'product-images'
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp']

    if (!allowedTypes.includes(file.type)) {
      setError('Solo se permiten PNG, JPG o WEBP')
      return
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setError('La imagen no puede ser mayor a 5 MB')
      return
    }

    if (isProductImage) {
      const REQUIRED = 800
      const TOLERANCE = 10
      const { width, height, ok } = await new Promise<{ width: number; height: number; ok: boolean }>((resolve) => {
        const img = new Image()
        const url = URL.createObjectURL(file)
        img.onload = () => {
          URL.revokeObjectURL(url)
          const w = img.naturalWidth
          const h = img.naturalHeight
          const inRange = (n: number) => n >= REQUIRED - TOLERANCE && n <= REQUIRED + TOLERANCE
          resolve({
            width: w,
            height: h,
            ok: inRange(w) && inRange(h),
          })
        }
        img.onerror = () => {
          URL.revokeObjectURL(url)
          resolve({ width: 0, height: 0, ok: false })
        }
        img.src = url
      })
      if (!ok) {
        setError(
          width && height
            ? `La imagen debe ser 800×800 px (recibida: ${width}×${height} px)`
            : 'La imagen debe ser 800×800 px. No se pudo leer el tamaño.'
        )
        return
      }
    }

    setError(null)
    setUploading(true)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    try {
      const result = await onUpload(file)
      if (result.error) {
        setError(result.error)
        setPreview(currentUrl || null)
      } else if (result.url) {
        setPreview(result.url)
      }
    } catch (err) {
      setError('Error al subir la imagen')
      setPreview(currentUrl || null)
    } finally {
      setUploading(false)
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onRemove?.()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={`image-upload-${bucket}`}>
        {label ?? (bucket === 'restaurant-logos' ? 'Logo del Restaurante' : 'Imagen del Producto')}
      </Label>

      <div className="flex items-start gap-4">
        {/* Preview */}
        {preview ? (
          <div className="relative">
            <div
              className={cn(
                'rounded-lg border border-gray-200 overflow-hidden',
                bucket === 'restaurant-logos' ? 'w-24 h-24' : 'w-32 h-32'
              )}
            >
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => setPreview(null)}
              />
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ) : (
          <div
            className={cn(
              'rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50',
              bucket === 'restaurant-logos' ? 'w-24 h-24' : 'w-32 h-32'
            )}
          >
            <ImageIcon className="h-8 w-8 text-gray-400" />
          </div>
        )}

        {/* Upload Button */}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            id={`image-upload-${bucket}`}
            accept={bucket === 'product-images' ? 'image/png,image/jpeg,image/webp' : 'image/*'}
            onChange={handleFileSelect}
            disabled={disabled || uploading}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                {preview ? 'Cambiar Imagen' : 'Subir Imagen'}
              </>
            )}
          </Button>
          <p className="text-xs text-gray-500 mt-1">
            {hintText ?? (bucket === 'product-images'
              ? '800×800 px. PNG, JPG o WEBP. Máximo 5 MB.'
              : 'PNG, JPG o WEBP. Máximo 5 MB')}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* URL Input (solo si está permitido) */}
      {allowExternalUrl && (
        <div className="pt-2 border-t border-gray-200">
          <Label htmlFor={`image-url-${bucket}`} className="text-sm text-gray-600">
            O ingresa una URL externa:
          </Label>
          <Input
            id={`image-url-${bucket}`}
            type="url"
            placeholder="https://ejemplo.com/imagen.jpg"
            className="mt-1"
            disabled={disabled}
            value={externalUrl}
            onChange={(e) => {
              const url = e.target.value.trim()
              setExternalUrl(url)
              if (url) {
                setPreview(url)
                onUrlChange?.(url)
              } else if (!preview?.startsWith('data:')) {
                setPreview(null)
                onUrlChange?.('')
              }
            }}
          />
        </div>
      )}
    </div>
  )
}
