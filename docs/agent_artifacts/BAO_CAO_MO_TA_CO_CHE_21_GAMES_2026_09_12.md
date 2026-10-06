# BÁO CÁO MÔ TẢ ĐỘC LẬP: CƠ CHẾ VẬN HÀNH & GẮN KẾT NGÔN NGỮ TOÀN BỘ 21 GAMES (ENGQUEST3K)
**Ngày lập:** 2026-09-12  
**Mục đích:** Cung cấp dữ liệu mô tả kỹ thuật khách quan, trích dẫn dòng code thực tế cho toàn bộ 21 games (6 game Floor 6–7 Chronicles và 15 game/quest tuần thuộc 5 Zones / 4 Hubs) để phục vụ công tác rà soát, phản biện độc lập của Owner.  
**Quy tắc:** Không dùng ngôn ngữ đánh giá ("tốt", "ổn", "đạt"); không tick hoàn thành bất kỳ game nào; không đề xuất sửa code; mô tả sự thật bằng chứng code.

---

## PHẦN I: BẢNG TỔNG HỢP 21 GAMES (MASTER MATRIX)

| # | Game | File Engine Chính | Mốc Quyết Định & Chấm Điểm | Có Đường Tắt Bỏ Qua Game Không? | Xác Suất Thắng Brute-Force Ước Tính | Có Rủi Ro Thời Gian Thực Gắn Hành Động? |
|---|---|---|---|---|---|---|
| **1** | **Synonym Storm (F6D1)** | `src/modules/quest/SynonymStormDefense.jsx` | **ĐỒNG THỜI** (vừa đọc từ vừa né/đón thiên thạch rơi) | Không có onClick trên thiên thạch; có test hook `setLeoX` | ~25% - 33% (đứng giữa đón ngẫu nhiên, 3 tim) | **CÓ** (Va chạm thiên thạch sai trừ tim tức thì) |
| **2** | **Connector Relay (F6D2)** | `src/modules/quest/ConnectorRelayCanvas.jsx` | **ĐỒNG THỜI** (vừa đọc từ nối vừa đổi lane né laser/vào cổng) | Không có onClick (Canvas thuần); có gesture/phím | ~33% mỗi wave (chọn ngẫu nhiên 1 trong 3 lane) | **CÓ** (Chạm laser/rào chắn/cổng sai trừ tim ngay) |
| **3** | **Word Forge Scramble (F7D1)** | `src/modules/quest/WordForgeCarryEngine.jsx` | **TÁCH RỜI** (biết từ trước, bê đá đặt đe sau) | Không có onClick trên đá; phải ấn [E] trong 70px | Thấp (<5%) do phải xếp đúng thứ tự $N$ ký tự | **KHÔNG** trên đường đi; chỉ trừ tim khi nộp sai vào đe |
| **4** | **Question Quest (F7D2)** | `src/modules/quest/QuestionQuestGame.jsx` | **TÁCH RỜI** (đọc banner $t=0$, tới cửa bấm [E]) | **CÓ LỖ HỔNG L455**: `onClick` thắng/thua từ xa | ~67% - 100% (3 tim / 3 cửa + xoay tịnh tiến) | **KHÔNG** trên đường đi; chỉ trừ tim sau khi bấm [E]/click |
| **5** | **Story Sequencer (F6D3)** | `src/modules/quest/StoryAltarPuzzle.jsx` | **TÁCH RỜI** (đọc slab trước, click bệ đặt sau) | Không có phím vật lý; click chọn slab + bệ | Cực thấp ($\approx 1.6\%$) do 5! = 120 hoán vị | **KHÔNG** chuyển động; đặt sai bệ trừ 1 tim tức thì |
| **6** | **Word Class Duel (F7D3)** | `src/modules/chronicles/games/WordClassDuelGame.jsx` | **TÁCH RỜI** (đọc 4 thẻ câu $\rightarrow$ click thẻ) | Click trực tiếp vào 4 thẻ UI (không có physics) | ~25% mỗi round (4 lựa chọn, 3 tim) | **KHÔNG** chuyển động; chọn sai trừ 1 tim |
| **7** | **Scene Explorer (D1Q1)** | `src/modules/zones/StoryWorldZone.jsx` (Gear 1) | **TÁCH RỜI** (khám phá điểm ảnh $\rightarrow$ mở thẻ) | Click trực tiếp 3 pin bất kỳ trên ảnh | 100% (không có điều kiện thua, click là trúng) | **KHÔNG** có rủi ro, không mất tim, không giới hạn |
| **8** | **Voice Shadow (D1Q2)** | `src/modules/zones/StoryWorldZone.jsx` (Gear 2) | **ĐỒNG THỜI** (nghe model $\rightarrow$ nói nhại theo) | Có `MicFallbackInput` (gõ phím thay vì nói) | Phụ thuộc độ khớp chuỗi (gõ đúng 100%) | **KHÔNG** rủi ro mất máu; chỉ chấm điểm Levenshtein |
| **9** | **Story Retell (D1Q3)** | `src/modules/zones/StoryWorldZone.jsx` (Gear 3) | **TÁCH RỜI** (xem gợi ý $\rightarrow$ bấm thu âm kể lại) | Có `MicFallbackInput` gõ text; chọn mức scaffold | Không thể đoán mò nếu không nạp text | **KHÔNG** rủi ro thời gian thực; chấm điểm sau khi thu |
| **10** | **Fact Finder (D2Q1)** | `src/components/cambridge/CLILExplorer.jsx` | **TÁCH RỜI** (đọc văn bản $\rightarrow$ trả lời trắc nghiệm) | Click chọn trực tiếp các pill/options | 25% - 33% mỗi câu trắc nghiệm | **KHÔNG** có rủi ro; cho phép thử lại nhiều lần |
| **11** | **Action Lab (D2Q2)** | `src/modules/hubs/station2/LearnMode/ScienceDragDropLab.jsx` | **TÁCH RỜI** (đọc nhãn $\rightarrow$ kéo/thả vào vị trí) | Tap chọn nhãn $\rightarrow$ tap DropZone (không cần drag) | ~33% mỗi vị trí (thử lại không bị trừ tim) | **KHÔNG** rủi ro mất mạng; chỉ tính theo timer 120s |
| **12** | **Discovery Report (D2Q3)** | `src/components/cambridge/ScienceReportCreator.jsx` | **TÁCH RỜI** (quan sát $\rightarrow$ chọn manh mối $\rightarrow$ viết) | Click chọn thẻ manh mối, click chip từ | 33% ở bước chọn clue và câu hỏi Inquiry | **KHÔNG** có rủi ro mất tim; giao diện wizard từng bước |
| **13** | **Speed Match (D3Q1)** | `src/modules/hubs/station2/LearnMode/FlashArena.jsx` | **TÁCH RỜI** (đọc từ En $\rightarrow$ tìm nghĩa Vi) | Click trực tiếp vào 2 thẻ En và Vi | $1/4 \rightarrow 1/3 \rightarrow 1/2 \rightarrow 1$ (thử ngẫu nhiên) | **KHÔNG** mất tim; chỉ reset streak và tốn thời gian 60s |
| **14** | **Grammar Duel (D3Q2)** | `src/modules/hubs/station2/LearnMode/SentenceBuilderBattle.jsx` | **TÁCH RỜI** (đọc đề $\rightarrow$ xếp block $\rightarrow$ bấm Check) | Drag-drop hoặc tap để hoán đổi vị trí block | Cực thấp ($<1\%$) do số hoán vị cụm từ lớn | **KHÔNG** rủi ro va chạm; sai chỉ báo đỏ và cho xếp lại |
| **15** | **Math Quest (D3Q3)** | `src/modules/hubs/station2/LearnMode/BarModelQuest.jsx` | **TÁCH RỜI** (đọc đề toán $\rightarrow$ nhìn Bar $\rightarrow$ nhập/chọn) | Click trực tiếp đáp án hoặc nhập input | 25% mỗi câu trắc nghiệm (hoặc đoán số) | **KHÔNG** có rủi ro mất mạng; sai cho chọn lại |
| **16** | **Story Writer (D4Q1)** | `src/modules/write_speak/StoryWriting.jsx` | **TÁCH RỜI** (xem tranh $\rightarrow$ chọn connector/từ $\rightarrow$ gõ) | Click chọn connector + chip từ gợi ý | Không thể đoán mò ở Step 3 (yêu cầu gõ textarea) | **KHÔNG** có cơ chế rủi ro/game over; chấm rubric cuối |
| **17** | **Video Challenge (D4Q2)** | `src/components/zones/RetellRecorder.jsx` | **TÁCH RỜI** (xem teleprompter $\rightarrow$ bấm quay video) | Có `MicFallbackInput` gõ chữ thay vì nói | Không thể đoán mò (cần nạp đủ chuỗi từ khóa) | **KHÔNG** có rủi ro; chấm điểm sau khi bấm Stop |
| **18** | **Info Exchange (D4Q3)** | `src/modules/zones/InfoExchangeZone.jsx` | **TÁCH RỜI** (xem cue $\rightarrow$ đặt câu hỏi/trả lời) | Có nút mở văn bản gợi ý + `MicFallbackInput` | Không thể đoán mò câu hỏi ngữ pháp A2 | **KHÔNG** có rủi ro mất tim; sai cho thử lại 3 lần |
| **19** | **Listening Shield (D5Q1)** | `src/modules/zones/BossBattleZone.jsx` (L Parts) | **TÁCH RỜI** (nghe audio script $\rightarrow$ nối line/chọn) | Nối pin trên SVG, click radio MCQ | 20% - 33% tùy Part khảo thí Cambridge | **KHÔNG** có rủi ro va chạm; chấm điểm sau khi nộp bài |
| **20** | **R&W Shield (D5Q2)** | `src/modules/zones/BossBattleZone.jsx` (RW Parts) | **TÁCH RỜI** (đọc bài đọc $\rightarrow$ điền từ/chọn đáp án) | Chọn từ word bank, chọn dropdown | 10% - 33% tùy dạng bài (cloze/matching) | **KHÔNG** có rủi ro thời gian thực; chấm điểm cuối |
| **21** | **Speaking Shield (D5Q3)** | `src/modules/zones/BossBattleZone.jsx` (Speaking) | **TÁCH RỜI** (xem 2 tranh $\rightarrow$ click/nói điểm khác) | Click hotspot khác biệt trên canvas ảnh | Click bừa vào vùng ảnh để dò 6 điểm khác | **KHÔNG** có rủi ro mất máu; cấp khiên sau khi review |

---

## PHẦN II: CHI TIẾT 21 GAMES (TRÍCH DẪN DÒNG CODE CỤ THỂ)

---

### NHÓM 1: 6 GAME FLOOR 6–7 (CHRONICLES)

#### 1. Synonym Storm (Floor 6, Door 1)
1. **Vị trí & File engine chính:** Floor 6, Door 1 (Chamber of Echoes). File engine: [`src/modules/quest/SynonymStormDefense.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/SynonymStormDefense.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Người chơi thấy Banner trên đỉnh hiển thị từ gốc mục tiêu (`currentPair.word`, L469: `<span className="current-word-display">{currentPair.word}</span>`).
   - Các thiên thạch mang từ đồng nghĩa (`targetWord`) và từ nhiễu/từ trái nghĩa liên tục spawn và rơi từ trần phòng ($y = 110$) xuống sàn với vận tốc rơi ngẫu nhiên $vy = 95 - 140\text{ px/s}$ (L269: `vy: 95 + Math.random() * 45`).
   - Người chơi bấm phím mũi tên Trái/Phải để điều khiển Leo chạy ngang, hoặc phím Lên/Space để nhảy lên các bục đá đón thiên thạch rơi (L125–170).
   - Leo giơ khiên Aegis chặn thiên thạch đúng để nạp năng lượng bình Gale Battery (+50 điểm/round, L292).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Diễn ra liên tục trong lúc thiên thạch đang rơi (người chơi phải đọc chữ trên thiên thạch đang di chuyển để quyết định né hay đón).
   - **Mốc chấm điểm:** Diễn ra ngay tại thời điểm va chạm vật lý giữa Leo và thiên thạch (L287: `if (distLeo < 52 && (!m.targetRoot || m.targetRoot === currentPair.word))`).
   - **Kết luận:** **ĐỒNG THỜI**. Nhận thức ngôn ngữ và thực thi vận động vật lý gắn liền nhau tại thời điểm va chạm.
4. **Đường tắt bỏ qua cơ chế game:**
   - Không có thẻ `onClick` trên các thiên thạch (L522–533 chỉ là thẻ div hiển thị vị trí CSS `left: m.x, top: m.y`).
   - Tồn tại test hook toàn cục `window.__SYNONYM_STORM_TEST_HOOK__` (L98–115) cho phép can thiệp tọa độ `setLeoX` hoặc gọi `advanceToRound`.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Nếu bịt chữ: thiên thạch rơi xuống ngẫu nhiên từ 3 vị trí ngang khác nhau. Người chơi đứng yên ở giữa hoặc chạy qua lại ngẫu nhiên có xác suất va chạm trúng từ đúng khoảng **25% - 33%** mỗi đợt. Có 3 tim (L78: `const [hearts, setHearts] = useState(3)`).
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **CÓ**. Nếu đón trúng thiên thạch mang từ trái nghĩa hoặc từ sai, Leo bị trừ 1 tim ngay lập tức (L335–338: `setHearts(h => Math.max(0, h - 1))`), giật lùi và nhấp nháy bất tử trong 1.5s (L334). Hết 3 tim chuyển sang trạng thái KO (L337).

---

#### 2. Connector Relay (Floor 6, Door 2)
1. **Vị trí & File engine chính:** Floor 6, Door 2 (Skyway Relay). File engine: [`src/modules/quest/ConnectorRelayCanvas.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/ConnectorRelayCanvas.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Game chạy trên thẻ HTML5 `<canvas>` (L341) dưới góc nhìn 3D runner giả lập.
   - Đường chạy liên tục trôi về phía màn hình với tốc độ cố định (L362: `const speed = 0.52`).
   - HUD hiển thị câu văn có chỗ trống: `Jake was tired, _____ he kept running.` (L793–808).
   - 3 làn đường (Lane 0, 1, 2) xuất hiện các cổng từ nối (ví dụ: `but`, `because`, `so`) và các chướng ngại vật vật lý (laser rào chắn, rào cao cần trượt, rào thấp cần nhảy) trôi ngược về phía người chơi (L440–490).
   - Người chơi bấm phím Trái/Phải (L140–148) để chuyển lane, bấm Mũi tên Lên để nhảy (L118–126), hoặc Mũi tên Xuống để trượt (L129–137).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Diễn ra khi cổng từ nối ở cự ly xa ($z \in [0.2, 0.5]$), người chơi đọc từ nối trên cổng và quan sát chướng ngại vật trên làn đường để chuyển lane.
   - **Mốc chấm điểm:** Diễn ra ngay tại thời điểm cổng/chướng ngại vật chạm tọa độ người chơi $z \le 0.12$ (L499: `if (!showHelp && isNearPlayerZ && isSameLane && !ent.passed && !ent.collected)`).
   - **Kết luận:** **ĐỒNG THỜI**. Quyết định chọn từ nối gắn chặt với thao tác tránh chướng ngại vật vật lý trong thời gian thực.
4. **Đường tắt bỏ qua cơ chế game:**
   - Toàn bộ game vẽ trên HTML5 Canvas context 2D; không có DOM element cho các cổng hay chướng ngại vật, nên **hoàn toàn không có onClick shortcut** (L341–430).
   - Thao tác duy nhất được chấp nhận là thông qua bàn phím (`keydown`, L163–187) hoặc cử chỉ vuốt chạm touch/swipe (L151–160).
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Mỗi wave có 3 lane. Nếu bịt kín từ vựng, xác suất chọn ngẫu nhiên 1 lane đúng là **1/3 ($\approx 33.3\%$)**.
   - Với 3 tim (L86), người chơi có thể vượt qua 1–2 wave bằng đoán mò, nhưng khó vượt qua trọn vẹn cả 5 round nếu không đọc từ nối và không né chướng ngại vật (chạm chướng ngại vật cũng bị trừ tim).
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **CÓ**. Chui qua cổng mang từ nối sai (`distractor_connector`, L544) bị trừ 1 tim (L548: `setHearts(hp => Math.max(0, hp - 1))`). Va vào chướng ngại vật mà không nhảy/trượt kịp thời (L575–586) cũng bị trừ 1 tim ngay lập tức. Hết 3 tim chuyển sang `phase = 'ko'` (L550).

---

#### 3. Word Forge Scramble (Floor 7, Door 1)
1. **Vị trí & File engine chính:** Floor 7, Door 1 (Titan Forge). File engine: [`src/modules/quest/WordForgeCarryEngine.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/WordForgeCarryEngine.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Khu vực đe rèn Anvil ở giữa hiển thị định nghĩa từ và các ô chữ cái trống theo thứ tự (L620–642).
   - Các phiến đá ký tự (runes) nằm rải rác trên các tầng bục đá bên trái và bên phải (L92–101).
   - Người chơi điều khiển Leo di chuyển và nhảy (A/D hoặc phím mũi tên, W/Lên để nhảy, L130–170) tiếp cận phiến đá trong phạm vi bán kính 70px (L214).
   - Người chơi bấm phím `[E]` để nhặt phiến đá lên đầu (L220: Leo vác đá trên đầu).
   - Người chơi điều khiển Leo nhảy vác phiến đá về khu vực đe rèn ($x \in [180, 720], y \in [190, 270]$, L240) và bấm phím `[E]` để thả vào đe.
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Người chơi đọc định nghĩa từ và suy ra từ cần ghép ngay từ lúc nhìn đe rèn. Hành vi đi tìm và vác đá là hành vi platformer thực thi sau khi đã biết từ.
   - **Mốc chấm điểm:** Diễn ra tại khoảnh khắc bấm phím `[E]` nộp đá vào đe rèn (L242: `if (isNearAnvilDeck)` $\rightarrow$ L250: `if (carried.char === expectedLetter)`).
   - **Kết luận:** **TÁCH RỜI**. Quyết định từ vựng xảy ra trước; thao tác nhặt vác đá là vật lý; việc chấm đúng/sai chỉ kích hoạt khi ấn nộp tại đe.
4. **Đường tắt bỏ qua cơ chế game:**
   - Không có `onClick` trên các phiến đá (L652 chỉ render thẻ div đại diện khối đá).
   - Khoảng cách nhặt đá bắt buộc phải $< 70\text{px}$ (L214) và nộp đe bắt buộc phải nằm trong khung $x \in [180, 720], y \in [190, 270]$ (L240).
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Xác suất đoán mò cực thấp (**$< 5\%$**). Một từ có 4–6 ký tự đòi hỏi phải nhặt đúng ký tự và nộp theo đúng thứ tự vị trí slot từ trái qua phải (L244: `const nextRequiredIdx = currentIndices.length; expectedLetter = targetLetters[nextRequiredIdx]`).
   - Nộp sai ký tự bị trừ 1 tim (L308); với 3 tim không thể brute-force thành công 5 round.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG CÓ cạm bẫy trên đường đi**. Leo có thể chạy nhảy tự do trên các bục mà không sợ rơi xuống vực hay bị quái tấn công. Hậu quả mất tim duy nhất xảy ra sau khi nộp sai chữ cái vào đe rèn (L308).

---

#### 4. Question Quest (Floor 7, Door 2)
1. **Vị trí & File engine chính:** Floor 7, Door 2 (Sanctuary of Questions). File engine: [`src/modules/quest/QuestionQuestGame.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/QuestionQuestGame.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Khi round bắt đầu, banner tĩnh ở trên đỉnh hiển thị sự kiện câu chuyện (ví dụ: `Tom fell on the wet floor yesterday.`, L404–410).
   - 3 cánh cửa Sanctuary Vault (Trái, Giữa, Phải) hiển thị 3 biển chữ WH-question tĩnh (ví dụ: `When did Tom fall?`, `Where did Tom fall?`, `Who fell?`, L447–470).
   - Người chơi điều khiển Leo di chuyển trên các bục đá đến trước cửa và bấm phím `[E]` (L226–229) HOẶC click chuột trực tiếp vào cánh cửa (L455).
   - Cửa mở, banner hiển thị phản hồi đúng/sai và chuyển round sau 1.2s (L167–178).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Diễn ra ngay tại $t = 0$ khi người chơi vừa nhìn thấy banner sự kiện và đọc 3 biển câu hỏi trên cửa.
   - **Mốc chấm điểm:** Diễn ra khi hàm `enterDoor(door)` được gọi (L159).
   - **Kết luận:** **TÁCH RỜI**. Người chơi biết đáp án từ trước, sau đó mới di chuyển Leo đến cửa hoặc click chuột; chấm điểm chỉ chạy khi kích hoạt cửa.
4. **Đường tắt bỏ qua cơ chế game:**
   - **CÓ LỖ HỔNG L455 ĐÃ ĐƯỢC XÁC NHẬN:**
     Tại dòng 455 của `QuestionQuestGame.jsx`:
     `<div key={door.id} className="..." onClick={() => enterDoor(door)}>`
     Hàm `enterDoor(door)` (L159–194) hoàn toàn không có bất kỳ điều kiện nào kiểm tra khoảng cách giữa Leo và cửa (không có `Math.hypot`, không kiểm tra tọa độ).
     $\rightarrow$ Người chơi có thể click chuột vào bất kỳ cửa nào, từ bất kỳ vị trí nào của Leo, để thắng/thua round ngay lập tức mà không cần di chuyển nhân vật.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Có 3 cửa. Bắt đầu với 3 tim (L78). Mỗi lần chọn sai chỉ trừ 1 tim và knockback nhẹ (L181–190), sau đó được chọn lại ngay cửa khác trong cùng round.
   - Xác suất đoán mò trúng ở lần chọn đầu là $1/3 \approx 33.3\%$, nếu sai thì lần 2 là $1/2 = 50\%$.
   - Ngoài ra, mã nguồn tồn tại quy luật phân bổ cửa xoay tịnh tiến: `(roundIdx + offset) % rawOpts.length` (L98), tạo ra quy luật tuần hoàn vị trí đáp án đúng.
   - Xác suất thắng bằng đoán mò: **~67% - 100%**.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có cạm bẫy, không có quái vật, không có giới hạn thời gian thao tác nhảy. Hậu quả mất tim chỉ diễn ra sau khi bấm [E] hoặc click vào cửa sai (L182).

---

#### 5. Story Sequencer (Floor 6, Door 3)
1. **Vị trí & File engine chính:** Floor 6, Door 3 (Chamber of Chronicles). File engine: [`src/modules/quest/StoryAltarPuzzle.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/quest/StoryAltarPuzzle.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Màn hình hiển thị 5 bệ thờ Altar (đánh số 1 đến 5) ở hàng trên (L401–429).
   - 5 phiến đá khắc các đoạn văn của câu chuyện nằm xáo trộn ở hàng dưới (L445–480).
   - Người chơi click chuột vào một phiến đá để nhặt (L126–129: `pickUp(idx)`).
   - Người chơi click chuột vào một bệ thờ Altar trống để đặt phiến đá vào bệ (L132–176: `dropOnAltar(altarPos)`).
   - Khi cả 5 phiến đá đã được đặt vào 5 bệ, hệ thống tự động verify hoặc người chơi bấm nút `Verify Order` (L184, L391).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Người chơi đọc nội dung 5 đoạn văn và tư duy thứ tự thời gian trước khi click.
   - **Mốc chấm điểm:** Hàm `dropOnAltar` kiểm tra ngay tính đúng đắn khi đặt: `const isCorrect = heldSlab.originalOrder === altarPos` (L144). Nếu sai vị trí, bị trừ 1 tim ngay tại L149 (`setHearts(h => Math.max(0, h - 1))`).
   - **Kết luận:** **TÁCH RỜI**. Không có tương tác chuyển động hay vật lý; mốc nhận thức đọc đoạn văn diễn ra trước khi thao tác click bệ.
4. **Đường tắt bỏ qua cơ chế game:**
   - Toàn bộ game là giao diện click UI (nhấp chọn phiến đá $\rightarrow$ nhấp chọn bệ). Nhân vật Leo chỉ hiển thị sprite tĩnh di chuyển tức thời tới vị trí bệ (`setLeoPos(altarPos - 1)`, L175). Không có cơ chế vật lý để bypass.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Xác suất đoán mò cực thấp (**$\approx 1.6\%$**). 5 phiến đá có $5! = 120$ hoán vị có thể có.
   - Vì mỗi lần đặt sai vào bệ bị trừ ngay 1 tim (L149), với 3 tim người chơi sẽ bị KO sau tối đa 3 lần đặt sai.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có cạm bẫy hay yếu tố thời gian thực; chỉ trừ tim tĩnh khi đặt sai phiến đá lên bệ thờ (L149).

---

#### 6. Word Class Duel (Floor 7, Door 3)
1. **Vị trí & File engine chính:** Floor 7, Door 3 (Duel of Lexis). File engine: [`src/modules/chronicles/games/WordClassDuelGame.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/chronicles/games/WordClassDuelGame.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Banner trên đỉnh hiển thị từ mục tiêu và vai trò từ loại cần tìm (ví dụ: `Target: "run" as a NOUN`, L112–140).
   - 4 thẻ bài câu ngữ cảnh xuất hiện tĩnh trên màn hình (L180–230).
   - Người chơi đọc 4 câu và click chuột vào thẻ bài có từ mục tiêu đảm nhận đúng từ loại yêu cầu (`handleSelect(card)`, L62–91).
   - Hệ thống hiển thị feedback đúng/sai, cộng điểm (+150, L66) hoặc trừ 1 tim (L80) và chuyển round sau 1.0s (L70–77).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Đọc 4 câu ngữ cảnh tĩnh để phân tích từ loại.
   - **Mốc chấm điểm:** Xảy ra tức thì tại thời điểm click chuột vào thẻ bài (L65: `if (card.isCorrect)`).
   - **Kết luận:** **TÁCH RỜI**. Đây là dạng bài trắc nghiệm click thẻ bài tĩnh; không có cơ chế chuyển động.
4. **Đường tắt bỏ qua cơ chế game:**
   - Giao diện trắc nghiệm click trực tiếp trên 4 thẻ DOM; không có cơ chế vật lý hay điều khiển nhân vật.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Mỗi round có 4 lựa chọn. Xác suất đoán ngẫu nhiên là **$1/4 = 25\%$**.
   - Có 3 tim (L28: `const [hearts, setHearts] = useState(3)`). Sai bị trừ 1 tim (L80).
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có yếu tố rủi ro thời gian thực; trừ tim chỉ xảy ra sau khi click chọn thẻ sai (L80).

---

### NHÓM 2: 15 MINI-GAME / QUESTS TUẦN (5 ZONES)

#### 7. Scene Explorer (Day 1, Zone 1 — `gear1_webtoon`)
1. **Vị trí & File engine chính:** Day 1, Zone 1 (Story World). File engine: [`src/modules/zones/StoryWorldZone.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/zones/StoryWorldZone.jsx) (Gear 1, dòng 850–1040).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Màn hình hiển thị tranh Webtoon minh họa câu chuyện tuần (L860–873).
   - Trên tranh xuất hiện 3 hoặc nhiều icon pin tròn phát sáng nhấp nháy tại các vị trí tọa độ (L875–919).
   - Người chơi click chuột hoặc tap vào các pin tròn để mở popup hiển thị từ vựng/cụm từ ngữ cảnh và nghe phát âm audio (L890–896).
   - Khi tìm đủ 3 pin, hệ thống bắn pháo hoa ăn mừng (L900–902) và kích hoạt nút chuyển cảnh/hoàn thành quest (L1018–1028).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Người chơi nhìn tranh và click vào các điểm nổi bật.
   - **Mốc chấm điểm:** Không có chấm đúng/sai; bất kỳ lần click nào vào pin đều được ghi nhận là khám phá thành công (L898: `const nextFound = [...foundItems, chunkLabel]`).
   - **Kết luận:** **TÁCH RỜI**. Hoạt động khám phá tĩnh.
4. **Đường tắt bỏ qua cơ chế game:**
   - Click chuột trực tiếp vào 3 thẻ `<button>` pin trên giao diện (L887–918).
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - **100%**. Không có điều kiện thất bại; chỉ cần click đủ 3 pin bất kỳ trên tranh là hoàn thành.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có tim, không có giới hạn thời gian, không có rủi ro mất điểm.

---

#### 8. Voice Shadow (Day 1, Zone 1 — `gear2_karaoke`)
1. **Vị trí & File engine chính:** Day 1, Zone 1 (Story World). File engine: [`src/modules/zones/StoryWorldZone.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/zones/StoryWorldZone.jsx) (Gear 2, dòng 448–520, 1050–1250).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Hiển thị danh sách 8 câu của câu chuyện tuần kèm thanh tiến trình (L1050–1100).
   - Người chơi bấm nút nghe audio giọng bản ngữ đọc câu mẫu (L405).
   - Người chơi bấm nút Microphone để kích hoạt chế độ thu âm và bắt đầu đọc nhại theo câu mẫu (L448: `startSentenceShadowing(idx, targetSentence)`).
   - Trình duyệt hiển thị thanh highlight karaoke chạy theo từng từ trong lúc phát âm (L468–470).
   - Khi nói xong, trình duyệt dừng thu qua Web Speech API và tính điểm tương đồng phát âm (L510).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Người chơi lắng nghe ngữ điệu và phát âm đồng thời theo nhịp của câu mẫu.
   - **Mốc chấm điểm:** Diễn ra sau khi kết thúc lượt thu âm qua hàm so khớp chuỗi Levenshtein / Speech Syntax Evaluator.
   - **Kết luận:** **ĐỒNG THỜI trong lúc thực hiện phát âm**, nhưng điểm số được tổng hợp sau khi dừng thu.
4. **Đường tắt bỏ qua cơ chế game:**
   - Tồn tại component `MicFallbackInput` (L14, L1200) cho phép người chơi gõ phím toàn bộ câu nếu thiết bị không hỗ trợ microphone hoặc môi trường ồn.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Nếu dùng giọng nói: không thể đoán mò (phải phát âm khớp từ vựng).
   - Nếu dùng gõ phím: người chơi chỉ cần copy/gõ lại đúng chuỗi văn bản đang hiển thị trên màn hình.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có cơ chế trừ tim, không có game over.

---

#### 9. Story Retell (Day 1, Zone 1 — `gear3_retell`)
1. **Vị trí & File engine chính:** Day 1, Zone 1 (Story World). File engine: [`src/modules/zones/StoryWorldZone.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/zones/StoryWorldZone.jsx) (Gear 3, dòng 1455–1650).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Hiển thị lần lượt từng cảnh truyện (Event 1 đến 5) kèm tranh minh họa và câu hỏi định hướng của AI Nova (L1465–1519).
   - Người chơi có thanh Word Bank chứa các chip từ gợi ý (L1523–1540) và nút mở Giàn giáo Hint với 3 mức độ: `full`, `half`, `chunks` (L1560–1618).
   - Người chơi bấm nút Microphone để tự kể lại nội dung bức tranh bằng lời nói của mình.
   - Hệ thống Speech Recognition ghi nhận và chấm điểm theo cấu trúc ngữ pháp Cambridge (L1700–1745).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Quan sát tranh, tư duy cấu trúc câu trước khi bấm thu âm.
   - **Mốc chấm điểm:** Diễn ra sau khi dừng thu âm và gửi dữ liệu tới bộ chấm điểm.
   - **Kết luận:** **TÁCH RỜI**.
4. **Đường tắt bỏ qua cơ chế game:**
   - Người chơi có thể chọn chế độ scaffold `full` (L1581) để xem toàn bộ câu mẫu và đọc lại nguyên văn.
   - Có component `MicFallbackInput` gõ văn bản thay cho nói.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Thấp. Cần nhập hoặc phát âm chuỗi câu có nghĩa khớp với ngữ cảnh của tranh.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có cơ chế mất tim hay cạm bẫy.

---

#### 10. Fact Finder (Day 2, Zone 2 — `gear4_clil`)
1. **Vị trí & File engine chính:** Day 2, Zone 2 (Knowledge Lab). File engine: [`src/components/cambridge/CLILExplorer.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/components/cambridge/CLILExplorer.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Phase 1 & 2: Hiển thị bài đọc khoa học/xã hội liên môn chia làm 2 đoạn văn (L49–64). Người chơi nghe audio đọc toàn bài hoặc từng đoạn.
   - Phase 3: Màn hình chuyển sang bộ câu hỏi đọc hiểu (Comprehension Questions) và bài tập ngữ pháp (L94–100).
   - Người chơi đọc câu hỏi và click chọn 1 trong các đáp án trắc nghiệm A/B/C/D.
   - Hệ thống kiểm tra kết quả tức thì và hiển thị giải thích.
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Đọc bài văn và đọc câu hỏi trắc nghiệm tĩnh.
   - **Mốc chấm điểm:** Chấm điểm ngay khi click vào option lựa chọn.
   - **Kết luận:** **TÁCH RỜI**. Dạng bài đọc hiểu trắc nghiệm tiêu chuẩn.
4. **Đường tắt bỏ qua cơ chế game:**
   - Click chuột trực tiếp vào các nút lựa chọn trên DOM.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - **25% - 33%** mỗi câu hỏi. Sai cho phép chọn lại đáp án khác mà không bị phạt hay khóa màn hình.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có rủi ro mất tim hay áp lực thời gian.

---

#### 11. Action Lab (Day 2, Zone 2 — `science_lab`)
1. **Vị trí & File engine chính:** Day 2, Zone 2 (Knowledge Lab). File engine: [`src/modules/hubs/station2/LearnMode/ScienceDragDropLab.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/hubs/station2/LearnMode/ScienceDragDropLab.jsx) (aliased qua `ActionLab.jsx`).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Hiển thị sơ đồ kịch bản thực nghiệm khoa học (trải qua 3 kịch bản liên hoàn, L101–115).
   - Trên sơ đồ có các vị trí DropZone đánh dấu cần dán nhãn (L127–133).
   - Bên dưới là hàng nhãn thuật ngữ (L135–139).
   - Đồng hồ đếm ngược 120s bắt đầu chạy (L98: `const [timeLeft, setTimeLeft] = useState(120)`).
   - Người chơi kéo thả nhãn vào DropZone hoặc chạm chọn nhãn rồi chạm vào DropZone mục tiêu (Tap-to-assign, L220–235).
   - Khi hoàn thành cả 3 kịch bản, hệ thống trao điểm và XP (L190–205).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Đọc nhãn thuật ngữ và quan sát sơ đồ để xác định vị trí tương ứng.
   - **Mốc chấm điểm:** Diễn ra ngay khi nhãn được thả/gán vào DropZone: `const isCorrect = labelItem.targetId === target.id` (L232).
   - **Kết luận:** **TÁCH RỜI**.
4. **Đường tắt bỏ qua cơ chế game:**
   - Cơ chế Tap-to-assign (L220–235) cho phép click chọn nhãn rồi click chọn DropZone mà không cần thực hiện thao tác kéo thả vật lý.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Với 3–4 nhãn mỗi kịch bản, xác suất gán ngẫu nhiên đúng là **25% - 33%**.
   - Nếu dán sai, nhãn không bị khóa và không bị trừ máu (L233), người chơi có thể thử lần lượt tất cả các nhãn vào một ô cho đến khi đúng.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG có rủi ro mất tim**. Chỉ có áp lực đếm ngược thời gian tổng 120s (L98).

---

#### 12. Discovery Report (Day 2, Zone 2 — `science_report`)
1. **Vị trí & File engine chính:** Day 2, Zone 2 (Knowledge Lab). File engine: [`src/components/cambridge/ScienceReportCreator.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/components/cambridge/ScienceReportCreator.jsx) (aliased qua `DiscoveryReportCreator.jsx`).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Step 1 (Observe): Click khám phá 3 điểm hotspot trên ảnh bối cảnh để thu thập dữ liệu (L60–88).
   - Step 2 (Pick Clue): Chọn 1 trong 3 thẻ manh mối khoa học (L91–100).
   - Step 3 (Quick Write): Sắp xếp các chip từ vựng thành câu báo cáo đúc kết.
   - Step 4 (See Report & Inquiry): Trả lời câu hỏi suy luận khoa học "Why?" với 3 lựa chọn (L22–41).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Đọc dữ liệu quan sát và lựa chọn đáp án từng bước.
   - **Mốc chấm điểm:** Chấm điểm tức thì tại từng bước khi click chọn thẻ hoặc chọn đáp án Inquiry (L45–57).
   - **Kết luận:** **TÁCH RỜI**.
4. **Đường tắt bỏ qua cơ chế game:**
   - Toàn bộ là thao tác click chuột trên các thẻ DOM giao diện.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Step 2 (chọn clue): **1/3 $\approx 33.3\%$**.
   - Step 4 (chọn câu hỏi Inquiry): **1/3 $\approx 33.3\%$** (chọn sai cho phép chọn lại, L52–56).
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có cơ chế mất tim, không có áp lực thời gian.

---

#### 13. Speed Match (Day 3, Zone 3 — `word_blitz`)
1. **Vị trí & File engine chính:** Day 3, Zone 3 (Battle Arena). File engine: [`src/modules/hubs/station2/LearnMode/FlashArena.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/hubs/station2/LearnMode/FlashArena.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Màn hình hiển thị 2 cột thẻ xáo trộn: Cột trái tiếng Anh, Cột phải tiếng Việt (L85–87).
   - Đồng hồ đếm ngược 60s bắt đầu chạy (L31: `const [timeLeft, setTimeLeft] = useState(60)`).
   - Người chơi click 1 thẻ tiếng Anh (L25), sau đó click 1 thẻ tiếng Việt tương ứng (L26).
   - Nếu đúng: 2 thẻ biến mất, cộng điểm và tăng streak (L28–29). Nếu sai: thẻ rung đỏ và hủy chọn.
   - Triệt tiêu hết các cặp thẻ sẽ chuyển sang round tiếp theo (L88–98).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Nhận diện mặt chữ và nghĩa của từ trước khi click.
   - **Mốc chấm điểm:** Diễn ra ngay khi click thẻ thứ hai để kiểm tra cặp: `selectedEn.id === selectedVi.id`.
   - **Kết luận:** **TÁCH RỜI**.
4. **Đường tắt bỏ qua cơ chế game:**
   - Click chuột trực tiếp vào các nút thẻ trên DOM.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Có 4 cặp thẻ. Chọn thẻ Anh 1, click thử lần lượt 4 thẻ Việt: xác suất đúng là $1/4 \rightarrow 1/3 \rightarrow 1/2 \rightarrow 1$.
   - Không bị giới hạn số lần thử sai, chỉ bị trừ thời gian đếm ngược.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG có rủi ro mất tim**. Chỉ có áp lực đếm ngược thời gian 60s (L31).

---

#### 14. Grammar Duel (Day 3, Zone 3 — `sentence_smash`)
1. **Vị trí & File engine chính:** Day 3, Zone 3 (Battle Arena). File engine: [`src/modules/hubs/station2/LearnMode/SentenceBuilderBattle.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/hubs/station2/LearnMode/SentenceBuilderBattle.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Hàng dưới hiển thị ngân hàng từ (Word Bank) chứa các khối từ vựng bị xáo trộn (L158–164).
   - Đồng hồ đếm ngược 45s mỗi câu chạy (L136: `const [timeLeft, setTimeLeft] = useState(45)`).
   - Người chơi kéo thả (Drag-and-Drop) hoặc click vào khối từ để đưa lên dòng câu đích (L216–246).
   - Người chơi có thể kéo thả để hoán đổi vị trí các khối từ trên dòng đích (L226–231: `arrayMove`).
   - Người chơi bấm nút `Check Answer` để nộp câu (L248: `handleCheckAnswer`).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Tư duy cấu trúc ngữ pháp và sắp xếp các khối từ theo thứ tự.
   - **Mốc chấm điểm:** Diễn ra sau khi bấm nút `Check Answer`: `evaluateSentenceAttempt(targetBlocks.map(b => b.word), currentDrill)` (L251).
   - **Kết luận:** **TÁCH RỜI**.
4. **Đường tắt bỏ qua cơ chế game:**
   - Có thể tap trực tiếp để đưa từ lên/xuống thay vì kéo thả (L235–246).
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Cực thấp (**$< 1\%$**). Câu gồm 8–15 từ vựng kèm từ nhiễu, số hoán vị khả dĩ rất lớn ($n!$).
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Xếp sai không bị mất tim; chỉ báo đỏ và cho phép sắp xếp lại trước khi hết 45s.

---

#### 15. Math Quest (Day 3, Zone 3 — `math_quest`)
1. **Vị trí & File engine chính:** Day 3, Zone 3 (Battle Arena). File engine: [`src/modules/hubs/station2/LearnMode/BarModelQuest.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/hubs/station2/LearnMode/BarModelQuest.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Màn hình hiển thị đề bài toán tư duy tiếng Anh (L117–125).
   - Sơ đồ Bar Model trực quan bằng SVG hiển thị các thanh so sánh tỉ lệ/số lượng (L122).
   - Đồng hồ đếm ngược 150s tổng cộng cho 5 câu (L109).
   - Người chơi tính toán và nhập đáp án vào ô input hoặc click chọn đáp án trắc nghiệm (L103, L174–178).
   - Bấm nút Submit: hệ thống chấm điểm và chuyển câu (L179–202).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Đọc đề, quan sát sơ đồ và tính toán số học.
   - **Mốc chấm điểm:** Diễn ra khi bấm nút Submit: `evaluateBarModelAnswer(userInput, currentQ.correctAnswer)` (L178).
   - **Kết luận:** **TÁCH RỜI**.
4. **Đường tắt bỏ qua cơ chế game:**
   - Nhập đáp án trực tiếp vào thẻ `<input>` hoặc click nút lựa chọn trên DOM.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Nếu là trắc nghiệm 4 lựa chọn: **25%**. Nếu là nhập số tự do: xác suất đoán mò ngẫu nhiên cực thấp.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có rủi ro mất máu hay cạm bẫy; trả lời sai cho phép thử lại.

---

#### 16. Story Writer (Day 4, Zone 4 — `story_writer`)
1. **Vị trí & File engine chính:** Day 4, Zone 4 (Creator Studio). File engine: [`src/modules/write_speak/StoryWriting.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/write_speak/StoryWriting.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Học sinh trải qua 3 đến 5 bước viết câu chuyện dựa trên tranh minh họa Cambridge (L65–110):
     - Step 1 (MODEL): Xem câu mẫu, chọn từ nối và sắp xếp chip câu.
     - Step 2 (BUILD): Chọn từ nối và tự sắp xếp các cụm từ bị xáo trộn.
     - Step 3 (WRITE): Nhìn tranh và tự gõ 2 câu văn hoàn chỉnh vào ô `<textarea>` dựa trên từ khóa gợi ý.
   - Màn hình Review tổng kết toàn bộ bài văn và đếm số từ đạt chuẩn (tối thiểu 20 từ, L11).
   - Học sinh bấm nộp bài để nhận đánh giá theo rubric.
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Quan sát tranh và viết nội dung câu chuyện.
   - **Mốc chấm điểm:** Diễn ra khi bấm nút nộp bài sau khi đã hoàn thành toàn bộ các bước.
   - **Kết luận:** **TÁCH RỜI**.
4. **Đường tắt bỏ qua cơ chế game:**
   - Không có đường tắt ở Step 3 vì hệ thống yêu cầu nạp chuỗi văn bản thực tế vào `<textarea>`.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Không thể đoán mò ở phần tự viết câu văn.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Đây là công cụ luyện viết học thuật chuẩn hóa; không có cơ chế rủi ro game over.

---

#### 17. Video Challenge (Day 4, Zone 4 — `broadcast_studio`)
1. **Vị trí & File engine chính:** Day 4, Zone 4 (Creator Studio). File engine: [`src/components/zones/RetellRecorder.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/components/zones/RetellRecorder.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Học sinh xem teleprompter chứa 5 cảnh truyện và các từ nối gợi ý (L52–78).
   - Bật camera và microphone để vào chế độ sẵn sàng (L35: `setCameraActive(true)`).
   - Bấm nút Bắt đầu quay: đếm ngược 3-2-1 và bắt đầu ghi hình/ghi âm (L27–29).
   - Học sinh thuyết trình trước camera trong khoảng thời gian từ 30s đến 120s.
   - Bấm nút Dừng: hệ thống xử lý video/audio qua bộ nhận diện giọng nói và chấm điểm theo tiêu chí thuyết trình Cambridge (L83–100).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Chuẩn bị kịch bản và nói trước camera.
   - **Mốc chấm điểm:** Diễn ra sau khi bấm nút Dừng quay và hệ thống phân tích xong bản ghi.
   - **Kết luận:** **TÁCH RỜI**.
4. **Đường tắt bỏ qua cơ chế game:**
   - Tồn tại component `MicFallbackInput` (L10) cho phép nộp nội dung bằng cách gõ phím nếu thiết bị không có webcam hoặc mic.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Không thể đoán mò; cần phát âm hoặc nạp chuỗi từ khóa đạt chuẩn độ dài và ngữ cảnh.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có cơ chế mất máu hay cạm bẫy.

---

#### 18. Info Exchange (Day 4, Zone 4 — `info_exchange`)
1. **Vị trí & File engine chính:** Day 4, Zone 4 (Creator Studio). File engine: [`src/modules/zones/InfoExchangeZone.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/zones/InfoExchangeZone.jsx).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Mô phỏng bài thi Cambridge A2 Flyers Speaking Part 2 gồm 2 Phase (L26):
     - Phase 1 (Table B): Thí sinh nhìn bảng thông tin có sẵn để trả lời các câu hỏi do giám khảo AI Nova đưa ra (L40–48).
     - Phase 2 (Table A): Thí sinh nhìn thẻ gợi ý (cue card) để bấm mic đặt câu hỏi ngược lại cho giám khảo AI (L28–38).
   - Hệ thống Speech Recognition ghi nhận câu hỏi/câu trả lời và đối chiếu với mẫu ngữ pháp Flyers qua `evaluateSpeechSyntax` (L9).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Đọc thẻ thông tin và xây dựng câu hỏi/câu trả lời.
   - **Mốc chấm điểm:** Diễn ra sau khi kết thúc lượt thu âm mỗi câu.
   - **Kết luận:** **TÁCH RỜI**.
4. **Đường tắt bỏ qua cơ chế game:**
   - Có nút bấm mở gợi ý câu hỏi mẫu hoàn chỉnh (L32: `showHintA`).
   - Có ô nhập phím `MicFallbackInput` (L8, L36) để gõ câu hỏi thay vì nói.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Thấp đối với việc tự đặt câu hỏi ngữ pháp chuẩn Cambridge.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG có rủi ro mất tim**. Trả lời sai được phép thử lại tối đa 3 lần (L35: `retryCountA`, L44: `retryCountB`).

---

#### 19. Listening Shield (Day 5, Zone 5 — `boss_listening`)
1. **Vị trí & File engine chính:** Day 5, Zone 5 (Boss Castle). File engine: [`src/modules/zones/BossBattleZone.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/zones/BossBattleZone.jsx) (Listening Parts 1–5, L52–58).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Tải bài thi Nghe Cambridge chuẩn hóa (Part 1 vẽ dây nối SVG, Part 2 điền form ghi chú, Part 3 nối tranh A-H, Part 4 trắc nghiệm 3 tranh, Part 5 tô màu/viết chữ lên tranh SVG).
   - Phát file audio bài thi kèm hiệu ứng tiếng chuông Cambridge.
   - Thí sinh thao tác kéo nối điểm pin SVG, chọn đáp án hoặc gõ từ vào form trong lúc nghe.
   - Bấm nút Nộp bài để tính điểm khiên (Shields).
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Lắng nghe hội thoại và đưa ra lựa chọn trên bài thi.
   - **Mốc chấm điểm:** Diễn ra sau khi bấm nộp bài toàn bộ Part (L247–255).
   - **Kết luận:** **TÁCH RỜI**.
4. **Đường tắt bỏ qua cơ chế game:**
   - Tương tác trực tiếp trên các thẻ SVG/DOM của bài thi. Tồn tại test hook toàn cục `window.__triggerBossVictory` (L230) dùng cho QA test màn hình chiến thắng.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Tùy theo Part: Part 4 (MCQ 3 tranh) có xác suất đoán mò **$1/3 \approx 33.3\%$**; Part 1/3 (nối tranh) có xác suất đoán mò ngẫu nhiên **$1/5 = 20\%$**.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có cơ chế cạm bẫy hay game over; điểm số quy đổi thành khiên Cambridge Shield (1 đến 5 khiên).

---

#### 20. Reading & Writing Shield (Day 5, Zone 5 — `boss_reading`)
1. **Vị trí & File engine chính:** Day 5, Zone 5 (Boss Castle). File engine: [`src/modules/zones/BossBattleZone.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/zones/BossBattleZone.jsx) (Reading & Writing Parts 1–7, L59–67).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Tải bài thi Đọc & Viết Cambridge chuẩn hóa (Part 1 nối định nghĩa từ, Part 2 chọn câu thoại tiếp theo, Part 3 cloze test chọn từ điền đoạn văn, Part 4 chọn từ trong bảng, Part 5 đọc truyện trả lời câu hỏi, Part 6 điền 1 từ vào chỗ trống, Part 7 viết truyện theo 3 tranh).
   - Thí sinh đọc văn bản và thao tác chọn từ từ word bank hoặc chọn dropdown.
   - Bấm nút Nộp bài để hoàn thành và tính điểm khiên.
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Đọc hiểu văn bản tĩnh.
   - **Mốc chấm điểm:** Diễn ra khi bấm nút nộp bài.
   - **Kết luận:** **TÁCH RỜI**.
4. **Đường tắt bỏ qua cơ chế game:**
   - Click chọn trực tiếp trong dropdown hoặc click vào thẻ từ vựng trên DOM.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - **10% - 33%** tùy dạng bài (cloze dropdown có 3 lựa chọn $\rightarrow 33.3\%$; Part 1 nối 10 từ định nghĩa $\rightarrow 10\%$).
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có rủi ro thời gian thực; chấm điểm sau khi nộp.

---

#### 21. Speaking & Passport (Day 5, Zone 5 — `weekly_review`)
1. **Vị trí & File engine chính:** Day 5, Zone 5 (Boss Castle). File engine: [`src/modules/zones/BossBattleZone.jsx`](file:///Users/binhnguyen/projects/Engquest3k/src/modules/zones/BossBattleZone.jsx) (Speaking Parts & Passport Review, L68–75).
2. **Luồng chơi theo trình tự thời gian thực:**
   - Thí sinh thực hiện các phần thi Nói chuẩn Cambridge (Part 1 tìm điểm khác biệt giữa 2 bức tranh, Part 4 trả lời câu hỏi cá nhân).
   - Ở Part 1: Quan sát 2 tranh và click vào các điểm khác biệt trên canvas/ảnh.
   - Ở Part 4: Nghe câu hỏi từ giám khảo và bấm mic trả lời.
   - Màn hình Passport Review tổng kết toàn bộ thành tích tuần, hiển thị tem niêm phong hộ chiếu và tổng số khiên đạt được.
3. **Mốc ra quyết định vs Mốc chấm điểm:**
   - **Mốc quyết định:** Quan sát tranh hoặc nghe câu hỏi cá nhân.
   - **Mốc chấm điểm:** Chấm điểm sau khi click điểm khác biệt hoặc sau khi kết thúc lượt thu âm.
   - **Kết luận:** **TÁCH RỜI**.
4. **Đường tắt bỏ qua cơ chế game:**
   - Click chuột trực tiếp vào các vùng canvas/ảnh để kích hoạt hotspot khác biệt.
5. **Khả năng brute-force / đoán mò khi bịt ngôn ngữ:**
   - Đối với bài tìm điểm khác biệt trên tranh: người chơi có thể click ngẫu nhiên khắp bề mặt bức tranh để dò trúng tọa độ 6 điểm khác biệt.
6. **Yếu tố rủi ro / hậu quả thời gian thực gắn hành động:**
   - **KHÔNG**. Không có rủi ro mất máu hay cạm bẫy.

---

## PHẦN III: TỔNG KẾT BẰNG CHỨNG QUAN SÁT

Từ các bằng chứng code thực tế được trích dẫn ở trên:

1. **Về tính đồng thời giữa nhận thức ngôn ngữ và thực thi vận động:**
   - Chỉ có đúng **2 games** có mốc ra quyết định ngôn ngữ và mốc chấm điểm diễn ra **ĐỒNG THỜI trong thời gian thực**:
     - `Synonym Storm (F6D1)`: Vừa đọc chữ trên thiên thạch đang rơi vừa điều khiển Leo né/đón trước khi thiên thạch chạm sàn.
     - `Connector Relay (F6D2)`: Vừa đọc từ nối trên cổng đang trôi tới vừa điều khiển chuyển lane/nhảy/trượt trước khi chạm cổng.

2. **Về game có cơ chế vật lý nhưng mốc quyết định tách rời:**
   - `Word Forge Scramble (F7D1)`: Có cơ chế platformer và vác đồ vật lý thật, nhưng từ mục tiêu đã hiển thị trước; việc nhặt và nộp đá là thao tác thực thi sau khi đã biết từ.
   - `Question Quest (F7D2)`: Đọc câu hỏi và biết đáp án tĩnh tại $t = 0$; thao tác di chuyển đến cửa là thực thi sau khi đã biết đáp án. Đặc biệt có **lỗ hổng L455** cho phép `onClick` từ xa bỏ qua hoàn toàn chuyển động của Leo.

3. **Về 17 games/quests còn lại:**
   - Gồm 2 game Chronicles (`Story Sequencer`, `WordClassDuel`) và toàn bộ 15 quests tuần (Zones 1–5): Toàn bộ là bài tập giáo dục tương tác tĩnh (click chọn, kéo thả sắp xếp, điền form, ghi âm giọng nói). Mốc ra quyết định và mốc chấm điểm **hoàn toàn tách rời nhau**, không có cơ chế rủi ro/game over thời gian thực gắn trực tiếp vào hành động.
