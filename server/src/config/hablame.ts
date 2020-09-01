import prefix from "./environment";

export const hablameSettings: {
  apiUri: string | undefined;
  apiKey: string | undefined;
  apiClient: string | undefined;
} = {
  apiUri: process.env[`HABLAME_URI`],
  apiKey: process.env[`HABLAME_KEY`],
  apiClient: process.env[`HABLAME_CLIENT`],
};
