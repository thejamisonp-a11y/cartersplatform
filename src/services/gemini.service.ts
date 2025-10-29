import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({ providedIn: 'root' })
export class GeminiService {

  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getParticipantSummary(participantId: string): Promise<string> {
    await this.simulateDelay(500); // Simulate fetching summary data
    // In a real application, you would fetch data based on the participantId.
    // For this mock, we'll use a hardcoded name.
    const participantName = 'Eleanor Vance';
    return this.generateParticipantReport(participantName);
  }

  async generateParticipantReport(participantName: string): Promise<string> {
    await this.simulateDelay(1500);
    return `
      <h3 class="font-bold text-lg mb-2">Comprehensive Progress Report for ${participantName}</h3>
      <p class="mb-2"><strong>Period:</strong> Last 3 Months</p>
      <p class="mb-4"><strong>Summary:</strong> ${participantName} has shown significant progress towards their personal goals, particularly in community engagement and independent living skills. Engagement with support staff has been consistently positive. Funding utilization is optimal, tracking at 95% of the allocated budget for the period.</p>
      <h4 class="font-bold text-md mb-2">Key Achievements:</h4>
      <ul class="list-disc list-inside mb-4">
        <li>Successfully attended 12 community events, an increase of 20% from the previous period.</li>
        <li>Mastered a new meal preparation routine, enhancing independent living capabilities.</li>
        <li>Received positive feedback from two new support workers regarding communication and collaboration.</li>
      </ul>
      <h4 class="font-bold text-md mb-2">Recommendations:</h4>
      <p>Consider introducing advanced social skill workshops to build on current momentum. Explore opportunities for vocational training based on expressed interests in horticulture.</p>
    `;
  }

  async getCarePlanSuggestions(goal: string): Promise<string[]> {
    await this.simulateDelay(1200);
    switch (goal.toLowerCase()) {
      case 'community access':
        return [
          'Schedule weekly library visits.',
          'Enroll in a local bowling league.',
          'Arrange volunteer work at an animal shelter.',
          'Attend local council meetings.'
        ];
      case 'skill development':
        return [
          'Start an online coding course.',
          'Take a cooking class for Italian cuisine.',
          'Join a public speaking club like Toastmasters.',
          'Practice budgeting with a dedicated app.'
        ];
      default:
        return [
          'Define smaller, measurable steps for the goal.',
          'Identify necessary resources and supports.',
          'Set a realistic timeline for achievement.'
        ];
    }
  }

  async generateChatResponse(prompt: string): Promise<string> {
    // Note: The API key is NOT provided in this code.
    // The user must provide it in their environment.
    if (!process.env.API_KEY) {
      await this.simulateDelay(1000);
      return "Hello! I'm Carter, your AI assistant. It looks like the Gemini API key isn't configured right now. In a real scenario, I'd be able to answer your questions about care plans, compliance, and more. For now, how can I help you roleplay a response?";
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are Carter, an AI assistant for the "Carters Care Platform". Your responses should be helpful, concise, and relevant to aged care and NDIS management. User query: "${prompt}"`,
      });
      return response.text;
    } catch (error) {
      console.error('Error generating chat response:', error);
      return "I'm sorry, I encountered an error while trying to connect to the AI service. Please try again later.";
    }
  }
}