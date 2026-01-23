import { NextRequest, NextResponse } from 'next/server'
import { updateProduct, deleteProduct } from '@/app/actions/products'
import type { ProductUpdate } from '@/types/database'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: ProductUpdate = await request.json()
    const product = await updateProduct(params.id, body)
    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteProduct(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to delete product' },
      { status: 500 }
    )
  }
}
