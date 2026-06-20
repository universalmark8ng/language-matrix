# 🤖 The Language Matrix — MVP Prototype

A single-page, gamified web app for testing three audio-visual "Matrix" mechanics
for conversational language learning. Built for two 8-year-old absolute beginners
learning **Hindi** — speaking & listening first, no reading/writing pressure.

## Run it

```bash
cd language-matrix
npm install
npm run dev      # → http://localhost:5173
```

Build a static bundle (drop `dist/` on any host):

```bash
npm run build && npm run preview
```

## The three modes

| Mode | Mechanic |
|------|----------|
| 🤖 **Command-A-Robot** | Drag/tap blocks into a `Adjective → Noun → Verb` syntax track, then read the command aloud to make the robot act. |
| 🧪 **Magic Cauldron** | Fuse two elemental cards into one "Spell Block", chant it, and summon a mythical hybrid creature. |
| 🕵️ **Secret Agents** | Two walkie-talkie terminals: Agent 1 asks *"What is this?"*, Agent 2 assembles `This → [thing] → Is` to answer and transmit. |

A persistent **Teacher bar** (bottom) logs a live 5-star rating + note per round to
`localStorage` for real-time feedback during testing sessions.

## Audio

- **Playback / TTS:** Web Speech API (`speechSynthesis`). Real Hindi audio plays when
  a `hi-IN` voice is installed on the device; otherwise it degrades to the default voice.
- **Mic recording:** *simulated* — press & hold shows a pulsing waveform; release
  auto-succeeds after 1.5 s to keep the game flowing (no ASR keys needed). Swap the
  timeout in `src/components/MicModal.jsx` for real recognition later.

## Retargeting to another language (e.g. Mandarin)

Everything language-specific lives in **`src/data/blocks.js`**. The modes read blocks
purely by `type`, `ui_color`, and text fields — so swapping `languagePack` for a new
pack (same shape) re-skins the whole app with **no layout changes**. Set
`speech_lang` to the new BCP-47 tag (e.g. `zh-CN`) to pick the matching TTS voice.

## Structure

```
src/
  data/blocks.js            ← vocabulary data model (the only language-aware file)
  lib/speech.js             ← Web Speech TTS wrapper
  context/MatrixContext.jsx ← active mode + teacher session log
  components/
    Header.jsx  TeacherBar.jsx  Block.jsx  Slot.jsx  Inventory.jsx
    SoundWave.jsx  MicModal.jsx
    modes/  CommandRobot.jsx  MagicCauldron.jsx  SecretAgents.jsx
```

Stack: React 18 + Vite 5 + Tailwind CSS 3 + lucide-react.
