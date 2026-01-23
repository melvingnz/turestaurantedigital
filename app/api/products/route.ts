import { NextRequest, NextResponse } from 'next/server'
import { createProduct, getProducts } from '@/app/actions/products'
import type { ProductInsert } from '@/types/database'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const tenantId = searchParams.get('tenant_id')
    
    if (!tenantId) {
      return NextResponse.json(
        { message: 'tenant_id is required' },
        { status: 400 }
      )
    }

    const products = await getProducts(tenantId)
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ProductInsert = await request.json()
    const product = await createProduct(body)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to create product' },
      { status: 500 }
    )
  }
}
