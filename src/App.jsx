import { useMatrix } from './context/MatrixContext.jsx'
import Header from './components/Header.jsx'
import UnitPicker from './components/UnitPicker.jsx'
import AudioNotice from './components/AudioNotice.jsx'
import TeacherBar from './components/TeacherBar.jsx'
import CommandRobot from './components/modes/CommandRobot.jsx'
import MagicCauldron from './components/modes/MagicCauldron.jsx'
import SecretAgents from './components/modes/SecretAgents.jsx'
import SoundLab from './components/modes/SoundLab.jsx'

const MODE_COMPONENTS = {
  robot: CommandRobot,
  cauldron: MagicCauldron,
  agents: SecretAgents,
  sounds: SoundLab,
}

const MODE_INTRO = {
  robot: 'Build a command and tell the robot what to do!',
  cauldron: 'Fuse two cards to brew a magic spell!',
  agents: 'Crack the code — ask and answer in Hindi!',
  sounds: 'Say it like a local — soft vs breathy sounds (k vs kh!).',
}

export default function App() {
  const { mode, active } = useMatrix()
  const ActiveMode = MODE_COMPONENTS[mode]

  return (
    <div className="min-h-full bg-gradient-to-b from-ds-bg via-ds-warm to-ds-cream">
      <Header />
      {/* The curriculum unit drives the three games; the Sounds reference is
          unit-independent, so hide the picker there. */}
      {mode !== 'sounds' && <UnitPicker />}
      <AudioNotice />

      <main className="mx-auto w-full max-w-5xl px-4 pb-28 pt-5">
        <p className="mb-4 text-center font-serif text-lg font-semibold text-ds-ink-soft">
          {MODE_INTRO[mode]}
        </p>
        {/* key forces a fresh mount (and pop-in) when switching modes OR units */}
        <div key={`${mode}-${active.unitId}`} className="animate-pop-in">
          <ActiveMode />
        </div>
      </main>

      <TeacherBar />
    </div>
  )
}
