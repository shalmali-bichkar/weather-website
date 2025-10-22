import React, { useState } from 'react';
// import {Button} from "@/components/ui/button"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {Link, NavLink} from 'react-router-dom'
// import { FontColorEditing } from 'ckeditor5';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor() {
    //redux- saga, toolkit
    const [data, setData] = useState("")
  
    const submitNote = () =>{
        
        console.log(data);
    }
    const onChangeData = (event,editor ) =>{
        const newData = editor.getData();
        setData(newData);
        
    }
    return (
        <div className="text-black h-500px flex flex-col">
            <h2>CKEditor 5 in React</h2>
            <CKEditor
                className = "min-h-[300px]"
                editor={ClassicEditor}
                data="<p>Initial content</p>"
                onChange = {onChangeData}
                // config={{ toolbar: ['bold', 'italic','undo','redo',] }}
            />
            <nav>
                <Link to = "/">
                <button className = "bg-amber-50 p-[4px] rounded-lg"type = "submit" onClick = {submitNote}>Submit</button>
            </Link>
            
            </nav>
            
        </div>
  );
}
export default Editor;




        //   onReady={editor => console.log('Editor ready', editor)}