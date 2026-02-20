import { Board } from "@/lib/types";
import { notFound } from "next/navigation";
import BoardPageClient from "./_client";


export default async function BoardPage ({
    params
}: {
    params: Promise<{id: string}>
}){
    const { id } = await params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/boards/${id}`, {
        cache: "no-store",
    })

    if (!res.ok) {
        return notFound()
    }

    const board: Board = await res.json()

    return <BoardPageClient board={board}/>
}