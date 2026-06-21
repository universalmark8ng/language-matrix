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

## Curriculum

The app is driven by a **beginner-adapted Hindi curriculum aligned to the current
NCERT/CBSE syllabus** (NCF-SE 2023: **Sarangi** Cl 1–2, **Veena** Cl 3–5) —
speaking & listening first, Devanagari recognition only. The teaching backbone
is in [`curriculum/CURRICULUM.md`](curriculum/CURRICULUM.md); the per-unit
vocabulary that feeds the three activities lives in
[`src/data/curriculum.js`](src/data/curriculum.js).

- **Levels:** Foundations Review (Grades 1–2 diagnostic) · Grade 3 Core (8 units) ·
  Grade 4 / 5 (stubbed for later).
- The header's **curriculum bar** lets the teacher pick a Level + Unit; the chosen
  unit's words load into Command-A-Robot, Magic Cauldron and Secret Agents.
- Teacher ★ ratings are stamped with the active **unit**, giving per-unit records.

Add a unit by appending to a level's `units` array in `curriculum.js`; the three
activities pick it up automatically.

## Branding

Styled to the **DS Learning** brand (dslearning.com.au):

- **Palette** (Tailwind `ds-*` tokens in `tailwind.config.js`): terracotta `#C4582B`
  (primary), warm cream `#FAFAF7`/`#F5F1EB` backgrounds, navy `#1C2632`, plus gold
  `#B8860B` and green `#2D7A4F` secondaries.
- **Type:** Source Serif 4 (headings) + DM Sans (UI) — the brand faces — with
  **Baloo 2** reserved for the playful vocabulary tokens (it also covers Devanagari).
- **Logo + tagline** ("Preparing for Life") in the header lockup.
- Block colour-coding maps onto the brand: **gold** describing words, **navy** things,
  **green** actions, **terracotta** connectors.

Stack: React 18 + Vite 5 + Tailwind CSS 3 + lucide-react.
