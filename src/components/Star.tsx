import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const Star = ({ position }: { position: [number, number, number] }) => {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.02
            meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 4) * 0.1)
        }
    })

    return (
        <group position={position}>
            {/* A simple glowing star shape using two crossed planes or a polyhedron */}
            <mesh ref={meshRef}>
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial
                    color="#FFD700"
                    emissive="#FFD700"
                    emissiveIntensity={2}
                    metalness={1}
                    roughness={0}
                />
            </mesh>

            {/* Light glow effect using a point light */}
            <pointLight
                intensity={5}
                distance={10}
                color="#FFD700"
            />
        </group>
    )
}

export default Star
