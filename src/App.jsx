import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'
import Model from './component/Model'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Canvas>    <Model/></Canvas>
 
    </>
  )
}

export default App
