import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Field, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Select, SelectLabel, SelectGroup, SelectContent, SelectTrigger, SelectValue, SelectItem } from './ui/select'

const CreateTaskForm = ({
    boardId,
    onTaskCreated
}: {
    boardId: number
    onTaskCreated?: (task: any) => void
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
    const [assignedTo, setAssignedTo] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return alert('Task title is required')

        setLoading(true)
        try {
            const res = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    boardId,
                    priority,
                    assignedTo,
                    dueDate: dueDate || undefined,
                    status: 'todo',
                }),
            })

            if (!res.ok) {
                const data = await res.json()
                alert(data.error || 'Failed to create task')
                return
            }

            const newTask = await res.json()
            onTaskCreated?.(newTask)
            setIsOpen(false)

            setTitle('')
            setDescription('')
            setPriority('medium')
            setAssignedTo('')
            setDueDate('')
        } catch (error) {
            console.error(error)
            alert('Something went wrong')
        } finally {
            setLoading(false)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    New Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor={'title'}>Task Title</FieldLabel>
                            <Input 
                                id='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={'description'}>Description</FieldLabel>
                            <Textarea 
                                id='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={'task-priority'}>Priority</FieldLabel>
                            <Select value={priority} onValueChange={(v) => setPriority(v as 'low' | 'medium' | 'high')}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Priority</SelectLabel>
                                        <SelectItem value='low'>Low</SelectItem>
                                        <SelectItem value='medium'>Medium</SelectItem>
                                        <SelectItem value='high'>High</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={'assignee'}>Task Assignee</FieldLabel>
                            <Input 
                                id='assignee'
                                value={assignedTo}
                                onChange={(e) => setAssignedTo(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={'due'}>Due Date</FieldLabel>
                            <Input 
                                id='due'
                                type='date'
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </Field>
                        <Field orientation='horizontal' className='w-full'>
                            <Button
                                type='submit'
                                className='grow'
                                disabled={loading}
                            >
                                {loading ? 'Creating...' : 'Create'}
                            </Button>
                            <Button variant={'outline'} onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateTaskForm