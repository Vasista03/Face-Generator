const https = require('https');
const fs = require('fs');
const path = require('path');

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
  console.error("No API Key");
  process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log(`Requesting: ${url.replace(apiKey, "HIDDEN_KEY")}`);

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log(`Status Code: ${res.statusCode}`);
    try {
      const json = JSON.parse(data);
      if (json.models) {
        const output = json.models.map(m => 
          `Name: ${m.name}\nMethods: ${m.supportedGenerationMethods?.join(', ')}\n---`
        ).join('\n');
        fs.writeFileSync('models.txt', output);
        console.log(`✅ Wrote ${json.models.length} models to models.txt`);
      } else {
        console.log("❌ Response:", JSON.stringify(json, null, 2));
      }
    } catch (e) {
      console.log("Raw body:", data);
    }
  });
}).on('error', (err) => {
  console.error("Error:", err.message);
});
