# ROUND 79 — C.7 & C.8: LÀM RÕ 13 TỪ `SUPPLEMENT` W79/W80 & HAI PHƯƠNG ÁN TỪ VỰNG (KHÔNG TỰ CHỌN)

> **Nguyên tắc:** Giữ nguyên trạng thái `[CHỜ OWNER CHỌN]`. Mọi bảng số lượng dưới đây được tính trực tiếp từ `L637` Source B và danh sách `SUPPLEMENT` của Round 78.

## 1. Dữ liệu Gốc Đọc Từ File

- **Source B (`docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt:L632–L637`):**
```text
632: 	•	Weeks 79-80: Review & Micro-Debate 2 (Tuần 79-80: Ôn tập & Tranh luận nhỏ 2)
633: 	•	Topic: "Space Exploration vs. Earth Fix". (Chủ đề: Khám phá Vũ trụ hay Sửa chữa Trái đất?)
634: 	•	Activity: Micro-Debate. (Hoạt động: Tranh luận nhỏ.)
635: 	•	Skill Focus: Rebuttal Intro ("Yes, but..."). (Kỹ năng: Giới thiệu Phản biện.)
636: 	•	Grammar Review: Passive Voice, Conditionals, Comparatives.
637: 	•	Vocabulary Focus: space, earth, money, spend, fix, problem, important.
```
- **Từ vựng Source B đếm được tại `L637` (7 từ):** `space`, `earth`, `money`, `spend`, `fix`, `problem`, `important`
- **Bộ 13 từ `SUPPLEMENT` đã nêu tại `docs/agent_artifacts/round78_w79_w80_split_proposal.md:L41` (13 từ):** `explore`, `planet`, `budget`, `environment`, `pollution`, `poverty`, `research`, `satellite`, `invest`, `solution`, `priority`, `debate`, `evidence`
- **Ngưỡng chuẩn SOP (`docs/WEEK_PRODUCTION_SOP.md`):**
  - `L222`: - Đúng 20 từ vựng cốt lõi mới (`week{N}Vocab`) theo chuẩn CEFR của tuần.
  - `L329`: | **Gate 11** | `gate11_content_richness.mjs` | Đủ 20 từ vựng cốt lõi; 5 bài toán Singapore Math, 5 câu Grammar Drills và Action Lab 3 stages. |
  - `L523`: - Standard week vocab loader imports: 20 words from `reading_hub.vocab` + 10 definitions from `writing_hub.rw_part_1.definitions` = 30 total array slots.

## 2. Làm Rõ Điểm Mập Mờ Round 78 (`C.8`)

Ở `round78_w79_w80_split_proposal.md:L41-42`, cột `Từ vựng bổ sung (13 từ để đủ 20 từ)` chỉ liệt kê **một danh sách 13 từ duy nhất**, chưa phân biệt rõ 13 từ này là **mỗi tuần 13 từ khác nhau** (tổng 26 từ mới) hay **13 từ dùng chung/chia đôi cho cả khối W79–80**. Vì SOP (`L222`, `L329`, `L523`) đặt chuẩn **20 từ vựng cốt lõi / mỗi tuần**, có đúng **2 phương án** tường minh để Owner lựa chọn:

## 3. Trình Bày Đầy Đủ Cả 2 Phương Án Để Owner Quyết Định (`C.7`)

| Phương án | Cách cấu thành W79 | Cách cấu thành W80 | Tổng từ W79 | Tổng từ W80 | Tổng `SUPPLEMENT` duy nhất | Tổng từ vựng duy nhất cả khối W79–80 | Đáp ứng SOP 20 từ/tuần? |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Phương án (a)** *(7 SB dùng chung + 13 `SUPPLEMENT` riêng cho mỗi tuần)* | 7 SB + 13 SUPPLEMENT nhóm A | 7 SB + 13 SUPPLEMENT nhóm B | **20** | **20** | **26** | **33** | ✅ Cả W79 & W80 đều đủ 20 từ/tuần |
| **Phương án (b1)** *(7 SB dùng chung + chia 13 `SUPPLEMENT` cho 2 tuần, không lặp)* | 7 SB + 7 SUPPLEMENT đầu | 7 SB + 6 SUPPLEMENT sau | **14** | **13** | **13** | **20** | ❌ Thiếu chuẩn SOP 20 từ/tuần (cần nới gate cho W79/80) |
| **Phương án (b2)** *(7 SB dùng chung + lặp lại CÙNG 13 `SUPPLEMENT` ở cả 2 tuần)* | 7 SB + 13 SUPPLEMENT | 7 SB + chính 13 SUPPLEMENT đó | **20** | **20** | **13** | **20** | ⚠️ Đủ 20 slot/tuần nhưng 0 từ mới thêm ở W80 |

### Chi tiết danh sách từng phương án

- **Phương án (a) — 26 từ `SUPPLEMENT` (mỗi tuần 20 từ: 7 chung + 13 riêng):**
  - **W79 (20 từ):** 7 SB (space, earth, money, spend, fix, problem, important) + 13 SUPPLEMENT Claims/Space vs Earth (explore, planet, budget, environment, pollution, poverty, research, satellite, invest, solution, priority, debate, evidence)
  - **W80 (20 từ):** 7 SB (space, earth, money, spend, fix, problem, important) + 13 SUPPLEMENT Rebuttal/Trade-off đề xuất mới (restore, climate, emission, resource, allocate, consequence, sustainable, renewable, habitat, statistic, oppose, outweigh, justify)
- **Phương án (b1) — Chia đôi 13 từ `SUPPLEMENT` (tổng 20 từ duy nhất / 2 tuần, mỗi tuần < 20 từ):**
  - **W79 (14 từ):** 7 SB (space, earth, money, spend, fix, problem, important) + 7 SUPPLEMENT (explore, planet, budget, environment, pollution, poverty, research)
  - **W80 (13 từ):** 7 SB (space, earth, money, spend, fix, problem, important) + 6 SUPPLEMENT (satellite, invest, solution, priority, debate, evidence)
- **Phương án (b2) — Lặp nguyên bộ 20 từ (7 SB + cùng 13 `SUPPLEMENT` Round 78) cho cả W79 & W80:**
  - Cả W79 & W80 dùng chung đúng 20 từ; W80 tập trung tái thực hành Rebuttal *"Yes, but..."* trên chính 20 từ đã học ở W79 (không phát sinh từ mới ở W80).
