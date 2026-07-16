interface BackgroundProps {
  color?: string
}

export default function Background({ color = '#CC0000' }: BackgroundProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: color,
      }}
    />
  )
}
