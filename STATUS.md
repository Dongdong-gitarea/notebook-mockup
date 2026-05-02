# Notebook 產品紀錄 — 2026-05-02（更新）

## TL;DR

新產品概念：**個人英文筆記本** — 跟 Reelish 同品牌但兩邊獨立網站。
- Live: https://dongdong-gitarea.github.io/notebook-mockup/
- Repo: https://github.com/Dongdong-gitarea/notebook-mockup
- 本地: `/Users/caidongbo/notebook-mockup/index.html`
- PWA：可加入 iPhone 主畫面（manifest 已設，SW 等自訂 domain 再開）

---

## 產品概念

### Core idea
> 對方寫日記、工作信、想法 → 我幫他翻成自然英文 → 存下來陪他練習

跟 ChatGPT 翻譯的差異化：
1. 能存下來（句子庫 + 單字庫分開）
2. 重複跟讀練習（已實作評分）
3. 離線使用（Phase 3，等自訂 domain）
4. 按主題分類（Personal / Work / Pets / Travel / Study / Thoughts）

---

## 目前完成功能（2026-05-02）

### 翻譯
- 中文輸入 → MyMemory API 翻譯（免費，無 API key，5000 字/天）
- 語音輸入（底部 mic，zh-TW）
- 範例 chip 快速體驗
- 翻譯結果以卡片顯示，每個英文單字可點 → popup 顯示 IPA、詞性、中文

### 練習（Practice modal）
- 桌機 / Android Chrome：SR + MediaRecorder 並跑，顯示評分 + 紅字標注
- iPhone Safari：SR 單獨跑（不開 MR 避免搶麥克風），顯示評分
- 紅字（唸錯/漏掉的字）可點擊 → 單獨唸出那個字
- 結果出現時 mic 區自動收起，不需捲動

### 儲存
- 句子庫（My Sentences）＋ 單字庫（My Words）— 分開存
- 歷史記錄（History）— 完整翻譯紀錄，按 Today / Yesterday / This Week / Earlier 分組
- 全部存 localStorage（無後端）
- Today 跟著使用者本地時區

### 視覺 / UX
- 深藍漸層 dark mode（預設）＋ light mode 切換
- Fraunces serif + Inter，Lucide icons
- 手機版卡片按鈕只顯示 icon，桌機顯示 icon + 文字
- Practice modal 在手機版為 bottom sheet

### PWA
- manifest.json + apple meta tags
- 可「加入主畫面」，standalone 全螢幕
- SW 暫停（GitHub Pages subdirectory 有 redirect 問題），等搬到自訂 domain 再開

---

## 重要決定紀錄

| 議題 | 決定 |
|---|---|
| 跟 Reelish 整合？ | ❌ 分開做（同品牌，不同網站） |
| 翻譯 API | ✅ MyMemory 免費 API（mockup 用），正式版換 Claude |
| iOS 錄音 | ✅ SR-only 路徑（不開 getUserMedia，避免 mic 衝突）|
| SW | ⏸ 暫停，等自訂 domain |
| Today 時區 | ✅ 跟使用者本地時區 |
| 隔天主畫面 | 空白（設計如此），資料在 History |
| Icons | Lucide（不用 emoji） |
| 認證 | Phase 1 純匿名 localStorage，Phase 2 加 auth |

---

## 還沒做

### Phase 2（接後端後）
- [ ] 接 Claude API（真實翻譯）
- [ ] 翻譯品質不好時可重新翻譯 / 手動編輯
- [ ] 自動偵測句子主題
- [ ] Whisper 跟讀評分（取代前端 SR）

### Phase 3
- [ ] 自訂 domain（notebook.reelish.app）→ 再開 SW / 離線
- [ ] SRS 間隔複習
- [ ] User auth（多裝置同步）
- [ ] 練習成就 / streak

---

## 開新對話接續

```
繼續 Notebook 工作，請先讀
https://github.com/Dongdong-gitarea/notebook-mockup/blob/main/STATUS.md
```
