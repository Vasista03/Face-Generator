const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");

async function main() {
  // 1. Read API Key from .env.local
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
    console.error("❌ No API Key found in environment or .env.local");
    process.exit(1);
  }

  console.log("✅ API Key found (length: " + apiKey.length + ")");

  // 2. Initialize SDK
  const ai = new GoogleGenAI({ apiKey });

  console.log("SDK Client keys:", Object.keys(ai));
  if (ai.models) {
    console.log("ai.models keys:", Object.keys(ai.models));
    console.log("ai.models prototype:", Object.getPrototypeOf(ai.models));
  } else {
    console.log("ai.models is undefined");
  }

  // Try to find the list method
  try {
      console.log("🔍 Listing models...");
      // In @google/genai v1, list() returns a paginated response or promise
      const response = await ai.models.list();
      
      // Handle if response is a paginated object with a page of models
      const models = response.models || response; 

      if (Array.isArray(models)) {
          console.log(`\n📋 Found ${models.length} models:`);
          models.forEach(model => {
              const methods = model.supportedGenerationMethods || [];
              console.log(`- ${model.name}`);
              console.log(`  Methods: ${methods.join(", ")}`);
          });
      } else {
          console.log("Response is not an array:", JSON.stringify(response, null, 2));
      }

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

main();
