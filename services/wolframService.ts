/**
 * Service to handle communication with Wolfram Cloud.
 */

// -----------------------------------------------------------------------------
// CONFIGURATION
// -----------------------------------------------------------------------------

const WOLFRAM_CLOUD_URL =
  process.env.NEXT_PUBLIC_WOLFRAM_CLOUD_URL ??
  "https://www.wolframcloud.com/obj/achavezt1900/forensicSketchAPI";

// -----------------------------------------------------------------------------
// TYPES
// -----------------------------------------------------------------------------

export interface WolframFeatures {
  gender?: string | null;
  face?: {
    shape?: string | null;
    skinTone?: string | null;
    skinTexture?: string | null;
  };
  eyes?: {
    size?: string | null;
    shape?: string | null;
    color?: string | null;
    spacing?: string | null;
  };
  eyebrows?: {
    type?: string | null;
    density?: string | null;
  };
  nose?: {
    size?: string | null;
    shape?: string | null;
  };
  mouth?: {
    size?: string | null;
    lips?: string | null;
  };
  hair?: {
    color?: string | null;
    length?: string | null;
    density?: string | null;
    style?: string | null;
  };
  body?: {
    build?: string | null;
    posture?: string | null;
    tone?: string | null;
    weight?: string | null;
  };
  clothing?: string | null;
  otherFeatures?: string | null;
  [key: string]: unknown;
}

export interface WolframResponse {
  rawText?: string;
  tokens?: string[];
  processedText?: string;
  features?: WolframFeatures;
  error?: string;
  [key: string]: unknown;
}

const pickFrom =
  (primary: string, fallback?: string) =>
  (obj: Record<string, unknown> = {}): string | null | undefined => {
    const primaryValue = obj[primary];
    if (primaryValue !== undefined) return primaryValue as string | null;
    if (fallback && obj[fallback] !== undefined) return obj[fallback] as string | null;
    return undefined;
  };

const normalizeFeatures = (raw: unknown): WolframFeatures => {
  if (!raw || typeof raw !== "object") return {};

  const source =
    (raw as Record<string, unknown>).features &&
    typeof (raw as Record<string, unknown>).features === "object"
      ? ((raw as Record<string, unknown>).features as Record<string, unknown>)
      : (raw as Record<string, unknown>);

  const faceSource = (source.face as Record<string, unknown>) ?? (source.rostro as Record<string, unknown>) ?? {};
  const eyesSource = (source.eyes as Record<string, unknown>) ?? (source.ojos as Record<string, unknown>) ?? {};
  const eyebrowsSource =
    (source.eyebrows as Record<string, unknown>) ?? (source.cejas as Record<string, unknown>) ?? {};
  const noseSource = (source.nose as Record<string, unknown>) ?? (source.nariz as Record<string, unknown>) ?? {};
  const mouthSource = (source.mouth as Record<string, unknown>) ?? (source.boca as Record<string, unknown>) ?? {};
  const hairSource = (source.hair as Record<string, unknown>) ?? (source.cabello as Record<string, unknown>) ?? {};
  const bodySource = (source.body as Record<string, unknown>) ?? (source.cuerpo as Record<string, unknown>) ?? {};

  return {
    gender: (source.gender as string | null) ?? (source.genero as string | null) ?? null,
    face: {
      shape: pickFrom("shape", "forma")(faceSource) ?? null,
      skinTone: pickFrom("skinTone", "tonoPiel")(faceSource) ?? null,
      skinTexture: pickFrom("skinTexture", "texturaPiel")(faceSource) ?? null,
    },
    eyes: {
      size:
        pickFrom("size", "tama\u00f1o")(eyesSource) ??
        pickFrom("size", "tamano")(eyesSource) ??
        pickFrom("tama\u00f1o")(eyesSource) ??
        pickFrom("tamano")(eyesSource) ??
        null,
      shape: pickFrom("shape", "forma")(eyesSource) ?? null,
      color: pickFrom("color")(eyesSource) ?? null,
      spacing: pickFrom("spacing", "espacio")(eyesSource) ?? null,
    },
    eyebrows: {
      type: pickFrom("type", "tipo")(eyebrowsSource) ?? null,
      density: pickFrom("density", "densidad")(eyebrowsSource) ?? null,
    },
    nose: {
      size:
        pickFrom("size", "tama\u00f1o")(noseSource) ??
        pickFrom("size", "tamano")(noseSource) ??
        pickFrom("tama\u00f1o")(noseSource) ??
        pickFrom("tamano")(noseSource) ??
        null,
      shape: pickFrom("shape", "forma")(noseSource) ?? null,
    },
    mouth: {
      size:
        pickFrom("size", "tama\u00f1o")(mouthSource) ??
        pickFrom("size", "tamano")(mouthSource) ??
        pickFrom("tama\u00f1o")(mouthSource) ??
        pickFrom("tamano")(mouthSource) ??
        null,
      lips: pickFrom("lips", "labios")(mouthSource) ?? null,
    },
    hair: {
      color: pickFrom("color")(hairSource) ?? null,
      length: pickFrom("length", "largo")(hairSource) ?? null,
      density: pickFrom("density", "densidad")(hairSource) ?? null,
      style: pickFrom("style", "estilo")(hairSource) ?? null,
    },
    body: {
      build: pickFrom("build", "complexion")(bodySource) ?? null,
      posture: pickFrom("posture", "postura")(bodySource) ?? null,
      tone: pickFrom("tone", "tono")(bodySource) ?? null,
      weight: pickFrom("weight", "peso")(bodySource) ?? null,
    },
    clothing: pickFrom("clothing", "ropa")(source) ?? null,
    otherFeatures: pickFrom("otherFeatures", "otrasCaracteristicas")(source) ?? null,
  };
};

// -----------------------------------------------------------------------------
// MAIN FUNCTION
// -----------------------------------------------------------------------------

export const analyzeTextWithWolfram = async (
  text: string
): Promise<WolframResponse> => {
  if (!text || text.trim() === "") {
    console.warn("Attempted to send empty text to Wolfram.");
    return {};
  }

  try {
    const body = new URLSearchParams({ text });

    const response = await fetch(WOLFRAM_CLOUD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
    });

    const result = await response.json();
    const normalizedFeatures = normalizeFeatures(result);

    console.log("Wolfram response:", result);

    if (!response.ok) {
      throw new Error(result?.error ?? "Unknown error from Wolfram Cloud");
    }

    return { ...result, features: normalizedFeatures };
  } catch (error) {
    console.error("Error connecting to Wolfram Cloud:", error);
    return {
      error: String(error),
    };
  }
};
