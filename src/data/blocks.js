// ---------------------------------------------------------------------------
// Vocabulary data model.
//
// This is the ONLY file that knows about the specific language. To retarget the
// whole app (e.g. Mandarin), swap `languagePack` for a new one with the same
// shape — the modes read blocks purely by `type`, `ui_color`, and the text
// fields below, so no layout code needs to change.
// ---------------------------------------------------------------------------

export const hindiPack = {
  language_pair: 'en-hi',
  // BCP-47 tag used to pick a Text-to-Speech voice.
  speech_lang: 'hi-IN',
  matrix_blocks: [
    { id: 'noun_001', type: 'noun', english_meaning: 'Robot', target_script: 'रोबोट', target_transliteration: 'Robot', emoji: '🤖', ui_color: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { id: 'noun_002', type: 'noun', english_meaning: 'Monster', target_script: 'राक्षस', target_transliteration: 'Rakshas', emoji: '👹', ui_color: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { id: 'noun_003', type: 'noun', english_meaning: 'Apple', target_script: 'सेब', target_transliteration: 'Seb', emoji: '🍎', ui_color: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { id: 'noun_004', type: 'noun', english_meaning: 'Car', target_script: 'गाड़ी', target_transliteration: 'Gaadi', emoji: '🚗', ui_color: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { id: 'noun_005', type: 'noun', english_meaning: 'Cat', target_script: 'बिल्ली', target_transliteration: 'Billee', emoji: '🐱', ui_color: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { id: 'verb_001', type: 'verb', english_meaning: 'Eat', target_script: 'खाओ', target_transliteration: 'Khao', emoji: '😋', ui_color: 'bg-green-500 hover:bg-green-600 text-white' },
    { id: 'verb_002', type: 'verb', english_meaning: 'Run', target_script: 'भागो', target_transliteration: 'Bhaago', emoji: '🏃', ui_color: 'bg-green-500 hover:bg-green-600 text-white' },
    { id: 'verb_003', type: 'verb', english_meaning: 'Stop', target_script: 'रुको', target_transliteration: 'Ruko', emoji: '✋', ui_color: 'bg-green-500 hover:bg-green-600 text-white' },
    { id: 'verb_004', type: 'verb', english_meaning: 'Look', target_script: 'देखो', target_transliteration: 'Dekho', emoji: '👀', ui_color: 'bg-green-500 hover:bg-green-600 text-white' },
    { id: 'adj_001', type: 'adjective', english_meaning: 'Big', target_script: 'बड़ा', target_transliteration: 'Bada', emoji: '🐘', ui_color: 'bg-yellow-400 hover:bg-yellow-500 text-slate-900' },
    { id: 'adj_002', type: 'adjective', english_meaning: 'Red', target_script: 'लाल', target_transliteration: 'Laal', emoji: '🔴', ui_color: 'bg-yellow-400 hover:bg-yellow-500 text-slate-900' },
    { id: 'adj_003', type: 'adjective', english_meaning: 'Fast', target_script: 'तेज़', target_transliteration: 'Tez', emoji: '⚡', ui_color: 'bg-yellow-400 hover:bg-yellow-500 text-slate-900' },
    { id: 'util_001', type: 'question', english_meaning: 'What', target_script: 'क्या', target_transliteration: 'Kya', emoji: '❓', ui_color: 'bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'util_002', type: 'pronoun', english_meaning: 'This', target_script: 'यह', target_transliteration: 'Yeh', emoji: '👉', ui_color: 'bg-purple-500 hover:bg-purple-600 text-white' },
    { id: 'util_003', type: 'verb_aux', english_meaning: 'Is', target_script: 'है', target_transliteration: 'Hai', emoji: '➡️', ui_color: 'bg-purple-500 hover:bg-purple-600 text-white' },
  ],
}

// The pack the app currently runs on. Swap this single line to retarget.
export const languagePack = hindiPack

export const blocks = languagePack.matrix_blocks

// ---- Lookup helpers used across modes --------------------------------------

export const byId = (id) => blocks.find((b) => b.id === id)

export const byType = (...types) => blocks.filter((b) => types.includes(b.type))

// Friendly group headings for inventory panels.
export const TYPE_LABELS = {
  adjective: 'Describing Words',
  noun: 'Things',
  verb: 'Actions',
  question: 'Question Words',
  pronoun: 'Pointing Words',
  verb_aux: 'Linking Words',
}
