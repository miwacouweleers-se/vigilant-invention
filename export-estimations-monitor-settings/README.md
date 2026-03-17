# Estimations (Monitor) + Estimation settings (Settings)

Static export with **Monitor** and **Settings** in the icon sidebar. Use the submenu to open **Estimations** or **Estimation settings**.

## Run locally

```bash
cd export-estimations-monitor-settings
python3 -m http.server 3456
```

Open http://localhost:3456/

## Rebuild from prototype

From repo root:

```bash
python3 scripts/build-estimations-export.py
```

## Files

- `index.html` — shell + both views + related modals/drawers
- `export.css` — app shell styles + prototype inline theme/CSS
- `app-shell.js` — sidebar behaviour
- `estimations-export.js` — view switching, estimations, intensity model wizard, estimation settings, reports, cell drawer

**Navigation:** Use **Monitor → Estimations** and **Settings → Estimation settings** in the submenu, or click the **Monitor** / **Settings** icons (switching section updates the page). Estimations **⋯** menu items open Estimation settings in-page.
