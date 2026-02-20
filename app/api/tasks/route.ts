import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { title, boardId, description, assignedTo, priority, dueDate } = await req.json()

    if (!title || !boardId) {
        return NextResponse.json(
            { error: "title and boardId are required" },
            { status: 400 }
        )
    }

  const task = await prisma.task.create({
        data: {
        title,
        description,
        assignedTo,
        boardId: Number(boardId),
        status: 'todo',
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        },
  })

  return NextResponse.json(task, { status: 201 })
}