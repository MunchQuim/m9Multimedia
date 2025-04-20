import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Main from './pages/main/main'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Main></Main>
    </>
  )
}

export default App
