import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const ChristmasTree = () => {
    const meshRef = useRef<THREE.Points>(null)

    const { points } = useMemo(() => {
        const pts = []
        const numTurns = 12
        const pointsPerTurn = 150 // Reduced for performance
        const totalPoints = numTurns * pointsPerTurn
        const height = 7

        for (let i = 0; i < totalPoints; i++) {
            const t = i / totalPoints
            const angle = t * Math.PI * 2 * numTurns
            const radius = (1 - t) * 3
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius
            const y = t * height

            pts.push(x, y, z)

            // Add some base particles for volume
            if (Math.random() > 0.7) {
                pts.push(
                    x + (Math.random() - 0.5) * 0.5,
                    y + (Math.random() - 0.5) * 0.2,
                    z + (Math.random() - 0.5) * 0.5
                )
            }
        }
        return {
            points: new Float32Array(pts)
        }
    }, [])

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                    args={[points, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#FFD700"
                transparent
                opacity={0.8}
                sizeAttenuation={true}
            />
        </points>
    )
}

export default ChristmasTree
