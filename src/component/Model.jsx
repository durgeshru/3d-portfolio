import React from 'react'
import { OrbitControls, useGLTF , useTexture} from '@react-three/drei'
import { useThree } from '@react-three/fiber'

function Model() {

  const { scene } = useGLTF('../models/env.glb')

  useThree(({camera, scene,gl}) => {
console.log(camera.position)

camera.position.z=20
camera.position.y=12
camera.position.x=12

  })
  

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={2} />

      <primitive 
        object={scene} 
        scale={0.1} 
        position={[0.5, -1.8, 0]} 
        rotation={[0, Math.PI/1.8, 0]} 
      />

      <OrbitControls />
    </>
  )
}

export default Model