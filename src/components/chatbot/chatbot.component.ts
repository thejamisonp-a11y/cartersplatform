import { Component, ChangeDetectionStrategy, signal, effect, ElementRef, viewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../services/gemini.service';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ChatbotComponent {
  isOpen = signal(false);
  showHelp = signal(false);
  isThinking = signal(false);
  messages = signal<Message[]>([
      { sender: 'ai', text: 'Hello! I am Carter, your AI assistant. How can I help you today?' }
  ]);
  
  chatContainer = viewChild<ElementRef>('chatContainer');
  private geminiService = inject(GeminiService);

  constructor() {
    // Effect to scroll to bottom when messages change
    effect(() => {
      this.messages(); // depend on messages
      const container = this.chatContainer();
      if (container) {
        setTimeout(() => container.nativeElement.scrollTop = container.nativeElement.scrollHeight, 0);
      }
    });
  }

  toggleChat() {
    this.isOpen.update(open => !open);
    if (this.isOpen()) {
        setTimeout(() => {
            // @ts-ignore
            lucide.createIcons();
        }, 50);
    }
  }
  
  toggleHelp() {
      this.showHelp.update(v => !v);
       setTimeout(() => {
            // @ts-ignore
            lucide.createIcons();
        }, 50);
  }

  async sendMessage(input: HTMLInputElement) {
    const prompt = input.value.trim();
    if (!prompt) return;

    this.showHelp.set(false); // Close help on sending message
    this.messages.update(m => [...m, { sender: 'user', text: prompt }]);
    input.value = '';
    this.isThinking.set(true);

    const responseText = await this.geminiService.generateChatResponse(prompt);
    this.messages.update(m => [...m, { sender: 'ai', text: responseText }]);
    this.isThinking.set(false);
  }
}
