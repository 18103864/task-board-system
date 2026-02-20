import { Clipboard } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className='w-full h-header flex items-center border-b px-4'>
            <Link href={'/'} className='flex items-center gap-2'>
                <Clipboard />
                <h1 className='text-lg'>
                    Task Board System
                </h1>
            </Link>
        </nav>
    )
}

export default Navbar