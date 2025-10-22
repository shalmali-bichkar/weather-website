import {createSlice, nanoid} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    notes:[{id:"1", title:"title", description:"description"}]
}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers:{
        addNote: (state, action: PayloadAction<{ title: string; description: string }>)=>{
            const note = {
                id : nanoid(),
                title: action.payload.title,
                description: action.payload.description

            }
            state.notes.push(note)
        }
    }


})

export const{addNote} = noteSlice.actions

export default noteSlice.reducer