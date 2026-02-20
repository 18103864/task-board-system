'use client'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Separator } from './ui/separator'
import { DATE_FORMATTER } from '@/lib/utils'
import { Spinner } from './ui/spinner'
import { Board } from '@/lib/types'



const BoardList = () => {
    const [boards, setBoards] = useState<Board[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetch('/api/boards')
            .then((res) => res.json())
            .then((data) => setBoards(data))
            .catch(console.error)
            .finally(()=> setLoading(false))
    }, [])

    const allTasks = boards.reduce((sum, board) => sum + (board.tasks?.length || 0), 0)
    const tasksDone = boards.reduce(
        (sum, board) => sum + (board.tasks?.filter((t) => t.status === 'done').length || 0),
        0
    )
    const tasksToDo = boards.reduce(
        (sum, board) => sum + (board.tasks?.filter((t) => t.status === 'todo').length || 0),
        0
    )
    const tasksInProgress = boards.reduce(
        (sum, board) => sum + (board.tasks?.filter((t) => t.status === 'in_progress').length || 0),
        0
    )
    return (
        <div className='space-y-4 flex flex-col h-full'>
            <div className='flex items-center justify-between gap-2'>
                <h2 className='text-2xl'>
                    Boards
                </h2>
                <div className='flex items-center gap-x-6'>
                    <div className='flex flex-col gap-y-1'>
                        <span className='text-sm text-muted-foreground'>
                            All Boards
                        </span>
                        <span className='text-2xl'>
                            {loading ? (
                                <Spinner className='size-6'/>
                            ) : (
                                <>
                                    {boards.length}
                                </>
                            )}
                        </span>
                    </div>
                    <Separator 
                        orientation="vertical"
                        className="data-[orientation=vertical]:h-5"
                    />
                    <div className='flex flex-col gap-y-1'>
                        <span className='text-sm text-muted-foreground'>
                            All Tasks
                        </span>
                        <span className='text-2xl'>
                        {loading ? (
                                <Spinner className='size-6'/>
                            ) : (
                                <>
                                    {allTasks}
                                </>
                            )}
                        </span>
                    </div>
                    <Separator 
                        orientation="vertical"
                        className="data-[orientation=vertical]:h-5"
                    />
                    <div className='flex flex-col gap-y-1'>
                        <span className='text-sm text-muted-foreground'>
                            Tasks To Do
                        </span>
                        <span className='text-2xl'>
                            {loading ? (
                                <Spinner className='size-6'/>
                            ) : (
                                <>
                                    {tasksToDo}
                                </>
                            )}
                        </span>
                    </div>
                    <Separator 
                        orientation="vertical"
                        className="data-[orientation=vertical]:h-5"
                    />
                    <div className='flex flex-col gap-y-1'>
                        <span className='text-sm text-muted-foreground'>
                            Tasks In Progress
                        </span>
                        <span className='text-2xl'>
                            {loading ? (
                                <Spinner className='size-6'/>
                            ) : (
                                <>
                                    {tasksInProgress}
                                </>
                            )}
                        </span>
                    </div>
                    <Separator 
                        orientation="vertical"
                        className="data-[orientation=vertical]:h-5"
                    />
                    <div className='flex flex-col gap-y-1'>
                        <span className='text-sm text-muted-foreground'>
                            Tasks Done
                        </span>
                        <span className='text-2xl'>
                            {loading ? (
                                <Spinner className='size-6'/>
                            ) : (
                                <>
                                    {tasksDone}
                                </>
                            )}
                        </span>
                    </div>
                    <Separator 
                        orientation="vertical"
                        className="data-[orientation=vertical]:h-5"
                    />
                    <Button asChild>
                        <Link href={'/boards/new'}>
                            Create Board
                        </Link>
                    </Button>
                </div>
            </div>
            {loading ? (
                <div className='w-full flex flex-col gap-2 items-center justify-center grow'>
                    <Spinner className='size-20'/>
                    <h2 className='text-2xl'>Loading Boards</h2>
                </div>
            ) : (
                <div className='gap-4 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'>
                    {boards.map((board) => (
                        <Link href={`/boards/${board.id}`} key={board.id}>
                            <Card className='cursor-pointer hover:border-foreground'>
                                <CardHeader>
                                    <CardTitle>
                                        {board.name}
                                    </CardTitle>
                                    <CardDescription>
                                        {board.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <p className='text-xs font-light text-muted-foreground'>{DATE_FORMATTER.format(new Date(board.createdAt))}</p>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BoardList