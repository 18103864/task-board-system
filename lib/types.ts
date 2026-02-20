export type Board = {
    id: number
    name: string
    description: string | null
    createdAt: Date
    tasks: Task[]
}

export type Task = {
    id: number
    title: string
    description: string | null
    priority: 'low' | 'medium' | 'high'
    status: 'todo' | 'in_progress' | 'done'
    dueDate: Date | null
    assignedTo: string | null
    createdAt: Date
    updatedAt: Date
}