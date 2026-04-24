import React, { useEffect, useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Model({ scrollProgress }) {

  const { scene } = useGLTF('/models/env.glb')
  const { camera } = useThree()

  const curve = useRef()
  const smoothT = useRef(0)

  // 🔥 generate points for line
  const points = useMemo(() => {
    return new Array(100).fill().map((_, i) => i / 99)
  }, [])

  useEffect(() => {
    camera.position.set(13, 8, 15)

    curve.current = new THREE.CatmullRomCurve3([
      new THREE.Vector3(15, 5, 20),
      new THREE.Vector3(10, 3, 16),
      new THREE.Vector3(8, 2, 12),
      new THREE.Vector3(6, 2, 8),
      new THREE.Vector3(4, 1.54, 4),
      new THREE.Vector3(1, 1, 2),
      new THREE.Vector3(0, 0.54, 0),
      new THREE.Vector3(-1, 0, -1),
      new THREE.Vector3(-2, 0, -2),
    ])
  }, [camera])

  useFrame((state, delta) => {
    if (!curve.current) return

    smoothT.current = THREE.MathUtils.damp(
      smoothT.current,
      scrollProgress,
      4,
      delta
    )

    const t = smoothT.current

    const point = curve.current.getPointAt(t)
    camera.position.copy(point)

    const lookAtPoint = curve.current.getPointAt(Math.min(t + 0.02, 1))
    camera.lookAt(lookAtPoint)
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={2} />

      {/* 🔥 PATH LINE */}
      {curve.current && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(
                points.flatMap((t) => {
                  const p = curve.current.getPointAt(t)
                  return [p.x, p.y, p.z]
                })
              )}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="yellow" />
        </line>
      )}

      <primitive
        object={scene}
        scale={0.1}
        position={[0.5, -1.8, 0]}
        rotation={[0, Math.PI / 1.8, 0]}
      />
    </>
  )
}

export default Model