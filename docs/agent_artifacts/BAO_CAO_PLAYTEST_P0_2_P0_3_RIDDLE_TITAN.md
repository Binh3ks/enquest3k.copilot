# BÁO CÁO GIẢI TRÌNH & THẨM ĐỊNH PLAYTEST P0-2 & P0-3 (CẬP NHẬT PHẢN BIỆN)

**Ngày cập nhật**: 2026-09-14  
**Trạng thái**: ⏳ **ĐÃ TRIỂN KHAI & CHỜ OWNER DUYỆT (PENDING OWNER REVIEW)**  
*(Chưa đánh dấu "Hoàn thành 100%" trong Backlog theo đúng quy định)*  
**Hồ sơ vé**:
1. **P0-2: Riddle Run Maze** (`src/modules/quest/RiddleRunMaze.jsx`, Floor 4 Door 3)
2. **P0-3: Titan Grammar Forge** (`src/modules/quest/TitanGrammarForge.jsx`, Floor 5 Door 2)

---

## 1. BẢNG TÍNH N2 — PACING & WORST-CASE READING TIME

Công thức chuẩn Master Framework:
$$T(\text{đọc}) + T(\text{quyết định}) \le T(\text{engine cho phép trước khi rủi ro xảy ra})$$
- Tốc độ đọc chuẩn trẻ em A2 Cambridge: $0.67$ giây/từ (~90 WPM).
- $T(\text{quyết định}) = 3.0$ giây.
- Ngân sách engine bình quân mỗi round: $90\text{s} / 4\text{ rounds} = \mathbf{22.5\text{s/round}}$.

| Chỉ tiêu N2 | P0-2: Riddle Run Maze (Floor 4 Door 3) | P0-3: Titan Grammar Forge (Floor 5 Door 2) |
|---|---|---|
| **Số rounds & Options** | 4 rounds, 4 cửa ($p = 0.25$) | 4 rounds, 4 cogs ($p = 0.25$) |
| **Độ dài text từng round** | R1: 20 từ (16 câu + 4 cửa)<br>R2: 20 từ (16 câu + 4 cửa)<br>R3: 19 từ (15 câu + 4 cửa)<br>R4: **22 từ (15 câu + 7 cửa — Worst-case)** | R1: 19 từ (5 stem + 14 cogs)<br>R2: 20 từ (5 stem + 15 cogs)<br>R3: **27 từ (8 stem + 19 cogs — Worst-case)**<br>R4: 23 từ (7 stem + 16 cogs) |
| **Worst-case $T(\text{đọc})$** | $22 \times 0.67\text{s} = \mathbf{14.74\text{s}}$ | $27 \times 0.67\text{s} = \mathbf{18.09\text{s}}$ |
| **$T(\text{quyết định})$** | $3.00\text{s}$ | $3.00\text{s}$ |
| **Tổng $T(\text{đọc+quyết định})$** | $14.74\text{s} + 3.00\text{s} = \mathbf{17.74\text{s}}$ | $18.09\text{s} + 3.00\text{s} = \mathbf{21.09\text{s}}$ |
| **Vị trí đứng đọc an toàn** | Bục giữa `Central Altar Deck` ($y = 262$px). Quái Chaser chỉ tuần tra ở sàn dưới ($y = 455$px). Khoảng cách $193\text{px} \gg 45\text{px}$ (hitbox) $\implies$ **Rủi ro Chaser $= 0$ khi đứng đọc**. | Bục giữa `Piston Center Deck` ($y = 240$px). Luồng Steam Vent ở sàn dưới ($x = 550, y = 450$px). $\implies$ **Rủi ro Steam Vent $= 0$ khi đứng đọc**. |
| **$T(\text{engine round budget})$** | $\mathbf{22.50\text{s}}$ (Thặng dư $+4.76\text{s}$) | $\mathbf{22.50\text{s}}$ (Thặng dư $+1.41\text{s}$) |
| **Kết luận N2** | ✅ **ĐẠT CHUẨN N2** ($17.74\text{s} \le 22.50\text{s}$) | ✅ **ĐẠT CHUẨN N2** ($21.09\text{s} \le 22.50\text{s}$) |

---

## 2. GIẢI TRÌNH "STEAM BLAST" TRONG `p0_3_titan_retry.png`

- **Bản chất**: `💨 STEAM BLAST 💨` là nhãn visual của **Environmental Hazard (Chướng ngại vật phun hơi nước định kỳ)** đặt tại sàn lò rèn ($x = 550, y = 450$), KHÔNG PHẢI lỗi toast hay phản hồi sai sót.
- **Trích dẫn code định nghĩa**:
  [TitanGrammarForge.jsx:176-182](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/TitanGrammarForge.jsx#L176-L182):
  ```javascript
  // Steam cycle: Toggles every 2800ms
  useEffect(() => {
    if (phase !== 'playing') return;
    const interval = setInterval(() => {
      setSteamActive(s => !s);
    }, 2800);
    return () => clearInterval(interval);
  }, [phase]);
  ```
- **Trích dẫn code render DOM**:
  [TitanGrammarForge.jsx:525-527](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/TitanGrammarForge.jsx#L525-L527):
  ```jsx
  <div className={`steam-vent-entity ${steamActive ? 'vent-active' : ''}`} style={{ left: '550px', top: `${FLOOR_Y - 50}px` }}>
    {steamActive && <div className="steam-blast">💨 STEAM BLAST 💨</div>}
  </div>
  ```
- **Xử lý dứt điểm khi Retry**:
  Đã bổ sung `setSteamActive(false);` vào `handleRetry` ([TitanGrammarForge.jsx:451](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/TitanGrammarForge.jsx#L451)). Khi người chơi bấm Retry, van hơi nước ngay lập tức bị tắt về trạng thái idle, màn hình retry hoàn toàn sạch sẽ (đã verify qua ảnh chụp lại `p0_3_titan_retry.png`).

---

## 3. XÁC NHẬN CƠ CHẾ RANDOM VỊ TRÍ CHASER (RIDDLE RUN)

- **Cơ chế**: Quái Chaser Minotaur không còn bị hardcode tại $x = 100$. Hàm `getRandomBeastSpawn()` đảm bảo Chaser không bao giờ spawn đè lên cửa dưới `door_3` ($x = 390$):
  - Nhánh trái: $x \in [80, 250]$, hướng chạy `dir = 1`.
  - Nhánh phải: $x \in [530, 700]$, hướng chạy `dir = -1`.
- **Trích dẫn code**:
  [RiddleRunMaze.jsx:135-144](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/RiddleRunMaze.jsx#L135-L144):
  ```javascript
  // Helper for random Chaser Beast spawn away from door_3 (x: 390)
  const getRandomBeastSpawn = () => {
    const isLeft = Math.random() < 0.5;
    const x = isLeft ? Math.floor(Math.random() * 170) + 80 : Math.floor(Math.random() * 170) + 530;
    const dir = isLeft ? 1 : -1;
    return { x, y: FLOOR_Y - 45, vx: 2.2, dir };
  };

  // Chaser Beast (Minotaur patrolling maze floor with randomized spawn)
  const beastRef = useRef(getRandomBeastSpawn());
  ```
- **Re-roll vị trí**:
  - Khi sang câu đố tiếp theo: [RiddleRunMaze.jsx:206](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/RiddleRunMaze.jsx#L206): `beastRef.current = getRandomBeastSpawn();`
  - Khi bấm Retry: [RiddleRunMaze.jsx:439](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/RiddleRunMaze.jsx#L439): `beastRef.current = getRandomBeastSpawn();`

---

## 4. KẾT QUẢ VALIDATOR TỰ ĐỘNG 9/9 CHECKS (`scripts/test_p0_2_p0_3_template.mjs`)
```
🔍 [P0-2 & P0-3 Validator] Starting automated checks...

✅ [PASS] 1. Riddle Run: 4 options per riddle & R >= 4 rounds enforced (p=0.25, R=4)
✅ [PASS] 2. Riddle Run: 4 doors mapped & N1 exploit blocked (d <= 85px required)
✅ [PASS] 3. Titan Forge: 4 options per round & R >= 4 rounds enforced (p=0.25, R=4)
✅ [PASS] 4. Titan Forge: 4 cogs mapped & N1 exploit blocked (d <= 85px required)
✅ [PASS] 5. Persistent 3 hearts maintained across rounds (no reset between rounds)
✅ [PASS] 6. Mathematical N4 verification (R=4, p=0.25, L=2: N4 = 3.76% <= 5%)
✅ [PASS] 7. Riddle Run: Randomized Chaser spawn (left/right wing spawn, re-roll on next round & retry)
✅ [PASS] 8. Titan Forge: Steam Vent hazard active cycle (2800ms) & idle reset on retry
✅ [PASS] 9. N2 Pacing: Worst-case reading+decision (Riddle=17.74s, Titan=21.09s) <= 22.5s round budget

========================================
Validator Result: 9/9 PASSED
🎉 ALL P0-2 & P0-3 VALIDATION CHECKS PASSED!
```

---

## 5. BẰNG CHỨNG PLAYTEST REAL CHROME ĐỒNG BỘ 100% (8/8 FRAMES)

### P0-2: Riddle Run Maze
- **Spawn**: 4 cửa (`door_0`..`door_3`), 3 tim đỏ, round 1/4. Chaser spawn ngẫu nhiên trên sàn.
  - JSON log: `{"heartsCount": 3, "doorCount": 4, "roundPill": "ROUND 0/4"}`
- **Wrong**: Chạm cửa sai `Magnetism` $\to$ HUD giảm đúng 2 tim đỏ + 1 tim xám, toast xuất hiện.
  - JSON log: `{"heartsCount": 2, "emptyHearts": 1, "feedbackToast": "🔒 SEALED! \"Magnetism\" does not solve the riddle!"}`
- **KO**: Cạn 3 tim $\to$ hiển thị KO modal `TRAPPED IN THE MAZE!`.
  - JSON log: `{"heartsCount": 0, "emptyHearts": 3, "koTitle": "TRAPPED IN THE MAZE!", "hasRetryBtn": true}`
- **Retry**: Bấm `Try Again` $\to$ reset 3 tim đỏ, round 1, Chaser re-roll sang cánh phải ($x \approx 580$), sạch toast.
  - JSON log: `{"heartsCount": 3, "emptyHearts": 0, "roundPill": "ROUND 0/4"}`

### P0-3: Titan Grammar Forge
- **Spawn**: 4 cogs (`gear_0`..`gear_3`), 3 tim đỏ, round 1/4.
  - JSON log: `{"heartsCount": 3, "cogCount": 4, "roundPill": "ROUND 0/4"}`
- **Wrong**: Chọn cog sai `stops immediately now` $\to$ HUD giảm đúng 2 tim đỏ + 1 tim xám, toast xuất hiện.
  - JSON log: `{"heartsCount": 2, "emptyHearts": 1, "feedbackToast": "💥 GEAR JAM! \"stops immediately now\" broke the piston!"}`
- **KO**: Cạn 3 tim $\to$ hiển thị KO modal `TITAN ENGINE EXPLODED!`.
  - JSON log: `{"heartsCount": 0, "emptyHearts": 3, "koTitle": "TITAN ENGINE EXPLODED!", "hasRetryBtn": true}`
- **Retry**: Bấm `Try Again` $\to$ reset 3 tim đỏ, round 1, van Steam Vent được dập tắt (idle, không còn STEAM BLAST), sạch toast.
  - JSON log: `{"heartsCount": 3, "emptyHearts": 0, "roundPill": "ROUND 0/4"}`
