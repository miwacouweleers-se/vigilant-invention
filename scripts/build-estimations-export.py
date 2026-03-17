#!/usr/bin/env python3
"""
Build export-estimations-monitor-settings/: Estimations (Monitor) + Estimation settings (Settings)
with trimmed side nav. Run from repo root:
  python3 scripts/build-estimations-export.py
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

SHELL = """    <div class="app-shell">
    <aside class="icon-sidebar">
      <div class="sidebar-top">
        <button class="sidebar-item menu-toggle" title="Menu">
          <i class="fa-light fa-arrow-right-to-line"></i>
          <span class="sidebar-label">Menu</span>
        </button>
        <button class="sidebar-item active" data-section="monitor" title="Monitor">
          <i class="fa-light fa-chart-line-up"></i>
          <span class="sidebar-label">Monitor</span>
        </button>
        <button class="sidebar-item" data-section="settings" title="Settings">
          <i class="fa-light fa-sliders"></i>
          <span class="sidebar-label">Settings</span>
        </button>
      </div>
      <div class="sidebar-bottom">
        <div class="sidebar-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="#06B6D4" stroke-width="2" fill="none"/>
          <path d="M10 16 L14 20 L22 12" stroke="#06B6D4" stroke-width="2" fill="none" stroke-linecap="round"/></svg>
        </div>
      </div>
    </aside>
    <aside class="submenu-panel" id="submenuPanel">
      <div class="submenu-content" data-section="monitor">
        <h2 class="submenu-title">GHG Monitoring</h2>
        <nav class="submenu-nav">
          <a href="#" class="submenu-item active" data-view="estimations" onclick="event.preventDefault(); goEstimations();">Estimations</a>
        </nav>
      </div>
      <div class="submenu-content hidden" data-section="settings">
        <h2 class="submenu-title">Settings</h2>
        <nav class="submenu-nav">
          <a href="#" class="submenu-item" data-view="estimation-settings" onclick="event.preventDefault(); goEstimationSettings();">Estimation settings</a>
        </nav>
      </div>
    </aside>
    <div class="main-wrapper">
      <header class="app-header">
        <div class="header-left">
          <i class="fa-light fa-leaf header-app-icon"></i>
          <span class="header-app-name">Estimations prototype</span>
        </div>
        <div class="header-right">
          <button class="header-icon-btn" title="Help"><i class="fa-light fa-circle-question"></i></button>
          <button class="header-avatar" title="User"><img src="https://ui-avatars.com/api/?name=User&background=06B6D4&color=fff&size=32" alt=""></button>
        </div>
      </header>
      <main class="content-area">
        <div class="prototype-banner">Estimations · Estimation settings — export</div>
"""

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
      var banner = document.querySelector('.prototype-banner');
      var t = targetView.querySelector('.page-title');
      if (banner && t) banner.textContent = t.textContent.trim() + ' — export';
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
      window.__switchSection('monitor');
      switchView('estimations');
      var prevSection = 'monitor';
      document.querySelectorAll('.sidebar-item[data-section]').forEach(function(btn) {{
        btn.addEventListener('mousedown', function() {{
          var a = document.querySelector('.sidebar-item[data-section].active');
          prevSection = a ? a.getAttribute('data-section') : null;
        }});
        btn.addEventListener('click', function() {{
          var s = btn.getAttribute('data-section');
          setTimeout(function() {{
            if (s === prevSection) return;
            if (s === 'monitor') switchView('estimations');
            if (s === 'settings') switchView('estimation-settings');
          }}, 0);
        }});
      }});
    }});
  </script>
</body>
</html>
"""

(OUT / "index.html").write_text(html, encoding="utf-8")

readme = """# Estimations (Monitor) + Estimation settings (Settings)

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
"""
(OUT / "README.md").write_text(readme, encoding="utf-8")
print("Wrote", OUT)
