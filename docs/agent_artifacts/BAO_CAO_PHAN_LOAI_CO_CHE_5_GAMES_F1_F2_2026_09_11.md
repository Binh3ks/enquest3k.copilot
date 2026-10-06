# BÁO CÁO TOÀN DIỆN PHÂN LOẠI CƠ CHẾ 5 MINI-GAME FLOOR 1 & FLOOR 2
**Mã báo cáo**: `AUDIT-F1-F2-MECHANICS-2026-09-11`  
**Thời gian hoàn thành**: 2026-09-11T10:52:00+07:00  
**Tập tin minh chứng JSON**: `docs/agent_artifacts/screenshots/audit_floor_1_2_evidence.json` (timestamp: `2026-09-11T03:48:14.423Z` / `2026-09-11T03:50:55.340Z`)

---

## 📌 PHẦN 1: BẢNG TOẠ ĐỘ RUNTIME THẬT BẰNG SCRIPT (VIỆC L)

Toàn bộ số liệu dưới đây được đo trực tiếp từ DOM `style.left`, `style.top` và `getBoundingClientRect()` qua Puppeteer script `scripts/audit_floor_1_2_precise.mjs`.

| Game | Nền tảng | Baseline Leo (`worldLeft`, `worldTop`) | Baseline `clientRect` (x, y) | Action Leo (`worldLeft`, `worldTop`) | Action `clientRect` (x, y) | Dịch chuyển ($\Delta x$) | Timer & Hearts (Baseline $\to$ Action) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **F1D1** | Desktop (1280×800) | `(100, 460)` | `(100, 460)` | `(244, 460)` | `(244, 460)` | **$+144.0\text{px}$** | `1:00` $\to$ `0:59` (3 Tim) |
| | Mobile (390×844) | `(100, 460)` | `(100, 460)` | `(244, 460)` | `(195, 460)` | **$+144.0\text{px}$** | `1:00` $\to$ `0:59` (3 Tim) |
| **F1D2** | Desktop (1280×800) | `(90, 325)` | `(90, 325)` | `(234, 406.6)` | `(234, 406.59)` | **$+144.0\text{px}$** | `1:30` $\to$ `1:29` (3 Tim) |
| | Mobile (390×844) | `(90, 325)` | `(90, 325)` | `(234, 406.6)` | `(195, 406.59)` | **$+144.0\text{px}$** | `1:30` $\to$ `1:29` (3 Tim) |
| **F1D3** | Desktop (1280×800) | `(100, 460)` | `(100, 460)` | `(244, 460)` | `(244, 460)` | **$+144.0\text{px}$** | `1:30` $\to$ `1:29` (3 Tim) |
| | Mobile (390×844) | `(100, 460)` | `(100, 460)` | `(244, 460)` | `(195, 460)` | **$+144.0\text{px}$** | `1:30` $\to$ `1:29` (3 Tim) |
| **F2D1** | Desktop (1280×800) | `(80, 460)` | `(80, 460)` | `(224, 460)` | `(224, 460)` | **$+144.0\text{px}$** | `1:30` $\to$ `1:29` (3 Tim) |
| | Mobile (390×844) | `(80, 460)` | `(80, 460)` | `(224, 460)` | `(195, 460)` | **$+144.0\text{px}$** | `1:30` $\to$ `1:29` (3 Tim) |
| **F2D2** | Desktop (1280×800) | `(80, 460)` | `(80, 460)` | `(224, 460)` | `(224, 460)` | **$+144.0\text{px}$** | `1:15` $\to$ `1:14` (3 Tim) |
| | Mobile (390×844) | `(80, 460)` | `(80, 460)` | `(224, 460)` | `(195, 460)` | **$+144.0\text{px}$** | `1:15` $\to$ `1:14` (3 Tim) |

> 💡 **Chứng minh toán học về con số $\Delta x = +144\text{px}$**:
> Trong `audit_floor_1_2_precise.mjs`, phím `ArrowRight` được nhấn giữ trong đúng $600\text{ms}$. Ở tốc độ $60\text{fps}$, $600\text{ms} = 36\text{ frames}$.
> Trong hằng số vật lý `LeoPhysics.js`: `LEO_SPEED = 4 px/frame`.
> Tốc độ di chuyển lý thuyết: $36\text{ frames} \times 4\text{px/frame} = \mathbf{144.0\text{px}}$.
> Độ dịch chuyển đo được ở cả 5 game đạt chính xác $144\text{px}$ trên trục tọa độ world, chứng minh toàn bộ các game đều liên kết với cùng một engine vật lý thực tế.

---

## 📌 PHẦN 2: BẢNG TRÍCH DẪN CODE THẬT TỪNG GAME (VIỆC M)

Bảng trích dẫn verbatim từ source code của 4 game còn lại (F1D2, F1D3, F2D1, F2D2) xác nhận 3 tiêu chí: (a) Input handling, (b) Collision detection, (c) Hearts penalty:

### 1. F1D2 — Word Wagon Jump (`WordWagonJump.jsx`)

- **(a) Input handling (Dòng 228–239)**:
  ```js
  const handleKeyDown = (e) => {
    if (['ArrowLeft', 'KeyA'].includes(e.code)) inputRef.current.left = true;
    if (['ArrowRight', 'KeyD'].includes(e.code)) inputRef.current.right = true;
    if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
      if (!e.repeat) inputRef.current.jump = true;
    }
  };
  ```
- **(b) Collision detection (Dòng 351–354)**:
  ```js
  if (!invincible && leo.y >= FLOOR_Y - LEO_HITBOX.height - 10) {
    const distToZombie = Math.abs((leo.x + 20) - (zombie.x + 25));
    if (distToZombie < 35) {
      leo.hearts = Math.max(0, leo.hearts - 1);
  ```
- **(c) Hearts penalty & Game Over (Dòng 354–361 & 401–408)**:
  ```js
  leo.hearts = Math.max(0, leo.hearts - 1);
  leo.invincibleUntil = now + INVINCIBILITY_MS;
  leo.animState = 'hit';
  setHearts(leo.hearts);
  if (leo.hearts <= 0) {
    setPhase('ko');
    return;
  }
  ```

---

### 2. F1D3 — Shadow Vault Infiltrate (`ShadowVaultInfiltrate.jsx`)

- **(a) Input handling (Dòng 178–184)**:
  ```js
  const handleKeyDown = (e) => {
    if (['ArrowLeft', 'KeyA'].includes(e.code)) inputRef.current.left = true;
    if (['ArrowRight', 'KeyD'].includes(e.code)) inputRef.current.right = true;
    if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
      if (!e.repeat) inputRef.current.jump = true;
    }
  };
  ```
- **(b) Collision detection (Dòng 260–265)**:
  ```js
  if (!invincible) {
    const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
    const guardCenter = { x: guard.x + 25, y: guard.y + 25 };
    const dist = Math.hypot(leoCenter.x - guardCenter.x, leoCenter.y - guardCenter.y);

    if (dist < 42) {
  ```
- **(c) Hearts penalty & Drop Cargo (Dòng 267–282)**:
  ```js
  leo.hearts = Math.max(0, leo.hearts - 1);
  leo.invincibleUntil = now + INVINCIBILITY_MS;
  leo.animState = 'hit';
  setHearts(leo.hearts);

  if (carryingWord) {
    setCarryingWord(null);
    setVaultFeedback('🚨 SPOTTED! Cargo dropped back to vault safe!');
  }
  if (leo.hearts <= 0) {
    setPhase('ko');
    return;
  }
  ```

---

### 3. F2D1 — Potion Flip Dungeon (`PotionFlipDungeon.jsx`)

- **(a) Input handling (Dòng 165–171)**:
  ```js
  const handleKeyDown = (e) => {
    if (['ArrowLeft', 'KeyA'].includes(e.code)) inputRef.current.left = true;
    if (['ArrowRight', 'KeyD'].includes(e.code)) inputRef.current.right = true;
    if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
      if (!e.repeat) inputRef.current.jump = true;
    }
  };
  ```
- **(b) Collision detection (Dòng 255–260)**:
  ```js
  if (!invincible) {
    const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
    const gremlinCenter = { x: gremlin.x + 20, y: gremlin.y + 20 };
    const dist = Math.hypot(leoCenter.x - gremlinCenter.x, leoCenter.y - gremlinCenter.y);

    if (dist < 36) {
  ```
- **(c) Hearts penalty (Dòng 261–268)**:
  ```js
  leo.hearts = Math.max(0, leo.hearts - 1);
  leo.invincibleUntil = now + INVINCIBILITY_MS;
  leo.animState = 'hit';
  setHearts(leo.hearts);
  if (leo.hearts <= 0) {
    setPhase('ko');
    return;
  }
  ```

---

### 4. F2D2 — Anvil Rush Grammar (`AnvilRushGrammar.jsx`)

- **(a) Input handling (Dòng 166–172)**:
  ```js
  const handleKeyDown = (e) => {
    if (['ArrowLeft', 'KeyA'].includes(e.code)) inputRef.current.left = true;
    if (['ArrowRight', 'KeyD'].includes(e.code)) inputRef.current.right = true;
    if (['ArrowUp', 'KeyW', 'Space'].includes(e.code)) {
      if (!e.repeat) inputRef.current.jump = true;
    }
  };
  ```
- **(b) Collision detection (Dòng 286–291)**:
  ```js
  if (!invincible) {
    const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
    const impCenter = { x: imp.x + 20, y: imp.y + 20 };
    const dist = Math.hypot(leoCenter.x - impCenter.x, leoCenter.y - impCenter.y);

    if (dist < 36) {
  ```
- **(c) Hearts penalty (Dòng 292–299 & 268–279)**:
  ```js
  leo.hearts = Math.max(0, leo.hearts - 1);
  leo.invincibleUntil = now + INVINCIBILITY_MS;
  leo.animState = 'hit';
  setHearts(leo.hearts);
  if (leo.hearts <= 0) {
    setPhase('ko');
    return;
  }
  ```

---

## 📌 PHẦN 3: KẾT QUẢ CHƠI THỬ TƯƠNG TÁC THẬT F1D1 (VIỆC N)

Thực hiện kiểm thử tương tác thực tế với 3 bài test độc lập:

### 1. Test N1: Kiểm tra hành vi khi KHÔNG có input (Idle Test 2000ms)
- **Thiết lập**: Giữ yên trình duyệt 2000ms ngay sau khi mount, không gửi bất kỳ sự kiện bàn phím/chuột nào.
- **Số liệu đo**: `startLeft: 100`, `endLeft: 100`. Độ lệch $\Delta x = \mathbf{0.0\text{px}}$.
- **Kết luận**: Leo đứng bất động 100% nếu người chơi không thao tác. **KHÔNG có hiện tượng auto-walk giả lập hay animation di chuyển tự động.**

### 2. Test N2: Kiểm tra nhảy vật lý & trọng lực (Jump Test)
- **Thiết lập**: Nhấn phím `ArrowUp` từ vị trí sàn `worldTop: 460px` và đo độ cao tại đỉnh cú nhảy.
- **Số liệu đo**: Leo bay từ `worldTop = 460px` lên `worldTop = 310.6px`. Độ cao cú nhảy đạt $\mathbf{149.4\text{px}}$.
- **Kết luận**: Engine vật lý gia tốc trọng trường (`applyGravity`) hoạt động liên tục; Leo bắt buộc phải nhảy để leo lên các bục cao tiếp cận các bóng bay từ vựng.

### 3. Test N3: Kiểm tra va chạm quái vật và trừ tim (Hazard Collision Test)
- **Thiết lập**: Di chuyển Leo sang phải (`x = 388`) ngay trên đường tuần tra của Slime (`minX = 100, maxX = 450`) và đứng yên chờ Slime tiến lại gần.
- **Kết quả quan sát**:
  - Số tim trước khi va chạm: **3 tim** (`❤️❤️❤️`).
  - Slime tuần tra tiến vào bán kính va chạm (`distToSlime < 35px`).
  - Leo bị trúng đòn (`leo.animState = 'hit'`), văng tia sét `⚡` trên đầu.
  - Số tim ngay sau va chạm: **2 tim** (`❤️❤️🖤` — 2 tim đỏ, 1 tim đen mất).
  - Đồng hồ hiển thị tại thời điểm trúng đòn: `⏱️ 0:55`.
- **Ảnh chụp bằng chứng thực tế đính kèm**:

![F1D1 Interactive Hazard Hit Evidence](./screenshots/f1d1_interactive_hazard_hit_evidence.png)

---

## 🏁 KẾT LUẬN TOÀN DIỆN CHO BATCH FLOOR 1 & FLOOR 2

1. **Khẳng định phân loại LOẠI A cho cả 5 game**:
   - Dựa trên kết quả đo toạ độ thực nghiệm qua script (Việc L) và bảng trích xuất code nguyên văn (Việc M), cả 5 game đều tích hợp đầy đủ hệ thống điều khiển input, engine va chạm hitbox và logic trừ tim rủi ro thời gian thực.
   - Kết quả tương tác thực nghiệm (Việc N) đã bác bỏ hoàn toàn nghi vấn "game giả trang / quiz cosmetic": Leo không tự di chuyển khi không bấm phím, có lực nhảy nâng $149.4\text{px}$, và bị trừ tim thật khi va chạm với quái vật.
2. **Đủ điều kiện chính thức đóng Batch 5 Game Floor 1 & Floor 2**.
