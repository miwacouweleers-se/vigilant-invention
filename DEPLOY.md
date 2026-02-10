# How to update the live site (GitHub Pages)

Your **latest changes are already committed** in this repo. To see them at  
**https://miwacouweleers-se.github.io/vigilant-invention/** you need to **push** to GitHub.

---

## Option 1: Push from Cursor

1. Open **Source Control** in the left sidebar (or press `Ctrl+Shift+G` / `Cmd+Shift+G`).
2. If you see **"Push"** or **"Sync"** or an icon with an up arrow, click it to push your commits to GitHub.
3. If it asks for credentials, sign in with your GitHub account (or use a Personal Access Token if needed).

---

## Option 2: Push from GitHub Desktop

1. Open **GitHub Desktop** and open the **vigilant-invention** repository (File → Add Local Repository, or select it if already listed).
2. Look at the top: if it says **"Push origin"** or shows that you have commits to push, click **Push origin**.
3. If you don’t see Push, use **Repository → Push** (or `Ctrl+P` / `Cmd+P`).

---

## Option 3: Push from Terminal

1. Open Terminal (or the integrated terminal in Cursor: `` Ctrl+` `` or **Terminal → New Terminal**).
2. Run:
   ```bash
   cd /Users/mcouweleers/Documents/GitHub/vigilant-invention
   git push
   ```
3. If prompted for username/password, use your GitHub username and a **Personal Access Token** (not your GitHub password).  
   To create a token: GitHub → Settings → Developer settings → Personal access tokens → Generate new token.

---

## After you push

1. Wait **1–2 minutes** for GitHub Pages to rebuild.
2. Open: https://miwacouweleers-se.github.io/vigilant-invention/
3. Do a **hard refresh**: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows), or open the site in an **incognito/private** window.

You should then see: **Collect** in the sidebar, **Data campaign**, **Measure / Inventory**, and the other updates.

---

## If the live site still looks old

- In GitHub, open your **vigilant-invention** repo → **Settings** → **Pages**.
- Confirm **Source** is **Deploy from a branch** and the branch is **main** (and folder **/ (root)**).
- Wait a few more minutes and try the hard refresh again.
