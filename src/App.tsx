import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useState } from 'react'
import Experience from './components/Experience.tsx'
import HandController from './components/HandController.tsx'
import Overlay from './components/Overlay.tsx'

function App() {
  const [rotation, setRotation] = useState(0)
  const [handActive, setHandActive] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas shadows camera={{ position: [0, 5, 12], fov: 50 }}>
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={25}
          maxPolarAngle={Math.PI / 1.8}
        />

        <color attach="background" args={['#050505']} />

        <Suspense fallback={null}>
          <Experience rotation={rotation} />
        </Suspense>
      </Canvas>

      <HandController
        onRotate={(rot) => setRotation(rot)}
        onActive={(active) => setHandActive(active)}
      />

      <Overlay handActive={handActive} />
    </div>
  )
}

export default App
