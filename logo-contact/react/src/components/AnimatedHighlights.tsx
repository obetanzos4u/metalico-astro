import { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface AnimatedHighlightsProps {
  duration?: number
}

export default function AnimatedHighlights({ duration = 10 }: AnimatedHighlightsProps) {
  const sweep1Ref = useRef<HTMLDivElement>(null)
  const sweep2Ref = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 })

    tl.to(sweep1Ref.current, {
      xPercent: 100,
      duration: duration * 0.6,
      ease: 'power1.inOut',
    }, 0)
    tl.to(sweep1Ref.current, {
      xPercent: 0,
      duration: duration * 0.4,
      ease: 'power1.inOut',
    }, duration * 0.6)

    tl.to(sweep2Ref.current, {
      xPercent: 100,
      duration: duration * 0.5,
      ease: 'power1.inOut',
    }, duration * 0.1)
    tl.to(sweep2Ref.current, {
      xPercent: 0,
      duration: duration * 0.5,
      ease: 'power1.inOut',
    }, duration * 0.6)

    tl.to(glowRef.current, {
      opacity: 0.85,
      duration: duration * 0.4,
      ease: 'sine.inOut',
    }, 0)
    tl.to(glowRef.current, {
      opacity: 0.3,
      duration: duration * 0.6,
      ease: 'sine.inOut',
    }, duration * 0.4)

    return () => { tl.kill() }
  }, [duration])

  return (
    <>
      <div
        ref={sweep1Ref}
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '200%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.04) 60%, transparent 100%)',
          transform: 'skewX(-20deg)',
        }}
      />
      <div
        ref={sweep2Ref}
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: '-150%',
          width: '200%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, transparent 80%)',
          transform: 'skewX(15deg)',
        }}
      />
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '100%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
        }}
      />
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          width: '60%',
          height: '100%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 70%, transparent 100%)',
        }}
      />
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '15%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
        }}
      />
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '15%',
          height: '100%',
          background: 'linear-gradient(270deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
        }}
      />
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(255,200,50,0.15) 0%, transparent 70%)',
          opacity: 0.5,
        }}
      />
    </>
  )
}
