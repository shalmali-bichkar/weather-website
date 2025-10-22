import NoteCardList from './NoteCardList'
import DialogDemo from './Dialog'
import Editor from './Editor'
export default function Body(){
    return(
        <div className = "flex w-full h-screen pt-4">
            <div className = "flex w-[50px] h-full shadow-2xl mr-4"></div>
                <NoteCardList/>
            <div><DialogDemo></DialogDemo></div>
        {   /* <div><Editor></Editor></div> */}
        </div>
    )
}