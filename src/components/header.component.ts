import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="bg-red-900 border-b-4 border-yellow-500 shadow-xl relative overflow-hidden z-20">
      <!-- Decorative background elements -->
      <div class="absolute -top-10 -left-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-xl"></div>
      <div class="absolute top-0 right-0 w-40 h-40 bg-red-600/20 rounded-full blur-2xl"></div>

      <div class="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center relative z-10">
        <!-- Logo Area -->
        <div class="flex items-center gap-4 mb-4 md:mb-0 select-none">
          <div 
            (click)="handleLogoClick()"
            class="w-14 h-14 rounded-full border-4 border-yellow-400 flex items-center justify-center text-3xl bg-red-800 text-yellow-400 cursor-pointer hover:bg-red-700 active:scale-95 transition-all shadow-lg">
            ⭕
          </div>
          <div (click)="navClick.emit('home')" class="cursor-pointer">
            <h1 class="text-3xl md:text-4xl font-bold text-yellow-100 font-serif-tc tracking-widest">{{ title() }}</h1>
          </div>
        </div>
        
        <!-- Navigation -->
        <nav class="flex gap-8 text-xl md:text-2xl font-bold text-yellow-100/90">
            <button (click)="navClick.emit('itinerary')" class="hover:text-yellow-400 flex items-center gap-2 transition-colors py-2">
                <span class="text-yellow-500 text-2xl">📅</span> 行程
            </button>
            <button (click)="navClick.emit('preparation')" class="hover:text-yellow-400 flex items-center gap-2 transition-colors py-2">
                <span class="text-yellow-500 text-2xl">💡</span> 貼士
            </button>
        </nav>
      </div>
    </header>
  `
})
export class HeaderComponent {
  title = input.required<string>();
  navClick = output<string>();

  private clickCount = 0;
  private clickTimeout: any;

  handleLogoClick() {
    this.clickCount++;
    
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }

    if (this.clickCount >= 5) {
      this.navClick.emit('admin');
      this.clickCount = 0;
    } else {
      this.clickTimeout = setTimeout(() => {
        this.navClick.emit('home');
        this.clickCount = 0;
      }, 500);
    }
  }
}