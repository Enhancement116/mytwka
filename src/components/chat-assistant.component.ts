import { Component, inject, signal, ElementRef, ViewChild, effect } from '@angular/core';
import { GeminiService } from '../services/gemini.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-assistant',
  standalone: true,
  imports: [FormsModule],
  template: `
    <!-- Floating Button -->
    <button 
      (click)="toggleOpen()"
      [class.scale-0]="isOpen()"
      class="fixed bottom-6 right-6 w-16 h-16 bg-yellow-500 hover:bg-yellow-400 text-red-900 rounded-full shadow-2xl flex items-center justify-center text-3xl transform transition-all z-50 hover:rotate-12 border-4 border-red-800">
      💬
    </button>

    <!-- Chat Window -->
    <div 
      [class.translate-y-0]="isOpen()"
      [class.opacity-100]="isOpen()"
      [class.translate-y-10]="!isOpen()"
      [class.opacity-0]="!isOpen()"
      [class.pointer-events-none]="!isOpen()"
      class="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 z-50 border border-slate-200">
      
      <!-- Header -->
      <div class="bg-red-900 p-4 flex justify-between items-center text-white">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-sm">🤖</div>
          <h3 class="font-bold">Trip Assistant</h3>
        </div>
        <button (click)="toggleOpen()" class="text-red-200 hover:text-white p-1">✕</button>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50" #scrollContainer>
        @for (msg of messages(); track $index) {
          <div [class.justify-end]="msg.role === 'user'" class="flex">
            <div 
              [class.bg-red-100]="msg.role === 'user'"
              [class.text-red-900]="msg.role === 'user'"
              [class.bg-white]="msg.role === 'model'"
              [class.text-slate-700]="msg.role === 'model'"
              [class.border]="msg.role === 'model'"
              class="max-w-[80%] p-3 rounded-xl text-sm shadow-sm leading-relaxed">
              {{ msg.text }}
            </div>
          </div>
        }
        @if (isThinking()) {
            <div class="flex justify-start">
                <div class="bg-white border p-3 rounded-xl text-sm shadow-sm text-slate-500 italic">
                    Thinking...
                </div>
            </div>
        }
      </div>

      <!-- Input -->
      <div class="p-3 bg-white border-t border-slate-100">
        <form (ngSubmit)="sendMessage()" class="flex gap-2">
          <input 
            type="text" 
            [(ngModel)]="userInput" 
            name="userInput"
            placeholder="Ask about Taiwan..." 
            class="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none text-slate-800"
            autocomplete="off"
          />
          <button 
            type="submit" 
            [disabled]="!userInput() || isThinking()"
            class="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
            ➤
          </button>
        </form>
      </div>
    </div>
  `
})
export class ChatAssistantComponent {
  private gemini = inject(GeminiService);
  
  isOpen = signal<boolean>(false);
  isThinking = signal<boolean>(false);
  userInput = signal<string>('');
  messages = signal<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Selamat Datang! I can help with travel tips, food recommendations, or translation. Apa khabar?' }
  ]);

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor() {
    effect(() => {
        // Auto scroll when messages change
        this.messages(); 
        setTimeout(() => this.scrollToBottom(), 50);
    });
  }

  toggleOpen() {
    this.isOpen.update(v => !v);
  }

  async sendMessage() {
    const text = this.userInput();
    if (!text) return;

    this.messages.update(m => [...m, { role: 'user', text }]);
    this.userInput.set('');
    this.isThinking.set(true);

    try {
        // Prepare history for API
        const history = this.messages().map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));
        
        // Remove the last user message we just added from history sent to API, 
        // because we send it as the new message.
        const historyForApi = history.slice(0, -1);

        const response = await this.gemini.chat(text, historyForApi);
        this.messages.update(m => [...m, { role: 'model', text: response }]);
    } finally {
        this.isThinking.set(false);
    }
  }

  private scrollToBottom() {
    if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }
}