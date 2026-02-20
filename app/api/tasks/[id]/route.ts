
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    const taskId = Number(id)

    const updates = await req.json()

    const data: any = {
        title: updates.title,
        description: updates.description,
        status: updates.status,
        priority: updates.priority,
        assignedTo: updates.assignedTo,
  }

    if (updates.dueDate) {
        data.dueDate = new Date(updates.dueDate)
    }

    const task = await prisma.task.update({
        where: { id: taskId },
        data,
    })

    return NextResponse.json(task)
}

export async function DELETE(
    _: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    const taskId = Number(id)
    await prisma.task.delete({
        where: { id: taskId },
    })

    return NextResponse.json({ success: true })
}