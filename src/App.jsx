import { useState } from 'react'
import './App.css'
import Header from './Components/header'
import Coins from './Components/coins'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Coins />
    </>
  )
}

export default App
