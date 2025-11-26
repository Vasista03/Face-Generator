# Face Generator from Spoken Descriptions

**Next.js + Speech-to-Text + Wolfram NLP + Gemini**

This project turns spoken descriptions of people into AI-generated portrait sketches. It captures voice input, converts it to text, extracts physical traits with Wolfram Language NLP, and builds a structured prompt to generate an image with Gemini.

End-to-end flow: voice input -> text -> trait extraction -> JSON -> artistic portrait.

---

## Key Features

- Voice input using browser speech recognition.
- Speech-to-text integrated in the front end.
- Text analysis and physical trait extraction with Wolfram Language (NLP).
- Structured JSON generation for detected traits.
- Portrait generation with Gemini 3.0.
- Modern interface built with Next.js.

---

## Tech Stack

### Frontend
- Next.js
- React
- Speech-to-Text
- TailwindCSS

### Backend / Processing
- Wolfram Language:
  - TextCases
  - Entity extraction
  - NLP for physical traits
  - JSON export
- Gemini 3.0 (requires a Gemini API key)

---

## Installation

1) Clone the repository
```bash
git clone https://github.com/Antxnszn/hackathon-UPIITA.git
cd hackathon-UPIITA
```

2) Install dependencies (Node/Next.js)
```bash
npm i
npm i next
npm i react
npm i --save-dev typescript @types/react @types/node
```

3) Run the development server
```bash
npm run dev
```

---

## Notes

- Set an environment variable in `.env.local`: `GEMINI_API_KEY={YOUR_API_KEY}`. You can obtain a free trial key at https://aistudio.google.com/ under Image Generation (a payment method may be required for verification).
- Due to how Next.js speech-to-text works, the project should be run in Chrome for full compatibility.
