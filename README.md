# 進能服 (6692) 雙曲線成長戰略規劃 (FY26~FY28) 網頁與 GitHub 發布指南

本專案將 `1.2.3 年度計畫_三年(FY26~FY28).md` 轉換為互動式、視覺化且圖表豐富的單頁 Web 應用程式 (HTML5 / CSS3 / Vanilla JS / Chart.js)。

## 網頁結構

- **Part 1 總覽**：雙曲線架構對比表、三大價值鏈（電力/服務/資本）流程圖、六大事業部協同矩陣
- **Part 2 第二曲線**：ATMOCE (B2B 利基產品/儲能賣功率)、維運事業 (全聯模式/據點地圖/1GW 存量)、建坤 SPV (電廠收購整新飛輪)
- **Part 3 第三曲線**：充電服務 CPO (noodle 收購/順益合資)、綠電售電業 (自產自銷中樞閉環)、AIDC 算力 (富邦能源/on-site power/貨櫃 GPU)
- **Part 4 其他補充**：六事業部 OKR 互動篩選、結構化第二意見（紅隊分析）、14 項待補充議題關鍵字搜尋與優先級過濾

---

## 🚀 發布至 GitHub Pages 步驟 (How to Publish on GitHub Pages)

### 步驟 1：在 GitHub 上建立新 Repository
1. 開啟 [GitHub.com](https://github.com) 並登入帳號。
2. 點擊右上角 `+` -> **New repository**。
3. 命名 Repository（例如：`jin-neng-fu-strategy`）。
4. 選擇 **Public**（公開）或 Private。
5. **不要**勾選 "Initialize this repository with a README"（我們本機已有檔案）。
6. 點擊 **Create repository**。

### 步驟 2：推送本機檔案至 GitHub
在本機專案資料夾下開啟 Terminal / PowerShell，執行以下指令：

```bash
# 1. 將所有檔案加入 Git 追蹤
git add .

# 2. 進行第一次 Commit
git commit -m "feat: initial release of Jin-Neng-Fu strategic dashboard"

# 3. 設定主要分支為 main
git branch -M main

# 4. 綁定 GitHub 遠端倉庫（請替換 YOUR-USERNAME 與 YOUR-REPO-NAME）
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# 5. 推送程式碼至 GitHub
git push -u origin main
```

### 步驟 3：開啟 GitHub Pages 靜態網站託管
1. 進入您在 GitHub 上的 Repository 頁面。
2. 點擊上方的 **Settings**（設定）。
3. 在左側選單點擊 **Pages**。
4. 在 **Build and deployment** > **Source** 選擇 `Deploy from a branch`。
5. 在 **Branch** 選項選擇 `main` 分支與 `/ (root)` 資料夾，點擊 **Save**。
6. 等待 1~2 分鐘，頁面上方將出現公開網址：
   `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

完成後即可複製網址分享簡報網頁！
