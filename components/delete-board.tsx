import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { Field } from './ui/field'
import { useRouter } from 'next/navigation'

const DeleteBoard = ({
    boardId
}: {
    boardId: number
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const handleSubmit = async () => {
        setLoading(true)

        try {
            const res = await fetch(`/api/boards/${boardId}`, {
                method: "DELETE",
            })
    
            if (!res.ok) {
                const data = await res.json()
                alert(data.error || "Failed to delete board")
                return
            }
        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        } finally{
            setLoading(false)
            router.push('/')
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
                        Delete Board
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this board?
                    </DialogDescription>
                </DialogHeader>
                <Field orientation='horizontal' className='w-full'>
                    <Button
                        variant={'destructive'}
                        className='grow'
                        onClick={handleSubmit}
                    >
                        {loading ? 'Deleting...': 'Delete Board'}
                    </Button>
                    <Button type='button' variant={'outline'} onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </Field>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteBoard