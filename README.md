# Vertex UI Measure – Prototype

Static HTML prototype **based on the [vertex-ui-measure](https://github.com/miwacouweleers-se/vertex-ui-measure)** production app. Use it to click through the main flows without running Angular or authentication.

Styled with [Doodle CSS](https://github.com/chr15m/DoodleCSS) for a hand-drawn wireframe look.

## Relationship to vertex-ui-measure

| Prototype (this repo) | Production (vertex-ui-measure) |
|-----------------------|--------------------------------|
| Inventory             | `/inventory`                   |
| **Collect**           | —                              |
| ↳ Data campaign       | (FR1: campaign management)     |
| Statements            | `/statements`                  |
| Imports               | `/imports`                    |
| Emissions             | `/emissions`                  |
| Audits                | `/audits`                     |
| Activity              | `/activity`                   |
| Advice                | (custom checklist)            |

## Live URL (GitHub Pages)

**https://miwacouweleers-se.github.io/vigilant-invention/**

*(Enable GitHub Pages in repo Settings → Pages → Deploy from branch → main → / (root).)*

## Preview locally

**Option 1 – Python (recommended if `npm start` fails):**

```bash
cd /path/to/vigilant-invention
python3 -m http.server 3333
```

Or with npm: `npm run start:py`

**Option 2 – Node (serve):**

```bash
npm install
npm start
```

Then open in your browser:

- **Main prototype:** **http://localhost:3333**
- **Create New Inventory prototype:** **http://localhost:3333/prototypes/create-new-inventory/**

If the URL does not work, ensure you run the command from the **repository root** (the folder that contains `index.html` and `prototypes/`).

## Contents

- **index.html** – Single-page prototype with:
  - App shell (top bar, left sidebar) aligned with vertex-ui-measure navigation
  - **Inventory** – Primary inventory with Summary | Scope 1 | Scope 2 | Scope 3 tabs, metric cards, emissions tables, pagination
  - **Collect** – **Data campaign** (FR1): create/manage campaigns, reporting period & deadline, entities & activities multi-select, contributor assignment matrix (entity × activity), deploy campaign, status Draft/Active/Closed, editing rules
  - **Statements** – Placeholder for statement list and create
  - **Imports** – Placeholder for import history and upload
  - **Emissions** – Placeholder for emissions calculations
  - **Audits** – Placeholder for audit history
  - **Activity** – Placeholder for activity details
  - **Advice** – Onboarding checklist (emission factors, reporting settings, data ingestion)

## License

MIT
