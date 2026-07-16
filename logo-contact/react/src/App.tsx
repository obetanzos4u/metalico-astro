import Scene from './components/Scene'
import Background from './components/Background'
import MetalFrame from './components/MetalFrame'
import MetalTexture from './components/MetalTexture'
import AnimatedHighlights from './components/AnimatedHighlights'
import Logo from './components/Logo'

export default function App() {
  return (
    <Scene>
      <Background />
      <MetalFrame>
        <MetalTexture />
        <AnimatedHighlights />
      </MetalFrame>
      <Logo />
    </Scene>
  )
}
