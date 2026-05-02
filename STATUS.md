# Notebook 產品紀錄 — 2026-05-01

## TL;DR

新產品概念：**個人英文筆記本** — 跟 Reelish 同品牌但兩邊獨立網站。
目前只在 mockup 階段，純前端 demo（純 HTML，無 backend）。
Mockup：
- Live demo: https://dongdong-gitarea.github.io/notebook-mockup/
- 本地檔案：`/Users/caidongbo/notebook-mockup/index.html`
- GitHub repo: https://github.com/Dongdong-gitarea/notebook-mockup

---

## 產品概念

### Core idea
> 對方寫日記、工作信、想法 → 我幫他翻成自然英文 → 存下來陪他練習

跟 ChatGPT 翻譯的差異化：
1. 能存下來（句子庫 + 單字庫分開）
2. 重複跟讀練習（Phase 2）
3. 離線使用（Phase 3）
4. 按主題分類（Personal / Work / Pets / Travel / Study / Thoughts）

### Why 這條路有戲
| 條件 | 答覆 |
|---|---|
| WHO | 寫日記、寫工作信的人 |
| 為什麼用我不用 ChatGPT | ChatGPT 不存內容、無發音練習、無 SRS |
| 10x 在哪 | 存下句子 + repeat after me + 離線練習 |

### 對標產品（已驗證市場存在）
- **Speak**（韓國 app, $1.7B 估值, 500+ 萬 user）
- **LingQ**（30 萬付費 user）
- **ELSA Speak**（$4M ARR）

---

## 戰略決定

### 與 Reelish 關係
- 同品牌、不同網站、不同 codebase
- 不在 Reelish 主域名下，避免兩邊 user 混淆
- 但可以共用同樣的視覺語言（serif 標題、深藍漸層、Lucide icons）

### 為什麼分開做
- Reelish PMF 雛形剛出現，要全力衝
- 新產品如果是 Reelish 的 feature 容易稀釋焦點
- 分開就是兩條腿走路 — 一邊死了另一邊還活

---

## Mockup v6 已完成的功能（純前端 demo）

### 視覺
- 🎨 深藍漸層背景（午夜藍 + 細微 grid 紋理 + 三層光斑）
- 🌗 Dark / Light Mode 切換（完整 CSS 變數適配）
- 🔤 Fraunces serif（標題、結果、筆記）+ Inter（UI）
- 🎯 Lucide icons（業界標準，shadcn/ui 用的那套）— 完全沒用 emoji

### 互動
- 📝 中文輸入框（textarea + 字數計數 0/500）
- 🎤 語音輸入（瀏覽器 SpeechRecognition API，zh-TW）
- 💬 範例 chip（點擊自動填入 + 翻譯）
- 🌐 翻譯按鈕（gradient pill，hover 漸層浮現）
- 📖 翻譯結果卡（淡入動畫、頂部漸層光條）
- 🔍 IPA 音標顯示（小徽章）
- 👆 **每個英文單字可點** → popup 顯示意思、IPA、詞性
- 🔊 Listen / 🐢 Slow（兩個發音速度）
- 🎙 聲音選擇器（過濾後只列高品質聲音，按口音分組，標 M/F）

### 資料結構
- ✏️ 句子庫（My Sentences）— 整句存下、含分類 badge
- 📚 單字庫（My Words）— 個別單字存下、grid 卡片排版
- 🏷 分類系統（6 種：Personal / Work / Pets / Travel / Study / Thoughts）
- 🔍 句子庫上方有 filter tabs（按分類過濾，含計數）
- 💾 全部存 localStorage（無後端）

### 右上角 UI
- 📖 Sentences icon（含 badge 數字）→ 點滾到 My Sentences
- 📚 Words icon（含 badge 數字）→ 點滾到 My Words
- ⚙ Settings icon → 下拉面板含：
  - Voice 聲音選擇器（過濾後高品質聲音）
  - Appearance（Dark / Light toggle）

### Mock 資料
- 7 個預設中文 → 英文翻譯範例
- 36 個常見英文單字字典（IPA + 詞性 + 中文）
- 未收錄單字 fallback：「mock 字典未收錄此單字 — 正式版會用 Claude AI」

---

## 還沒做的（Phase 2 / 3）

### Phase 2（接後端後做）
- [ ] 接 Claude API（真實翻譯，取代 mock）
- [ ] 接 Whisper（user 跟讀錄音 → 評分）
- [ ] 「🎤 跟讀練習」功能（按下錄音 → AI 比對發音 → 顯示分數）
- [ ] 自動偵測句子主題（用 Claude 判斷該歸哪個分類）
- [ ] 「翻譯成 native 改寫版」（在結果卡裡 toggle）

### Phase 3（規模化後）
- [ ] PWA（離線模式）
- [ ] SRS 間隔複習（明天 / 3 天 / 7 天提醒）
- [ ] User auth（多裝置同步）
- [ ] 進階練習模式（填空、聽寫、口說評分）
- [ ] 練習成就 / streak

---

## 技術棧規劃（真要做時）

### Frontend
- 沿用 Reelish 的視覺風格（已經寫成 mockup）
- 純前端 SPA 或 Next.js（取決於是否要 SSR）
- localStorage 先做，後期升級到 user auth

### Backend
- 跟 Reelish **共用**：Claude API、Whisper、Postgres
- 但不同 service / route（避免互相干擾）
- 可能也需要：TTS service（如 ElevenLabs）做更高品質發音

### 部署
- Railway 一個獨立 service（同 project 不同 service）
- 不同 domain（例如 notebook.reelish.app 或新域名）

---

## 重要決定紀錄

| 議題 | 決定 |
|---|---|
| 跟 Reelish 整合？ | ❌ 分開做（同品牌，不同網站） |
| 上方 nav `[筆記][影片]` 切換？ | ❌ 拿掉（兩邊獨立） |
| 預設 Personal 分類 | ✅ 用 localStorage 記住上次選的 |
| 沒收錄的單字怎辦？ | mock 用 fallback，正式接 Claude |
| 「翻成 native」按鈕 | ❌ 砍掉，太抽象（之後可放在結果卡裡 toggle） |
| 顏色 | 深藍漸層 + cyan 點綴（不要紫色） |
| Icons | 用 Lucide（不用 emoji） |
| 認證 | Phase 1 純匿名 + localStorage，Phase 2 加 auth |

---

## 下次怎麼接續

### 選項 A：繼續 polish mockup
還有什麼 UX 細節要加 / 改

### 選項 B：開始接後端做真功能
1. 把 mockup 拆成 React/Next.js 專案
2. 開新的 Railway service
3. 接 Claude API
4. 部署 alpha 版

### 選項 C：先 hold 住，全力做 Reelish
等 Reelish 過了 M3 檢核點（1,000 user + 第一筆付費）再回來

### 開新對話跟 Claude 接續
> 我要繼續 Notebook 新產品的工作。請看
> - `/Users/caidongbo/MCP安裝/notebook-product-status-2026-05-01.md`
> - mockup 檔：`/Users/caidongbo/notebook-mockup/index.html`
> - Live：https://dongdong-gitarea.github.io/notebook-mockup/

---

## 打開 mockup 的方式

直接開瀏覽器：https://dongdong-gitarea.github.io/notebook-mockup/

本地修改：
```bash
open /Users/caidongbo/notebook-mockup/index.html
```
改完 commit + push 自動部署。

---

## 提醒

如果未來要把這個產品做大，記得在 Reelish 戰略計畫裡 **重新評估時機**。現階段戰略文件還是建議先把 Reelish 推到 PMF。
