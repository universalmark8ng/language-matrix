# DS Learning — Hindi Curriculum (Language Matrix)

**Learner profile:** absolute-beginner heritage learners, ~Grade 3 age (8 yrs).
**Approach:** beginner-adapted, **aligned to the current NCERT/CBSE Hindi
syllabus (NCF-SE 2023 / NEP 2020)**, **speaking & listening first**, Devanagari
**recognition only** this year (no handwriting). Content is everyday
conversational Hindi — *not* literary/scholarly.

This document is the teaching backbone. The vocabulary for every unit is also
encoded in [`src/data/curriculum.js`](../src/data/curriculum.js), which drives
the three app activities — so the curriculum and the prototype stay in sync.

> **Provenance:** the Hindi vocabulary and unit design were authored by DS
> Learning. The NCERT alignment below was verified against current sources
> (June 2026) — see **§12 Sources**. ⚠️ NCERT **replaced *Rimjhim*** under NCF-SE
> 2023; the current books are **Sarangi** (Cl 1–2) and **Veena** (Cl 3–5).

---

## 1. The current NCERT Hindi books & NCF stages

Under NEP 2020 / NCF-SE 2023, NCERT rolled out new Hindi textbooks, replacing
*Rimjhim* (and *Marigold*, *Math-Magic*, etc.):

| NCF Stage | Classes | Hindi textbook |
|---|---|---|
| **Foundational** | 1–2 | **सारंगी / Sarangi** |
| **Preparatory** | 3–5 | **वीणा / Veena** |

Our learners are Grade-3 age but **absolute beginners**, so we target **Veena
(Class 3)** as the destination while first rebuilding the **Foundational
(Sarangi)** vocabulary a native Class 3 child already owns.

CBSE's four language strands frame everything:

| Strand | Hindi | This year's emphasis |
|---|---|---|
| Listening | श्रवण (Shravan) | **High** — hear & understand spoken words/phrases |
| Speaking | वाचन (Vachan) | **High** — say words, build & speak short sentences |
| Reading | पठन (Pathan) | **Recognition only** — match sound ↔ Devanagari word/letter |
| Writing | लेखन (Lekhan) | **Deferred** — optional letter tracing late in the year |

---

## 2. The actual Class 3 *Veena* syllabus (reference)

Veena (Cl 3) has **18 chapters across 5 thematic units**. These chapters are
**story- and values-based for already-literate native readers** (folk tales,
poems, a Chandrayaan dialogue), so we don't teach them verbatim — we use their
**themes** as our destination and teach the underlying vocabulary first.

| Unit | Theme | Chapters |
|---|---|---|
| 1 | **हमारा पर्यावरण** (Our Environment) | सीखो · चींटी · कितने पैर? · बया हमारी चिड़िया रानी! · आम का पेड़ |
| 2 | **हमारे मित्र** (Our Friends) | बीरबल की खिचड़ी · मित्र को पत्र · चतुर गीदड़ · प्रकृति पर्व–फूलदेई |
| 3 | **आओ खेलें** (Let's Play) | रस्साकशी · एक जादुई पिटारा |
| 4 | **अपना-अपना काम** (Our Own Work) | अपना-अपना काम · पेड़ों की अम्मा 'थिमक्का' · किसान की होशियारी |
| 5 | **हमारा देश** (Our Country) | भारत · चंद्रयान (संवाद) · बोलने वाली माँद · हम अनेक किंतु एक |

*Sarangi (Cl 1–2)* themes we draw on for the Review baseline: परिवार (family —
Sarangi 2, Unit 1), हमारा खानपान (food & drink), जानवर/चींटी (animals/insects),
रंग, शरीर, घर, मौसम.

---

## 3. How the curriculum maps to the app

Each **unit** loads its themed vocabulary into all three activities. The
mechanics are fixed; the words change per unit.

| Activity | Skill drilled | Structure taught |
|---|---|---|
| 🤖 **Command-A-Robot** | Speaking + word order | Adjective → Noun → Verb (e.g. *लाल सेब खाओ* — "eat the red apple") |
| 🧪 **Magic Cauldron** | Vocabulary + describing | Adjective + Noun fusion (e.g. *बड़ी बिल्ली* — "big cat") |
| 🕵️ **Secret Agents** | Listening + Q&A | *यह क्या है?* → *यह … है* ("what is this?" → "this is a …") |

**Assessment is built in:** the Teacher bar logs a 5★ rating + note per round,
stamped with the active **mode and unit** → instant formative records per child.

---

## 4. Pathway at a glance

| Level | NCF stage / book | Purpose | Units |
|---|---|---|---|
| **Foundations Review** | Foundational · Sarangi (Cl 1–2) | Diagnostic baseline + catch-up | 3 |
| **Grade 3 Core** | Preparatory · Veena (Cl 3) | Main coverage | 8 |
| **Grade 4** | Preparatory · Veena (Cl 4) | (outline — built later) | — |
| **Grade 5** | Preparatory · Veena (Cl 5) | (outline — built later) | — |

---

## 5. Strand A — Foundations Review (Sarangi, Cl 1–2) · *diagnostic*

Use these to **find each child's starting point** before Grade 3 proper: can they
recognise the picture, say the word, point to the matching Devanagari?

| # | Unit | Hindi | Sarangi link | What to check |
|---|---|---|---|---|
| R1 | Colours & Counting | रंग और गिनती | रंग, गिनती | Colours, 1–10, name common objects |
| R2 | Family & Body | परिवार और शरीर | इकाई 1 परिवार; शरीर | Family members, body parts, follow instructions |
| R3 | Animals & Home | जानवर और घर | जानवर, घर | Common animals, household things, opposites |

**Entry diagnostic (10 min, in-app):** run each review unit through
Command-A-Robot and Secret Agents; log ★ per child. 0–2★ → start in Review;
3–4★ → start Grade 3. Numbers 1–10 (एक…दस) are practised orally as a warm-up.

---

## 6. Strand B — Grade 3 Core (Veena, Cl 3)

Eight beginner units that build the vocabulary needed to access Veena's themes.
Each carries describing words, things and actions so all activities work, and
each foregrounds one structure. The **Veena link** column shows which real Class
3 unit each maps toward.

| # | Unit | Hindi | Veena (Cl 3) link | Structure focus |
|---|---|---|---|---|
| 1 | Greetings & Myself | नमस्ते! मैं कौन हूँ? | U2 हमारे मित्र | Greet, self-intro; मैं / तुम |
| 2 | My Family | मेरा परिवार | (Sarangi परिवार → people) | यह मेरा/मेरी … है |
| 3 | Colours, Shapes & Sizes | रंग, आकार और साइज़ | Foundational vocab | Adjective + noun agreement (gentle) |
| 4 | Animals & Sounds | जानवर और आवाज़ें | U1 हमारा पर्यावरण (चींटी, कितने पैर?, बया चिड़िया) | Command + describe animals |
| 5 | Food & Taste | खाना और स्वाद | U1 आम का पेड़ / खानपान | Taste adjectives; खाओ / पियो |
| 6 | My Day & Actions | मेरा दिन | U3 आओ खेलें · U4 अपना-अपना काम | Routine verbs; sequencing |
| 7 | Things & Places | चीज़ें और जगह | U1 घर व पर्यावरण | Postpositions में / पर / के पास |
| 8 | What? Who? Where? | क्या? कौन? कहाँ? | वाचन — प्रश्न व बातचीत | Question words; full Q&A loop |

### Suggested term plan (spiral, ~24–30 sessions)

- **Term 1:** Review R1–R3 + Units 1–3 (greetings, family, colours/adjectives).
- **Term 2:** Units 4–6 (animals, food, daily routine) — verbs & commands deepen.
- **Term 3:** Units 7–8 (places, questions) — full conversational Q&A; revisit
  weak areas; optional festival/seasonal enrichment (त्योहार · फूलदेई, मौसम).

Each unit ≈ 2–3 sessions: **(1)** listen & repeat new words → **(2)** build with
Command-A-Robot / Magic Cauldron → **(3)** Secret Agents Q&A + ★ assessment.

---

## 7. Grammar & structures ladder — Grade 3 targets

Introduced **gently and orally**, never as written rules:

1. **Naming:** यह / वह + noun + है — *"this/that is a …"*
2. **Describing:** adjective + noun — *बड़ा कुत्ता* (intro gender: बड़ा/बड़ी, अच्छा/अच्छी)
3. **Commands (imperative):** verb-ओ — *खाओ, रुको, देखो, सुनो*
4. **Simple statements:** subject + object + verb word order
5. **Questions:** क्या, कौन, कहाँ, कैसा — and yes/no (हाँ / नहीं)
6. **Pronouns:** मैं, तुम, यह, वह, हम
7. **Place (postpositions):** में (in), पर (on), के पास (near) — Unit 7
8. **Number:** singular vs plural awareness (एक बिल्ली / दो बिल्लियाँ) — exposure only

> Gender agreement is **modelled, not enforced** — the block game lets kids mix
> freely (e.g. *बड़ा बिल्ली*); the tutor models the correct *बड़ी बिल्ली* in speech.
> Formal agreement drilling is a Class 4 target.

---

## 8. Devanagari recognition track (recognition only)

Run alongside speaking; **no handwriting** this year.

- **स्वर (vowels):** अ आ इ ई उ ऊ ए ऐ ओ औ अं अः — recognise & sound out.
- **High-frequency व्यंजन:** क ख ग म न प र स त द ल ह — recognise in words.
- **Sight words:** the Devanagari on each block (माँ, सेब, घर, यह, है …) becomes a
  whole-word "sight word" through repeated exposure in the app.
- **Year-end goal:** recognise all vowels, ~12 common consonants, ~40
  high-frequency whole words by shape + sound. (Writing/matras → Class 4.)

---

## 9. Assessment & reporting

| Type | Tool | Cadence |
|---|---|---|
| **Entry diagnostic** | Review units in-app + observation | Once, at start |
| **Formative** | Teacher bar ★ + notes (per mode + unit) | Every session |
| **Unit checkpoint** | Secret Agents Q&A accuracy + speaking confidence | End of each unit |
| **Term review** | Re-run earlier units; compare ★ trend | End of term |

**Rubric (per unit, per child) — 1–5★:** Listening (identifies spoken
word/picture) · Speaking (says word clearly; attempts the sentence) · Reading
(matches sound to Devanagari) · Engagement (participation & confidence — matters
most at this age). Writing is **not graded** this year.

---

## 10. Strand C — Class 4 & 5 forward map (Veena · outline, build later)

**Class 4 — Veena:**
- Tenses: simple present (करता है / करती है); intro past (खाया).
- Gender & number **agreement** taught explicitly; plurals.
- More postpositions; conjunctions और / लेकिन / क्योंकि.
- Reading short sentences & 3–4 line passages (comprehension).
- Writing begins: **copying** words & short phrases (guided).
- Devanagari: matras (ा ि ी ु ू े ै ो ौ), reading CV–CVC words.

**Class 5 — Veena (12 chapters):**
- Paragraph reading & comprehension; sequencing a short story.
- Guided composition (4–5 sentences); picture description.
- Tenses across past/present/future; opposites & synonyms; simple idioms.
- Intro to informal letter / message writing.
- Richer thematic vocabulary (festivals, nature, community, civic — cf. Veena
  Cl 3 U5 हमारा देश as a foreshadow).

These become new **levels** in the app (`grade4`, `grade5` already stubbed in the
data model) with their own units when authored.

---

## 11. Alignment notes & caveats

- Theme world follows **NCERT Sarangi (Cl 1–2)** and **Veena (Cl 3)** under
  **NCF-SE 2023**, with the NCF emphasis on oral-first early-language learning.
- **Re-sequenced for heritage beginners:** the foundational vocabulary a native
  CBSE child already has is taught explicitly here as Review.
- **Veena chapters are not taught verbatim** — they are literary/values texts for
  literate native readers (folk tales, poems, dialogues). We adopt their
  **themes** and teach the spoken vocabulary that unlocks them later.
- **Third-language / heritage pacing:** slower script onboarding than the native
  track; speaking confidence is the leading indicator, not literacy.
- ⚠️ Mapping of our beginner units to specific Veena units is **our pedagogical
  interpretation**, not an official NCERT scope-and-sequence. Recommend a native
  Hindi educator reviews vocabulary (esp. gender forms) before classroom use.

---

## 12. Sources (verified June 2026)

- NCERT Class 3 Hindi **Veena** — chapter/unit list:
  [learncbse.in/ncert-solutions-class-3-hindi](https://www.learncbse.in/ncert-solutions-class-3-hindi/)
- NCERT Class 1–2 Hindi **Sarangi** (incl. Cl 2 Unit 1 परिवार):
  [CIET/NCERT Sarangi 2 audio-book](https://ciet.ncert.gov.in/audio-book/120) ·
  [kvsecontent.com — Class 2 Sarangi इकाई 1: परिवार](https://kvsecontent.com/class-2-hindi-book-solu)
- NCERT Class 4 & 5 Hindi now **Veena** (replacing Rimjhim), NCF-SE 2023:
  [vedantu — Class 4 Hindi Veena](https://www.vedantu.com/ncert-books/ncert-books-class-4-hindi) ·
  [vedantu — Class 5 Hindi Veena](https://www.vedantu.com/ncert-books/ncert-books-class-5-hindi)
- Official NCERT textbooks portal: [ncert.nic.in/textbook.php](https://ncert.nic.in/textbook.php)

---

## 13. Appendix — vocabulary source

The authoritative per-unit word lists (Devanagari + transliteration + English +
emoji + part of speech) live in
[`src/data/curriculum.js`](../src/data/curriculum.js). Editing that file updates
both the app and this curriculum's content simultaneously.
