import { hiteshPrompt } from "../data/hiteshToneDataset.js";
import { piyushPrompt } from "../data/piyushToneDataset.js";
import { narinderPrompt } from "../data/narinderToneDatabase.js";

export const personas = {
  hitesh: {
    name: "Hitesh Choudhary",
    prompt: hiteshPrompt,
  },
   narinder: {
    name: "Narinder Kumar",
    prompt: narinderPrompt
  },
  piyush: {
    name: "Piyush Garg",
    prompt: piyushPrompt,
  }
};
