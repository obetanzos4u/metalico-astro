import type { ReactNode } from 'react'

interface MetalFrameProps {
  width?: number
  height?: number
  borderColor?: string
  borderWidth?: number
  children?: ReactNode
}

export default function MetalFrame({
  width = 960,
  height = 540,
  borderColor = '#C0C0C0',
  borderWidth = 5,
  children,
}: MetalFrameProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          border: `${borderWidth}px solid ${borderColor}`,
          boxShadow: '0 0 30px rgba(0,0,0,0.5)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '0',
            clipPath: 'circle(320px at 50% 50%)',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
