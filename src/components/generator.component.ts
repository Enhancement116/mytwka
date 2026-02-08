import { Component, inject, signal } from '@angular/core';
import { GeminiService } from '../services/gemini.service';
import { TripStore } from '../services/trip.store';
import { LoadingComponent } from './loading.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generator',
  standalone: true,
  imports: [LoadingComponent, FormsModule],
  template: `
    <div class="bg-white/10 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6 mb-8 shadow-xl">
      <h2 class="text-xl font-bold text-yellow-300 mb-4 flex items-center">
        <span class="mr-2">✨</span> Create New Plan
      </h2>
      
      @if (isLoading()) {
        <app-loading />
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-1">
            <label class="block text-red-200 text-xs uppercase font-bold mb-2">Days</label>
            <input 
              type="number" 
              min="1" 
              max="14" 
              [(ngModel)]="days" 
              class="w-full bg-red-900/50 border border-red-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-red-200 text-xs uppercase font-bold mb-2">Preferences (e.g. Kids, Halal, Nature)</label>
            <input 
              type="text" 
              [(ngModel)]="preferences" 
              placeholder="e.g. Loves bubble tea, need Halal food"
              class="w-full bg-red-900/50 border border-red-700 rounded-lg p-3 text-white focus:outline-none focus:border-yellow-400 transition-colors placeholder-red-400/50"
            />
          </div>
          <div class="md:col-span-1 flex items-end">
            <button 
              (click)="generate()" 
              [disabled]="days() < 1 || !preferences()"
              class="w-full bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold py-3 px-6 rounded-lg shadow-lg transform active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2">
              <span>🪄</span> Generate
            </button>
          </div>
        </div>
      }
    </div>
  `
})
export class GeneratorComponent {
  private geminiService = inject(GeminiService);
  private tripStore = inject(TripStore);
  
  days = signal<number>(5);
  preferences = signal<string>('');
  isLoading = signal<boolean>(false);

  async generate() {
    this.isLoading.set(true);
    try {
      const result = await this.geminiService.generateItinerary(this.days(), this.preferences());
      if (result) {
        this.tripStore.setTripData(result);
      }
    } catch (err) {
      alert('Failed to generate itinerary. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}