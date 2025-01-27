
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai"
  
  const apiKey = "AIzaSyBvM-aAumslqbreN_P0UCyVEo4KnUiDNIs";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  }
  
  export default run;


#######   

  import {VertexAI} from '@google-cloud/vertexai';

  /**
   * TODO(developer): Update these variables before running the sample.
   */
  async function analyze_video_with_audio(projectId = 'PROJECT_ID') {
    const vertexAI = new VertexAI({project: projectId, location: 'us-central1'});
  
    const generativeModel = vertexAI.getGenerativeModel({
      model: 'gemini-1.5-flash-001',
    });
  
    const filePart = {
      file_data: {
        file_uri: 'gs://cloud-samples-data/generative-ai/video/pixel8.mp4',
        mime_type: 'video/mp4',
      },
    };
    const textPart = {
      text: `
      Provide a description of the video.
      The description should also contain anything important which people say in the video.`,
    };
  
    const request = {
      contents: [{role: 'user', parts: [filePart, textPart]}],
    };
  
    const resp = await generativeModel.generateContent(request);
    const contentResponse = await resp.response;
    console.log(JSON.stringify(contentResponse));
  }