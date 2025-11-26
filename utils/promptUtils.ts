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
    features.otherFeatures && features.otherFeatures.trim().length
      ? features.otherFeatures.trim()
      : null;

  return `
Generate a realistic portrait based on the following physical description.

Gender: ${getFeature(features.gender)}

Face:
- Face shape: ${getFeature(features.face?.shape)}
- Skin tone: ${getFeature(features.face?.skinTone)}
- Skin texture: ${getFeature(features.face?.skinTexture)}

Eyes:
- Eye spacing: ${getFeature(features.eyes?.spacing)}
- Size: ${getFeature(features.eyes?.size)}
- Shape: ${getFeature(features.eyes?.shape)}
- Color: ${getFeature(features.eyes?.color)}

Eyebrows:
- Density: ${getFeature(features.eyebrows?.density)}
- Type: ${getFeature(features.eyebrows?.type)}

Nose:
- Size: ${getFeature(features.nose?.size)}
- Shape: ${getFeature(features.nose?.shape)}

Mouth:
- Size: ${getFeature(features.mouth?.size)}
- Lips: ${getFeature(features.mouth?.lips)}

Hair: 
- Color: ${getFeature(features.hair?.color)}
- Length: ${getFeature(features.hair?.length)}
- Density: ${getFeature(features.hair?.density)}
- Style or hairstyle: ${getFeature(features.hair?.style)}

Body: 
- Build: ${getFeature(features.body?.build)}
- Posture: ${getFeature(features.body?.posture)}
- Skin tone: ${getFeature(features.body?.tone)}
- Weight: ${getFeature(features.body?.weight)}

Clothing: 
- Clothing type: ${getFeature(features.clothing)}

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
