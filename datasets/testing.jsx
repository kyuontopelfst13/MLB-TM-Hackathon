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

const text1 = {text: `Provide Pitch speed, Exit Velocity, Hit Distance and Launch Angle using Ball tracking. Provide data in Tabular format.`};

async function run(prompt) {
  
  const video1 = {
  fileData: {
    mimeType: 'video/mp4',
    fileUri: prompt
  }
};
  const req = {
    contents: [
      {role: 'user', parts: [video1, text1]}
    ],
  };

  const response = await generativeModel.generateContent(req);

    // Wait for the response to complete
    const aggregatedResponse = await response.response;
    // Select the text from the response
    const fullTextResponse =
      aggregatedResponse.candidates[0].content.parts[0].text;
  
    console.log(fullTextResponse);
}

generateContent('https://sporty-clips.mlb.com/dk1BZ1dfWGw0TUFRPT1fQUZkWVhWQlZCd0lBRDFVTFVnQUFBd1VEQUZoVVZWQUFVVkFHQndNTUF3cFNWZ3RV.mp4');
