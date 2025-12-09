type InputBoxProps = {
    
    text: string
    placeholder: string
    onTextChange?: (value: string) => void
}




function InputBox({text,placeholder,onTextChange}:InputBoxProps){ 
    return(
        <>
            
            <div className = 'flex flex-col  h-fit w-[350px] rounded-lg  text-black items-center'>
                
                <textarea
                className = 'border-0 w-[350px] h-[400px] justify-center align-text-top p-4 rounded-lg bg-blue-200'
                // type = "string"
                value = {text}
                placeholder = {placeholder}
                onChange = {(e)=>onTextChange && onTextChange(e.target.value)}
                />
            </div>
        </>
        
        
    )
}

export default InputBox