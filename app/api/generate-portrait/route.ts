// pages/api/generate-image.ts (Next.js / route handler)
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai"; // Official SDK; install: npm i @google/genai
import * as fs from "node:fs";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("❌ GEMINI_API_KEY is not set in environment variables");
      throw new Error("Missing GEMINI_API_KEY in env");
    }

    console.log("✅ API Key found, initializing Gemini client...");
    
    // Initialize client according to official SDK
    const ai = new GoogleGenAI({ apiKey });

    // Use the correct model for image generation
    // Confirmed available model from list
    const modelName = "gemini-2.0-flash-exp-image-generation";
    
    console.log(`🎨 Using model: ${modelName}`);
    console.log(`📝 Prompt length: ${prompt.length} characters`);

    // Generate 3 images in parallel
    const promises = Array(3)
      .fill(null)
      .map((_, index) => {
        console.log(`🚀 Starting generation ${index + 1}/3...`);
        return ai.models.generateContent({
          model: modelName,
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ],
          config: {
            responseModalities: ["image"]
          }
        });
      });

    const results = await Promise.allSettled(promises);

    const images = results
      .map((pResult, index) => {
        if (pResult.status === "rejected") {
          console.error(`❌ Generation ${index + 1} failed:`, pResult.reason);
          console.error(`   Error message:`, pResult.reason?.message);
          console.error(`   Error stack:`, pResult.reason?.stack?.split('\n').slice(0, 3));
          return null;
        }
        const result = pResult.value;
        
        // Log the full response structure for debugging
        console.log(`📦 Generation ${index + 1} response structure:`, {
          hasCandidates: !!result.candidates,
          candidatesLength: result.candidates?.length,
          hasContent: !!result.candidates?.[0]?.content,
          hasParts: !!result.candidates?.[0]?.content?.parts,
          partsLength: result.candidates?.[0]?.content?.parts?.length
        });
        
        const parts = result.candidates?.[0]?.content?.parts;
        const imageBase64 = parts?.find((p: any) => p.inlineData)?.inlineData?.data;
        
        if (imageBase64) {
          console.log(`✅ Generation ${index + 1} succeeded (${imageBase64.length} chars)`);
          return `data:image/png;base64,${imageBase64}`;
        } else {
          console.warn(`⚠️ Generation ${index + 1} returned no image data`);
          console.warn(`   Parts:`, JSON.stringify(parts, null, 2));
          return null;
        }
      })
      .filter((img) => img !== null);

    if (images.length === 0) {
      console.error("❌ No images generated. All requests failed or returned no data.");
      const reasons = results.map((r, i) => ({
        index: i + 1,
        status: r.status,
        reason: r.status === "rejected" ? r.reason?.message : "No image data"
      }));
      console.error("Results summary:", reasons);
      
      return NextResponse.json(
        { 
          error: "Could not generate images.", 
          details: reasons,
          debug: "Check browser console network tab for full details"
        },
        { status: 500 }
      );
    }

    console.log(`🎉 Successfully generated ${images.length} images`);
    return NextResponse.json({ results: images });
  } catch (err: any) {
    console.error("❌ Error calling Gemini image API:", err);
    
    return NextResponse.json(
      { 
        error: err?.message || "Error generating image with Gemini",
        stack: err?.stack?.split('\n').slice(0, 3)
      },
      { status: 500 }
    );
  }
}
