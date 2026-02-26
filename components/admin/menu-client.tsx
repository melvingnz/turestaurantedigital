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
import { Plus, Edit, Trash2, Eye, EyeOff, Image as ImageIcon, UtensilsCrossed, Filter } from 'lucide-react'
import type { Product } from '@/types/database'

interface MenuClientProps {
  initialProducts: Product[]
  tenantId: string
}

type FilterType = 'all' | 'available' | 'unavailable'

export function MenuClient({ initialProducts, tenantId }: MenuClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<FilterType>('all')

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

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleDelete = async (product: Product) => {
    if (!confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)) return
    try {
      const response = await fetch(`/api/products/${product.id}`, { method: 'DELETE' })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Error al eliminar')
      }
      await refreshProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert(error instanceof Error ? error.message : 'Error al eliminar el producto')
    }
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

  // Filtrar productos según el filtro seleccionado
  const filteredProducts = products.filter((product) => {
    if (filter === 'available') return product.is_available
    if (filter === 'unavailable') return !product.is_available
    return true // 'all'
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Menú</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Administra los productos de tu menú. Oculta productos temporalmente sin eliminarlos.
          </p>
        </div>
        <Button onClick={handleNewProduct} className="w-full sm:w-auto shrink-0 bg-[#FF5F1F] hover:bg-[#FF5F1F]/90">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      {/* Filters: wrap en móvil para que no se corte "Ocultos (N)" */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 shrink-0 text-gray-500" />
        <span className="text-sm font-medium text-gray-700 shrink-0">Filtrar:</span>
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className={`shrink-0 ${filter === 'all' ? 'bg-[#FF5F1F] hover:bg-[#FF5F1F]/90' : ''}`}
        >
          Todos ({products.length})
        </Button>
        <Button
          variant={filter === 'available' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('available')}
          className={`shrink-0 ${filter === 'available' ? 'bg-[#FF5F1F] hover:bg-[#FF5F1F]/90' : ''}`}
        >
          Disponibles ({products.filter((p) => p.is_available).length})
        </Button>
        <Button
          variant={filter === 'unavailable' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unavailable')}
          className={`shrink-0 ${filter === 'unavailable' ? 'bg-[#FF5F1F] hover:bg-[#FF5F1F]/90' : ''}`}
        >
          Ocultos ({products.filter((p) => !p.is_available).length})
        </Button>
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <UtensilsCrossed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === 'all'
                ? 'No hay productos aún'
                : filter === 'available'
                ? 'No hay productos disponibles'
                : 'No hay productos ocultos'}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? 'Comienza agregando tu primer producto al menú'
                : filter === 'available'
                ? 'Todos tus productos están ocultos actualmente'
                : 'No tienes productos ocultos'}
            </p>
            {filter === 'all' && (
              <Button onClick={handleNewProduct} className="bg-[#FF5F1F] hover:bg-[#FF5F1F]/90">
                <Plus className="h-4 w-4 mr-2" />
                Crear Primer Producto
              </Button>
            )}
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
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  className={!product.is_available ? 'opacity-60 bg-gray-50' : ''}
                >
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
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {product.name}
                        {!product.is_available && (
                          <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded">
                            Oculto
                          </span>
                        )}
                      </div>
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
                    <div className="flex items-center justify-center gap-2">
                      <Switch
                        checked={product.is_available}
                        onCheckedChange={() => handleToggleAvailability(product)}
                      />
                      <span className="text-xs text-gray-500">
                        {product.is_available ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <Eye className="h-3 w-3" />
                            Visible
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-gray-500">
                            <EyeOff className="h-3 w-3" />
                            Oculto
                          </span>
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product)}
                        title="Editar producto"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product)}
                        title="Eliminar producto"
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

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <EyeOff className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">
              ¿Sabías que puedes ocultar productos temporalmente?
            </h4>
            <p className="text-sm text-blue-700">
              Usa el interruptor de &quot;Disponible&quot; para ocultar productos sin eliminarlos. Por
              ejemplo, si hoy jueves no vendes un producto, ocúltalo. Mañana viernes puedes
              volver a mostrarlo fácilmente. Los productos ocultos no aparecerán en tu storefront
              pero permanecerán en tu base de datos.
            </p>
          </div>
        </div>
      </div>

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
