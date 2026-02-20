
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET() {
    const boards = await prisma.board.findMany({
        include:{
        tasks: true
        },
        orderBy: { createdAt: "desc" },
    })
    
    return NextResponse.json(boards)
}

export async function POST(req: Request) {
    const { name, description } = await req.json()

    if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }

    const board = await prisma.board.create({
        data: { name, description },
    })

    return NextResponse.json(board, { status: 201 })
}