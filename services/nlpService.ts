import { WolframFeatures } from "./wolframService";

export type PortraitFeatures = WolframFeatures;

export interface NlpResponse {
  rawText?: string;
  features?: PortraitFeatures;
  error?: string;
}

export const analyzeText = async (text: string): Promise<NlpResponse> => {
  const lowerText = text.toLowerCase();
  const features: PortraitFeatures = {
    gender: null,
    face: {},
    eyes: {},
    eyebrows: {},
    nose: {},
    mouth: {},
    hair: {},
    body: {},
    clothing: null,
    otherFeatures: null,
  };

  const has = (keywords: string[]) => keywords.some((k) => lowerText.includes(k));

  // Gender
  if (has(["man", "male", "guy", "gentleman"])) features.gender = "Male";
  else if (has(["woman", "female", "lady"])) features.gender = "Female";
  else if (has(["boy", "young boy"])) features.gender = "Boy";
  else if (has(["girl", "young girl"])) features.gender = "Girl";

  // Face
  if (has(["round face", "round"])) features.face!.shape = "round";
  else if (has(["oval face", "oval"])) features.face!.shape = "oval";
  else if (has(["square face", "square"])) features.face!.shape = "square";
  else if (has(["long face", "elongated face"])) features.face!.shape = "elongated";
  else if (has(["triangular face"])) features.face!.shape = "triangular";
  else if (has(["diamond face", "diamond-shaped face"])) features.face!.shape = "diamond";

  if (has(["fair skin", "light skin", "pale"])) features.face!.skinTone = "light";
  else if (has(["dark skin", "black skin", "dark complexion"])) features.face!.skinTone = "dark";
  else if (has(["brown skin", "medium skin", "tan"])) features.face!.skinTone = "medium brown";
  else if (has(["olive skin"])) features.face!.skinTone = "olive";

  // Eyes
  if (has(["blue eyes", "blue eye"])) features.eyes!.color = "blue";
  else if (has(["green eyes", "green eye"])) features.eyes!.color = "green";
  else if (has(["brown eyes", "brown eye"])) features.eyes!.color = "brown";
  else if (has(["black eyes", "black eye"])) features.eyes!.color = "black";
  else if (has(["gray eyes", "grey eyes"])) features.eyes!.color = "gray";
  else if (has(["hazel eyes", "hazel"])) features.eyes!.color = "hazel";

  if (has(["big eyes", "large eyes"])) features.eyes!.size = "large";
  else if (has(["small eyes", "little eyes"])) features.eyes!.size = "small";

  if (has(["slanted eyes", "asian eyes"])) features.eyes!.shape = "slanted";
  else if (has(["almond eyes", "almond-shaped eyes"])) features.eyes!.shape = "almond";
  else if (has(["round eyes"])) features.eyes!.shape = "round";
  else if (has(["droopy eyes", "downturned eyes"])) features.eyes!.shape = "droopy";

  // Eyebrows
  if (has(["thick eyebrows", "bushy eyebrows"])) features.eyebrows!.type = "bushy";
  else if (has(["thin eyebrows", "fine eyebrows"])) features.eyebrows!.type = "thin";
  else if (has(["arched eyebrows"])) features.eyebrows!.type = "arched";
  else if (has(["straight eyebrows"])) features.eyebrows!.type = "straight";
  else if (has(["unibrow"])) features.eyebrows!.type = "unibrow";

  // Nose
  if (has(["big nose", "large nose"])) features.nose!.size = "large";
  else if (has(["small nose", "little nose"])) features.nose!.size = "small";
  else if (has(["medium nose"])) features.nose!.size = "medium";

  if (has(["aquiline nose", "hooked nose"])) features.nose!.shape = "aquiline";
  else if (has(["upturned nose", "snub nose"])) features.nose!.shape = "upturned";
  else if (has(["flat nose", "wide nose"])) features.nose!.shape = "flat";
  else if (has(["straight nose"])) features.nose!.shape = "straight";

  // Mouth
  if (has(["big mouth", "wide mouth"])) features.mouth!.size = "large";
  else if (has(["small mouth", "narrow mouth"])) features.mouth!.size = "small";

  if (has(["full lips", "thick lips"])) features.mouth!.lips = "full";
  else if (has(["thin lips", "narrow lips"])) features.mouth!.lips = "thin";

  // Additional features
  const extras: string[] = [];
  if (has(["beard"])) extras.push("beard");
  if (has(["mustache", "moustache"])) extras.push("mustache");
  if (has(["glasses", "eyeglasses"])) extras.push("glasses");
  if (has(["scar"])) extras.push("scar");
  if (has(["tattoo"])) extras.push("tattoo");
  if (has(["freckles"])) extras.push("freckles");
  if (has(["mole"])) extras.push("mole");
  if (has(["wrinkles"])) extras.push("wrinkles");
  if (has(["round chin"])) extras.push("round chin");
  if (has(["cleft chin"])) extras.push("cleft chin");

  // Hair
  if (has(["long hair"])) extras.push("long hair");
  if (has(["short hair"])) extras.push("short hair");
  if (has(["bald", "balding"])) extras.push("bald");
  if (has(["curly hair", "curly"])) extras.push("curly hair");
  if (has(["straight hair"])) extras.push("straight hair");
  if (has(["wavy hair"])) extras.push("wavy hair");

  if (has(["blonde hair", "blond hair"])) extras.push("blonde hair");
  if (has(["black hair"])) extras.push("black hair");
  if (has(["brown hair"])) extras.push("brown hair");
  if (has(["red hair", "ginger hair"])) extras.push("red hair");
  if (has(["gray hair", "grey hair"])) extras.push("gray hair");

  if (extras.length > 0) {
    features.otherFeatures = extras.join(", ");
  }

  return {
    rawText: text,
    features,
  };
};
