# Calibrated Readability & CEFR Benchmarking (Round 74)

> ⚠️ **LƯU Ý QUAN TRỌNG (Task C.6, C.7, C.8)**:
> - Các mẫu văn bản dưới đây là **UNVERIFIED sample** (không có mã đề thi, năm thi, part thi cụ thể trong repo). CẤM dùng để đặt ngưỡng chính thức.
> - **CHƯA CHỐT NGƯỠNG**: Giữ nguyên trạng thái điều tra; không tự ý áp đặt bất kỳ ngưỡng FK hay Out-of-List nào cho đến khi Owner cung cấp văn bản Cambridge chính thức.

## 1. UNVERIFIED Cambridge Sample Analysis

| Level / Sample | Citation / Provenance | Word Count | Sentences | ASL | ASW | FK Grade | YLE Out-of-List % |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **A2 Flyers (UNVERIFIED sample 1)** | UNVERIFIED — Không có đề/năm/part cụ thể trong repo | 54 | 6 | 9 | 1.3 | **3.2** | 13% |
| **A2 Flyers (UNVERIFIED sample 2 - Fable)** | UNVERIFIED — Không có đề/năm/part cụ thể trong repo | 63 | 6 | 10.5 | 1.1 | **1.4** | 19% |
| **B1 Preliminary / PET (UNVERIFIED sample 1)** | UNVERIFIED — Không có đề/năm/part cụ thể trong repo | 67 | 5 | 13.4 | 1.58 | **8.3** | 26.9% |
| **B1 Preliminary / PET (UNVERIFIED sample 2)** | UNVERIFIED — Không có đề/năm/part cụ thể trong repo | 57 | 4 | 14.3 | 1.47 | **7.4** | 28.1% |
| **B2 First / FCE (UNVERIFIED sample 1)** | UNVERIFIED — Không có đề/năm/part cụ thể trong repo | 59 | 4 | 14.8 | 2.47 | **19.4** | 66.1% |

### 2. Mâu thuẫn nội tại trong các ngưỡng đề xuất trước đây (Task C.7):
1. **Mâu thuẫn Out-of-List Flyers**:
   - Ngưỡng dự kiến ở Round 73 đề xuất: Flyers < 5% từ ngoài wordlist.
   - Nhưng đo thực tế ngay trên 2 bài mẫu Flyers ở trên: Mẫu 1 đo ra **13.0%**, Mẫu 2 đo ra **19.3%**!
   - **Kết luận**: Ngưỡng < 5% mâu thuẫn trực tiếp với chính các bài mẫu thực nghiệm (sai số gấp 2.6 – 3.8 lần).

2. **Mâu thuẫn Dải FK Stage 3 vs Đánh giá Pass/Fail**:
   - Ngưỡng dự kiến ở Round 73 đề xuất cho Stage 3 là FK **8.5 – 11.5**.
   - Nhưng trong bảng đo tuần staged: W126 có FK = **7.1**, W134 có FK = **7.0** (đều thấp hơn 8.5 rất nhiều).
   - Báo cáo Round 73 lại đánh giá W126 và W134 là **PASS** (vì code if-else chỉ check `fk < 7.0`).
   - **Kết luận**: Tiêu chuẩn văn bản (8.5–11.5) mâu thuẫn hoàn toàn với code thực thi và kết luận báo cáo.

3. **Quyết định**: **CHƯA CHỐT NGƯỠNG**. Không khóa bất kỳ ngưỡng độ khó nào trong Gate cho đến khi có tài liệu chuẩn Cambridge từ Owner.

## 3. Provenance & Word Counts of Official Wordlists (Task C.8)

Đo trực tiếp từ các file JSON trong `src/data/official_wordlists/` (không gõ tay chuỗi cố định):

| File | Total Words (AST) | Array Length | Provenance Document Code | Publisher & Source | Status |
| :--- | :---: | :---: | :--- | :--- | :---: |
| `starters_pre_a1.json` | 504 | 504 | CER/6137/V3/JUN25/SMF-Wordlists | Cambridge University Press & Assessment | ✅ **VALID (Owner Decision 4 Match)** |
| `movers_a1.json` | 412 | 412 | CER/6137/V3/JUN25/SMF-Wordlists | Cambridge University Press & Assessment | ✅ **VALID (Owner Decision 4 Match)** |
| `flyers_a2.json` | 519 | 519 | CER/6137/V3/JUN25/SMF-Wordlists | Cambridge University Press & Assessment | ✅ **VALID (Owner Decision 4 Match)** |
| `pet_b1.json` | 481 | 481 | N/A (Failed Scrape) | N/A | ❌ **UNVERIFIED & TRUNCATED** |
| `fce_b2.json` | 249 | 249 | N/A (Failed Scrape) | N/A | ❌ **UNVERIFIED & TRUNCATED** |

> **Giải thích nguồn gốc con số 467/733/913 ở báo cáo Round 73**:
> - Các con số 467, 733, 913 ở Round 73 là do AI **hardcode cố định** vào chuỗi template string của script, KHÔNG đọc từ file JSON thật.
> - File JSON thật trên đĩa (`starters_pre_a1.json`, `movers_a1.json`, `flyers_a2.json`) chứa đúng **504 / 412 / 519** từ (mỗi cấp là danh sách từ vựng bổ sung mới theo đúng mã tài liệu Cambridge `CER/6137/V3/JUN25/SMF-Wordlists`), hoàn toàn trùng khớp với Quyết định 4 của Owner.

## 4. Re-measurement of Production & Staged Weeks (Excluding Glossary & Lemmatized)

| Week / Unit | Stage | Raw FK | Calibrated FK (Excl. Glossary) | ASL | ASW | Out-of-YLE % (Excl. Glossary) | Calibrated Gate Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Prod W33** | Stage 1 | 4.8 | **4.8** | 11.3 | 1.36 | 26.4% | Cảnh báo Out-of-List (>10%) |
| **Prod W34** | Stage 1 | 4.6 | **4.6** | 12.6 | 1.29 | 21.5% | Cảnh báo Out-of-List (>10%) |
| **Prod W36 (Flyers Mock)** | Stage 1 | 5.5 | **5.1** | 11.2 | 1.38 | 28.7% | Cảnh báo Out-of-List (>10%) |
| **Prod W76 (PET Mock)** | Stage 2 | 6.8 | **6.4** | 10.7 | 1.51 | 32% | Đo thực nghiệm (Chưa chốt ngưỡng) |
| **Prod W80 (PET Mock)** | Stage 2 | 6.8 | **6.8** | 11.1 | 1.53 | 34.6% | Đo thực nghiệm (Chưa chốt ngưỡng) |
| **Staged W79 (R69/R70)** | Stage 2 | 8.2 | **7.6** | 10 | 1.64 | 38.6% | Đo thực nghiệm (Chưa chốt ngưỡng) |
| **Staged W126 (Wave 3)** | Stage 3 | 7.4 | **7.1** | 10.7 | 1.57 | 31.3% | Lưu ý FK thấp so với mức đề xuất 8.5 |
| **Staged W127 (Wave 3)** | Stage 3 | 10.4 | **9.3** | 12.3 | 1.7 | 41.9% | Đo thực nghiệm (Chưa chốt ngưỡng) |
| **Staged W129 (Wave 3)** | Stage 3 | 10.2 | **9.8** | 11.5 | 1.77 | 39.3% | Đo thực nghiệm (Chưa chốt ngưỡng) |
| **Staged W130 (Wave 3)** | Stage 3 | 10.9 | **10.5** | 11.4 | 1.84 | 48% | Đo thực nghiệm (Chưa chốt ngưỡng) |
| **Staged W131 (Wave 3)** | Stage 3 | 10.5 | **9.1** | 10.5 | 1.75 | 55.1% | Đo thực nghiệm (Chưa chốt ngưỡng) |
| **Staged W133 (Wave 3)** | Stage 3 | 10.4 | **8.2** | 9.9 | 1.69 | 44.2% | Đo thực nghiệm (Chưa chốt ngưỡng) |
| **Staged W134 (Wave 3)** | Stage 3 | 9.3 | **7** | 10.4 | 1.57 | 42.8% | Lưu ý FK thấp so với mức đề xuất 8.5 |

> ⚠️ **Kết luận chung**: Toàn bộ chỉ số trên phản ánh kết quả đo thực tế bằng thuật toán Flesch-Kincaid & Lemmatizer YLE. Dự án **TUYỆT ĐỐI KHÔNG CHỐT NGƯỠNG** hay đánh giá Pass/Fail chính thức cho đến khi Owner cung cấp bộ tiêu chuẩn khảo thí Cambridge được phê duyệt.
