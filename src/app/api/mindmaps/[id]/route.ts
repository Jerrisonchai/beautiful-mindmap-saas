import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/prisma/client'

interface JwtPayload {
  userId: string
  email: string
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    const mindmap = await prisma.mindmap.findUnique({
      where: { id: params.id }
    })

    if (!mindmap) {
      return NextResponse.json({ error: 'Mindmap not found' }, { status: 404 })
    }

    // Check ownership or public access
    if (mindmap.userId !== decoded.userId && !mindmap.isPublic) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(mindmap)
  } catch (error) {
    console.error('Get mindmap error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    const body = await req.json()
    const { title, nodes } = body

    const mindmap = await prisma.mindmap.findUnique({
      where: { id: params.id }
    })

    if (!mindmap || mindmap.userId !== decoded.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const updated = await prisma.mindmap.update({
      where: { id: params.id },
      data: { title, nodes }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Update mindmap error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    const mindmap = await prisma.mindmap.findUnique({
      where: { id: params.id }
    })

    if (!mindmap || mindmap.userId !== decoded.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.mindmap.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete mindmap error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
