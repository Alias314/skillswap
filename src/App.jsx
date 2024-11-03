import { useState } from 'react'
import Home from './pages/home';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home></Home>

      <h1 className="text-3xl font-bold underline">
        if this bold and got underline tailwind works
      </h1>
    </>
  )
}

export default App