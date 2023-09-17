import { Canvas, useFrame } from "@react-three/fiber"

import { Points, PointMaterial, Preload } from "@react-three/drei"
import { inSphere } from "maath/random";
import { Suspense, useRef } from "react"

const Stars = () => {
  const ref = useRef()

  useFrame((state, delta) => {
    if (!ref || !ref.current) return
    
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  })

  const sphere = inSphere(new Float32Array(5000), { radius: 1.5 })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustrumCulled
      >
        <PointMaterial 
          transparent
          color="#f242c8"
          size={0.002}
          sizeAttenuatino={true}
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas
        camera={{
          position: [0, 0, 1]
        }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  )
}

export default StarsCanvas