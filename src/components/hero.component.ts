import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Hero Banner -->
    <div class="relative bg-gradient-to-b from-red-900/50 to-transparent p-6 md:p-12 text-center border-b border-white/10">
        <div class="max-w-4xl mx-auto backdrop-blur-sm bg-black/30 p-8 md:p-12 rounded-3xl border border-yellow-500/30 shadow-2xl">
            <h2 class="text-5xl md:text-6xl font-bold text-yellow-400 font-serif-tc mb-6 drop-shadow-lg leading-tight">
                歡迎爸媽來台灣！
            </h2>
            <p class="text-2xl md:text-3xl text-white mb-10 font-bold leading-relaxed">
                吃好住好，Huat Ah! <br>
                <span class="inline-block animate-bounce mt-4 text-5xl">🧧 🐲 🍍</span>
            </p>
            <button 
                (click)="viewItinerary.emit()"
                class="bg-yellow-500 hover:bg-yellow-400 text-red-900 text-3xl font-bold py-6 px-16 rounded-full shadow-xl transform transition hover:scale-105 flex items-center gap-4 mx-auto border-4 border-white/20">
                <span class="text-4xl">📅</span>
                查看每日行程
            </button>
        </div>
    </div>

    <!-- Lucky Draw Section -->
    <div class="max-w-5xl mx-auto mt-12 p-8 md:p-12 bg-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <!-- Background decorative -->
        <div class="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-yellow-300 via-red-500 to-yellow-300"></div>

        <div class="text-center mb-12">
            <h3 class="text-4xl md:text-5xl font-bold text-red-900 flex items-center justify-center gap-4 font-serif-tc">
                <span class="text-5xl">🏮</span> 每日好運紅包
            </h3>
            <p class="text-slate-600 text-2xl mt-4 font-bold">點擊紅包，看看今天的運氣！</p>
        </div>

        <!-- Cards Container -->
        <div class="flex justify-center gap-8 md:gap-16 mb-12 flex-wrap">
             @for (packet of [0, 1, 2]; track $index) {
                <button 
                    (click)="openPacket($index)"
                    [disabled]="openedIndex() !== null"
                    [class.grayscale]="openedIndex() !== null && openedIndex() !== $index"
                    [class.opacity-50]="openedIndex() !== null && openedIndex() !== $index"
                    [class.cursor-not-allowed]="openedIndex() !== null && openedIndex() !== $index"
                    [class.hover:-translate-y-4]="openedIndex() === null"
                    class="relative w-36 h-52 md:w-48 md:h-64 bg-red-700 rounded-3xl shadow-xl border-b-[12px] border-red-900 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden group">
                    
                    <!-- Packet Visual - Simplified: No Extra Text -->
                    <div class="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-600 to-red-800">
                         <div class="w-20 h-20 md:w-28 md:h-28 rounded-full border-[6px] border-yellow-400 flex items-center justify-center bg-red-700 shadow-inner group-hover:scale-110 transition-transform">
                            <span class="text-5xl md:text-7xl text-yellow-400 font-serif-tc font-bold">福</span>
                         </div>
                         
                         <!-- Gold decorative lines -->
                         <div class="absolute bottom-0 w-full h-10 md:h-14 bg-yellow-500/20 rounded-t-[50%]"></div>
                    </div>
                </button>
             }
        </div>

        <!-- Result Box (Conditional) -->
        @if (currentFortune) {
            <div class="border-[6px] border-dashed border-yellow-400 bg-yellow-50 rounded-3xl p-10 md:p-12 text-center animate-fadeIn mx-4 md:mx-12 shadow-inner">
                <div class="text-4xl md:text-6xl mb-8 flex justify-center items-center gap-6">
                    <span>🎊</span>
                    <span class="font-bold text-red-900 font-serif-tc">{{ currentFortune.title }}</span>
                    <span>🎊</span>
                </div>
                <p class="text-slate-800 text-3xl md:text-4xl mb-8 font-bold leading-relaxed">{{ currentFortune.desc }}</p>
                
                <button (click)="reset()" class="px-8 py-3 bg-red-100 hover:bg-red-200 text-red-800 rounded-xl text-2xl font-bold mt-4 border border-red-300 shadow-sm">
                    再抽一次
                </button>
            </div>
        }
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
        animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
  `]
})
export class HeroComponent {
  viewItinerary = output<void>();
  openedIndex = signal<number | null>(null);
  currentFortune: {title: string, desc: string} | null = null;
  
  fortunes = [
    { title: "大吉大利", desc: "今天去哪裡都順利！記得多拍幾張全家福。" },
    { title: "財源滾滾", desc: "穿紅色衣服出門，會遇到好事喔！夜市吃飽飽。" },
    { title: "平安喜樂", desc: "放慢腳步，享受台灣的人情味。記得喝水休息。" },
    { title: "心想事成", desc: "去廟裡拜拜會很靈驗喔！適合買彩券。" },
    { title: "步步高升", desc: "去爬象山或登上101，視野越好運氣越好！" }
  ];

  openPacket(index: number) {
    if (this.openedIndex() !== null) return;
    
    // Random fortune
    this.currentFortune = this.fortunes[Math.floor(Math.random() * this.fortunes.length)];
    this.openedIndex.set(index);
  }

  reset() {
    this.openedIndex.set(null);
    this.currentFortune = null;
  }
}