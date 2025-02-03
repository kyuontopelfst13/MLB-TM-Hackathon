const {VertexAI} = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({project: 'mlb-visionbase', location: 'us-central1'});
const model = 'gemini-1.5-pro-002';


// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 1,
    topP: 0.95,
    seed: 0,
  },
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'OFF',
    },
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'OFF',
    }
  ],
});


async function generateContent() {
  const req = {
    contents: [
    ],
  };

  const streamingResp = await generativeModel.generateContentStream(req);

  for await (const item of streamingResp.stream) {
    process.stdout.write('stream chunk: ' + JSON.stringify(item) + '\n');
  }

  process.stdout.write('aggregated response: ' + JSON.stringify(await streamingResp.response));
}

generateContent();