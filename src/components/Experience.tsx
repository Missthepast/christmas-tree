import { useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import ChristmasTree from './ChristmasTree.tsx'
import Star from './Star.tsx'
import Ground from './Ground.tsx'
import TextOverlay from './TextOverlay.tsx'

interface ExperienceProps {
    rotation: number
}

const Experience = ({ rotation }: ExperienceProps) => {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((_, delta) => {
        if (groupRef.current) {
            // Base rotation + hand/mouse controlled rotation
            groupRef.current.rotation.y += delta * 0.2 + rotation * 0.05
        }
    })

    return (
        <group>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} intensity={1.5} castShadow />
            <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4444ff" />

            <group ref={groupRef}>
                <ChristmasTree />
                <Star position={[0, 7.5, 0]} />
            </group>

            <Ground />
            <TextOverlay />
        </group>
    )
}

export default Experience
