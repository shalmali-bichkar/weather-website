import { useState } from 'react';
import Header from './components/Header.tsx';
import Body from './components/Body.tsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>HELLOO</div>
     <Header/>
     <Body/>
    </>
  )
}

export default App
