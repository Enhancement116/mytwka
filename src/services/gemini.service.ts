import { Injectable } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] || '' });
  }

  async generateItinerary(days: number, prompt: string): Promise<any> {
    const model = 'gemini-2.5-flash';
    
    const itinerarySchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        days: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              dayNumber: { type: Type.INTEGER },
              theme: { type: Type.STRING },
              highlights: { type: Type.STRING, description: "A brief summary of the day's highlights." },
              imgUrl: { type: Type.STRING, description: "A keyword for an image representing this day (e.g. 'taipei night market')" },
              activities: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    time: { type: Type.STRING },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    location: { type: Type.STRING },
                    icon: { type: Type.STRING }
                  },
                  required: ["time", "title", "description", "location", "icon"],
                  propertyOrdering: ["time", "title", "location", "description", "icon"]
                }
              }
            },
            required: ["dayNumber", "theme", "highlights", "activities"],
            propertyOrdering: ["dayNumber", "theme", "highlights", "activities"]
          }
        }
      },
      required: ["title", "days"],
      propertyOrdering: ["title", "days"]
    };

    const fullPrompt = `為馬來西亞家庭規劃 ${days} 天的台灣農曆新年行程。
    重點：喜慶氛圍、適合家庭、美食（包含清真選項提示）、舒適交通。
    額外要求：${prompt}。
    請返回繁體中文 JSON 格式。`;

    try {
      const response = await this.ai.models.generateContent({
        model: model,
        contents: fullPrompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: itinerarySchema,
          systemInstruction: "你是一位專業的台灣旅遊嚮導，專門接待馬來西亞華人家庭。你熟悉農曆新年習俗，並能提供貼心的旅遊建議。"
        }
      });
      
      const text = response.text;
      if (!text) return null;
      return JSON.parse(text);
    } catch (e) {
      console.error('Gemini generation failed', e);
      throw e;
    }
  }

  async chat(message: string, history: any[]): Promise<string> {
    const model = 'gemini-2.5-flash';
    try {
      const chatSession = this.ai.chats.create({
        model: model,
        history: history,
        config: {
            systemInstruction: "你是一位熱情、喜慶的台灣旅遊助手，正在協助一個馬來西亞家庭規劃新年行程。回答要簡潔、實用、溫暖，並多使用表情符號。請使用繁體中文回答。"
        }
      });
      
      const result = await chatSession.sendMessage({ message });
      return result.text;
    } catch (e) {
      console.error('Chat failed', e);
      return "抱歉，鞭炮聲太大了！我沒聽清楚，請再說一次？🧨";
    }
  }
}