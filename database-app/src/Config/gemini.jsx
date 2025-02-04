const projectId = 'mlb-visionbase';
const location = 'us-central1';
const vertexmodel = 'gemini-1.5-pro-002';
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai"
//import { VertexAI } from "@google-cloud/vertexai";  
  const apiKey = "AIzaSyBvM-aAumslqbreN_P0UCyVEo4KnUiDNIs";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  
  const genaigenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    
    const chatSession = model.startChat({
      genaigenerationConfig,
      history: [
      ],
    });
    console.log(prompt);
     // Initialize Vertex with your Cloud project and location
    //const vertexAI = new VertexAI({project: projectId, location: location});
  
    
     
    const result = await chatSession.sendMessage(prompt);
    console.log(result)
    console.log(result.response.text());
    return result.response.text();
   
    // Pass multimodal prompt
     const generativeVisionModel = vertexAI.getGenerativeModel({
       model: vertexmodel,
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
    return fullTextResponse;
    
    
  }
  
  export default run;

  
 

