const projectId = 'mlb-visionbase';
const location = 'us-central1';
const vertexmodel = 'gemini-1.5-pro-002';
const text1 = {text: `Provide Pitch speed, Exit Velocity, Hit Distance and Launch Angle using Ball tracking. Provide data in Tabular format.`};

import { VertexAI } from "@google-cloud/vertexai";  
  //const apiKey = "AIzaSyBvM-aAumslqbreN_P0UCyVEo4KnUiDNIs";
  //const genAI = new GoogleGenerativeAI(apiKey);
  const vertexAI = new VertexAI({project: projectId, location: location});
  //const model = genAI.getGenerativeModel({
  //  model: "gemini-2.0-flash-exp",
  // });
  const vertexAimodel =vertexAI.getGenerativeModel({model: vertexmodel,})
  const vertexgenerationConfig = {
    maxOutputTokens: 8192,
    temperature: 1,
    topP: 0.95,
    seed: 0,
  }
  /*const genaigenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };*/
  
  async function run(prompt) {
    
    /*const chatSession = model.startChat({
      genaigenerationConfig,
      history: [
      ],
    });*/
    const vertexchatSession = vertexAimodel.generateContent({vertexgenerationConfig,history: [
    ],})
    console.log(prompt);
     // Initialize Vertex with your Cloud project and location
    // Pass multimodal prompt
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
    const response = await vertexchatSession.sendMessage(req); 
    //const result = await chatSession.sendMessage(prompt);
    //console.log(result)
    //console.log(result.response.text());
    //return result.response.text();
   
 
      // Wait for the response to complete
      const aggregatedResponse = await response.response;
      // Select the text from the response
      const fullTextResponse = aggregatedResponse.candidates[0].content.parts[0].text;
      console.log(fullTextResponse);
      return fullTextResponse;
  
    // Create the response
   // const response = await generativeVisionModel.generateContent(request);
    // Wait for the response to complete
  //  const aggregatedResponse = await response.response;
    // Select the text from the response
  //  const fullTextResponse =
 //     aggregatedResponse.candidates[0].content.parts[0].text;
  
 //   console.log(fullTextResponse);
//    return fullTextResponse;
  }
  export default run;

  
 





