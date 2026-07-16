import { useRef, useEffect } from 'react'

interface MetalTextureProps {
  width?: number
  height?: number
}

const STREAK_COLORS = [
  'rgba(180,180,180,0.15)',
  'rgba(220,220,220,0.08)',
  'rgba(160,160,160,0.12)',
  'rgba(200,200,200,0.06)',
]

export default function MetalTexture({
  width = 960,
  height = 540,
}: MetalTextureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    ctx.fillStyle = '#2a2a2a'
    ctx.fillRect(0, 0, width, height)

    const streakWidth = 80
    const gap = 40
    const total = Math.ceil(Math.sqrt(width * width + height * height) / (streakWidth + gap)) + 1

    for (let i = 0; i < total; i++) {
      const offset = i * (streakWidth + gap) - 200
      ctx.save()
      ctx.translate(width / 2, height / 2)
      ctx.rotate(-35 * Math.PI / 180)
      ctx.translate(-width / 2, -height / 2)

      const gradient = ctx.createLinearGradient(offset, 0, offset + streakWidth, 0)
      gradient.addColorStop(0, 'transparent')
      gradient.addColorStop(0.3, STREAK_COLORS[i % STREAK_COLORS.length])
      gradient.addColorStop(0.7, STREAK_COLORS[(i + 1) % STREAK_COLORS.length])
      gradient.addColorStop(1, 'transparent')

      ctx.fillStyle = gradient
      ctx.fillRect(offset, -200, streakWidth, height + 400)
      ctx.restore()
    }
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  )
}
