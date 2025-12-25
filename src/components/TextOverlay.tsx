import { Text, Float } from '@react-three/drei'

const TextOverlay = () => {
    return (
        <group position={[8, 1, 0]} rotation={[0, -Math.PI / 6, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Text
                    fontSize={1.2}
                    color="#FFD700"
                    anchorX="center"
                    anchorY="middle"
                    // Using a serif font to match the elegant style
                    font="https://fonts.gstatic.com/s/playball/v17/p9X9276q9E16C976_S_Z.woff"
                >
                    Merry\nChristmas
                    <meshStandardMaterial metalness={0.8} roughness={0.2} emissive="#FFD700" emissiveIntensity={0.5} />
                </Text>
            </Float>

            {/* Subtext */}
            <Text
                position={[0, -1, 0]}
                fontSize={0.3}
                color="#fff"
                fillOpacity={0.5}
            >
                Gesture & Mouse Controlled
            </Text>
        </group>
    )
}

export default TextOverlay
