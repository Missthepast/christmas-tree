import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const VERTEX_SHADER = `
  precision highp float;
  varying float vHighlight;
  uniform float uTime;
  
  void main() {
    vHighlight = sin(position.y * 5.0 - uTime * 3.0) * 0.5 + 0.5;
    
    vec3 pos = position;
    pos.x += sin(uTime * 5.0 + pos.y) * 0.02;
    pos.z += cos(uTime * 5.0 + pos.y) * 0.02;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Adjusted point size for better mobile visibility
    gl_PointSize = 12.0 * (1.0 / -mvPosition.z);
  }
`

const FRAGMENT_SHADER = `
  precision highp float;
  varying float vHighlight;
  
  void main() {
    vec3 colorA = vec3(1.0, 0.9, 0.5); // Golden
    vec3 colorB = vec3(1.0, 0.6, 0.1); // Deep gold
    
    vec3 finalColor = mix(colorB, colorA, vHighlight);
    float alpha = 0.4 + vHighlight * 0.6;
    
    // Create a fuzzy circular point
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    
    float strength = (1.0 - dist * 2.0);
    gl_FragColor = vec4(finalColor, alpha * strength);
  }
`

const ChristmasTree = () => {
    const meshRef = useRef<THREE.Points>(null)

    const { points } = useMemo(() => {
        const pts = []
        const numTurns = 12
        const pointsPerTurn = 200
        const totalPoints = numTurns * pointsPerTurn
        const height = 7

        for (let i = 0; i < totalPoints; i++) {
            const t = i / totalPoints
            const angle = t * Math.PI * 2 * numTurns
            const radius = (1 - t) * 3 // Taper towards top
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius
            const y = t * height

            pts.push(x, y, z)

            // Add random sparks around the spiral
            if (Math.random() > 0.8) {
                const offset = (Math.random() - 0.5) * 0.5
                pts.push(x + offset, y + (Math.random() - 0.5) * 0.2, z + offset)
            }
        }
        return {
            points: new Float32Array(pts)
        }
    }, [])

    const uniforms = useMemo(() => ({
        uTime: { value: 0 }
    }), [])

    useFrame((state) => {
        if (meshRef.current) {
            (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <group>
            {/* The main spiral particles */}
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
                <shaderMaterial
                    vertexShader={VERTEX_SHADER}
                    fragmentShader={FRAGMENT_SHADER}
                    uniforms={uniforms}
                    transparent
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>

            {/* Optional connecting lines for a more solid look */}
            <mesh>
                {/* We could use a TubeGeometry or just MeshLine here for better depth, 
            but for now let's stick to points and shader for the "glowing" effect 
            consistent with the reference image. */}
            </mesh>
        </group>
    )
}

export default ChristmasTree
