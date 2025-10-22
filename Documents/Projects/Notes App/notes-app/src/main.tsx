import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Layout } from './Layout.tsx'
import Editor from './components/Editor.tsx'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<Layout/>}>
      <Route path = '' element ={<App/>}/>
      <Route path = 'editor' element ={<App/>}/>

    </Route>
  )
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}/>
    {/* <App /> */}
  </StrictMode>,
)
