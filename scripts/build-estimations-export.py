#!/usr/bin/env python3
"""
Build export-estimations-monitor-settings/: Estimations + Estimation settings.
Uses the same header, icon sidebar, and submenu panel as create-new-inventory.
Run from repo root: python3 scripts/build-estimations-export.py
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IDX = ROOT / "prototypes/create-new-inventory/index.html"
STYLES = ROOT / "prototypes/create-new-inventory/styles.css"
OUT = ROOT / "export-estimations-monitor-settings"
OUT.mkdir(parents=True, exist_ok=True)

lines = IDX.read_text(encoding="utf-8").splitlines(keepends=True)

def slice_1based(start, end_inclusive):
    return "".join(lines[start - 1 : end_inclusive])

# Inline <style> from prototype (theme + components + estimations + modals CSS)
si = next(i for i, l in enumerate(lines) if l.strip() == "<style>")
se = next(i for i, l in enumerate(lines) if l.strip() == "</style>")
inline_css = "".join(lines[si + 1 : se])

shell_css = STYLES.read_text(encoding="utf-8")
(OUT / "export.css").write_text(shell_css + "\n\n/* === From prototype index inline === */\n" + inline_css, encoding="utf-8")

# Main content: view-estimations + drawer + modals + toast + view-estimation-settings
main_html = slice_1based(12716, 14358)

# Full app shell from prototype (lines 11297–11428): sidebar, submenu, header, prototype banner
SHELL = slice_1based(11297, 11428)
SHELL = SHELL.replace(
    'onclick="event.preventDefault(); if(typeof switchView===\'function\') switchView(\'estimations\');"',
    'onclick="event.preventDefault(); goEstimations();"',
)
SHELL = SHELL.replace(
    'onclick="event.preventDefault(); if(typeof switchView===\'function\'){switchView(\'estimation-settings\');}"',
    'onclick="event.preventDefault(); goEstimationSettings();"',
)

# JS: switchView + estimations + intensity wizard + settings tabs + reports + cell drawer
js_a = slice_1based(26393, 26839)
js_wizard = slice_1based(26840, 27306)
# Include closing brace of submitApproveGap (28198); 28199+ is activity-log code
js_b = slice_1based(27307, 28198)

switch_fn = r"""
    function switchView(viewId) {
      var targetView = document.getElementById('view-' + viewId);
      if (!targetView) return;
      document.querySelectorAll('.view').forEach(function(v) {
        v.classList.remove('active');
        v.style.display = 'none';
      });
      targetView.classList.add('active');
      targetView.style.display = 'block';
      var nameSpan = document.getElementById('prototype-banner-page-name');
      var t = targetView.querySelector('.page-title');
      if (nameSpan && t) nameSpan.textContent = t.textContent.trim();
      document.querySelectorAll('.submenu-item[data-view]').forEach(function(item) {
        item.classList.toggle('active', item.getAttribute('data-view') === viewId);
      });
      if (viewId === 'estimations' && typeof ensureEstimationsTableGapsStyled === 'function') {
        ensureEstimationsTableGapsStyled();
      }
    }
    function goEstimations() {
      if (typeof window.__switchSection === 'function') window.__switchSection('monitor');
      switchView('estimations');
    }
    function goEstimationSettings() {
      if (typeof window.__switchSection === 'function') window.__switchSection('settings');
      switchView('estimation-settings');
    }
"""

app_shell_js = (ROOT / "prototypes/create-new-inventory/app-shell.js").read_text(encoding="utf-8")
app_shell_js += """
  window.__switchSection = function(section) {
    var sidebarItems = document.querySelectorAll('.sidebar-item[data-section]');
    var submenuContents = document.querySelectorAll('.submenu-content');
    var submenuPanel = document.getElementById('submenuPanel');
    sidebarItems.forEach(function(item) {
      item.classList.toggle('active', item.getAttribute('data-section') === section);
    });
    submenuContents.forEach(function(content) {
      content.classList.toggle('hidden', content.getAttribute('data-section') !== section);
    });
    if (submenuPanel) submenuPanel.classList.remove('collapsed');
    var menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle && menuToggle.querySelector('i')) {
      menuToggle.querySelector('i').className = 'fa-light fa-arrow-right-from-line';
    }
  };
"""

# Strip 4-space indent from extracted JS
def dedent_js(s):
    return "\n".join((ln[4:] if ln.startswith("    ") else ln) for ln in s.splitlines()) + "\n"

js_out = (
    "// --- switchView ---\n" + dedent_js(switch_fn)
    + "// --- estimations & routines (part 1) ---\n" + dedent_js(js_a)
    + "// --- add intensity model wizard ---\n" + dedent_js(js_wizard)
    + "// --- estimation settings & cell details ---\n" + dedent_js(js_b)
)
# Export-only: navigate in-page (no entity-type view; routines menu → settings)
js_out += """
function estimationsRoutinesAction(action) {
  if (action === 'edit-gap-filling' || action === 'edit-intensity') {
    goEstimationSettings();
    switchEstimationSettingsTab('routines');
  } else if (action === 'past-reports') {
    goEstimationSettings();
    switchEstimationSettingsTab('reports');
  }
}
function openEntityTypeEdit(entityTypeId) {
  goEstimationSettings();
}
(function() {
  var og = openEditGapRoutine, oi = openEditIntensityRoutine;
  openEditGapRoutine = function(id) { goEstimationSettings(); og(id); };
  openEditIntensityRoutine = function(id) { goEstimationSettings(); oi(id); };
})();
"""

(OUT / "app-shell.js").write_text(app_shell_js, encoding="utf-8")
(OUT / "estimations-export.js").write_text(js_out, encoding="utf-8")

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Estimations & Estimation settings</title>
  <link rel="stylesheet" href="export.css">
  <script src="https://kit.fontawesome.com/e1f0748a31.js" crossorigin="anonymous"></script>
  <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap" rel="stylesheet">
</head>
<body>
{SHELL}
{main_html}
      </main>
    </div>
  </div>
  <script src="app-shell.js"></script>
  <script src="estimations-export.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {{
      switchView('estimations');
    }});
  </script>
</body>
</html>
"""

(OUT / "index.html").write_text(html, encoding="utf-8")

readme = """# Estimations + Estimation settings (export)

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
"""
(OUT / "README.md").write_text(readme, encoding="utf-8")
print("Wrote", OUT)
