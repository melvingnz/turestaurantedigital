import { LayoutDashboard } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Bienvenido a tu panel de administración
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Productos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pedidos Hoy</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Hoy</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">RD$ 0</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
