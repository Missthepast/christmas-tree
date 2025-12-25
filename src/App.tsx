import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Suspense, useState } from 'react'
import Experience from './components/Experience.tsx'
import HandController from './components/HandController.tsx'
import Overlay from './components/Overlay.tsx'

function App() {
  const [rotation, setRotation] = useState(0)
  const [handActive, setHandActive] = useState(false)

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 12]} fov={50} />
        <OrbitControls
          enablePan={false}
          minDistance={5}
          maxDistance={25}
          maxPolarAngle={Math.PI / 1.8}
        />

        <color attach="background" args={['#000']} />

        <Suspense fallback={null}>
          <Experience rotation={rotation} />
          <EffectComposer>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0.1}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
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
