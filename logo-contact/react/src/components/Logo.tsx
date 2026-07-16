interface LogoProps {
  src?: string
  alt?: string
  width?: number
  height?: number
}

const LOGO_BASE64 = 'data:image/svg+xml;base64,' + btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80">
  <rect width="200" height="80" fill="#CC0000" rx="4"/>
  <text x="100" y="36" font-family="Arial Black, sans-serif" font-size="28" font-weight="900" fill="white" text-anchor="middle" letter-spacing="4">METALLICO</text>
  <text x="100" y="58" font-family="Arial, sans-serif" font-size="10" fill="white" text-anchor="middle" letter-spacing="6" opacity="0.8">MAQUILA METALMECÁNICA</text>
</svg>`)

export default function Logo({
  src = LOGO_BASE64,
  alt = 'METALLICO Logo',
  width = 320,
  height = 120,
}: LogoProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
      }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          display: 'block',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
