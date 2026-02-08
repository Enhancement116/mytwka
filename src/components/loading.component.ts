import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center p-8">
      <div class="relative w-20 h-20 animate-bounce">
        <div class="absolute inset-0 bg-red-600 rounded-full border-4 border-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-500/50">
           <span class="text-3xl text-yellow-300 font-serif-tc font-bold">福</span>
        </div>
      </div>
      <p class="mt-4 text-yellow-300 font-bold animate-pulse text-lg">Planning the perfect trip...</p>
    </div>
  `
})
export class LoadingComponent {}