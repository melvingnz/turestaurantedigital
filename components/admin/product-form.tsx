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
import type { Product, ProductInsert, ProductUpdate } from '@/types/database'

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
]

export function ProductForm({
  open,
  onOpenChange,
  product,
  tenantId,
  onSuccess,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false)
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
  }, [product, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productData: ProductInsert | ProductUpdate = {
        tenant_id: tenantId,
        name: formData.name,
        description: formData.description || null,
        price: parseFloat(formData.price),
        category: formData.category,
        image_url: formData.image_url || null,
        is_available: formData.is_available,
      }

      const url = product
        ? `/api/products/${product.id}`
        : '/api/products'
      
      const method = product ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save product')
      }

      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error('Error saving product:', error)
      alert(error instanceof Error ? error.message : 'Failed to save product')
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
                ? 'Modifica la información del producto'
                : 'Completa los datos para agregar un nuevo producto al menú'}
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ej: Pollo a la Plancha"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe el producto..."
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Precio (RD$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="0.00"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Categoría</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image_url">URL de Imagen</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_available"
                checked={formData.is_available}
                onChange={(e) =>
                  setFormData({ ...formData, is_available: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="is_available" className="cursor-pointer">
                Producto disponible
              </Label>
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
