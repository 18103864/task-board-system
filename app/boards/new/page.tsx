'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const NewBoardPage = () => {
    const router = useRouter()
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        if(!name.trim()) return  alert('Board name is required')

        setLoading(true)

        try {
            const res = await fetch("/api/boards",{
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({name, description})
            })

            if (!res.ok) {
                const data = await res.json()
                alert(data.error || "Failed to create board")
                return
            }
            router.push("/")
        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        } finally{
            setLoading(false)
        }
    }
    return (
        <div className='container mx-auto px-4 py-8'>
            <Card className='w-full max-w-lg mx-auto'>
                <CardHeader>
                    <CardTitle>
                        New Board
                    </CardTitle>
                    <CardDescription>
                        Create a new board
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor={'name'}>Board Name</FieldLabel>
                                <Input 
                                    id='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor={'description'}>Description (Optional)</FieldLabel>
                                <Textarea 
                                    id='description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Field>
                            <Field orientation='horizontal' className='w-full'>
                                <Button
                                    type='submit'
                                    className='grow'
                                    disabled={loading}
                                    
                                >
                                    {loading ? "Creating..." : "Create Board"}
                                </Button>
                                <Button asChild variant={'outline'}>
                                    <Link href={'/'}>
                                        Cancel
                                    </Link>
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewBoardPage