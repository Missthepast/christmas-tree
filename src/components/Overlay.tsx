interface OverlayProps {
    handActive: boolean
}

const Overlay = ({ handActive }: OverlayProps) => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '40px',
            boxSizing: 'border-box',
            fontFamily: "'Outfit', sans-serif",
            color: '#fff',
            textShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h1 style={{
                        fontSize: '3rem',
                        margin: 0,
                        fontWeight: 800,
                        background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-1px'
                    }}>
                        Magic Christmas
                    </h1>
                    <p style={{ opacity: 0.7, margin: '5px 0' }}>Three.js + MediaPipe Interactive Experience</p>
                </div>

                <div style={{
                    padding: '10px 20px',
                    background: handActive ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    border: `1px solid ${handActive ? '#FFD700' : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                    fontSize: '14px',
                    transition: 'all 0.3s'
                }}>
                    {handActive ? '✨ Hand Detected' : '👋 Wave your hand to control'}
                </div>
            </div>

            <div style={{ alignSelf: 'flex-end', textAlign: 'right' }}>
                <h2 style={{
                    fontSize: '4rem',
                    margin: 0,
                    fontFamily: "'Playball', cursive", // We'll need to import this font or use a fallback
                    color: '#FFD700',
                    opacity: 0.9
                }}>
                    Merry Christmas
                </h2>
                <p style={{ opacity: 0.5 }}>Created with Magic & Code</p>
            </div>
        </div>
    )
}

export default Overlay
