# Estimations + Estimation settings (export)

Same **header, icon sidebar, and submenu** as the Create New Inventory prototype. Only **Estimations** and **Estimation settings** views are included; other nav items are unchanged visually but only those two pages work in this export.

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

**Navigation:** **Monitor → Estimations** and **Settings → Estimation settings**. `goEstimations()` / `goEstimationSettings()` expand the correct submenu section. Estimations **⋯** menu opens Estimation settings in-page.
