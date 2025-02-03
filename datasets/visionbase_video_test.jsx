
const {VertexAI} = require('@google-cloud/vertexai');

/**
 * TODO(developer): Update these variables before running the sample.
 */
async function sendMultiModalPromptWithVideo(
  projectId = 'mlb-visionbase',
  location = 'us-central1',
  model = 'gemini-1.5-pro-002'
) {
  // Initialize Vertex with your Cloud project and location
  const vertexAI = new VertexAI({project: projectId, location: location});

  const generativeVisionModel = vertexAI.getGenerativeModel({
    model: model,
  });

  // Pass multimodal prompt
  const request = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            fileData: {
              fileUri: 'gs://mlb_hack/datasets/2024_homeruns_data/0017b43e-90e4-45b2-8bf9-491355dea78c.mp4',
              mimeType: 'video/mp4',
            },
          },
          {
            text: 'Provide Pitch speed, Exit Velocity, Hit Distance and Launch Angle using Ball tracking. Provide data in Tabular format',
          },
        ],
      },
    ],
  };

  // Create the response
  const response = await generativeVisionModel.generateContent(request);
  // Wait for the response to complete
  const aggregatedResponse = await response.response;
  // Select the text from the response
  const fullTextResponse =
    aggregatedResponse.candidates[0].content.parts[0].text;

  console.log(fullTextResponse);
}
export default sendMultiModalPromptWithVideo 