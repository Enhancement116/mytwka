import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preparation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-6xl mx-auto p-4 md:p-8 space-y-8 pb-32">
      
      <div class="text-center mb-8">
        <h2 class="text-4xl md:text-5xl font-bold text-red-100 font-serif-tc drop-shadow-md">
            遊台重要貼士
        </h2>
        <p class="text-2xl text-yellow-200 mt-4">簡單好記，開心出遊！</p>
      </div>

      <!-- Large Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        
        <!-- 1. Documents -->
        <div class="bg-white rounded-3xl p-8 border-l-8 border-red-600 shadow-xl flex items-start gap-6">
            <div class="text-6xl">🛂</div>
            <div>
                <h3 class="text-3xl font-bold text-red-900 mb-3">證件要帶齊</h3>
                <p class="text-xl text-slate-800 leading-relaxed font-bold">
                    1. 護照 (6個月有效期)<br>
                    2. 入境卡 (上網填好)<br>
                    3. 機票 & 酒店訂單
                </p>
            </div>
        </div>

        <!-- 2. Weather & Clothes -->
        <div class="bg-white rounded-3xl p-8 border-l-8 border-blue-500 shadow-xl flex items-start gap-6">
            <div class="text-6xl">🧥</div>
            <div>
                <h3 class="text-3xl font-bold text-blue-900 mb-3">天氣與穿著</h3>
                <p class="text-xl text-slate-800 leading-relaxed font-bold">
                    過年台北會冷 (15°C)！<br>
                    請帶<span class="text-red-600">外套</span>和<span class="text-red-600">好走的鞋</span>。<br>
                    洋蔥式穿法最保暖。
                </p>
            </div>
        </div>

        <!-- 3. Money -->
        <div class="bg-white rounded-3xl p-8 border-l-8 border-yellow-500 shadow-xl flex items-start gap-6">
            <div class="text-6xl">💰</div>
            <div>
                <h3 class="text-3xl font-bold text-yellow-700 mb-3">錢幣匯率</h3>
                <p class="text-xl text-slate-800 leading-relaxed font-bold">
                    1 馬幣 ≈ 7 台幣<br>
                    帶現金去機場換，或用ATM提款。<br>
                    大商場可刷卡。
                </p>
            </div>
        </div>

        <!-- 4. Transport -->
        <div class="bg-white rounded-3xl p-8 border-l-8 border-green-600 shadow-xl flex items-start gap-6">
            <div class="text-6xl">💳</div>
            <div>
                <h3 class="text-3xl font-bold text-green-800 mb-3">悠遊卡 (EasyCard)</h3>
                <p class="text-xl text-slate-800 leading-relaxed font-bold">
                    人手一張！必買！<br>
                    搭捷運、公車、買東西都能用。<br>
                    7-11 就可以買到。
                </p>
            </div>
        </div>

        <!-- 5. Voltage -->
        <div class="bg-white rounded-3xl p-8 border-l-8 border-slate-600 shadow-xl flex items-start gap-6">
            <div class="text-6xl">🔌</div>
            <div>
                <h3 class="text-3xl font-bold text-slate-800 mb-3">插頭電壓</h3>
                <p class="text-xl text-slate-800 leading-relaxed font-bold">
                    台灣是 110V (扁孔)。<br>
                    記得帶<span class="text-red-600">國際轉接頭</span>！<br>
                    手機充電器通常通用。
                </p>
            </div>
        </div>

         <!-- 6. Emergency -->
         <div class="bg-white rounded-3xl p-8 border-l-8 border-red-800 shadow-xl flex items-start gap-6">
            <div class="text-6xl">🚨</div>
            <div>
                <h3 class="text-3xl font-bold text-red-900 mb-3">緊急電話</h3>
                <p class="text-xl text-slate-800 leading-relaxed font-bold">
                    報警：110<br>
                    救護車：119<br>
                    台灣治安很好，放心玩！
                </p>
            </div>
        </div>

      </div>

      <div class="text-center pt-12">
        <p class="text-2xl text-yellow-200 font-serif-tc">祝 爸爸媽媽 身體健康，旅途愉快！</p>
      </div>

    </div>
  `
})
export class PreparationComponent {}