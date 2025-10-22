import{useState} from 'react'
import {useAppSelector } from '../app/store.ts'
import NoteCard from './NoteCard'


// import type { RootState } from '../app/store.tsx'

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
import{useSelector} from 'react-redux'
import { TodoList } from 'ckeditor5'

function NoteCardList(){
    const notes = useAppSelector((state)=> state.notes)

    return(
        <div className= "flex">
            {notes.map((note)=>(
                <div>
                    <NoteCard
                        key = {note.id}
                        title = {note.title}
                        description = {note.description}
                        tags = {["hsvsd","lsdkjn"]}
                                    
                    />
                </div>
            ))}
        
        </div>
            
    )

}

export default NoteCardList