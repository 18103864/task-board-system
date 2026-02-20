'use client'

import CreateTaskForm from '@/components/create-task-form'
import DeleteBoard from '@/components/delete-board'
import DeleteTask from '@/components/delete-task'

import EditBoard from '@/components/edit-board'
import EditTaskForm from '@/components/edit-task-form'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Board } from '@/lib/types'

import { cn, DATE_FORMATTER } from '@/lib/utils'
import { ArrowLeft, Filter, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const BoardPageClient = ({
    board
} : {
    board: Board
}) => {
    const router = useRouter()
    const [boardData, setBoardData] = useState<Board>(board)
    const [filter, setFilter] = useState<'all' | 'todo' | 'in_progress' | 'done'>('all')

    return (
        <div className='container mx-auto h-screen-with-header flex flex-col'>
            <div className="flex items-center justify-between p-4">
                <div className='flex gap-1 items-center'>
                    <Button variant={'ghost'} onClick={() => router.push('/')}>
                        <ArrowLeft />
                    </Button>
                    <div>
                        <div className='flex items-baseline gap-1'>
                            <h1 className="text-2xl font-bold">
                                {boardData.name}
                            </h1>
                            <EditBoard 
                                boardName={boardData.name} 
                                boardDescription={boardData.description} 
                                boardId={boardData.id}
                                onEdit={(updated) => setBoardData(prev => ({
                                    ...prev,
                                    name: updated.name,
                                    description: updated.description || null
                                }))}
                            />
                            <DeleteBoard boardId={boardData.id}/>
                        </div>
                        
                        {/* TODO: make real time */}
                        <p className="text-muted-foreground text-sm">
                            {boardData.tasks?.length} tasks
                        </p>
                    </div>
                </div>
                
                <CreateTaskForm 
                    boardId={boardData.id}
                    onTaskCreated={(newTask) => {
                        setBoardData(prev => ({
                            ...prev,
                            tasks: [newTask, ...(prev.tasks || [])]
                        }))
                    }}
                />
            </div>
            <div className='p-4 px-6'>
                <Select value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
                    <SelectTrigger>
                        <Filter/>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>
                                Filters
                            </SelectLabel>
                            <SelectItem value='all'>
                                All Tasks
                            </SelectItem>
                            <SelectItem value='todo'>
                                To Do
                            </SelectItem>
                            <SelectItem value='in_progress'>
                                In Progress
                            </SelectItem>
                            <SelectItem value='done'>
                                Done
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className='gap-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] p-4 px-6'>
                {boardData.tasks
                    ?.filter(task => filter === 'all' ? true : task.status === filter)
                    .map((task) => (
                    <Card className='cursor-default' key={task.id}>
                        <CardHeader>
                            <div className='flex justify-between items-center'>
                                <CardTitle>
                                    <div className='flex gap-2 items-baseline'>
                                        <p>{task.title}</p>
                                        <Badge
                                            className={cn(
                                                'rounded-md text-foreground p-1 h-4 text-[10px]',
                                                `${task.status === 'todo' ? 'bg-blue-200 text-blue-500' : `${task.status === 'in_progress' ? 'bg-orange-200 text-orange-500' : 'bg-green-200 text-green-500'}`}`
                                            )}
                                        >
                                            {task.status === 'todo' ? 'To Do' : task.status === 'in_progress' ? 'In Progress' : 'Done'}
                                        </Badge>
                                    </div>
                                </CardTitle>
                                <div className='flex items-center gap-1'>
                                    <EditTaskForm 
                                        task={task}
                                        onEdit={(updatedTask) => {
                                            setBoardData(prev => ({
                                                ...prev,
                                                tasks: prev.tasks?.map(t => t.id === updatedTask.id ? updatedTask : t)
                                            }))
                                        }}
                                    />
                                    <DeleteTask 
                                        taskId={task.id}
                                        onDelete={() => {
                                            setBoardData(prev => ({
                                                ...prev,
                                                tasks: prev.tasks?.filter(t => t.id !== task.id)
                                            }))
                                        }}
                                    />
                                </div>
                                
                            </div>  
                            <CardDescription>
                                <div className='flex flex-col space-y-1'>
                                    
                                    <span className='flex items-center gap-1'>
                                        <User />
                                        <p>{task.assignedTo}</p>
                                    </span>
                                    <p>{task.description}</p>
                                    <p
                                        className={cn(
                                            `${task.priority === 'high' ? ' text-red-500' : `${task.priority === 'medium' ? ' text-yellow-500' : ' text-cyan-500'}`}`
                                        )}
                                    >
                                        {task.priority}
                                    </p>
                                </div>
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className='flex flex-col items-start'>
                            <p className='text-xs font-light text-muted-foreground'>Due: {task.dueDate ? DATE_FORMATTER.format(new Date(task.dueDate)) : 'N/A'}</p>
                            <p className='text-xs font-light text-muted-foreground'>Updated: {DATE_FORMATTER.format(new Date(task.updatedAt))}</p>
                            <p className='text-xs font-light text-muted-foreground'>Created: {DATE_FORMATTER.format(new Date(task.createdAt))}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default BoardPageClient