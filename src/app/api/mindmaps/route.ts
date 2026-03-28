import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/prisma/client'

interface JwtPayload {
  userId: string
  email: string
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    const mindmaps = await prisma.mindmap.findMany({
      where: { userId: decoded.userId },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(mindmaps)
  } catch (error) {
    console.error('Get mindmaps error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    const body = await req.json()
    const { title, nodes } = body

    const mindmap = await prisma.mindmap.create({
      data: {
        title,
        nodes,
        userId: decoded.userId
      }
    })

    return NextResponse.json(mindmap)
  } catch (error) {
    console.error('Create mindmap error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
