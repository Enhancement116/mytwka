import { Injectable, signal, computed } from '@angular/core';

export interface Activity {
  time: string;
  title: string;
  description: string;
  location: string;
  icon: string;
}

export interface DayPlan {
  dayNumber: number;
  theme: string;
  highlights: string;
  imgUrl: string;
  activities: Activity[];
}

export interface TripData {
  title: string;
  days: DayPlan[];
}

@Injectable({
  providedIn: 'root'
})
export class TripStore {
  // Initial default data tailored for the "Chinese Version" request
  readonly tripData = signal<TripData>({
    title: "台灣新春之旅 2026",
    days: [
      {
        dayNumber: 1,
        theme: "抵達 & 西門町",
        highlights: "歡迎來到台灣！第一天輕鬆為主，適應氣候，享受街頭美食。",
        imgUrl: "ximending",
        activities: [
          { time: "14:00", title: "抵達桃園機場", description: "搭乘機場捷運直達台北車站 (約40分鐘)。購買悠遊卡與SIM卡。", location: "桃園機場 (TPE)", icon: "✈️" },
          { time: "16:00", title: "飯店辦理入住", description: "前往西門町飯店辦理入住，稍作休息，整理行李。", location: "西門町", icon: "🏨" },
          { time: "18:00", title: "探索西門町", description: "前往西門町徒步區，體驗台灣年輕人的活力與熱鬧氛圍。", location: "西門町", icon: "🛍️" },
          { time: "19:00", title: "晚餐：街頭小吃", description: "推薦：阿宗麵線、豪大大雞排、老天祿滷味 (適合當宵夜)。", location: "西門町商圈", icon: "🍜" }
        ]
      },
      {
        dayNumber: 2,
        theme: "老台北年味",
        highlights: "感受迪化街的熱鬧年貨大街，體驗傳統台灣新年的氣氛。",
        imgUrl: "dihua street",
        activities: [
          { time: "09:30", title: "中正紀念堂", description: "參觀自由廣場與衛兵交接儀式，拍照留念。", location: "自由廣場", icon: "🏛️" },
          { time: "11:30", title: "午餐：鼎泰豐", description: "品嚐世界聞名的小籠包 (建議提早抽號碼牌)。", location: "信義路/南西店", icon: "🥟" },
          { time: "14:00", title: "迪化街年貨大街", description: "感受最濃厚的年味，試吃糖果、買伴手禮，參拜霞海城隍廟。", location: "大稻埕", icon: "🧧" },
          { time: "18:00", title: "寧夏夜市", description: "米其林必比登推薦夜市，必吃：圓環邊蚵仔煎、劉芋仔蛋黃芋餅。", location: "寧夏路", icon: "🍢" }
        ]
      },
      {
        dayNumber: 3,
        theme: "九份放天燈",
        highlights: "前往山城九份，傍晚在平溪放天燈祈福，許下新年願望。",
        imgUrl: "jiufen",
        activities: [
          { time: "10:00", title: "前往九份老街", description: "搭乘包車或客運前往瑞芳九份。", location: "瑞芳", icon: "🚕" },
          { time: "11:30", title: "九份老街茶樓", description: "在阿妹茶樓品茶，欣賞山海美景，品嚐芋圓。", location: "九份", icon: "🍵" },
          { time: "15:30", title: "十分瀑布", description: "號稱台灣的尼加拉瀑布，壯觀迷人。", location: "十分", icon: "🌊" },
          { time: "17:30", title: "平溪放天燈", description: "寫下全家人的新年願望，看天燈冉冉升空。Huat Ah!", location: "平溪/十分", icon: "🏮" }
        ]
      },
      {
        dayNumber: 4,
        theme: "現代台北 & 購物",
        highlights: "登上台北101，信義區購物，為家人購置新衣新鞋。",
        imgUrl: "taipei 101",
        activities: [
          { time: "10:30", title: "台北 101 觀景台", description: "從 89 樓俯瞰台北市景，參觀風阻尼球。", location: "台北 101", icon: "🏙️" },
          { time: "13:00", title: "信義區商圈", description: "新光三越、微風南山逛街購物。感受新年裝飾。", location: "信義區", icon: "🛍️" },
          { time: "16:00", title: "松山文創園區", description: "逛逛誠品生活，欣賞文創商品與展覽。", location: "松菸", icon: "🎨" },
          { time: "19:00", title: "饒河街夜市", description: "福州世祖胡椒餅、藥燉排骨。參拜慈祐宮。", location: "饒河街", icon: "🐉" }
        ]
      },
      {
        dayNumber: 5,
        theme: "溫泉與淡水夕陽",
        highlights: "前往北投泡湯放鬆身心，下午到淡水欣賞美麗夕陽。",
        imgUrl: "beitou hot spring",
        activities: [
          { time: "10:00", title: "北投溫泉博物館", description: "參觀日式建築，了解溫泉歷史，附近有地熱谷。", location: "新北投", icon: "♨️" },
          { time: "12:00", title: "午餐：溫泉拉麵", description: "享用熱騰騰的滿來溫泉拉麵。", location: "新北投", icon: "🍜" },
          { time: "14:30", title: "淡水老街", description: "搭捷運至淡水，品嚐阿給、魚酥，逛逛河岸商店。", location: "淡水", icon: "🚢" },
          { time: "17:00", title: "漁人碼頭夕陽", description: "在情人橋欣賞落日美景，享受海風吹拂。", location: "漁人碼頭", icon: "🌅" }
        ]
      },
      {
        dayNumber: 6,
        theme: "伴手禮 & 返程",
        highlights: "採買鳳梨酥、牛軋糖等伴手禮，帶著滿滿回憶回家。",
        imgUrl: "taiwan souvenirs",
        activities: [
          { time: "10:00", title: "佳德/微熱山丘", description: "購買知名的鳳梨酥當作伴手禮送給親朋好友。", location: "松山區", icon: "🍍" },
          { time: "12:00", title: "最後午餐", description: "享用道地的台式牛肉麵，為旅程畫下句點。", location: "台北市區", icon: "🥢" },
          { time: "14:00", title: "前往機場", description: "搭乘機場捷運或包車前往桃園機場。", location: "台北車站", icon: "🚕" },
          { time: "16:00", title: "搭機返馬", description: "平安回家，期待下次再來台灣玩！", location: "桃園機場", icon: "✈️" }
        ]
      }
    ]
  });

  readonly currentDayIndex = signal<number>(0);

  readonly currentDay = computed(() => {
    return this.tripData().days[this.currentDayIndex()];
  });

  setTripData(data: TripData) {
    // Ensure data structure compatibility if properties are missing from AI
    const validatedDays = data.days.map(d => ({
        ...d,
        highlights: d.highlights || `Enjoy the vibes of ${d.theme}!`,
        imgUrl: d.imgUrl || 'taiwan travel'
    }));
    this.tripData.set({ ...data, days: validatedDays });
    this.currentDayIndex.set(0);
  }

  selectDay(index: number) {
    this.currentDayIndex.set(index);
  }
}