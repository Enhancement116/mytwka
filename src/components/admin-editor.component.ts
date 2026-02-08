import { Component, inject, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { TripStore, TripData, Activity, DayPlan } from '../services/trip.store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-4 md:p-8 pb-24 max-w-5xl">
      <div class="bg-white rounded-xl shadow-2xl overflow-hidden border border-yellow-500/30">
        
        <!-- Editor Header -->
        <div class="bg-slate-800 p-6 flex justify-between items-center border-b border-slate-700 sticky top-0 z-20">
          <div>
             <h2 class="text-3xl font-bold text-yellow-400 font-serif-tc">🔧 行程編輯模式 (Admin)</h2>
             <p class="text-slate-400 text-lg">修改內容後請記得點擊儲存</p>
          </div>
          <div class="flex gap-4">
             <button type="button" (click)="cancel()" class="px-6 py-3 rounded-lg text-slate-300 hover:text-white font-bold hover:bg-slate-700 transition-colors text-lg">取消</button>
             <button type="button" (click)="save()" class="px-8 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold shadow-lg transform active:scale-95 transition-all flex items-center gap-2 text-lg">
                <span>💾</span> 儲存修改
             </button>
          </div>
        </div>

        <!-- Scrollable Content -->
        <div class="p-6 bg-slate-50 overflow-y-auto max-h-[80vh]">
            
            <!-- Global Settings -->
            <div class="mb-8 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
                <label class="block text-slate-700 font-bold mb-2 text-xl">旅程標題</label>
                <input 
                    [(ngModel)]="editData.title" 
                    class="w-full text-2xl font-bold text-black p-4 border border-slate-300 rounded focus:ring-2 focus:ring-yellow-500 outline-none" 
                />
            </div>

            <!-- Days Loop -->
            <div class="space-y-10">
                @for (day of editData.days; track day.dayNumber; let dayIndex = $index) {
                    <div class="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden relative shadow-sm">
                        
                        <!-- Delete Day Button -->
                        <button 
                            type="button"
                            (click)="removeDay(dayIndex)"
                            class="absolute top-4 right-4 z-10 bg-red-100 hover:bg-red-600 text-red-600 hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-1 border border-red-200"
                            title="刪除整天行程">
                            🗑️ 刪除 Day {{ day.dayNumber }}
                        </button>

                        <!-- Day Header -->
                        <div class="bg-slate-100 p-6 border-b border-slate-200 flex flex-col md:flex-row gap-6 items-start md:items-center pr-32">
                            <div class="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold whitespace-nowrap text-xl">Day {{ day.dayNumber }}</div>
                            <div class="flex-1 w-full">
                                <label class="text-sm font-bold text-slate-500 uppercase">主題</label>
                                <input [(ngModel)]="day.theme" class="w-full font-bold text-2xl text-black bg-transparent border-b border-slate-300 focus:border-yellow-500 outline-none py-1" />
                            </div>
                             <div class="flex-1 w-full">
                                <label class="text-sm font-bold text-slate-500 uppercase">圖片關鍵字 (Picsum)</label>
                                <input [(ngModel)]="day.imgUrl" class="w-full text-lg text-black bg-transparent border-b border-slate-300 focus:border-yellow-500 outline-none py-1" />
                            </div>
                        </div>

                        <!-- Day Content -->
                        <div class="p-6 space-y-6">
                            <div>
                                <label class="block text-sm font-bold text-slate-500 uppercase mb-2">今日亮點</label>
                                <textarea [(ngModel)]="day.highlights" rows="2" class="w-full p-3 text-black text-xl border border-slate-200 rounded focus:ring-1 focus:ring-yellow-500 outline-none"></textarea>
                            </div>

                            <!-- Activities List -->
                            <div class="space-y-6 pl-4 border-l-4 border-yellow-500/20">
                                @for (act of day.activities; track $index; let actIndex = $index) {
                                    <div class="flex flex-col md:flex-row gap-4 items-start p-4 bg-slate-50 rounded-xl group hover:bg-yellow-50 transition-colors relative border border-slate-100">
                                        
                                        <!-- Remove Activity Button -->
                                        <button type="button" (click)="removeActivity(dayIndex, actIndex)" class="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors text-2xl font-bold px-2" title="刪除活動">✕</button>

                                        <!-- Time & Icon -->
                                        <div class="flex gap-3 w-full md:w-40 flex-shrink-0">
                                            <div class="w-1/2">
                                                <input [(ngModel)]="act.time" class="w-full p-2 bg-white text-black border border-slate-200 rounded text-center text-lg font-bold" placeholder="Time" />
                                            </div>
                                            <div class="w-1/2">
                                                <input [(ngModel)]="act.icon" class="w-full p-2 bg-white text-black border border-slate-200 rounded text-center text-2xl" placeholder="Icon" />
                                            </div>
                                        </div>

                                        <!-- Details -->
                                        <div class="flex-1 w-full space-y-3">
                                            <input [(ngModel)]="act.title" class="w-full p-2 bg-transparent text-black text-xl font-bold border-b border-dashed border-slate-300 focus:border-yellow-500 outline-none" placeholder="Title" />
                                            <textarea [(ngModel)]="act.description" rows="2" class="w-full p-2 bg-transparent text-black text-lg border-b border-dashed border-slate-300 focus:border-yellow-500 outline-none" placeholder="Description"></textarea>
                                        </div>
                                    </div>
                                }
                                
                                <button type="button" (click)="addActivity(dayIndex)" class="w-full py-4 border-2 border-dashed border-slate-300 text-slate-400 rounded-xl hover:border-yellow-400 hover:text-yellow-600 font-bold text-xl transition-colors">
                                    + 新增活動
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            
             <div class="mt-10 text-center">
                 <button type="button" (click)="addDay()" class="px-8 py-4 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold shadow-sm border border-slate-300 text-xl">
                    + 新增一天 (Day {{ editData.days.length + 1 }})
                 </button>
             </div>

        </div>
      </div>
    </div>
  `
})
export class AdminEditorComponent implements OnInit {
  tripStore = inject(TripStore);
  cdr = inject(ChangeDetectorRef);
  
  // Local mutable copy for editing
  editData!: TripData;

  ngOnInit() {
    // Deep copy the signal data so we don't mutate state directly until save
    this.editData = JSON.parse(JSON.stringify(this.tripStore.tripData()));
  }

  addActivity(dayIndex: number) {
    this.editData.days[dayIndex].activities.push({
        time: '00:00',
        title: '新活動',
        description: '活動描述...',
        location: '',
        icon: '📌'
    });
    this.cdr.detectChanges();
  }

  removeActivity(dayIndex: number, actIndex: number) {
    if(confirm('確定要刪除這個活動嗎？')) {
        this.editData.days[dayIndex].activities.splice(actIndex, 1);
        this.cdr.detectChanges();
    }
  }

  addDay() {
    const nextDayNum = this.editData.days.length + 1;
    this.editData.days.push({
        dayNumber: nextDayNum,
        theme: '新的一天',
        highlights: '今日亮點...',
        imgUrl: 'taiwan',
        activities: []
    });
    this.cdr.detectChanges();
  }

  removeDay(dayIndex: number) {
    if(confirm(`確定要刪除 Day ${this.editData.days[dayIndex].dayNumber} 嗎？此操作無法復原。`)) {
        this.editData.days.splice(dayIndex, 1);
        
        // Re-number days
        this.editData.days.forEach((day, index) => {
            day.dayNumber = index + 1;
        });
        
        this.cdr.detectChanges();
    }
  }

  save() {
    this.tripStore.setTripData(this.editData);
    alert('行程已更新！');
  }

  cancel() {
    if(confirm('尚未儲存，確定要取消嗎？')) {
        this.ngOnInit();
        this.cdr.detectChanges();
    }
  }
}