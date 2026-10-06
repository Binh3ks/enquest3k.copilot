# BÁO CÁO GIẢI TRÌNH & CẬP NHẬT PLAYTEST P0-4 (ANVIL RUSH) & P0-5 (GRAND MASTER MATRIX)
**Ngày cập nhật**: 2026-09-14  
**Phản hồi vòng phản biện**: Khắc phục lỗi UI toast Frame 2 & Giải trình thực thể Forge Imp (👺)

---

## 1. GIẢI TRÌNH & KHẮC PHỤC 2 VẤN ĐỀ P0-4 (ANVIL RUSH)

### Vấn đề 1: Lỗi hiển thị Toast & Mâu thuẫn JSON Log Frame "Wrong"
* **Nguyên nhân `feedbackToast = null` trong JSON**:
  Script playtest cũ truy vấn class sai: `document.querySelector('.anvil-feedback-toast')`, trong khi component [AnvilRushGrammar.jsx:472](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/AnvilRushGrammar.jsx#L472) render class thực tế là `forge-feedback-toast`.
* **Nguyên nhân UI chồng chữ**:
  Trước đây thẻ `{feedback && <div className="forge-feedback-toast">}` bị lồng trực tiếp bên trong container flex ngang `.anvil-sentence-banner`, khiến toast đè lên `.forge-badge` ("RUNE FORGE • TRIAL 1/4").
* **Cách khắc phục**:
  1. Tách `.forge-feedback-toast` ra làm sibling độc lập nằm phía dưới top banner tại [AnvilRushGrammar.jsx:472-478](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/AnvilRushGrammar.jsx#L472-L478).
  2. Bổ sung style CSS tại [AnvilRushGrammar.css:80-120](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/AnvilRushGrammar.css#L80-L120): đặt vị trí `top: 98px`, căn giữa màn hình, có border và glow nổi bật. Cách top banner đúng 12px, **100% không còn chồng chữ hay che khuất badge**.
  3. Đồng bộ script playtest: `waitForFunction` kiểm tra đồng thời `hearts === 2` VÀ `.forge-feedback-toast` mount có text.

#### Bằng chứng Frame "Wrong" chụp lại:
- **DOM Evidence**:
```json
{
  "timestamp": "2026-09-14T09:18:46.166Z",
  "heartsCount": 2,
  "emptyHearts": 1,
  "hudLabel": "2 hearts remaining",
  "feedbackToast": "🔥 Wrong Verb Form! \"walking\" is incorrect! (-1 Heart)"
}
```
![p0_4_anvil_wrong](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_4_anvil_wrong.png)

---

### Vấn đề 2: Giải trình thực thể "Mặt đỏ" (Forge Imp 👺)
* **Định danh thực thể trong mã nguồn**:
  - **Tên biến**: `impRef` ([AnvilRushGrammar.jsx:149-151](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/AnvilRushGrammar.jsx#L149-L151)):
    ```javascript
    const impRef = useRef({
      x: 430, y: FLOOR_Y - 45, vx: 2.0, minX: 180, maxX: 720
    });
    ```
  - **Component / Asset**: Render bằng emoji Goblin Nhật Bản `👺` bọc trong thẻ `forge-imp-sprite` ([AnvilRushGrammar.jsx:530-534](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/AnvilRushGrammar.jsx#L530-L534)):
    ```jsx
    {/* Forge Imp Enemy */}
    <div className="forge-imp-sprite" style={{ left: `${impDisplay.x}px`, top: `${impDisplay.y}px` }}>
      <span>👺</span>
    </div>
    ```
* **Bản chất**:
  Đây là **Forge Imp (Quỷ Lò Rèn)** — một **Hazard vật lý tuần tra trên mặt sàn (Patrolling Environmental Hazard)**, có cơ chế trừ tim độc lập khi va chạm (`dist < 36`px):
  ```javascript
  // AnvilRushGrammar.jsx: lines 300-315
  if (!invincible) {
    const leoCenter = { x: leo.x + 20, y: leo.y + 30 };
    const impCenter = { x: imp.x + 20, y: imp.y + 20 };
    const dist = Math.hypot(leoCenter.x - impCenter.x, leoCenter.y - impCenter.y);
    if (dist < 36) {
      leo.hearts = Math.max(0, leo.hearts - 1);
      leo.invincibleUntil = now + INVINCIBILITY_MS;
      leo.animState = 'hit';
      setHearts(leo.hearts);
      if (leo.hearts <= 0) { setPhase('ko'); return; }
    }
  }
  ```
  Vai trò của nó tương đương với **Chaser wolf (`🐺`)** trong Riddle Run (Floor 4 Door 3) và **Glitch Sentinel (`👁️`)** trong Grand Matrix (Floor 5 Door 0).
* **Mối liên hệ với Nguyên lý N1 (Simultaneity)**:
  Theo `BAO_CAO_PLAYTEST_BATCH3_REAL_CHROME.md` (dòng 130), bug gốc của game là người chơi đứng yên ở góc an toàn click chuột từ xa vào đe, bỏ qua hoàn toàn rủi ro vật lý của Imp và Lửa đe. Việc áp đặt $N_1$ Proximity Guard ($d \le 75$px) buộc Leo phải chạy trên sàn hoặc nhảy qua các bục để tiếp cận đe, khôi phục tính đồng thời giữa nhận thức ngôn ngữ và thao tác vật lý né tránh Imp.
* **Tác động toán học lên $N_4$ & $N_2$**:
  - **$N_4$ (Toán học đoán mò)**: $N_4 = 3.76\%$ là xác suất tối đa (upper bound) của việc đoán mò thuần túy ngôn ngữ. Hazard môi trường chỉ có thể làm GIẢM thêm xác suất sống sót khi đoán mò ($N_4 \le 3.76\% \le 5\%$), không bao giờ làm lỏng hay tăng nguy cơ vượt ải bừa bãi.
  - **$N_2$ (Pacing)**: Imp chỉ tuần tra dưới sàn ($y = 455$, giữa $x=180 \leftrightarrow 720$). 3 trong 4 đe nằm trên bục cao ($y=215, 265$) hoàn toàn nằm ngoài tầm chạm của Imp. Chu kỳ tuần tra của Imp là $540 / 2.0 = 270$ frames $\approx 4.5$s. Thời gian né Imp xấu nhất $\approx 2.25$s.
    $$\text{Worst-case time/round} = 7.2\text{s (đọc 12 từ)} + 2.5\text{s (tiếp cận)} + 2.25\text{s (né Imp)} = \mathbf{11.95\text{s}} \le \mathbf{22.5\text{s}}$$
    Hoàn toàn đạt chuẩn pacing $N_2$.

---

## 2. TỔNG HỢP PLAYTEST CHROME THẬT 9 FRAMES (P0-4 & P0-5)

### P0-4: Anvil Rush Grammar (Floor 2, Door 2)
1. **Spawn**: 4 đe (`walking`, `walked`, `walks`, `walk`), 3 tim đỏ `❤️❤️❤️`, Imp đang tuần tra sàn.  
   ![p0_4_anvil_spawn](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_4_anvil_spawn.png)
2. **Wrong**: Đe `walking` bốc cháy, HUD `❤️❤️🖤` (`heartsCount: 2`), toast thông báo `"🔥 Wrong Verb Form! \"walking\" is incorrect! (-1 Heart)"` nằm tách bạch bên dưới banner.  
   ![p0_4_anvil_wrong](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_4_anvil_wrong.png)
3. **KO**: Hết 3 tim (`heartsCount: 0`), KO Modal `BURNT OUT!` hiển thị.  
   ![p0_4_anvil_ko](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_4_anvil_ko.png)
4. **Retry**: Reset sạch 3 tim `❤️❤️❤️`, không còn đe cháy, Leo về vạch xuất phát.  
   ![p0_4_anvil_retry](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_4_anvil_retry.png)

### P0-5: Grand Master Matrix (Floor 5, Door 0/1) — *Đã được Owner chấp nhận*
1. **Spawn**: 4 glyphs, query định nghĩa Cambridge, 3 tim `❤️❤️❤️`.  
   ![p0_5_matrix_spawn](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_5_matrix_spawn.png)
2. **Wrong**: Toast `⚡ GLITCH ERROR!`, HUD `❤️❤️🖤`.  
   ![p0_5_matrix_wrong](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_5_matrix_wrong.png)
3. **KO**: `MATRIX GLITCH OVERLOAD!`, 0 tim.  
   ![p0_5_matrix_ko](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_5_matrix_ko.png)
4. **Retry**: Reset 3 tim `❤️❤️❤️`.  
   ![p0_5_matrix_retry](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_5_matrix_retry.png)
5. **Transform Check**: Glitch Sentinel di chuyển sang trái (`dir = -1`): icon 👁️ lật hướng, nhãn `GLITCH` thẳng hàng, không bị soi gương.  
   ![p0_5_glitch_dir_left](file:///Users/binhnguyen/projects/Engquest3k/docs/agent_artifacts/screenshots/p0_5_glitch_dir_left.png)
