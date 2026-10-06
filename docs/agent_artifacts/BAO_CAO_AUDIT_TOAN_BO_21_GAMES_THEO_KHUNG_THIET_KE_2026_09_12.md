# BÁO CÁO AUDIT TOÀN DIỆN 21 MINI-GAMES THEO KHUNG THIẾT KẾ CHUẨN
**Ngày**: 2026-09-12
**Tiêu chuẩn áp dụng**: `ENGQUEST3K_KHUNG_THIET_KE_21_GAMES.md` (5 nguyên tắc N1–N5 + schema Mục 6)
**Phương pháp thu thập dữ kiện**: Puppeteer tự động trên live app (http://localhost:5173), tương tác bàn phím thật, đo đạc DOM thực tế và chụp ảnh minh chứng.

---

### Game: Bubble Storm Chase (Floor 1 Door 1)
- Engine file: `src/modules/quest/BubbleStormChase.jsx`
- Kỹ năng ngôn ngữ: Từ vựng A2 (Định nghĩa từ vựng: e.g. "smooth tiles" ↔ "Flat, slippery ceramic pieces covering a floor")
- Core loop: Đọc định nghĩa trên banner → Leo di chuyển/nhảy trên 3 tầng bệ đá tìm bong bóng mang từ đúng → Chạm bong bóng kích hoạt modal MCQ Blitz 5s; chạm bong bóng sai/quái slime trừ 1 tim (3 tim max) → Chọn đúng MCQ được +30 XP và buff tốc độ; chọn sai mất tim
- Đồng thời/tách rời: Tách rời (Đọc định nghĩa tĩnh trên banner → nhảy bắt bóng → game tạm dừng pop-up modal MCQ 5s để bấm)
- Ngân sách thời gian: đọc+quyết định = 9.2s (10 từ: định nghĩa 8 từ + từ mục tiêu 2 từ × 0.67s + 2.5s) | engine cho phép = 12.0s/wave (60s tổng / 5 waves) & 5.0s modal MCQ
- Xác suất đoán mò: loại có phản hồi từng bước = 10.35% (bong bóng: 5 waves, 4 bóng/wave, 3 tim cho phép sai 2: $\sum_{k=0}^2 \binom{5}{k} (3/4)^k (1/4)^{5-k} = 106/1024 \approx 10.35\%$) | nếu tính cả MCQ 3 lựa chọn: $10.35\% \times (1/3)^3 \approx 0.38\%$
- HUD: Floor/Door [x] (`FLOOR 1 Door 1 — Bubble Storm Chase`) | Tim [x] (`❤️❤️❤️`) | Round [ ] (Thiếu HUD round chuẩn, chỉ có `WAVE 1/5` trên banner) | XP [x] (`0 XP`)
- Controls self-evident 5s: Không. Desktop không hiển thị phím bấm điều khiển trên màn hình (chỉ có virtual D-pad ở mobile)
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f1d1_bubble_chase_action.png`
- Kết luận: N1[ ] N2[x] N3[ ] N4[x] N5[ ] → Dữ liệu: FAIL N1, FAIL N3, FAIL N5

---

### Game: Word Wagon Jump (Floor 1 Door 2)
- Engine file: `src/modules/quest/WordWagonJump.jsx`
- Kỹ năng ngôn ngữ: Ngữ pháp A2 (Collocation / Cụm từ ghép câu cốt truyện)
- Core loop: Đọc câu có chỗ trống trên banner → Các toa tàu mang cụm từ cuộn từ phải sang trái (110px/s) → Leo nhảy lên nóc toa tàu mang cụm từ đúng để cưỡi và điền từ; nhảy nhầm toa chứa Gremlin trượt ngã trừ 1 tim → Hoàn thành 3 toa qua màn
- Đồng thời/tách rời: Đồng thời (Toa tàu liên tục trôi dạt 110px/s; học sinh vừa đọc chữ trên nóc toa vừa căn nhịp nhảy)
- Ngân sách thời gian: đọc+quyết định = 12.55s (15 từ: câu 12 từ + 3 toa tàu × 0.67s + 2.5s) | engine cho phép = 8.18s (toa tàu chạy 900px ở vận tốc 110px/s trước khi rời màn hình)
- Xác suất đoán mò: loại có phản hồi từng bước = 70.37% (3 toa tàu/round, $p = 1/3$, 3 rounds, 3 tim cho phép sai 2: $\sum_{k=0}^2 \binom{3}{k} (2/3)^k (1/3)^{3-k} = 19/27 \approx 70.37\%$)
- HUD: Floor/Door [x] (`FLOOR 1 Door 2 — Word Wagon Jump`) | Tim [x] (`❤️❤️❤️`) | Round [ ] (Thiếu HUD round chuẩn, chỉ có `TRAIN 1/3` trên banner) | XP [x] (`0 XP`)
- Controls self-evident 5s: Không. Desktop thiếu nhãn phím điều khiển
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f1d2_wagon_jump_action.png`
- Kết luận: N1[x] N2[ ] N3[ ] N4[ ] N5[ ] → Dữ liệu: FAIL N2 (8.18s < 12.55s), FAIL N3, FAIL N4 (70.37%), FAIL N5

---

### Game: Shadow Vault Infiltrate (Floor 1 Door 3)
- Engine file: `src/modules/quest/ShadowVaultInfiltrate.jsx`
- Kỹ năng ngôn ngữ: Tích hợp A2 (Ghép cặp Từ vựng ↔ Định nghĩa)
- Core loop: Leo chạm két bên trái để lấy từ → Bưng vác từ vượt qua hầm né robot Shadow Guard tuần tra → Chạm két định nghĩa bên phải để ghép cặp; bị robot quét trúng rơi đồ trừ 1 tim → Ghép đủ 4 cặp mở kho báu
- Đồng thời/tách rời: Tách rời (Đọc từ bên trái tĩnh, di chuyển né robot, đọc 4 định nghĩa tĩnh bên phải)
- Ngân sách thời gian: đọc+quyết định = 30.47s (41 từ: 4 từ vựng + 4 định nghĩa dài × 0.67s + 3.0s) | engine cho phép = 22.5s/cặp (90s tổng / 4 cặp; robot tuần tra chu kỳ 4.2s)
- Xác suất đoán mò: loại có phản hồi từng bước = 16.67% (4 két nối 4 két, 3 tim cho phép sai tối đa 2 lần: $P \approx 16.67\% > 5\%$)
- HUD: Floor/Door [ ] (HUDOverlay không hiển thị tên Floor/Door) | Tim [x] (`❤️❤️❤️`) | Round [ ] (Chỉ có `0/4 CRACKED`, thiếu Round chuẩn) | XP [x] (`0 XP`)
- Controls self-evident 5s: Không. Desktop thiếu nhãn phím hướng dẫn nhặt/thả
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f1d3_shadow_vault_action.png`
- Kết luận: N1[ ] N2[ ] N3[ ] N4[ ] N5[ ] → Dữ liệu: FAIL N1, FAIL N2, FAIL N3, FAIL N4 (16.67%), FAIL N5

---

### Game: Potion Flip Dungeon (Floor 2 Door 1)
- Engine file: `src/modules/quest/PotionFlipDungeon.jsx`
- Kỹ năng ngôn ngữ: Từ vựng A2 (Trí nhớ ghép cặp Từ ↔ Nghĩa)
- Core loop: Leo nhảy lên các vạc độc để lật mở thẻ bài ẩn → Ghi nhớ vị trí và ghép cặp Từ ↔ Nghĩa; nếu lật sai 2 thẻ sẽ úp lại sau 1.5s; quái Lab Gremlin tuần tra gây mất tim → Ghép đủ 4 cặp qua cửa
- Đồng thời/tách rời: Tách rời (Cơ chế Memory Match truyền thống: nhảy lên vạc lật bài, đứng yên đọc, nhảy sang vạc khác)
- Ngân sách thời gian: đọc+quyết định = 6.0s (6 từ/thẻ × 0.67s + 2.0s) | engine cho phép = 90.0s (timer tổng)
- Xác suất đoán mò: loại có phản hồi từng bước = 100.0% brute-force (Lật sai thẻ không bị trừ tim, chỉ trừ tim khi chạm quái tuần tra, người chơi có thể lật lần lượt từng ô để giải mà không cần biết nghĩa từ vựng)
- HUD: Floor/Door [x] (`FLOOR 2 Door 1 — Potion Flip Dungeon`) | Tim [x] (`❤️❤️❤️`) | Round [ ] (Chỉ có `0/4 BREWED`, thiếu Round chuẩn) | XP [x] (`0 XP`)
- Controls self-evident 5s: Không. Desktop thiếu nhãn phím
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f2d1_potion_flip_action.png`
- Kết luận: N1[ ] N2[x] N3[ ] N4[ ] N5[ ] → Dữ liệu: FAIL N1, FAIL N3, FAIL N4 (100% brute-force lật thẻ không phạt tim), FAIL N5

---

### Game: Anvil Rush Grammar (Floor 2 Door 2)
- Engine file: `src/modules/quest/AnvilRushGrammar.jsx`
- Kỹ năng ngôn ngữ: Ngữ pháp A2 (Dạng động từ / Inflections: stopped vs stoppeds vs stoppeding)
- Core loop: Đọc câu có chỗ trống trên banner → Leo leo lên các bệ đá tiếp cận 3 đe rèn mang 3 dạng ngữ pháp → Jump-Strike (nhảy dậm) vào đe rèn mang từ đúng; dậm đe sai đe phun lửa trừ 1 tim → Hoàn thành 3 trials qua màn
- Đồng thời/tách rời: Tách rời (Đọc câu trên banner tĩnh trước → ngắm nghía 3 đe → nhảy tới dậm)
- Ngân sách thời gian: đọc+quyết định = 11.2s (13 từ: câu banner 10 từ + 3 từ trên đe × 0.67s + 2.5s) | engine cho phép = 24.6s/trial (74s timer / 3 trials)
- Xác suất đoán mò: loại có phản hồi từng bước = 70.37% (3 đe rèn, $p = 1/3$, 3 trials, 3 tim cho phép sai 2: $\sum_{k=0}^2 \binom{3}{k} (2/3)^k (1/3)^{3-k} = 19/27 \approx 70.37\%$)
- HUD: Floor/Door [x] (`FLOOR 2 Door 2 — Anvil Rush Grammar`) | Tim [x] (`❤️❤️❤️`) | Round [ ] (Chỉ có `TRIAL 1/3` trên banner, thiếu HUD round chuẩn) | XP [x] (`0 XP`)
- Controls self-evident 5s: Không. Desktop thiếu nhãn phím hướng dẫn nhảy/dậm đe
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f2d2_anvil_rush_action.png`
- Kết luận: N1[ ] N2[x] N3[ ] N4[ ] N5[ ] → Dữ liệu: FAIL N1, FAIL N3, FAIL N4 (70.37%), FAIL N5

---

### Game: Scroll Chamber Decode (Floor 2 Door 3)
- Engine file: `src/modules/quest/ScrollChamberDecode.jsx`
- Kỹ năng ngôn ngữ: Tích hợp Cloze Passage A2 (Điền 4 từ vào cuộn da cổ)
- Core loop: Cuộn da hiển thị đoạn văn 4 chỗ trống trên trần thư viện → 8 phiến đá rune rải rác dưới sàn → Leo nhặt phiến đá mang vác trên đầu, né bóng ma Curse Wraith (hoặc đứng dưới đèn chùm miễn nhiễm), nhảy lên thả vào ô trống; thả sai phiến đá rơi về vị trí cũ và trừ 1 tim → Khôi phục 4 ô trống qua màn
- Đồng thời/tách rời: Tách rời (Đọc cuộn da tĩnh trước, đọc từ trên phiến đá, sau đó mới di chuyển nhặt thả)
- Ngân sách thời gian: đọc+quyết định = 21.76s (28 từ: đoạn văn 20 từ + 8 từ trên phiến đá × 0.67s + 3.0s) | engine cho phép = 119.0s (timer tổng)
- Xác suất đoán mò: loại có phản hồi từng bước = 11.72% (8 phiến đá chọn 4 ô, $P(8,4) = 1680$ cách, 3 tim cho phép sai tối đa 2 lần: $P \approx 197/1680 \approx 11.72\% > 5\%$)
- HUD: Floor/Door [x] (`FLOOR 2 Door 3 — Scroll Chamber Decode`) | Tim [x] (`❤️❤️❤️`) | Round [ ] (Chỉ có `Blanks Restored: 0 / 4`, thiếu Round chuẩn) | XP [x] (`0 XP`)
- Controls self-evident 5s: Không. Desktop thiếu nhãn phím nhặt/thả
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f2d3_scroll_chamber_action.png`
- Kết luận: N1[ ] N2[x] N3[ ] N4[ ] N5[ ] → Dữ liệu: FAIL N1, FAIL N3, FAIL N4 (11.72%), FAIL N5

---

### Game: Echo Arena Shooter (Floor 3 Door 1)
- Engine file: `src/modules/quest/EchoArenaShooter.jsx`
- Kỹ năng ngôn ngữ: Ngữ âm Phonics / Từ vựng A2 (Nhận diện từ chứa âm mục tiêu, e.g. `/sh/` trong shoe/ship vs chair/think)
- Core loop: Nghe âm mục tiêu `/sh/` → 4 quả cầu âm thanh bay lơ lửng và dơi Jammer quấy nhiễu → Điều khiển Leo ngắm bắn tia cộng hưởng hoặc chạm trực tiếp vào quả cầu đúng; bắn sai trừ 1 tim → Bắn trúng 3 round qua màn
- Đồng thời/tách rời: Đồng thời (Quả cầu và dơi Jammer bay lượn liên tục; người chơi vừa nghe âm vừa ngắm bắn)
- Ngân sách thời gian: đọc+quyết định = 5.68s (nghe âm 1.0s + 4 từ ngắn × 0.67s + 2.0s) | engine cho phép = 19.6s/round (59s / 3 rounds)
- Xác suất đoán mò: loại có phản hồi từng bước = 87.5% (4 quả cầu có 2 quả đúng, $p = 2/4 = 1/2$, 3 rounds, 3 tim cho phép sai 2: $\sum_{k=0}^2 \binom{3}{k} (1/2)^3 = 7/8 = 87.5\%$)
- HUD: Floor/Door [x] (`FLOOR 3 Door 1 — Echo Arena Shooter`) | Tim [x] (`❤️❤️❤️`) | Round [x] (`1/3`) | XP [x] (`0 XP`)
- Controls self-evident 5s: Có. Có nhãn: `"Tap any orb or tap screen to shoot! Swipe to steer Leo."`
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f3d1_echo_arena_action.png`
- Kết luận: N1[x] N2[x] N3[x] N4[ ] N5[x] → Dữ liệu: FAIL N4 (đoán mò 87.5% do 2/4 đáp án đúng và 3 tim)

---

### Game: Chunk Catapult Match (Floor 3 Door 2)
- Engine file: `src/modules/chronicles/games/ChunkCatapultCanvas.jsx`
- Kỹ năng ngôn ngữ: Ngữ pháp Collocation / Sentence Chunks (Nối vế câu starter ↔ completion)
- Core loop: Đọc vế đầu câu ở đầu bệ phóng → Kéo súng cao su (thời gian chậm 0.4x bullet time) và ngắm bắn đạn parabol vào 3 bia mục tiêu mang vế đuôi câu → Bắn trúng bia đúng ghi điểm; bắn trượt hoặc trúng bia sai bị trừ điểm lượt bắn → Bắn đủ 8 câu hoàn thành
- Đồng thời/tách rời: Tách rời có bullet time (Kéo súng thời gian chậm 0.4x để ngắm đọc bia)
- Ngân sách thời gian: đọc+quyết định = 17.91s (23 từ: vế đầu 8 từ + 3 vế sau 15 từ × 0.67s + 2.5s) | engine cho phép = 9.25s/cặp (74s timer / 8 cặp)
- Xác suất đoán mò: loại có phản hồi từng bước = 100.0% brute-force spam đạn (Không có Game Over hết tim, chỉ tính điểm score, người chơi có thể kéo bắn liên tục đến khi trúng)
- HUD: Floor/Door [ ] (Thiếu tên Floor/Door trên canvas) | Tim [ ] (Không có biểu tượng trái tim ❤️) | Round [x] (`Pair: 1/8`) | XP [x] (`Score: 0`)
- Controls self-evident 5s: Có. Header ghi rõ: `"PULL SLINGSHOT & AIM AT THE MATCHING COMPLETION"`
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f3d2_chunk_catapult_action.png`
- Kết luận: N1[x] N2[ ] N3[x] N4[ ] N5[ ] → Dữ liệu: FAIL N2 (17.91s > 9.25s), FAIL N4 (spam đạn không chết), FAIL N5 (thiếu Floor/Door và Tim)

---

### Game: Storm Shield Defense (Floor 3 Door 3)
- Engine file: `src/modules/quest/StormShieldDefense.jsx`
- Kỹ năng ngôn ngữ: Từ vựng A2 (Phân biệt từ vựng chủ đề đúng vs thiên thạch bẫy distractor)
- Core loop: Thiên thạch vàng (từ đúng) và thiên thạch đỏ (từ sai/sét) rơi từ trên trời xuống (140px/s) → Leo di chuyển, nhảy và dùng khiên đón thiên thạch vàng để sạc pin (+20%/viên); đỡ trúng thiên thạch đỏ trừ 1 tim → Sạc đủ 100% pin (5 viên) hoàn thành
- Đồng thời/tách rời: Đồng thời (Thiên thạch rơi liên tục; người chơi vừa đọc chữ trên đá rơi vừa căn vị trí đứng khiên)
- Ngân sách thời gian: đọc+quyết định = 2.84s (2 từ trên đá rơi × 0.67s + 1.5s) | engine cho phép = 3.0s (đá rơi từ y=60 xuống y=480 ở vận tốc 140px/s = 420/140 = 3.0s)
- Xác suất đoán mò: loại có phản hồi từng bước = 50.0% (Mỗi lần rơi có 2 loại đá đúng/sai tỷ lệ 50/50, cần 5 viên vàng, 3 tim cho phép sai 2: $\sum_{k=0}^2 \binom{5}{k} (1/2)^5 = 16/32 = 50\%$)
- HUD: Floor/Door [x] (`FLOOR 3 Door 3 — Storm Shield Defense`) | Tim [x] (`❤️❤️❤️`) | Round [ ] (Chỉ có `Storm Battery: 0%` và `0/5`, thiếu Round chuẩn) | XP [x] (`0 XP`)
- Controls self-evident 5s: Không. Desktop thiếu nhãn phím điều khiển
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f3d3_storm_shield_action.png`
- Kết luận: N1[x] N2[ ] N3[ ] N4[ ] N5[ ] → Dữ liệu: FAIL N2 (pacing 2.84s ~ 3.0s quá gấp), FAIL N3, FAIL N4 (50%), FAIL N5

---

### Game: Highway Word Runner (Floor 4 Door 1)
- Engine file: `src/modules/quest/HighwaySprintCanvas.jsx`
- Kỹ năng ngôn ngữ: Từ vựng A2 (Định nghĩa từ vựng: đọc định nghĩa chọn biển từ vựng trên đường chạy 3D)
- Core loop: Banner hiển thị định nghĩa từ vựng → Đường chạy 3D cuộn về phía trước (360px/s) với chướng ngại vật (rào chắn, laser) và 3 biển từ vựng trên 3 làn chạy → Leo chuyển làn, nhảy/trượt để đâm trúng biển từ đúng; đâm chướng ngại hoặc biển sai mất 1 tim → 10 rounds
- Đồng thời/tách rời: Đồng thời (Đường chạy 3D cuộn liên tục ở tốc độ cao)
- Ngân sách thời gian: đọc+quyết định = 15.23s (19 từ: định nghĩa 16 từ + 3 biển từ 3 từ × 0.67s + 2.5s) | engine cho phép = 2.78s (biển xuất hiện từ z=1000 đến z=0 ở tốc độ 360px/s = 1000/360 = 2.78s)
- Xác suất đoán mò: loại có phản hồi từng bước = 0.34% (3 làn, $p = 1/3$, 10 rounds, 3 tim cho phép sai 2: $\sum_{k=0}^2 \binom{10}{k} (2/3)^k (1/3)^{10-k} = 201/59049 \approx 0.34\% < 5\%$)
- HUD: Floor/Door [x] (`FLOOR 4 Door 1 — Highway 3D Word Runner`) | Tim [x] (`❤️❤️❤️`) | Round [x] (`1/10`) | XP [x] (`0 XP`)
- Controls self-evident 5s: Có. Có text hướng dẫn: `"Tap Left/Right to Steer • Double-Tap/Swipe ↑ to Jump • Swipe ↓ to Slide"`
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f4d1_highway_runner_action.png`
- Kết luận: N1[x] N2[ ] N3[x] N4[x] N5[x] → Dữ liệu: FAIL N2 cực nặng (T đọc 15.23s >> T engine 2.78s)

---

### Game: Syntax Express Rail (Floor 4 Door 2)
- Engine file: `src/modules/quest/SyntaxExpressRail.jsx`
- Kỹ năng ngôn ngữ: Ngữ pháp A2 (Mệnh đề / Cụm từ nối tiếp vế câu)
- Core loop: Tàu chạy trên đường ray canyon → 3 cần gạt đường ray trên bệ gantry mang 3 cụm từ ngữ pháp → Leo nhảy giữa các bệ gantry dậm cần gạt đúng trước khi tàu tới ngã rẽ; gạt sai hoặc hết giờ tàu trật bánh trừ 1 tim → 3 rounds
- Đồng thời/tách rời: Tách rời một phần (Câu hiển thị tĩnh trên banner; tàu chạy đếm giờ tới ngã rẽ; Leo di chuyển giữa 3 cần gạt)
- Ngân sách thời gian: đọc+quyết định = 15.9s (20 từ: câu banner 8 từ + 3 cần gạt 12 từ × 0.67s + 2.5s) | engine cho phép = 12.0s (thời gian tàu chạy tới ngã rẽ)
- Xác suất đoán mò: loại có phản hồi từng bước = 70.37% (3 cần gạt, $p = 1/3$, 3 rounds, 3 tim cho phép sai 2: $P = 19/27 \approx 70.37\%$)
- HUD: Floor/Door [x] (`FLOOR 4 Door 2 — Syntax Express Rail`) | Tim [x] (`❤️❤️❤️`) | Round [x] (`R1/3`) | XP [x] (`0 XP`)
- Controls self-evident 5s: Có. Trên cần gạt ghi: `"🎚️ STRIKE / TAP"`
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f4d2_syntax_express_action.png`
- Kết luận: N1[x] N2[ ] N3[x] N4[ ] N5[x] → Dữ liệu: FAIL N2 (15.9s > 12.0s), FAIL N4 (70.37%)

---

### Game: Riddle Run Maze (Floor 4 Door 3)
- Engine file: `src/modules/quest/RiddleRunMaze.jsx`
- Kỹ năng ngôn ngữ: Tích hợp Đố vui Cambridge A2 (Riddle câu đố ngữ cảnh)
- Core loop: Đọc câu đố ở banner trên cùng → Mê cung đá có 3 cánh cổng mang 3 từ đáp án → Quái Chaser Minotaur đuổi theo trong mê cung → Leo nhảy qua các bậc đá đi vào cổng đúng; vào cổng sai bị giật điện trừ 1 tim → 3 riddles
- Đồng thời/tách rời: Tách rời một phần (Câu đố hiển thị tĩnh trên đỉnh màn hình, người chơi có thể đứng yên đọc trước khi di chuyển)
- Ngân sách thời gian: đọc+quyết định = 16.4s (20 từ: câu đố 17 từ + 3 cổng 3 từ × 0.67s + 3.0s) | engine cho phép = 14.0s (thời gian quái Chaser tiếp cận vị trí xuất phát)
- Xác suất đoán mò: loại có phản hồi từng bước = 70.37% (3 cổng, $p = 1/3$, 3 rounds, 3 tim cho phép sai 2: $P = 19/27 \approx 70.37\%$)
- HUD: Floor/Door [x] (`FLOOR 4 Door 3 — Riddle Run Maze`) | Tim [x] (`❤️❤️❤️`) | Round [x] (`Riddle 1 / 3`) | XP [x] (`0 XP`)
- Controls self-evident 5s: Có. Trên mỗi cổng ghi: `"🚪 ENTER / TAP"` và nhãn `"🐺 CHASER"`
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f4d3_riddle_run_action.png`
- Kết luận: N1[ ] N2[ ] N3[x] N4[ ] N5[x] → Dữ liệu: FAIL N1, FAIL N2 (16.4s > 14.0s), FAIL N4 (70.37%)

---

### Game: Grand Master Matrix (Floor 5 Door 1)
- Engine file: `src/modules/quest/GrandMatrixDungeon.jsx`
- Kỹ năng ngôn ngữ: Từ vựng A2 nâng cao (Định nghĩa chuyên sâu đa lĩnh vực)
- Core loop: Màn hình hiển thị Matrix Query định nghĩa → 4 Coordinate Nodes trên lưới ma trận mang 4 từ vựng xen kẽ quái Glitch Sentinels → Leo nhảy qua các node ma trận, bấm nút Interact để thu thập từ đúng; chọn node sai hoặc chạm Glitch trừ 1 tim → 4 nodes
- Đồng thời/tách rời: Tách rời (Định nghĩa hiển thị tĩnh trên HUD; Leo nhảy giữa các bệ tĩnh rồi bấm nút Interact)
- Ngân sách thời gian: đọc+quyết định = 12.55s (15 từ: định nghĩa 11 từ + 4 từ node × 0.67s + 2.5s) | engine cho phép = 22.2s/node (89s timer / 4 nodes)
- Xác suất đoán mò: loại có phản hồi từng bước = 26.17% (4 nodes, $p = 1/4$, 4 rounds, 3 tim cho phép sai 2: $\sum_{k=0}^2 \binom{4}{k} (3/4)^k (1/4)^{4-k} = 67/256 \approx 26.17\% > 5\%$)
- HUD: Floor/Door [ ] (HUDOverlay thiếu hiển thị Floor/Door) | Tim [x] (`❤️❤️❤️`) | Round [x] (`Node 1 / 4`) | XP [x] (`0 XP`)
- Controls self-evident 5s: Có. Trên mỗi node ghi: `"INTERACT / TAP"`
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f5d1_grand_matrix_action.png`
- Kết luận: N1[ ] N2[x] N3[x] N4[ ] N5[ ] → Dữ liệu: FAIL N1, FAIL N4 (26.17%), FAIL N5 (thiếu Floor/Door)

---

### Game: Titan Grammar Forge (Floor 5 Door 2)
- Engine file: `src/modules/quest/TitanGrammarForge.jsx`
- Kỹ năng ngôn ngữ: Ngữ pháp A2 nâng cao (Modal verbs / Conditionals)
- Core loop: Buồng Titan cơ khí với bánh răng xoay và ống xả hơi nước → 3 bánh răng mang 3 mệnh đề ngữ pháp dài → Leo nhảy qua các thanh dầm cơ khí, né luồng hơi nước, bấm kích hoạt bánh răng đúng; kích hoạt bánh răng sai nổ luồng hơi nóng trừ 1 tim → 3 gears
- Đồng thời/tách rời: Tách rời (Đọc câu trên banner tĩnh trước, sau đó nhảy qua các bánh răng và bấm nút)
- Ngân sách thời gian: đọc+quyết định = 17.74s (22 từ: câu banner 7 từ + 3 phương án bánh răng 15 từ × 0.67s + 3.0s) | engine cho phép = 29.6s/gear (89s timer / 3 gears)
- Xác suất đoán mò: loại có phản hồi từng bước = 70.37% (3 bánh răng, $p = 1/3$, 3 rounds, 3 tim cho phép sai 2: $P = 19/27 \approx 70.37\%$)
- HUD: Floor/Door [x] (`FLOOR 5 Door 2 — Titan Grammar Forge`) | Tim [x] (`❤️❤️❤️`) | Round [x] (`Gear 1 / 3`) | XP [x] (`0 XP`)
- Controls self-evident 5s: Có. Trên mỗi bánh răng ghi: `"⚙️ INSERT / TAP"`
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f5d2_titan_forge_action.png`
- Kết luận: N1[ ] N2[x] N3[x] N4[ ] N5[x] → Dữ liệu: FAIL N1, FAIL N4 (70.37%)

---

### Game: Cambridge Cloze Gauntlet (Floor 5 Door 3)
- Engine file: `src/modules/quest/CambridgeClozeGauntlet.jsx`
- Kỹ năng ngôn ngữ: Tích hợp Đọc hiểu Cambridge A2 Flyers (Bài đọc 5 chỗ trống)
- Core loop: Đài tưởng niệm Zenith Star hiển thị bài đọc 5 ô trống → 10 tinh thể từ vựng rải rác trên các tầng mây lơ lửng → Leo nhảy lên các tầng mây, nhặt tinh thể mang vác trên đầu, né quái Astral Watcher, leo lên đỉnh đài tưởng niệm để thả vào ô trống; thả sai tinh thể rơi về vị trí cũ và trừ 1 tim → Khôi phục đủ 5 ô trống qua màn
- Đồng thời/tách rời: Tách rời (Đọc bài đọc dài trên đài tưởng niệm tĩnh, sau đó nhảy đi lượm từng tinh thể)
- Ngân sách thời gian: đọc+quyết định = 40.85s (55 từ: bài đọc 45 từ + 10 tinh thể 10 từ × 0.67s + 4.0s) | engine cho phép = 119.0s (timer tổng)
- Xác suất đoán mò: loại có phản hồi từng bước = 0.35% (10 tinh thể điền vào 5 ô, $P(10,5) = 30240$ cách, 3 tim cho phép sai tối đa 2 lần: $P < 0.5\% < 5\%$)
- HUD: Floor/Door [x] (`FLOOR 5 Door 3 — Cambridge Cloze Gauntlet`) | Tim [x] (`❤️❤️❤️`) | Round [ ] (Chỉ có `Zenith Seals Restored: 0 / 5`, thiếu Round chuẩn) | XP [x] (`0 XP`)
- Controls self-evident 5s: Không. Desktop thiếu nhãn phím hướng dẫn nhặt/thả tinh thể
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f5d3_cambridge_cloze_action.png`
- Kết luận: N1[ ] N2[x] N3[ ] N4[x] N5[ ] → Dữ liệu: FAIL N1, FAIL N3, FAIL N5

---

### Game: Synonym Storm (Floor 6 Door 1)
- Engine file: `src/modules/quest/SynonymStormDefense.jsx`
- Kỹ năng ngôn ngữ: Từ vựng A2 (Từ đồng nghĩa: careful ↔ cautious/watchful)
- Core loop: Đọc từ gốc trên banner ("CAREFUL") → Thiên thạch mang từ đồng nghĩa và từ gây nhiễu rơi từ trên trời xuống (75px/s) → Leo dùng khiên chủ động di chuyển đỡ thiên thạch đồng nghĩa để sạc pin; né thiên thạch sai (đỡ trúng trừ 1 tim) → Hoàn thành 5 rounds
- Đồng thời/tách rời: Đồng thời (Thiên thạch rơi liên tục; người chơi phải căn thời điểm di chuyển Leo để đỡ trúng từ đồng nghĩa trước khi chạm đất)
- Ngân sách thời gian: đọc+quyết định = 2.84s (2 từ: từ gốc 1 từ + từ thiên thạch 1 từ × 0.67s + 1.5s) | engine cho phép = 5.33s (thiên thạch rơi từ y=80 đến y=480 ở vận tốc 75px/s = 400/75 = 5.33s)
- Xác suất đoán mò: loại có phản hồi từng bước = 86.83% (1 từ đồng nghĩa + 2 distractors, $p = 1/3$, 5 rounds, 4 tim cho phép sai 3 lần: $\sum_{k=0}^3 \binom{5}{k} (2/3)^k (1/3)^{5-k} = 1 - (2/3)^5 = 211/243 \approx 86.83\%$)
- HUD: Floor/Door [x] (`FLOOR 6 Door 1 — Synonym Storm (Gale Spire)`) | Tim [x] (`❤️❤️❤️` — 4 tim logic) | Round [x] (`Round 1 / 5`) | XP [x] (`0 XP`)
- Controls self-evident 5s: Không. Desktop thiếu nhãn phím mũi tên di chuyển khiên
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f6d1_synonym_storm_action.png`
- Kết luận: N1[x] N2[x] N3[ ] N4[ ] N5[x] → Dữ liệu: FAIL N3, FAIL N4 (86.83% do 4 tim quá hào phóng)

---

### Game: Connector Relay (Floor 6 Door 2)
- Engine file: `src/modules/quest/ConnectorRelayCanvas.jsx`
- Kỹ năng ngôn ngữ: Ngữ pháp A2 (Liên từ logic: because, although, so, but, when)
- Core loop: Câu văn hiển thị chỗ trống liên từ trên đỉnh màn hình → 3 làn đường năng lượng với cổng kết nối và chướng ngại vật lao tới (120px/s) → Leo chuyển làn đón cổng liên từ đúng; đâm chướng ngại hoặc cổng sai mất 1 tim tức thì → 5 rounds
- Đồng thời/tách rời: Đồng thời (Đường chạy cuộn liên tục; Leo chuyển làn đón cổng tại thời điểm va chạm)
- Ngân sách thời gian: đọc+quyết định = 14.56s (18 từ: câu ngữ pháp 15 từ + 3 liên từ 3 từ × 0.67s + 2.5s) | engine cho phép = 3.0s (cổng chạy từ y=100 đến y=460 ở tốc độ 120px/s = 360/120 = 3.0s)
- Xác suất đoán mò: loại có phản hồi từng bước = 20.99% (3 làn, $p = 1/3$, 5 rounds, 3 tim cho phép sai 2: $\sum_{k=0}^2 \binom{5}{k} (2/3)^k (1/3)^{5-k} = 51/243 \approx 20.99\% > 5\%$)
- HUD: Floor/Door [x] (`FLOOR 6 Door 2 — Connector Relay (Skyway Bridge)`) | Tim [x] (`❤️❤️🖤`) | Round [x] (`Round 1 / 5`) | XP [x] (`0 XP`)
- Controls self-evident 5s: Có. Có nhãn: `"← Tap Left• Swipe Up = Jump • Swipe Down = Slide •Tap Right →"`
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f6d2_connector_relay_action.png`
- Kết luận: N1[x] N2[ ] N3[x] N4[ ] N5[x] → Dữ liệu: FAIL N2 (pacing 14.56s >> 3.0s), FAIL N4 (20.99%)

---

### Game: Story Sequencer (Floor 6 Door 3)
- Engine file: `src/modules/quest/StoryAltarPuzzle.jsx`
- Kỹ năng ngôn ngữ: Tích hợp Cốt truyện A2 (Xếp thứ tự thời gian 5 sự kiện câu chuyện)
- Core loop: 5 bệ thờ Chrono Altar (1 đến 5) → Bấm chọn phiến đá sự kiện bên dưới rồi bấm đặt vào bệ thờ tương ứng; xếp đủ 5 bệ bấm "Verify Order"; nếu thứ tự sai trừ 1 tim (2 tim max) và reset → Xếp đúng 5/5 qua màn
- Đồng thời/tách rời: Tách rời (Đọc 5 câu sự kiện tĩnh, suy nghĩ và xếp đặt lên bệ thờ, sau đó bấm nút Verify)
- Ngân sách thời gian: đọc+quyết định = 45.2s (60 từ: 5 câu sự kiện mỗi câu 12 từ × 0.67s + 5.0s) | engine cho phép = 60.0s (timer tổng)
- Xác suất đoán mò: loại đoán mù có phản hồi khối = 1.67% (5 phiến đá có $5! = 120$ hoán vị, 2 tim cho phép thử sai 1 lần: $P = 1/120 + 1/119 \approx 1.67\% < 5\%$)
- HUD: Floor/Door [ ] (Thiếu nhãn Floor/Door trên header) | Tim [x] (`❤️❤️`) | Round [ ] (Chỉ có danh sách Remaining Slabs, thiếu Round chuẩn) | XP [x] (`0 XP`)
- Controls self-evident 5s: Có. Có dòng hướng dẫn: `"Click a slab to pick it up, then click an altar pedestal (1–5)"` kèm nút `"✅ Verify Order"`
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f6d3_story_sequencer_action.png`
- Kết luận: N1[ ] N2[x] N3[x] N4[x] N5[ ] → Dữ liệu: FAIL N1 (puzzle tĩnh, không có rủi ro đồng thời), FAIL N5 (thiếu Floor/Door, Round)

---

### Game: Word Forge Scramble (Floor 7 Door 1)
- Engine file: `src/modules/quest/WordForgeCarryEngine.jsx`
- Kỹ năng ngôn ngữ: Từ vựng A2 (Ghép chữ cái tạo từ vựng đúng định nghĩa: e.g. SLIP)
- Core loop: Định nghĩa hiển thị trên đỉnh lò rèn Arcane Anvil → Các khối rune chữ cái nằm trên mặt đất → Leo chạy đến, nhặt khối rune mang vác trên đầu, leo lên bệ đe rèn đặt đúng thứ tự từng chữ cái; đặt sai chữ cái bị dội ngược và trừ 1 tim → Hoàn thành từ qua màn
- Đồng thời/tách rời: Tách rời một phần (Đọc định nghĩa tĩnh trước, sau đó di chuyển bưng bê từng khối rune)
- Ngân sách thời gian: đọc+quyết định = 11.21s (13 từ: định nghĩa 9 từ + 4 chữ cái × 0.67s + 2.5s) | engine cho phép = 74.0s (timer tổng)
- Xác suất đoán mò: loại có phản hồi từng bước = 0.3125% (4 chữ cái trong 7 khối rune, 3 tim cho phép sai tối đa 2 lần: $P \approx 0.3125\% < 5\%$)
- HUD: Floor/Door [ ] (Thiếu nhãn Floor/Door trên header) | Tim [x] (`❤️❤️❤️`) | Round [ ] (Chỉ có ô chữ cái `_ _ _ _`, thiếu Round indicator) | XP [x] (`0 XP`)
- Controls self-evident 5s: Không. Desktop thiếu nhãn phím hướng dẫn nhặt/thả rune
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f7d1_word_forge_action.png`
- Kết luận: N1[ ] N2[x] N3[ ] N4[x] N5[ ] → Dữ liệu: FAIL N1 (Leo bưng bê trên mặt bằng phẳng, không có áp lực thời gian tại thời điểm đọc), FAIL N3, FAIL N5

---

### Game: Question Quest Runner (Floor 7 Door 2)
- Engine file: `src/modules/chronicles/games/QuestionQuestRunner.jsx`
- Kỹ năng ngôn ngữ: Ngữ pháp A2 (WH-Question Matching: chọn câu hỏi WH tương ứng câu trần thuật)
- Core loop: Giám ngục Ancient Warden đuổi sát phía sau trên đường chạy 3 làn → Banner hiển thị câu cốt truyện → 3 làn chạy mang 3 câu hỏi WH (1 câu đúng, 2 unanswerable distractor) → Leo dùng phím ▲/▼ đổi làn chạy vào cổng câu hỏi đúng; đâm cổng sai bị giật điện trừ 1 tim (2 tim max) và Warden bắt kịp → 6 rounds
- Đồng thời/tách rời: Đồng thời (Warden đuổi sát sau lưng ở tốc độ 160px/s; Leo phải vừa đọc câu chuyện và 3 câu hỏi vừa chuyển làn liên tục)
- Ngân sách thời gian: đọc+quyết định = 25.11s (33 từ: câu chuyện 12 từ + 3 câu hỏi 21 từ × 0.67s + 3.0s) | engine cho phép = 7.5s (cổng rẽ nhánh xuất hiện và tới gần trong 7.5s)
- Xác suất đoán mò: loại có phản hồi từng bước = 1.78% (3 nhánh làn, $p = 1/3$, 6 rounds, 2 tim cho phép sai tối đa 1 lần: $P = \binom{6}{0} (1/3)^6 + \binom{6}{1} (2/3) (1/3)^5 = 13/729 \approx 1.78\% < 5\%$)
- HUD: Floor/Door [ ] (Thiếu nhãn Floor 7 Door 2) | Tim [x] (`❤️❤️`) | Round [x] (`ROUND 1 / 6`) | XP [x] (`0 XP`)
- Controls self-evident 5s: Không. Chỉ có 2 nút mũi tên ▲ ▼ góc dưới phải, thiếu nhãn giải thích cách né Warden
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f7d2_question_quest_action.png`
- Kết luận: N1[x] N2[ ] N3[ ] N4[x] N5[ ] → Dữ liệu: FAIL N2 (pacing 25.11s >> 7.5s), FAIL N3, FAIL N5

---

### Game: Word Class Balance (Floor 7 Door 3)
- Engine file: `src/modules/chronicles/games/WordClassBalanceGame.jsx`
- Kỹ năng ngôn ngữ: Phân loại từ loại A2 (Word Classes: Danh từ NOUN vs Động từ VERB)
- Core loop: Đĩa cân khổng lồ nghiêng theo trọng lượng → Quả cầu từ vựng xuất hiện giữa đĩa cân → Leo dùng ◄/► di chuyển về phía đĩa NOUN (trái) hoặc VERB (phải) và bấm SPACE để tung đòn Strike đẩy quả cầu vào đúng đĩa; nếu xếp sai từ hoặc đĩa nghiêng quá $25^\circ$ sẽ bị trượt đĩa mất 1 tim (2 tim max) và reset streak về 0 → Đạt streak 8/8 trong 45s hoàn thành
- Đồng thời/tách rời: Đồng thời (Đĩa cân dao động và góc nghiêng Tilt thay đổi liên tục theo trọng lượng quả cầu; Leo phải di chuyển và Strike quả cầu tại thời điểm cân bằng)
- Ngân sách thời gian: đọc+quyết định = 3.21s (3 từ: từ trên cầu 1 từ + nhãn đĩa 2 từ × 0.67s + 1.2s) | engine cho phép = 5.625s/từ (45s / 8 streak)
- Xác suất đoán mò: loại có phản hồi từng bước = 0.78% (2 lựa chọn Noun/Verb, $p = 1/2$, streak 8 lần đúng liên tiếp trong 45s, 2 tim cho phép sai tối đa 1 lần và reset streak: $P \le 2 \times (1/2)^8 = 2/256 \approx 0.78\% \ll 5\%$)
- HUD: Floor/Door [ ] (Thiếu nhãn Floor 7 Door 3) | Tim [ ] (Màn hình chỉ hiện `0 XP STREAK: 0/8 TILT: 0°`, không có biểu tượng trái tim ❤️) | Round [ ] (Chỉ có `STREAK: 0/8`, không có Round chuẩn) | XP [x] (`0 XP`)
- Controls self-evident 5s: Không. Trên màn hình có nút `"Aim NOUN (◄)"`, `"SPACE (Strike)"`, `"Aim VERB (►)"` nhưng không giải thích cơ chế tương tác 2 bước (Aim trước rồi mới Strike), người chơi lần đầu dễ nhầm Aim là hành động phân loại
- Bằng chứng playtest: `docs/agent_artifacts/screenshots/f7d3_word_class_balance_action.png`
- Kết luận: N1[x] N2[x] N3[ ] N4[x] N5[ ] → Dữ liệu: FAIL N3 (cơ chế Aim-Strike 2 bước gây hiểu lầm trong 5s đầu), FAIL N5 (thiếu Floor/Door, thiếu Tim, thiếu Round)
