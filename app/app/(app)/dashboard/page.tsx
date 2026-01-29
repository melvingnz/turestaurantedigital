import Link from 'next/link'
import { getDashboardMetrics } from '@/app/actions/analytics'
import { getAuthTenant } from '@/lib/auth'
import { Package, ShoppingCart, DollarSign, TrendingUp, BarChart3, UtensilsCrossed, Settings, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Tenant } from '@/types/database'

export const metadata = {
  title: 'Dashboard | Tu Restaurante Digital',
}

export default async function DashboardPage() {
  const tenant = await getAuthTenant()
  const metrics = await getDashboardMetrics()

  if (!tenant || typeof tenant !== 'object' || !('name' in tenant)) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No se pudo cargar la información del restaurante</p>
      </div>
    )
  }

  const validTenant = tenant as unknown as Tenant
  const isEmpty = (metrics?.totalProducts ?? 0) === 0 && (metrics?.ordersToday ?? 0) === 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Bienvenido a {validTenant.name} - Panel de Administración
        </p>
      </div>

      {/* Empty state: primeros pasos */}
      {isEmpty && (
        <Card className="p-6 bg-[#FF6B00]/5 border-[#FF6B00]/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Completa la configuración de tu restaurante</h2>
              <p className="text-gray-600 mt-1 text-sm">
                Añade productos a tu menú y comparte el enlace con tus clientes para empezar a recibir pedidos.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button asChild className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white">
                <Link href="/app/menu" className="inline-flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4" />
                  Añadir productos al menú
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/app/settings" className="inline-flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Configuración
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Metrics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Productos */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Productos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {metrics?.totalProducts || 0}
              </p>
            </div>
            <div className="h-12 w-12 bg-[#FF5F1F]/10 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-[#FF5F1F]" />
            </div>
          </div>
        </Card>

        {/* Pedidos Hoy */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pedidos Hoy</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {metrics?.ordersToday || 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {metrics?.ordersThisWeek || 0} esta semana
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Ingresos Hoy */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Hoy</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                RD$ {(metrics?.revenueToday ?? 0).toLocaleString('es-DO')}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                RD$ {(metrics?.revenueThisMonth ?? 0).toLocaleString('es-DO')} este mes
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Valor Promedio */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ticket Promedio</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                RD$ {(metrics?.averageOrderValue ?? 0).toFixed(0)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {metrics?.ordersThisMonth || 0} pedidos este mes
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Top Products */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sales Chart (Simple Bar Chart) */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ventas (Últimos 7 días)</h2>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          {metrics?.salesByDay && metrics.salesByDay.length > 0 ? (
            <div className="space-y-3">
              {metrics.salesByDay.map((day, index) => {
                const maxRevenue = Math.max(
                  ...metrics.salesByDay.map((d) => d.revenue),
                  1
                )
                const percentage = (day.revenue / maxRevenue) * 100
                const date = new Date(day.date)
                const dayName = date.toLocaleDateString('es-DO', { weekday: 'short' })
                const dayNumber = date.getDate()

                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        {dayName} {dayNumber}
                      </span>
                      <span className="font-medium text-gray-900">
                        RD$ {day.revenue.toLocaleString('es-DO')}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#FF5F1F] h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 space-y-2">
              <p>No hay datos de ventas aún</p>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link href="/app/menu" className="inline-flex items-center gap-1">
                  Añadir productos <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          )}
        </Card>

        {/* Top Products */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Productos Más Vendidos</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          {metrics?.topProducts && metrics.topProducts.length > 0 ? (
            <div className="space-y-3">
              {metrics.topProducts.map((product, index) => (
                <div
                  key={product.product_id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-[#FF5F1F] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.product_name}</p>
                      <p className="text-xs text-gray-500">
                        {product.total_quantity} unidades vendidas
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      RD$ {product.total_revenue.toLocaleString('es-DO')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 space-y-2">
              <p>No hay productos vendidos aún</p>
              <p className="text-sm">Añade productos y comparte tu menú para recibir pedidos.</p>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link href="/app/menu" className="inline-flex items-center gap-1">
                  Ir al menú <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <p className="text-sm font-medium text-gray-600">Pedidos Esta Semana</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {metrics?.ordersThisWeek || 0}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-gray-600">Ingresos Esta Semana</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            RD$ {(metrics?.revenueThisWeek ?? 0).toLocaleString('es-DO')}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm font-medium text-gray-600">Pedidos Este Mes</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {metrics?.ordersThisMonth || 0}
          </p>
        </Card>
      </div>
    </div>
  )
}
