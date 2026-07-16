import type { ReactNode } from 'react'

interface SceneProps {
  width?: number
  height?: number
  children?: ReactNode
}

export default function Scene({ width = 1920, height = 1080, children }: SceneProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'hidden',
        background: '#1a1a1a',
      }}
    >
      {children}
    </div>
  )
}
