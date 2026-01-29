import { NextRequest, NextResponse } from 'next/server'
import { updateProduct, deleteProduct } from '@/app/actions/products'
import type { ProductUpdate } from '@/types/database'
import { logger } from '@/lib/logger'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body: ProductUpdate = await request.json()
    const product = await updateProduct(id, body)
    return NextResponse.json(product)
  } catch (error) {
    logger.error('[API Products] Error updating product', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await deleteProduct(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('[API Products] Error deleting product', error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to delete product' },
      { status: 500 }
    )
  }
}
