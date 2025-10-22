type ICardProps = {
    title: string,
    description: string,
    tags:string[]
}
export default function NoteCard({
    
    title,
    description,
    tags
}: ICardProps){
    return(
        <div className=" m-2 flex-col w-[250px] self-start overflow-hidden h-[300px] p-2 text-[16px] text-black bg-pink-200 shadow-xl rounded-lg" >
            <div className="text-[20px] pb-2">{title}</div>
            <div>{description}</div>
        </div>
    )
}