import { Component, inject } from '@angular/core';
import { TripStore } from '../services/trip.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-2xl">
      
      <!-- Left Panel: Itinerary Details -->
      <div class="w-full md:w-1/2 lg:w-[450px] flex flex-col bg-slate-50 border-r border-slate-200 overflow-hidden h-1/2 md:h-full">
        
        <!-- Header Image & Highlights -->
        <div class="relative h-48 md:h-56 bg-gray-200 flex-shrink-0">
          <img 
            [src]="'https://picsum.photos/seed/' + tripStore.currentDay().imgUrl + '/800/600'" 
            class="w-full h-full object-cover"
            alt="Day thumbnail"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6">
            <div>
                <h3 class="text-yellow-400 text-3xl md:text-4xl font-bold font-serif-tc shadow-black drop-shadow-lg leading-tight">
                    Day {{ tripStore.currentDay().dayNumber }}<br>
                    <span class="text-white">{{ tripStore.currentDay().theme }}</span>
                </h3>
            </div>
          </div>
        </div>

        <!-- Scrollable List -->
        <div class="flex-1 overflow-y-auto p-4 md:p-6 space-y-8">
            
            <!-- Highlight Box -->
            <div class="bg-red-50 p-6 rounded-2xl border-2 border-red-200 text-red-900 shadow-sm">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">📌</span>
                    <span class="font-bold text-xl">今日重點：</span> 
                </div>
                <p class="text-xl md:text-2xl font-medium leading-relaxed">
                    {{ tripStore.currentDay().highlights }}
                </p>
            </div>

            <!-- Timeline -->
            <div class="relative pl-3 md:pl-4">
                <!-- Vertical Line -->
                <div class="absolute left-[26px] top-4 bottom-4 w-1 bg-red-200 rounded-full"></div>

                @for (activity of tripStore.currentDay().activities; track activity.time) {
                    <div class="relative flex gap-6 mb-10 last:mb-0 group">
                        <!-- Icon Dot -->
                        <div class="relative z-10 w-14 h-14 flex-shrink-0 rounded-full bg-white border-4 border-red-500 text-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            {{ activity.icon }}
                        </div>
                        
                        <!-- Content -->
                        <div class="flex-1 pt-1">
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-red-700 font-bold text-xl bg-red-100 px-4 py-1 rounded-full border border-red-200 shadow-sm">{{ activity.time }}</span>
                            </div>
                            <h4 class="font-bold text-slate-900 text-3xl leading-tight mb-2">{{ activity.title }}</h4>
                            <p class="text-slate-700 text-xl md:text-2xl font-medium leading-relaxed">{{ activity.description }}</p>
                        </div>
                    </div>
                }
            </div>
            
             <div class="text-center pt-8 pb-4">
                <span class="text-slate-400 text-lg">--- Day {{ tripStore.currentDay().dayNumber }} 結束 ---</span>
             </div>
        </div>
      </div>

      <!-- Right Panel: Map Placeholder -->
      <div class="flex-1 bg-blue-50 relative overflow-hidden group h-96 md:h-auto border-t-4 md:border-t-0 md:border-l-4 border-slate-200">
        
        <!-- Abstract Taiwan Map Shape -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid meet">
             <!-- Simplified Taiwan Shape -->
             <path d="M200,50 Q230,60 250,100 Q280,180 260,300 Q240,450 200,550 Q160,450 140,300 Q120,150 160,80 Q180,50 200,50 Z" 
                   fill="#dbeafe" stroke="#3b82f6" stroke-width="4" />
        </svg>

        <!-- Static markers based on activity count -->
        @for (activity of tripStore.currentDay().activities; track $index) {
            <div 
                class="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center hover:z-50 cursor-pointer group/marker transition-all duration-500"
                [style.top.%]="20 + (($index * 13) % 60)" 
                [style.left.%]="50 + (($index % 2 === 0 ? 1 : -1) * 15)">
                
                <div class="bg-red-700 text-white text-lg md:text-xl font-bold px-4 py-2 rounded-lg shadow-xl mb-2 whitespace-nowrap opacity-100 border-2 border-white z-20">
                    {{ activity.title }}
                </div>
                <div class="w-8 h-8 rounded-full bg-red-600 border-4 border-white shadow-lg animate-bounce flex items-center justify-center text-sm font-bold text-white z-10" [style.animation-delay]="$index * 200 + 'ms'">
                    {{ $index + 1 }}
                </div>
            </div>
        }

      </div>

    </div>
  `
})
export class DayViewComponent {
  tripStore = inject(TripStore);
}