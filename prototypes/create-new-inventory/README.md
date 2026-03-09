# Create New Inventory – Prototype

Run this prototype in a **local web server** so scripts and assets load correctly.  
Do **not** open `index.html` directly (file://) — scripts will not load and interactions will not work.

## 1. Open terminal in the repo root

The repo root is the folder that contains **package.json** (e.g. `vigilant-invention`).

```bash
cd /path/to/vigilant-invention
```

## 2. Start the server

```bash
npm start
```

- A browser window should open to the prototype.
- The terminal will show: **Prototype URL (copy if browser did not open):**  
  `http://localhost:3456/prototypes/create-new-inventory/index.html`  
  (the port may be 3456, 5555, 5556, etc. if one is in use — use the URL the terminal prints.)

**Server only (no browser):**

```bash
npm run serve
```

Then open the URL printed in the terminal in your browser.

## 3. If it still doesn’t work

| Problem | What to do |
|--------|------------|
| “Prototype not found” | You’re not in the repo root. Run `cd` into the folder that contains `package.json`, then `npm start` again. |
| Browser doesn’t open | Copy the URL from the terminal (e.g. `http://localhost:3456/prototypes/create-new-inventory/index.html`) and paste it into your browser. |
| Page is blank or buttons don’t work | Use the **exact** URL from the terminal (with the right port). Do not open the file via Finder / file://. |
| “Cannot GET /” | Go to the full prototype URL: `http://localhost:PORT/prototypes/create-new-inventory/index.html` (replace PORT with the number in the terminal). |

**Required:** Node.js must be installed. Check with `node -v`.
