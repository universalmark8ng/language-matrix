// ---------------------------------------------------------------------------
// SOUND MAP — pronunciation helper (NOT the Devanagari alphabet).
//
// Goal is COLLOQUIAL Hindi, so we don't teach script. But the romanisation the
// kids read reuses English letters for sounds Hindi keeps separate — above all
// the "breathy" (aspirated) consonants: k vs kh, g vs gh, d vs dh… The second of
// each pair is the same sound + a puff of air. Getting these right is the single
// biggest win for being understood. Each sound is anchored to a familiar word.
// ---------------------------------------------------------------------------

// Soft (plain) vs breathy (aspirated) consonant pairs.
export const BREATHY_PAIRS = [
  {
    plain: { roman: 'k', hi: 'क', word: 'काला', tr: 'Kaala', en: 'black', emoji: '⚫' },
    breathy: { roman: 'kh', hi: 'ख', word: 'खाओ', tr: 'Khao', en: 'eat', emoji: '😋' },
  },
  {
    plain: { roman: 'g', hi: 'ग', word: 'गाड़ी', tr: 'Gaadi', en: 'car', emoji: '🚗' },
    breathy: { roman: 'gh', hi: 'घ', word: 'घर', tr: 'Ghar', en: 'home', emoji: '🏠' },
  },
  {
    plain: { roman: 'ch', hi: 'च', word: 'चाबी', tr: 'Chaabi', en: 'key', emoji: '🔑' },
    breathy: { roman: 'chh', hi: 'छ', word: 'छोटा', tr: 'Chhota', en: 'small', emoji: '🐭' },
  },
  {
    plain: { roman: 'j', hi: 'ज', word: 'जूता', tr: 'Joota', en: 'shoe', emoji: '👟' },
    breathy: { roman: 'jh', hi: 'झ', word: 'झंडा', tr: 'Jhanda', en: 'flag', emoji: '🚩' },
  },
  {
    plain: { roman: 't', hi: 'त', word: 'तेज़', tr: 'Tez', en: 'fast', emoji: '⚡' },
    breathy: { roman: 'th', hi: 'थ', word: 'थैला', tr: 'Thaila', en: 'bag', emoji: '🛍️' },
  },
  {
    plain: { roman: 'd', hi: 'द', word: 'दूध', tr: 'Doodh', en: 'milk', emoji: '🥛' },
    breathy: { roman: 'dh', hi: 'ध', word: 'धोओ', tr: 'Dhoo', en: 'wash', emoji: '🧼' },
  },
  {
    plain: { roman: 'p', hi: 'प', word: 'पानी', tr: 'Paani', en: 'water', emoji: '💧' },
    breathy: { roman: 'ph', hi: 'फ', word: 'फूल', tr: 'Phool', en: 'flower', emoji: '🌸' },
  },
  {
    plain: { roman: 'b', hi: 'ब', word: 'बड़ा', tr: 'Bada', en: 'big', emoji: '🐘' },
    breathy: { roman: 'bh', hi: 'भ', word: 'भागो', tr: 'Bhaago', en: 'run', emoji: '🏃' },
  },
]

// Short vs long vowels — "hold the long one longer."
export const VOWEL_PAIRS = [
  {
    short: { roman: 'a', hi: 'अ', word: 'अच्छा', tr: 'Achha', en: 'good', emoji: '👍' },
    long: { roman: 'aa', hi: 'आ', word: 'आम', tr: 'Aam', en: 'mango', emoji: '🥭' },
  },
  {
    short: { roman: 'i', hi: 'इ', word: 'बिल्ली', tr: 'Billi', en: 'cat', emoji: '🐱' },
    long: { roman: 'ee', hi: 'ई', word: 'पीला', tr: 'Peela', en: 'yellow', emoji: '🟡' },
  },
  {
    short: { roman: 'u', hi: 'उ', word: 'कुत्ता', tr: 'Kutta', en: 'dog', emoji: '🐶' },
    long: { roman: 'oo', hi: 'ऊ', word: 'दूध', tr: 'Doodh', en: 'milk', emoji: '🥛' },
  },
]
