'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Switch } from '@/components/ui/switch'
import { ImageUpload } from '@/components/ui/image-upload'
import { uploadProductImage, deleteOldProductImage } from '@/app/actions/storage'
import type { Product, ProductInsert, ProductUpdate } from '@/types/database'
import { Loader2 } from 'lucide-react'

interface ProductFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: Product | null
  tenantId: string
  onSuccess?: () => void
}

const categories = [
  'General',
  'Entradas',
  'Platos Principales',
  'Postres',
  'Bebidas',
  'Especiales',
  'Hamburguesas',
  'Pizzas',
  'Tacos',
  'Ensaladas',
  'Sopas',
]

export function ProductForm({
  open,
  onOpenChange,
  product,
  tenantId,
  onSuccess,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'General',
    image_url: '',
    is_available: true,
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        category: product.category,
        image_url: product.image_url || '',
        is_available: product.is_available,
      })
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'General',
        image_url: '',
        is_available: true,
      })
    }
    setError(null)
  }, [product, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validaciones
    if (!formData.name.trim()) {
      setError('El nombre del producto es requerido')
      setLoading(false)
      return
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('El precio debe ser mayor a 0')
      setLoading(false)
      return
    }

    try {
      const productData: ProductInsert | ProductUpdate = {
        tenant_id: tenantId,
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: formData.image_url.trim() || null,
        is_available: formData.is_available,
      }

      const url = product ? `/api/products/${product.id}` : '/api/products'
      const method = product ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Error al guardar el producto')
      }

      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Error saving product:', error)
      setError(error instanceof Error ? error.message : 'Error al guardar el producto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>
              {product ? 'Editar Producto' : 'Nuevo Producto'}
            </SheetTitle>
            <SheetDescription>
              {product
                ? 'Modifica la información del producto. Los cambios se reflejarán inmediatamente en tu storefront.'
                : 'Completa los datos para agregar un nuevo producto al menú'}
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Nombre */}
            <div className="grid gap-2">
              <Label htmlFor="name">
                Nombre del Producto <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ej: Doble Queso Burger"
                required
                disabled={loading}
              />
            </div>

            {/* Descripción */}
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe el producto... (ej: Carne jugosa, doble queso cheddar, lechuga fresca)"
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={4}
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                Una buena descripción ayuda a los clientes a entender mejor tu producto
              </p>
            </div>

            {/* Precio */}
            <div className="grid gap-2">
              <Label htmlFor="price">
                Precio (RD$) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="450.00"
                required
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                Puedes cambiar el precio en cualquier momento. Los pedidos existentes mantendrán el precio original.
              </p>
            </div>

            {/* Categoría */}
            <div className="grid gap-2">
              <Label htmlFor="category">Categoría</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Imagen del Producto */}
            <ImageUpload
              currentUrl={formData.image_url}
              onUpload={async (file) => {
                // Delete old image if exists
                if (formData.image_url) {
                  await deleteOldProductImage(formData.image_url)
                }
                const result = await uploadProductImage(file)
                if (result.url) {
                  setFormData({ ...formData, image_url: result.url })
                }
                return result
              }}
              onUrlChange={(url) => {
                setFormData({ ...formData, image_url: url })
              }}
              onRemove={async () => {
                if (formData.image_url) {
                  await deleteOldProductImage(formData.image_url)
                }
                setFormData({ ...formData, image_url: '' })
              }}
              bucket="product-images"
              disabled={loading}
            />

            {/* Disponibilidad */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="space-y-1">
                <Label htmlFor="is_available" className="cursor-pointer font-medium">
                  Producto Disponible
                </Label>
                <p className="text-xs text-gray-500">
                  {formData.is_available
                    ? 'Este producto será visible en tu storefront'
                    : 'Este producto estará oculto en tu storefront (no se elimina)'}
                </p>
              </div>
              <Switch
                id="is_available"
                checked={formData.is_available}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, is_available: checked })
                }
                disabled={loading}
              />
            </div>
          </div>

          <SheetFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-[#FF5F1F] hover:bg-[#FF5F1F]/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : product ? (
                'Actualizar Producto'
              ) : (
                'Crear Producto'
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
