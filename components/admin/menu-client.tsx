'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { ProductForm } from '@/components/admin/product-form'
import { Plus, Edit, Trash2, Image as ImageIcon, UtensilsCrossed } from 'lucide-react'
import type { Product } from '@/types/database'

interface MenuClientProps {
  initialProducts: Product[]
  tenantId: string
}

export function MenuClient({ initialProducts, tenantId }: MenuClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  const refreshProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/products?tenant_id=${tenantId}`)
      if (!response.ok) throw new Error('Failed to fetch products')
      const updatedProducts = await response.json()
      setProducts(updatedProducts)
    } catch (error) {
      console.error('Error refreshing products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAvailability = async (product: Product) => {
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_available: !product.is_available }),
      })

      if (!response.ok) throw new Error('Failed to update availability')
      
      await refreshProducts()
    } catch (error) {
      console.error('Error toggling availability:', error)
      alert('Error al actualizar la disponibilidad')
    }
  }

  const handleDelete = async (productId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      return
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete product')
      
      await refreshProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error al eliminar el producto')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleNewProduct = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  const handleFormSuccess = () => {
    refreshProducts()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-DO', {
      style: 'currency',
      currency: 'DOP',
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Menú</h1>
          <p className="text-gray-600 mt-1">
            Administra los productos de tu menú
          </p>
        </div>
        <Button onClick={handleNewProduct} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <UtensilsCrossed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay productos aún
            </h3>
            <p className="text-gray-600 mb-6">
              Comienza agregando tu primer producto al menú
            </p>
            <Button onClick={handleNewProduct} className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Crear Primer Producto
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-center">Disponible</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      {product.description && (
                        <div className="text-sm text-gray-500 line-clamp-1">
                          {product.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatPrice(product.price)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={product.is_available}
                      onCheckedChange={() => handleToggleAvailability(product)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Product Form */}
      <ProductForm
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open)
          if (!open) setEditingProduct(null)
        }}
        product={editingProduct}
        tenantId={tenantId}
        onSuccess={handleFormSuccess}
      />
    </div>
  )
}
