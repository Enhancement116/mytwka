import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from './components/header.component';
import { DayViewComponent } from './components/day-view.component';
import { PreparationComponent } from './components/preparation.component';
import { HeroComponent } from './components/hero.component';
import { AdminEditorComponent } from './components/admin-editor.component';
import { TripStore } from './services/trip.store';
import { CommonModule } from '@angular/common';

type ViewState = 'home' | 'itinerary' | 'preparation' | 'admin';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, DayViewComponent, PreparationComponent, HeroComponent, AdminEditorComponent],
  template: `
    <div class="h-screen flex flex-col pattern-bg font-sans">
      <app-header [title]="tripStore.tripData().title" (navClick)="navigate($event)" />
      
      <main class="flex-1 overflow-y-auto scrollbar-hide flex flex-col">
        
        @switch (currentView()) {
            @case ('home') {
                 <app-hero (viewItinerary)="navigate('itinerary')" />
                 
                 <!-- Preview of Day Tabs on Home for easy access -->
                 <div class="container mx-auto px-4 mt-12 pb-24">
                    <div class="flex items-center gap-4 mb-6 justify-center md:justify-start">
                        <div class="h-10 w-2 bg-yellow-400 rounded-full"></div>
                        <h3 class="text-3xl font-bold text-yellow-100 font-serif-tc">🗓️ 行程預覽 (點擊查看)</h3>
                    </div>
                    
                    <!-- Bigger Grid for Elderly -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        @for (day of tripStore.tripData().days; track $index) {
                            <button 
                                (click)="selectDayAndNavigate($index)"
                                class="bg-red-900/80 border-2 border-yellow-500/30 hover:bg-red-800 hover:border-yellow-400 p-8 rounded-2xl text-left transition-all group shadow-lg transform hover:-translate-y-1">
                                <div class="flex items-center justify-between mb-2">
                                    <div class="text-yellow-400 text-xl font-bold uppercase tracking-widest bg-red-950/50 px-3 py-1 rounded-lg border border-yellow-500/20">Day {{ day.dayNumber }}</div>
                                    <div class="text-3xl group-hover:scale-125 transition-transform">👉</div>
                                </div>
                                <div class="text-white text-3xl font-bold group-hover:text-yellow-200 mt-2 font-serif-tc leading-relaxed">
                                    {{ day.theme }}
                                </div>
                            </button>
                        }
                    </div>
                 </div>
            }

            @case ('itinerary') {
                <div class="flex-1 flex flex-col container mx-auto px-4 py-6 h-full min-h-0">
                    <!-- Tabs - Larger for Elderly -->
                    <div class="flex gap-4 mb-6 overflow-x-auto pb-4 scrollbar-hide flex-shrink-0">
                        @for (day of tripStore.tripData().days; track $index) {
                            <button 
                                (click)="tripStore.selectDay($index)"
                                [class.bg-yellow-500]="tripStore.currentDayIndex() === $index"
                                [class.text-red-900]="tripStore.currentDayIndex() === $index"
                                [class.scale-110]="tripStore.currentDayIndex() === $index"
                                [class.bg-red-900]="tripStore.currentDayIndex() !== $index"
                                [class.text-yellow-100]="tripStore.currentDayIndex() !== $index"
                                class="flex-shrink-0 px-8 py-4 rounded-2xl text-2xl font-bold whitespace-nowrap transition-all shadow-lg border-2 border-yellow-500/50">
                                Day {{ day.dayNumber }}
                            </button>
                        }
                    </div>
                    
                    <!-- Content -->
                    <div class="flex-1 min-h-0 pb-6">
                        <app-day-view />
                    </div>
                </div>
            }

            @case ('preparation') {
                <div class="container mx-auto">
                    <app-preparation />
                </div>
            }

            @case ('admin') {
                <app-admin-editor />
            }
        }

      </main>
    </div>
  `
})
export class AppComponent {
  tripStore = inject(TripStore);
  currentView = signal<ViewState>('home');

  navigate(view: string) {
    if (view === 'home' || view === 'itinerary' || view === 'preparation' || view === 'admin') {
        this.currentView.set(view as ViewState);
    }
  }

  selectDayAndNavigate(index: number) {
    this.tripStore.selectDay(index);
    this.currentView.set('itinerary');
  }
}