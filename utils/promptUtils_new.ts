import { PortraitFeatures } from "../services/nlpService";

/**
 * Generates a detailed prompt for Gemini based on extracted features.
 */
export const generateGeminiPrompt = (features: PortraitFeatures): string => {
  const getFeature = (
    value: string | null | undefined,
    fallback: string = "Not specified"
  ) => {
    return value && value !== "null" ? value : fallback;
  };

  const extras =
    features.otrasCaracteristicas && features.otrasCaracteristicas.trim().length
      ? features.otrasCaracteristicas.trim()
      : null;

  return `
Generate a realistic portrait based on the following physical description.

Gender: ${getFeature(features.genero)}

Face:
- Face shape: ${getFeature(features.rostro?.forma)}
- Skin tone: ${getFeature(features.rostro?.tonoPiel)}
- Skin texture: ${getFeature(features.rostro?.texturaPiel)}

Eyes:
- Eye spacing: ${getFeature(features.ojos?.espacio)}
- Size: ${getFeature(features.ojos?.tamaño)}
- Shape: ${getFeature(features.ojos?.forma)}
- Color: ${getFeature(features.ojos?.color)}

Eyebrows:
- Density: ${getFeature(features.cejas?.densidad)}
- Type: ${getFeature(features.cejas?.tipo)}

Nose:
- Size: ${getFeature(features.nariz?.tamaño)}
- Shape: ${getFeature(features.nariz?.forma)}

Mouth:
- Size: ${getFeature(features.boca?.tamaño)}
- Lips: ${getFeature(features.boca?.labios)}

Hair: 
- Color: ${getFeature(features.cabello?.color)}
- Length: ${getFeature(features.cabello?.largo)}
- Density: ${getFeature(features.cabello?.densidad)}
- Style or hairstyle: ${getFeature(features.cabello?.estilo)}

Body: 
- Build: ${getFeature(features.cuerpo?.complexion)}
- Posture: ${getFeature(features.cuerpo?.postura)}
- Skin tone: ${getFeature(features.cuerpo?.tono)}
- Weight: ${getFeature(features.cuerpo?.peso)}

Clothing: 
- Clothing type: ${getFeature(features.ropa)}

${
  extras
    ? `Special features or additional details:\n- ${extras}\n`
    : ""
}

Background and lighting:
- White or neutral background.
- Soft studio-type lighting, without harsh shadows.

Style:
- Realistic portrait.
- Correct human proportions.
- Focused on face and upper torso.
- Sketch-type portrait

`.trim();
};
