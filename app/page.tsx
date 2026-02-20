import BoardList from "@/components/board-list"


const HomePage = () => {
    return (
        <div className='container mx-auto px-4 py-8 space-y-8 h-screen-with-header'>
            <BoardList />
        </div>
    )
}

export default HomePage