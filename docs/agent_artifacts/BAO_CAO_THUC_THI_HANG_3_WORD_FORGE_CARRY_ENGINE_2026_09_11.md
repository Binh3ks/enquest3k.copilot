# BÁO CÁO THỰC THI TOÀN DIỆN: HẠNG #3 — WORD FORGE CARRY ENGINE (PHƯƠNG ÁN B)
*Ngày lập: 11/09/2026 — Phiên làm việc Antigravity v2 Forensic & Staging*

---

## 1. TỔNG QUAN KIẾN TRÚC & QUYẾT ĐỊNH KỸ THUẬT

### 1.1. Bối cảnh & Phương án B (Physical Carry Engine)
- **Vị trí**: Floor 7, Door 1 (Vocab) — Master Sanctum Chamber.
- **Mục tiêu**: Thay thế cơ chế bấm phím tĩnh (tap click đơn điệu) bằng nền tảng Platformer vật lý chân thực, kế thừa từ `ScrollChamberDecode.jsx`.
- **Cơ chế cốt lõi (Word Forge Carry Engine)**:
  - Leo di chuyển, nhảy trên các bệ đá của phòng rèn ma thuật Arcane Forge.
  - Bệ Đe Rèn Trung Tâm (Upper Arcane Anvil Deck tại `y = 240`) với các ô rèn chữ cái tương ứng với từ mục tiêu (`_ _ _ _`).
  - Các khối Rune Chữ Cái (Letter Runes) nằm rải rác trên các kệ đá và sàn lò rèn.
  - **Cơ chế bưng bê (Carry Engine)**: Leo chạy lại gần phiến đá chữ cái $\rightarrow$ bưng phiến đá lên đầu (`carryingRune`), nhảy lên bệ đe rèn và thả vào ô rèn.
  - **Cơ chế khớp 2 tầng (2-Tier Matching)**:
    - *Tier 1*: Ký tự trên phiến đá có thuộc từ mục tiêu hay không (lọc distractors).
    - *Tier 2*: Ký tự có khớp với ô chữ cái tiếp theo theo thứ tự chuỗi từ (Sequential Forge).
  - **Hệ quả va chạm**:
    - *Đúng*: Rune gắn chặt vào đe rèn (`socket-forged`), hào quang lửa rèn vàng xanh, +25 XP, TTS phát âm chữ cái.
    - *Sai*: Rune bật ngược lại vị trí ban đầu (origin), tóe tia lửa đỏ, -1 Tim (`hearts - 1: 3 -> 2`), Leo giật lùi nhẹ.
  - **Hoàn thành từ**: Khi ghép đủ mọi ký tự $\rightarrow$ Đe rèn rực sáng, TTS đọc to toàn bộ từ, cộng thưởng +50 XP, dọn sạch rune cũ và chuyển sang từ tiếp theo.

### 1.2. Cơ chế Anti-Leak Invariant
- Mọi Rune Stone và ô Socket đều mang nhãn định danh vòng: `targetRoundId: currentRoundId`.
- Ngay khi chuyển từ mới (Round transition), mảng runes và trạng thái đe rèn của từ cũ bị xóa sạch (`runesRef.current = []`, `setPlacedIndices([])`, `setCarryingRune(null)`).
- Hàm `getStaleRunes(oldRoundId)` kiểm chứng 100% không còn rune rác nào của từ trước sót lại trong bộ nhớ.

---

## 2. KẾT QUẢ PUPPETEER PLAYTEST ĐỦ 4/4 TỔ HỢP THỰC TẾ

Chạy script kiểm thử tự động: `node scripts/test_word_forge_carry_playtest.mjs`

### 2.1. Output NGUYÊN VĂN từ tool call
```
================================================================================
>>> HẠNG #3: WORD FORGE CARRY ENGINE — PLAYTEST FULL 4 TỔ HỢP + ANTI-LEAK <<<
================================================================================

--- TỔ HỢP 1: W33 SUCCESS (Nhặt đúng rune "S" -> Hammered into Anvil) ---
[W33 Target Word]: SLIP
[W33 Forged Letter]: S
[W33 Collision Toast]: "✨ RUNE FORGED! Letter "S" hammered into anvil!"
[W33 Score HUD]: 0 -> 25 (+25 XP)
[W33 Hearts DOM]: 3 -> 3
[W33 Forged Sockets Count]: 1
[Tổ hợp 1 Assertion]: Rune forged into socket & +25 XP & 3 hearts? => PASS ✅

--- TỔ HỢP 2: W33 HAZARD (Nhặt nhầm rune "X" -> Forge Rejected & -1 Tim) ---
[W33 Target Word]: SLIP
[W33 Distractor Char]: X
[W33 Hazard Toast]: "⚡ FORGE REJECTED! "X" does not match slot 1!"
[W33 Hazard Score HUD]: 0 -> 0 (+0 XP)
[W33 Hazard Hearts DOM]: 3 -> 2 (Expected: 3 -> 2)
[W33 Hazard Hearts Hook]: 2
[Tổ hợp 2 Assertion]: Distractor rejected & -1 heart & warning toast? => PASS ✅

--- TỔ HỢP 3: W35 SUCCESS (Nhặt đúng rune "C" của "CAMP" -> Forged) ---
[W35 Target Word]: CAMP
[W35 Forged Letter]: C
[W35 Collision Toast]: "✨ RUNE FORGED! Letter "C" hammered into anvil!"
[W35 Score HUD]: 0 -> 25 (+25 XP)
[W35 Hearts DOM]: 3 -> 3
[W35 Forged Sockets Count]: 1
[Tổ hợp 3 Assertion]: W35 Rune forged into socket & +25 XP & 3 hearts? => PASS ✅

--- TỔ HỢP 4: W35 HAZARD (Nhặt nhầm rune "Z" -> Forge Rejected & -1 Tim) ---
[W35 Target Word]: CAMP
[W35 Distractor Char]: Z
[W35 Hazard Toast]: "⚡ FORGE REJECTED! "Z" does not match slot 1!"
[W35 Hazard Score HUD]: 0 -> 0 (+0 XP)
[W35 Hazard Hearts DOM]: 3 -> 2 (Expected: 3 -> 2)
[W35 Hazard Hearts Hook]: 2
[Tổ hợp 4 Assertion]: W35 Distractor rejected & -1 heart & warning toast? => PASS ✅

--- PHẦN 5: ANTI-LEAK ROUND TRANSITION VERIFICATION ---
[Word Forge Transition]: Word Round 1 (idx: 0) -> Word Round 2 (idx: 1)
[Old Round Runes Before]: 2
[Old Round Runes Remaining After Transition]: 0 (Expected: 0)
[New Round Spawned Runes]: 7 (active for new word)
[Anti-Leak Assertion]: Word advanced correctly & old runes purged from memory? => PASS ✅

================================================================================
>>> HOÀN THÀNH 100%: TẤT CẢ 4/4 TỔ HỢP WORD FORGE VÀ ANTI-LEAK ĐỀU PASS TUYỆT ĐỐI! <<<
================================================================================
```

### 2.2. Bằng chứng chụp màn hình thực tế (Đủ 4/4 Tổ Hợp)

1. **Tổ hợp 1: W33 Success — Leo đúc đúng chữ `S` vào đe rèn từ `SLIP` (+25 XP, 3 Tim):**
   ![W33 Word Forge Success](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/w33_word_forge_success_live.png)

2. **Tổ hợp 2: W33 Hazard — Leo nhặt nhầm rune `X` $\rightarrow$ Bị từ chối, trừ 1 Tim (3 $\rightarrow$ 2):**
   ![W33 Word Forge Hazard](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/w33_word_forge_hazard_live.png)

3. **Tổ hợp 3: W35 Success — Leo đúc đúng chữ `C` vào đe rèn từ `CAMP` (+25 XP, 3 Tim):**
   ![W35 Word Forge Success](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/w35_word_forge_success_live.png)

4. **Tổ hợp 4: W35 Hazard — Leo nhặt nhầm rune `Z` $\rightarrow$ Bị từ chối, trừ 1 Tim (3 $\rightarrow$ 2):**
   ![W35 Word Forge Hazard](/Users/binhnguyen/.gemini/antigravity-ide/brain/6305bf87-e347-49bd-8c33-3999df275ebf/w35_word_forge_hazard_live.png)

---

## 3. TỔNG KẾT TRẠNG THÁI & TÍCH HỢP HỆ THỐNG
- **Component**: `src/modules/quest/WordForgeCarryEngine.jsx` (740 dòng)
- **Stylesheet**: `src/modules/quest/WordForgeCarryEngine.css` (260 dòng)
- **Export**: `src/modules/quest/index.js`
- **Mount**: `src/modules/chronicles/DailyRoomScreen.jsx:403` (`case 'word_forge_scramble':`)
- **Build Status**: `npm run build` exit code 0 (`15.29s`).
- **Playtest Suite**: Đạt 100% cả 4/4 tổ hợp ngay từ lần chạy đầu tiên.
