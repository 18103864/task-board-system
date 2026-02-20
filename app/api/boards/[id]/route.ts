import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
     _: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    const boardId = Number(id)

  
    const board = await prisma.board.findUnique({
        where: { id: boardId },
        include: {
            tasks: { orderBy: { createdAt: "desc" } },
        },
    })

    if (!board) {
        return NextResponse.json({ error: "Board not found" }, { status: 404 })
    }

    return NextResponse.json(board)
}

export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const boardId = Number(id)

        const body = await req.json()
        const { name, description } = body

        if (!name || !name.trim()) {
            return NextResponse.json(
                { error: "Board name is required" },
                { status: 400 }
            )
        }

        const updatedBoard = await prisma.board.update({
            where: { id: boardId },
            data: {
                name,
                description,
            },
        })

        return NextResponse.json(updatedBoard)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to update board" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    _: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    const boardId = Number(id)
    await prisma.board.delete({
        where: { id: boardId },
    })

    return NextResponse.json({ success: true })
}