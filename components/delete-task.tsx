import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { Field } from './ui/field'

const DeleteTask = ({
    taskId,
    onDelete
}: {
    taskId: number,
    onDelete: () => void
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        setLoading(true)
    
        try {
            const res = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
            })
    
            if (!res.ok) {
                const data = await res.json()
                alert(data.error || 'Failed to delete task')
                return
            }
    
            onDelete?.()
            setIsOpen(false)
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
                <Button variant={'destructive'} size={'icon-sm'}>
                    <Trash />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Delete Task
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this task?
                    </DialogDescription>
                </DialogHeader>
                <Field orientation='horizontal' className='w-full'>
                    <Button
                        variant={'destructive'}
                        className='grow'
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? 'Deleting' : 'Delete'}
                    </Button>
                    <Button type='button' variant={'outline'} onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </Field>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteTask