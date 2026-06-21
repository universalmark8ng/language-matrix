import { useMatrix } from './context/MatrixContext.jsx'
import Header from './components/Header.jsx'
import TeacherBar from './components/TeacherBar.jsx'
import CommandRobot from './components/modes/CommandRobot.jsx'
import MagicCauldron from './components/modes/MagicCauldron.jsx'
import SecretAgents from './components/modes/SecretAgents.jsx'

const MODE_COMPONENTS = {
  robot: CommandRobot,
  cauldron: MagicCauldron,
  agents: SecretAgents,
}

const MODE_INTRO = {
  robot: 'Build a command and tell the robot what to do!',
  cauldron: 'Fuse two cards to brew a magic spell!',
  agents: 'Crack the code — ask and answer in Hindi!',
}

export default function App() {
  const { mode } = useMatrix()
  const ActiveMode = MODE_COMPONENTS[mode]

  return (
    <div className="min-h-full bg-gradient-to-b from-ds-bg via-ds-warm to-ds-cream">
      <Header />

      <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-5">
        <p className="mb-4 text-center font-serif text-lg font-semibold text-ds-ink-soft">
          {MODE_INTRO[mode]}
        </p>
        {/* key forces a fresh mount (and pop-in) when switching modes */}
        <div key={mode} className="animate-pop-in">
          <ActiveMode />
        </div>
      </main>

      <TeacherBar />
    </div>
  )
}
