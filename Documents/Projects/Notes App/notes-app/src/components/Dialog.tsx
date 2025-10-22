import { Button } from "@/components/ui/button"
import {useState} from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {Link, NavLink} from 'react-router-dom'
import { Label } from "@/components/ui/label"

import {useDispatch} from 'react-redux'
import {addNote} from '../features/noteSlice'

export default function DialogDemo() {
  const[title, setTitle] = useState("")
  const[description, setDescription] = useState("")
  const dispatch = useDispatch()
  const addNoteHandler = (e: any) =>{
    e.preventDefault()
    dispatch(addNote({title,description}))
    setDescription('')
    setTitle('')
  }

  
  return (
    <Dialog>
      <form onSubmit = {addNoteHandler}>
        <DialogTrigger asChild>
          <Button className="h-[50px] text-[20px] left-3 absolute bottom-0 mb-8 z-10 bg-pink-300 rounded-2xl" >
            Create new note
            <div className = "flex justify-center items-center  w-[36px] h-[36px] bg-amber-50 text-black rounded-full"> + </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Note</DialogTitle>
            <DialogDescription>
              Create new new note to add.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input id="name-1" name="name" defaultValue="Enter title" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Description</Label>
              <Input id="username-1" 
                name="username" 
                placeholder="enter description" 
                value = {description} 
                onChange = {(e)=>setDescription(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <nav>
            <Link to = "/editor">
              <Button type="submit">Create</Button>
            </Link>
            </nav>
            
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
