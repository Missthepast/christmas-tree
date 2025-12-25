import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const STAR_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const STAR_FRAGMENT_SHADER = `
  varying vec2 vUv;
  uniform float uTime;
  
  void main() {
    vec2 uv = vUv - 0.5;
    float d = length(uv);
    
    // Core glow
    float core = 0.05 / d;
    
    // Rays
    float ray1 = max(0.0, 1.0 - abs(uv.x * 20.0)) * max(0.0, 1.0 - abs(uv.y * 1.2));
    float ray2 = max(0.0, 1.0 - abs(uv.y * 20.0)) * max(0.0, 1.0 - abs(uv.x * 1.2));
    
    // 45 degree rays
    float angle = 0.785398; // 45 degrees
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 uvRot = rot * uv;
    float ray3 = max(0.0, 1.0 - abs(uvRot.x * 30.0)) * max(0.0, 1.0 - abs(uvRot.y * 1.5));
    float ray4 = max(0.0, 1.0 - abs(uvRot.y * 30.0)) * max(0.0, 1.0 - abs(uvRot.x * 1.5));
    
    float rays = (ray1 + ray2 + ray3 + ray4) * (0.1 / d);
    
    vec3 gold = vec4(1.0, 0.9, 0.5, 1.0).rgb;
    float alpha = core + rays;
    
    // Flicker
    alpha *= 0.8 + 0.2 * sin(uTime * 10.0);
    
    gl_FragColor = vec4(gold * alpha, alpha);
  }
`

const Star = ({ position }: { position: [number, number, number] }) => {
    const materialRef = useRef<THREE.ShaderMaterial>(null)

    const uniforms = useMemo(() => ({
        uTime: { value: 0 }
    }), [])

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
        }
    })

    return (
        <group position={position}>
            <mesh scale={2.5}>
                <planeGeometry args={[1, 1]} />
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={STAR_VERTEX_SHADER}
                    fragmentShader={STAR_FRAGMENT_SHADER}
                    uniforms={uniforms}
                    transparent
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Point light to cast light on the tree */}
            <pointLight
                intensity={2}
                distance={10}
                color="#ffeaa7"
            />
        </group>
    )
}

export default Star
