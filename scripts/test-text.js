const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");

async function main() {
  const envPath = path.join(__dirname, "..", ".env.local");
  let apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey && fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, "utf8");
    const match = content.match(/GEMINI_API_KEY=(.+)/);
    if (match) {
      apiKey = match[1].trim();
    }
  }

  if (!apiKey) {
    console.error("❌ No API Key found");
    process.exit(1);
  }

  console.log("✅ API Key found (length: " + apiKey.length + ")");
  // Force v1 API version
  const ai = new GoogleGenAI({ apiKey, apiVersion: 'v1' });

  const modelsToTry = ["gemini-1.5-flash", "models/gemini-1.5-flash", "gemini-pro", "gemini-1.0-pro"];
  
  for (const model of modelsToTry) {
    try {
      console.log(`\n🚀 Testing ${model}...`);
      const result = await ai.models.generateContent({
        model: model,
        contents: [{ role: "user", parts: [{ text: "Hi" }] }]
      });
      console.log(`✅ Success with ${model}!`);
      console.log("Response:", result.response.candidates[0].content.parts[0].text);
      break; // Stop if one works
    } catch (error) {
      console.error(`❌ Failed with ${model}:`, error.message);
    }
  }
}

main();
