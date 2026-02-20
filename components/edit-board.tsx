import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Pencil } from 'lucide-react'
import { Field, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Board } from '@/lib/types'


const EditBoard = ({
    boardName,
    boardDescription,
    boardId,
    onEdit
}: {
    boardName: string,
    boardDescription: string | null
    boardId: number
    onEdit: (updated: Pick<Board, 'name' | 'description'>) => void
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const handleOpen = () => {
        setName(boardName)
        setDescription(boardDescription || '')
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        if(!name.trim()) return  alert('Board name is required')

        setLoading(true)

        try {
            const res = await fetch(`/api/boards/${boardId}`,{
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, description }),
            })

            if (!res.ok) {
                const data = await res.json()
                alert(data.error || "Failed to update board")
                return
            }
            const updatedBoard = await res.json()
            onEdit?.(updatedBoard)
        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        } finally{
            setLoading(false)
            setIsOpen(false)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={'ghost'} size={'icon-sm'} onClick={handleOpen}>
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Board</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor={'name'}>Board Name</FieldLabel>
                            <Input 
                                id={'name'}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={'description'}>Description (Optional)</FieldLabel>
                            <Textarea 
                                id={'description'}
                                value={description || ''}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Field>
                        <Field orientation='horizontal' className='w-full'>
                            <Button
                                type='submit'
                                className='grow'
                                disabled={loading}
                            >
                                {loading ? 'Editing...' : 'Edit Board'}
                            </Button>
                            <Button type='button' variant={'outline'} onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                        </Field>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditBoard