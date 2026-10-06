# Implementation Plan: Content Service (Bước 2) - Bổ sung K.1 & K.2

Theo yêu cầu, dưới đây là thiết kế chi tiết cho công thức tổng quát computeAllocations (K.1) và cơ chế dedup bằng _globalId (K.2) trước khi tiến hành code thực tế.

## K.1 — Công thức Graceful Degrade Tổng Quát

Thuật toán computeAllocations sẽ duyệt qua các nguồn [current, n-1, n-2, n-3]. Nếu nguồn nào không có data, % của nguồn đó được đưa vào shortfall. Sau đó shortfall được chia đều cho các nguồn CÓ DATA theo tỷ trọng gốc. Nếu thiếu hụt sau khi làm tròn, bù vào nguồn có data sở hữu trọng số cao nhất. Nếu không có data ở tất cả các nguồn, trả về lỗi.

### Pseudocode & Thuật toán

```javascript
function computeAllocations(currentWeekId, targetSize, getAvailableCount) {
  const sources = [
    { weekId: currentWeekId, weight: 0.60 },
    { weekId: currentWeekId - 1, weight: 0.20 },
    { weekId: currentWeekId - 2, weight: 0.12 },
    { weekId: currentWeekId - 3, weight: 0.08 }
  ];

  sources.forEach(s => {
    s.available = getAvailableCount(s.weekId);
    s.hasData = s.available > 0;
  });

  const validSources = sources.filter(s => s.hasData);
  if (validSources.length === 0) {
    return { allocations: [], error: true, message: "No data available" };
  }

  let shortfall = 0;
  let validWeightSum = 0;
  sources.forEach(s => {
    if (!s.hasData) shortfall += s.weight;
    else validWeightSum += s.weight;
  });

  let totalCount = 0;
  sources.forEach(s => {
    if (s.hasData) {
      s.finalWeight = s.weight + shortfall * (s.weight / validWeightSum);
      s.count = Math.min(Math.round(targetSize * s.finalWeight), s.available);
      totalCount += s.count;
    } else {
      s.count = 0;
    }
  });

  let diff = targetSize - totalCount;
  if (diff > 0) {
    validSources.sort((a, b) => b.weight - a.weight);
    for (const s of validSources) {
      const space = s.available - s.count;
      if (space > 0) {
        const add = Math.min(space, diff);
        s.count += add;
        diff -= add;
        if (diff === 0) break;
      }
    }
  }

  return {
    allocations: sources.filter(s => s.count > 0).map(s => ({
      weekId: s.weekId,
      count: s.count,
      graceDegraded: shortfall > 0
    })),
    error: false
  };
}
```

### Kết quả Simulation 4 Cases

- Case A: Chỉ current thiếu (W36 grammar thiếu, target = 8). W36=0, W35=5, W34=5, W33=5. Phân bổ: W35: 4 câu, W34: 2 câu, W33: 2 câu. Tổng: 8 câu. PASS
- Case B: 2 tuần liên tiếp thiếu (W36, W35 grammar thiếu, target = 8). W36=0, W35=0, W34=5, W33=5. Phân bổ: W34: 5 câu, W33: 3 câu. Tổng: 8 câu. PASS
- Case C: Tuần đầu Chapter (W33 vocab, target = 18). W33=36, W32, W31, W30 = 0. Phân bổ: W33: 18 câu. Tổng: 18 câu. 100% dồn vào current week. PASS
- Case D: Error (Tất cả đều thiếu). W36, W35, W34, W33 = 0. Kết quả: Trả về mảng rỗng kèm error: true. Không crash. PASS

---

## K.2 — Cơ Chế Dedup bằng _globalId

Vấn đề id trùng lặp giữa các tuần sẽ gây lỗi mất item khi dedup.

### Sửa đổi trong loadBucketPool:
Khi load item từ file, ta sẽ inject thêm field _globalId bằng cách kết hợp weekId và item.id. Đồng thời chuẩn hóa format word.

```javascript
function loadBucketPool(weekId, skillBucket) {
  // logic đọc dữ liệu từ hub files
  return rawItems.map((item, idx) => {
    const uniqueId = item.id !== undefined ? item.id : idx;
    const globalId = `w${weekId}_${uniqueId}`;
    const normalizedWord = item["word"] ?? item.word ?? item.en ?? "";
    return {
      ...item,
      _globalId: globalId,
      normalizedWord
    };
  });
}
```

### Sử dụng _globalId trong getWeeklyPoolWithReview:
Logic dedup sẽ chỉ sử dụng _globalId thay vì item.id:

```javascript
export function getWeeklyPoolWithReview(currentWeekId, skillBucket, options = {}) {
  // ... tính allocations ...
  let items = [];
  // ... loop load items từ allocations ...
  const seen = new Set();
  items = items.filter(item => {
    if (seen.has(item._globalId)) return false;
    seen.add(item._globalId);
    return true;
  });
  return { items: items.slice(0, targetSize), meta: {} };
}
```

## Các bước triển khai Bước 2 (sau khi được duyệt)

1. Tạo file src/services/contentService.js chứa toàn bộ logic computeAllocations, loadBucketPool, getWeeklyPoolWithReview.
2. Sửa file src/modules/chronicles/DailyRoomScreen.jsx:
   - Replace extractQuestVocab logic bằng việc gọi contentService.getWeeklyPoolWithReview.
   - Setup prop data cho Vocab (door 0), Grammar (door 1), Integration (door 2).
3. Test npm run build để đảm bảo pass.

