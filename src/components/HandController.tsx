import { useRef, useEffect } from 'react'
import Webcam from 'react-webcam'
import { Hands, type Results } from '@mediapipe/hands'
import * as cam from '@mediapipe/camera_utils'

interface HandControllerProps {
    onRotate: (rotation: number) => void
    onActive: (active: boolean) => void
}

const HandController = ({ onRotate, onActive }: HandControllerProps) => {
    const webcamRef = useRef<Webcam>(null)
    const prevX = useRef<number | null>(null)

    useEffect(() => {
        const hands = new Hands({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
            }
        })

        hands.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        })

        const onResults = (results: Results) => {
            if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
                onActive(true)
                const hand = results.multiHandLandmarks[0]
                // Use the average X of the hand to control rotation
                const currentX = hand[0].x

                if (prevX.current !== null) {
                    const deltaX = currentX - prevX.current
                    onRotate(deltaX * 50) // Scale for sensitivity
                }
                prevX.current = currentX
            } else {
                onActive(false)
                prevX.current = null
                onRotate(0)
            }
        }

        hands.onResults(onResults)

        if (webcamRef.current && webcamRef.current.video) {
            const camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    if (webcamRef.current?.video) {
                        await hands.send({ image: webcamRef.current.video })
                    }
                },
                width: 640,
                height: 480
            })
            camera.start()
        }

        return () => {
            hands.close()
        }
    }, [onRotate, onActive])

    return (
        <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: '160px',
            height: '120px',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            boxShadow: '0 0 20px rgba(0,0,0,0.5)',
            opacity: 0.6,
            transition: 'opacity 0.3s'
        }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
        >
            <Webcam
                ref={webcamRef}
                mirrored={true}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                padding: '4px 8px',
                background: 'rgba(0,0,0,0.5)',
                color: '#ffd700',
                fontSize: '10px',
                fontFamily: 'sans-serif'
            }}>
                HAND CONTROL
            </div>
        </div>
    )
}

export default HandController
