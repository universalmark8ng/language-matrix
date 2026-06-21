// ---------------------------------------------------------------------------
// HINDI CURRICULUM — content model
//
// Beginner-adapted, CBSE/NCERT-inspired (NCF-SE 2023 books: Sarangi for the
// Foundational Stage Cl 1–2, Veena for the Preparatory Stage Cl 3–5), pitched
// for absolute-beginner heritage learners (~Grade 3 age). Script is RECOGNITION
// ONLY this year — kids listen & speak first; Devanagari is shown small for
// gentle exposure, no handwriting.
//
// Structure:  LEVELS  →  UNITS  →  blocks (themed vocab tagged by type)
//   - Review level   = "Grades 1–2" foundations, used as a diagnostic baseline
//   - Grade 3        = this year's core coverage
//   - Grade 4 / 5    = placeholders; units authored later
//
// Every playable unit carries adjectives + nouns + verbs so all three
// activities work; shared function words (यह/क्या/है …) live in CORE and are
// available in every unit. To retarget the language, swap the vocab + CORE and
// `speech_lang` — the activities read blocks purely by `type`.
// ---------------------------------------------------------------------------

export const languagePack = { language_pair: 'en-hi', speech_lang: 'hi-IN' }
export const speech_lang = languagePack.speech_lang

// Brand colour per part of speech (DS Learning palette).
const COLORS = {
  noun: 'bg-[#2E3E52] hover:bg-[#1C2632] text-white',
  verb: 'bg-[#2D7A4F] hover:bg-[#246340] text-white',
  adjective: 'bg-[#E0A43B] hover:bg-[#C68A1F] text-[#1C2632]',
  util: 'bg-[#C4582B] hover:bg-[#A94A24] text-white',
}
const colorFor = (type) =>
  COLORS[type] ||
  (['question', 'pronoun', 'verb_aux', 'postposition'].includes(type) ? COLORS.util : COLORS.noun)

// Friendly inventory headings.
export const TYPE_LABELS = {
  adjective: 'Describing Words',
  noun: 'Things',
  verb: 'Actions',
  question: 'Question Words',
  pronoun: 'Pointing Words',
  verb_aux: 'Linking Words',
  postposition: 'Place Words',
}

// Compact block makers: (english, devanagari, transliteration, emoji).
const mk = (type) => (en, hi, tr, emoji) => ({
  type,
  english_meaning: en,
  target_script: hi,
  target_transliteration: tr,
  emoji,
})
const n = mk('noun')
const a = mk('adjective')
const v = mk('verb')

// Shared function words — available in every unit (the Secret Agents Q&A and
// future grammar lean on these). util_001/002/003 ids are referenced directly
// by the Secret Agents mode, so keep them stable.
export const CORE = [
  { id: 'util_002', type: 'pronoun', english_meaning: 'This', target_script: 'यह', target_transliteration: 'Yeh', emoji: '👉' },
  { id: 'util_001', type: 'question', english_meaning: 'What', target_script: 'क्या', target_transliteration: 'Kya', emoji: '❓' },
  { id: 'util_003', type: 'verb_aux', english_meaning: 'Is', target_script: 'है', target_transliteration: 'Hai', emoji: '➡️' },
  { id: 'core_vah', type: 'pronoun', english_meaning: 'That', target_script: 'वह', target_transliteration: 'Vah', emoji: '👈' },
  { id: 'core_kaun', type: 'question', english_meaning: 'Who', target_script: 'कौन', target_transliteration: 'Kaun', emoji: '🙋' },
  { id: 'core_kahan', type: 'question', english_meaning: 'Where', target_script: 'कहाँ', target_transliteration: 'Kahan', emoji: '📍' },
  { id: 'core_main', type: 'pronoun', english_meaning: 'I', target_script: 'मैं', target_transliteration: 'Main', emoji: '🙂' },
  { id: 'core_tum', type: 'pronoun', english_meaning: 'You', target_script: 'तुम', target_transliteration: 'Tum', emoji: '🫵' },
].map((b) => ({ ...b, ui_color: colorFor(b.type) }))

// ---------------------------------------------------------------------------
// LEVELS & UNITS
// ---------------------------------------------------------------------------

const LEVELS_RAW = [
  {
    id: 'review',
    title: 'Foundations Review',
    subtitle: 'Foundational Stage · Sarangi (Cl 1–2) · diagnostic',
    units: [
      {
        id: 'r1',
        title: 'Colours & Counting',
        hindi: 'रंग और गिनती',
        cbse: 'Sarangi (Cl 1–2) · रंग, गिनती',
        focus: 'Recognise colours & high-frequency objects; listen and repeat.',
        blocks: [
          a('Red', 'लाल', 'Laal', '🔴'), a('Blue', 'नीला', 'Neela', '🔵'),
          a('Green', 'हरा', 'Hara', '🟢'), a('Yellow', 'पीला', 'Peela', '🟡'),
          a('Black', 'काला', 'Kaala', '⚫'), a('White', 'सफ़ेद', 'Safed', '⚪'),
          n('Ball', 'गेंद', 'Gend', '⚽'), n('Flower', 'फूल', 'Phool', '🌸'),
          n('Apple', 'सेब', 'Seb', '🍎'), n('Star', 'तारा', 'Taara', '⭐'),
          v('Look', 'देखो', 'Dekho', '👀'), v('Count', 'गिनो', 'Gino', '🔢'),
          v('Give', 'दो', 'Do', '🤲'),
        ],
      },
      {
        id: 'r2',
        title: 'Family & Body',
        hindi: 'परिवार और शरीर',
        cbse: 'Sarangi (Cl 2) · इकाई 1 परिवार',
        focus: 'Name family members & body parts; follow simple instructions.',
        blocks: [
          n('Mother', 'माँ', 'Maa', '👩'), n('Father', 'पापा', 'Papa', '👨'),
          n('Brother', 'भाई', 'Bhai', '👦'), n('Sister', 'बहन', 'Bahan', '👧'),
          n('Hand', 'हाथ', 'Haath', '✋'), n('Eye', 'आँख', 'Aankh', '👁️'),
          n('Nose', 'नाक', 'Naak', '👃'),
          a('Big', 'बड़ा', 'Bada', '🐘'), a('Small', 'छोटा', 'Chhota', '🐭'),
          a('Good', 'अच्छा', 'Achha', '👍'),
          v('Look', 'देखो', 'Dekho', '👀'), v('Listen', 'सुनो', 'Suno', '👂'),
          v('Wash', 'धोओ', 'Dhoo', '🧼'),
        ],
      },
      {
        id: 'r3',
        title: 'Animals & Home',
        hindi: 'जानवर और घर',
        cbse: 'Sarangi (Cl 1–2) · जानवर, घर',
        focus: 'Name common animals & household things; match word to picture.',
        blocks: [
          n('Dog', 'कुत्ता', 'Kutta', '🐶'), n('Cat', 'बिल्ली', 'Billi', '🐱'),
          n('Cow', 'गाय', 'Gaay', '🐄'), n('Lion', 'शेर', 'Sher', '🦁'),
          n('Elephant', 'हाथी', 'Haathi', '🐘'), n('Door', 'दरवाज़ा', 'Darwaza', '🚪'),
          n('Window', 'खिड़की', 'Khidki', '🪟'),
          a('Fast', 'तेज़', 'Tez', '⚡'), a('Slow', 'धीमा', 'Dheema', '🐢'),
          a('Tall', 'ऊँचा', 'Ooncha', '📏'),
          v('Run', 'भागो', 'Bhaago', '🏃'), v('Sleep', 'सोओ', 'Soo', '😴'),
          v('Eat', 'खाओ', 'Khao', '😋'),
        ],
      },
    ],
  },
  {
    id: 'grade3',
    title: 'Grade 3 Core',
    subtitle: 'Preparatory Stage · Veena (Cl 3)',
    units: [
      {
        id: 'g3-1',
        title: 'Greetings & Myself',
        hindi: 'नमस्ते! मैं कौन हूँ?',
        cbse: 'Veena (Cl 3) · हमारे मित्र',
        focus: 'Greet, name yourself, say how you feel; मैं / तुम pronouns.',
        blocks: [
          n('Name', 'नाम', 'Naam', '🏷️'), n('Friend', 'दोस्त', 'Dost', '🧑‍🤝‍🧑'),
          n('Boy', 'लड़का', 'Ladka', '👦'), n('Girl', 'लड़की', 'Ladki', '👧'),
          a('Good', 'अच्छा', 'Achha', '👍'), a('Happy', 'खुश', 'Khush', '😄'),
          a('New', 'नया', 'Naya', '✨'),
          v('Say', 'बोलो', 'Bolo', '🗣️'), v('Listen', 'सुनो', 'Suno', '👂'),
          v('Meet', 'मिलो', 'Milo', '🤝'),
        ],
      },
      {
        id: 'g3-2',
        title: 'My Family',
        hindi: 'मेरा परिवार',
        cbse: 'Veena (Cl 3) · परिवार',
        focus: 'Talk about family; यह मेरा/मेरी … है; describe people.',
        blocks: [
          n('Mother', 'माँ', 'Maa', '👩'), n('Father', 'पापा', 'Papa', '👨'),
          n('Brother', 'भाई', 'Bhai', '👦'), n('Sister', 'बहन', 'Bahan', '👧'),
          n('Grandpa', 'दादा', 'Dada', '👴'), n('Grandma', 'दादी', 'Dadi', '👵'),
          a('Dear', 'प्यारा', 'Pyaara', '🥰'), a('Big', 'बड़ा', 'Bada', '🧑'),
          a('Small', 'छोटा', 'Chhota', '🧒'),
          v('Play', 'खेलो', 'Khelo', '🤾'), v('Laugh', 'हँसो', 'Hanso', '😄'),
          v('Look', 'देखो', 'Dekho', '👀'),
        ],
      },
      {
        id: 'g3-3',
        title: 'Colours, Shapes & Sizes',
        hindi: 'रंग, आकार और साइज़',
        cbse: 'Foundational · रंग व आकार',
        focus: 'Adjective + noun agreement (gentle); describe objects.',
        blocks: [
          a('Red', 'लाल', 'Laal', '🔴'), a('Blue', 'नीला', 'Neela', '🔵'),
          a('Big', 'बड़ा', 'Bada', '🐘'), a('Small', 'छोटा', 'Chhota', '🐭'),
          a('Round', 'गोल', 'Gol', '⚪'), a('Long', 'लंबा', 'Lamba', '📏'),
          n('Ball', 'गेंद', 'Gend', '⚽'), n('Book', 'किताब', 'Kitaab', '📖'),
          n('Box', 'बक्सा', 'Baksa', '📦'), n('Kite', 'पतंग', 'Patang', '🪁'),
          v('Look', 'देखो', 'Dekho', '👀'), v('Catch', 'पकड़ो', 'Pakdo', '🤲'),
          v('Throw', 'फेंको', 'Phenko', '🤾'),
        ],
      },
      {
        id: 'g3-4',
        title: 'Animals & Sounds',
        hindi: 'जानवर और आवाज़ें',
        cbse: 'Veena (Cl 3) · हमारा पर्यावरण',
        focus: 'Describe & command animals; build short action phrases.',
        blocks: [
          n('Dog', 'कुत्ता', 'Kutta', '🐶'), n('Cat', 'बिल्ली', 'Billi', '🐱'),
          n('Monkey', 'बंदर', 'Bandar', '🐒'), n('Fish', 'मछली', 'Machhli', '🐟'),
          n('Bird', 'चिड़िया', 'Chidiya', '🐦'), n('Snake', 'साँप', 'Saanp', '🐍'),
          a('Fast', 'तेज़', 'Tez', '⚡'), a('Big', 'बड़ा', 'Bada', '🐘'),
          a('Cute', 'प्यारा', 'Pyaara', '🥰'),
          v('Run', 'भागो', 'Bhaago', '🏃'), v('Jump', 'कूदो', 'Koodo', '🦘'),
          v('Fly', 'उड़ो', 'Udo', '🕊️'),
        ],
      },
      {
        id: 'g3-5',
        title: 'Food & Taste',
        hindi: 'खाना और स्वाद',
        cbse: 'Veena (Cl 3) · खानपान',
        focus: 'Food vocabulary; taste adjectives; खाओ / पियो commands.',
        blocks: [
          n('Bread', 'रोटी', 'Roti', '🫓'), n('Rice', 'चावल', 'Chawal', '🍚'),
          n('Milk', 'दूध', 'Doodh', '🥛'), n('Mango', 'आम', 'Aam', '🥭'),
          n('Water', 'पानी', 'Paani', '💧'), n('Apple', 'सेब', 'Seb', '🍎'),
          a('Sweet', 'मीठा', 'Meetha', '🍬'), a('Hot', 'गरम', 'Garam', '🔥'),
          a('Cold', 'ठंडा', 'Thanda', '🧊'), a('Tasty', 'स्वादिष्ट', 'Swaadisht', '😋'),
          v('Eat', 'खाओ', 'Khao', '😋'), v('Drink', 'पियो', 'Piyo', '🥤'),
          v('Cook', 'पकाओ', 'Pakao', '🍳'),
        ],
      },
      {
        id: 'g3-6',
        title: 'My Day & Actions',
        hindi: 'मेरा दिन',
        cbse: 'Veena (Cl 3) · अपना-अपना काम',
        focus: 'Daily-routine verbs; sequence simple actions.',
        blocks: [
          n('School', 'स्कूल', 'School', '🏫'), n('Home', 'घर', 'Ghar', '🏠'),
          n('Book', 'किताब', 'Kitaab', '📖'), n('Bus', 'बस', 'Bus', '🚌'),
          a('New', 'नया', 'Naya', '✨'), a('Old', 'पुराना', 'Purana', '📦'),
          a('Clean', 'साफ़', 'Saaf', '🧽'),
          v('Get up', 'उठो', 'Utho', '🛏️'), v('Go', 'जाओ', 'Jao', '🚶'),
          v('Read', 'पढ़ो', 'Padho', '📖'), v('Play', 'खेलो', 'Khelo', '🤾'),
          v('Sleep', 'सोओ', 'Soo', '😴'),
        ],
      },
      {
        id: 'g3-7',
        title: 'Things & Places',
        hindi: 'चीज़ें और जगह',
        cbse: 'Veena (Cl 3) · घर व पर्यावरण',
        focus: 'Household things; intro postpositions में / पर / के पास.',
        blocks: [
          n('Table', 'मेज़', 'Mez', '🪵'), n('Chair', 'कुर्सी', 'Kursi', '🪑'),
          n('Bag', 'बैग', 'Bag', '🎒'), n('Room', 'कमरा', 'Kamra', '🚪'),
          a('Big', 'बड़ा', 'Bada', '🐘'), a('Small', 'छोटा', 'Chhota', '🐭'),
          a('Empty', 'खाली', 'Khaali', '🕳️'), a('Full', 'भरा', 'Bhara', '🧺'),
          v('Put', 'रखो', 'Rakho', '📥'), v('Bring', 'लाओ', 'Laao', '🤲'),
          v('Find', 'ढूँढो', 'Dhoondo', '🔎'),
        ],
      },
      {
        id: 'g3-8',
        title: 'What? Who? Where?',
        hindi: 'क्या? कौन? कहाँ?',
        cbse: 'वाचन · प्रश्न व बातचीत',
        focus: 'Ask & answer: यह क्या है? — यह … है. (Secret Agents core.)',
        blocks: [
          n('Car', 'गाड़ी', 'Gaadi', '🚗'), n('Doll', 'गुड़िया', 'Gudiya', '🪆'),
          n('Clock', 'घड़ी', 'Ghadi', '⏰'), n('Key', 'चाबी', 'Chaabi', '🔑'),
          n('Ball', 'गेंद', 'Gend', '⚽'),
          a('New', 'नया', 'Naya', '✨'), a('Old', 'पुराना', 'Purana', '📦'),
          a('Pretty', 'सुंदर', 'Sundar', '🌟'),
          v('Look', 'देखो', 'Dekho', '👀'), v('Tell', 'बताओ', 'Batao', '🗣️'),
          v('Find', 'ढूँढो', 'Dhoondo', '🔎'),
        ],
      },
    ],
  },
  // Future grades — authored later. Kept here so the level structure (and the
  // picker's "coming soon" entries) reflect the full curriculum roadmap.
  { id: 'grade4', title: 'Grade 4', subtitle: 'Coming soon', locked: true, units: [] },
  { id: 'grade5', title: 'Grade 5', subtitle: 'Coming soon', locked: true, units: [] },
]

// ---- Build: stamp unique ids + colours, flatten lookups ---------------------

export const LEVELS = LEVELS_RAW.map((lvl) => ({
  ...lvl,
  units: lvl.units.map((u) => ({
    ...u,
    levelId: lvl.id,
    blocks: u.blocks.map((b, i) => ({ ...b, id: `${u.id}_${i}`, ui_color: colorFor(b.type) })),
  })),
}))

export const PLAYABLE_LEVELS = LEVELS.filter((l) => !l.locked && l.units.length)

const ALL_BLOCKS = [...CORE, ...LEVELS.flatMap((l) => l.units.flatMap((u) => u.blocks))]

// ---- Lookup helpers ---------------------------------------------------------

/** Global id lookup across CORE + every unit (ids are unique). */
export const getBlock = (id) => ALL_BLOCKS.find((b) => b.id === id)

export const findUnit = (levelId, unitId) =>
  LEVELS.find((l) => l.id === levelId)?.units.find((u) => u.id === unitId)

export const firstUnitOf = (levelId) =>
  LEVELS.find((l) => l.id === levelId)?.units[0]

export const DEFAULT_LEVEL = 'grade3'
export const DEFAULT_UNIT = firstUnitOf(DEFAULT_LEVEL)?.id
