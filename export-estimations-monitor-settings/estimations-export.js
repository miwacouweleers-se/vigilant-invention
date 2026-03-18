// --- switchView ---

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
// --- estimations & routines (part 1) ---
function toggleEstimationsDataTypeMenu(ev) {
  ev.stopPropagation();
  var btn = document.getElementById('estimations-data-type-btn');
  var menu = document.getElementById('estimations-data-type-menu');
  if (!btn || !menu) return;
  var isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  if (isOpen) {
    setTimeout(function() { document.addEventListener('click', closeEstimationsDataTypeMenuOnClick); }, 0);
  } else {
    document.removeEventListener('click', closeEstimationsDataTypeMenuOnClick);
  }
}
function closeEstimationsDataTypeMenuOnClick(ev) {
  var btn = document.getElementById('estimations-data-type-btn');
  var menu = document.getElementById('estimations-data-type-menu');
  if (ev && ev.target && ((btn && btn.contains(ev.target)) || (menu && menu.contains(ev.target)))) return;
  if (menu) { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); }
  if (btn) btn.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', closeEstimationsDataTypeMenuOnClick);
}
function selectEstimationsDataType(type) {
  var label = document.getElementById('estimations-data-type-label');
  if (label) label.textContent = type;
  var menu = document.getElementById('estimations-data-type-menu');
  var btn = document.getElementById('estimations-data-type-btn');
  if (menu) { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); }
  if (btn) btn.setAttribute('aria-expanded', 'false');
  var option = menu ? menu.querySelector('.dropdown-item[data-type="' + type.replace(/"/g, '\\"') + '"]') : null;
  var summaryEl = document.getElementById('estimations-data-type-summary');
  if (summaryEl && option) {
    var gaps = option.getAttribute('data-gaps') || '0';
    var entities = option.getAttribute('data-entities') || '0';
    var g = parseInt(gaps, 10);
    var e = parseInt(entities, 10);
    summaryEl.textContent = g === 1 && e === 1 ? '1 gap across 1 business entity' : g === 1 ? '1 gap across ' + e + ' business entities' : e === 1 ? g + ' gaps across 1 business entity' : g + ' gaps across ' + e + ' business entities';
  }
  document.removeEventListener('click', closeEstimationsDataTypeMenuOnClick);
}
function toggleEstimationsGapFillingMenu(ev) {
  ev.stopPropagation();
  var btn = document.getElementById('estimations-gap-filling-btn');
  var menu = document.getElementById('estimations-gap-filling-menu');
  var otherMenu = document.getElementById('estimations-intensity-menu');
  if (otherMenu) otherMenu.classList.remove('open');
  if (document.getElementById('estimations-intensity-btn')) document.getElementById('estimations-intensity-btn').setAttribute('aria-expanded', 'false');
  closeEstimationsRoutinesMenu();
  if (!btn || !menu) return;
  var isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  if (isOpen) setTimeout(function() { document.addEventListener('click', closeEstimationsActionMenusOnClick); }, 0);
  else document.removeEventListener('click', closeEstimationsActionMenusOnClick);
}
function toggleEstimationsIntensityMenu(ev) {
  ev.stopPropagation();
  var btn = document.getElementById('estimations-intensity-btn');
  var menu = document.getElementById('estimations-intensity-menu');
  var otherMenu = document.getElementById('estimations-gap-filling-menu');
  if (otherMenu) otherMenu.classList.remove('open');
  if (document.getElementById('estimations-gap-filling-btn')) document.getElementById('estimations-gap-filling-btn').setAttribute('aria-expanded', 'false');
  closeEstimationsRoutinesMenu();
  if (!btn || !menu) return;
  var isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  if (isOpen) setTimeout(function() { document.addEventListener('click', closeEstimationsActionMenusOnClick); }, 0);
  else document.removeEventListener('click', closeEstimationsActionMenusOnClick);
}
function closeEstimationsGapFillingMenu() {
  var menu = document.getElementById('estimations-gap-filling-menu');
  var btn = document.getElementById('estimations-gap-filling-btn');
  if (menu) { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); }
  if (btn) btn.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', closeEstimationsActionMenusOnClick);
}
function closeEstimationsIntensityMenu() {
  var menu = document.getElementById('estimations-intensity-menu');
  var btn = document.getElementById('estimations-intensity-btn');
  if (menu) { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); }
  if (btn) btn.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', closeEstimationsActionMenusOnClick);
}
function toggleEstimationsRoutinesMenu(ev) {
  ev.stopPropagation();
  var btn = document.getElementById('estimations-routines-menu-btn');
  var menu = document.getElementById('estimations-routines-menu');
  var gapMenu = document.getElementById('estimations-gap-filling-menu');
  var intMenu = document.getElementById('estimations-intensity-menu');
  if (gapMenu) gapMenu.classList.remove('open');
  if (intMenu) intMenu.classList.remove('open');
  if (document.getElementById('estimations-gap-filling-btn')) document.getElementById('estimations-gap-filling-btn').setAttribute('aria-expanded', 'false');
  if (document.getElementById('estimations-intensity-btn')) document.getElementById('estimations-intensity-btn').setAttribute('aria-expanded', 'false');
  if (!btn || !menu) return;
  var isOpen = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  if (isOpen) setTimeout(function() { document.addEventListener('click', closeEstimationsActionMenusOnClick); }, 0);
  else document.removeEventListener('click', closeEstimationsActionMenusOnClick);
}
function closeEstimationsRoutinesMenu() {
  var menu = document.getElementById('estimations-routines-menu');
  var btn = document.getElementById('estimations-routines-menu-btn');
  if (menu) { menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true'); }
  if (btn) btn.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', closeEstimationsActionMenusOnClick);
}
function estimationsRoutinesAction(action) {
  var baseUrl = location.href.split('#')[0];
  if (action === 'edit-gap-filling' || action === 'edit-intensity') {
    window.open(baseUrl + '#estimation-settings-routines', '_blank');
  } else if (action === 'past-reports') {
    window.open(baseUrl + '#estimation-settings-reports', '_blank');
  } else if (action === 'add-entity-details-intensity') { /* Navigate or open add entity details for intensity */ }
}
function closeEstimationsActionMenusOnClick(ev) {
  var gapBtn = document.getElementById('estimations-gap-filling-btn');
  var gapMenu = document.getElementById('estimations-gap-filling-menu');
  var intBtn = document.getElementById('estimations-intensity-btn');
  var intMenu = document.getElementById('estimations-intensity-menu');
  var routinesBtn = document.getElementById('estimations-routines-menu-btn');
  var routinesMenu = document.getElementById('estimations-routines-menu');
  if (ev && ev.target && ((gapBtn && gapBtn.contains(ev.target)) || (gapMenu && gapMenu.contains(ev.target)) || (intBtn && intBtn.contains(ev.target)) || (intMenu && intMenu.contains(ev.target)) || (routinesBtn && routinesBtn.contains(ev.target)) || (routinesMenu && routinesMenu.contains(ev.target)))) return;
  closeEstimationsGapFillingMenu();
  closeEstimationsIntensityMenu();
  closeEstimationsRoutinesMenu();
}
function runEstimationsOption(kind, optionName) {
  var dataType = document.getElementById('estimations-data-type-label');
  var typeLabel = dataType ? dataType.textContent : '';
  if (kind === 'gap-filling') { /* Run gap filling with optionName for typeLabel */ }
  if (kind === 'intensity') { /* Run intensity estimation with optionName for typeLabel */ }
}
function openRunElectricityEstimationModal() {
  var backdrop = document.getElementById('run-estimation-backdrop');
  var modal = document.getElementById('run-estimation-modal');
  if (backdrop) backdrop.classList.add('open');
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeRunElectricityEstimationModal() {
  var backdrop = document.getElementById('run-estimation-backdrop');
  var modal = document.getElementById('run-estimation-modal');
  if (backdrop) backdrop.classList.remove('open');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}
function toggleRunEstimationCard(id) {
  var card = document.getElementById('run-estimation-card-' + id);
  var toggle = document.getElementById('run-estimation-toggle-' + id);
  if (!card || !toggle) return;
  var collapsed = card.classList.toggle('collapsed');
  toggle.innerHTML = collapsed ? 'More <i class="fa-light fa-chevron-down"></i>' : 'Less <i class="fa-light fa-chevron-up"></i>';
}
function toggleRunEstimationIntensityDropdown() {
  var cb = document.getElementById('run-estimation-intensity-checkbox');
  var wrap = document.getElementById('run-estimation-intensity-dropdown-wrap');
  if (!wrap) return;
  wrap.hidden = !cb || !cb.checked;
  if (wrap.hidden) {
    var select = document.getElementById('run-estimation-intensity-routine');
    if (select) select.value = '';
  }
}
var gapFillingProgressInterval = null;
var gapFillingProgressPercent = 15;
var gapFillingProgressMinsLeft = 105;
function startGapFillingRoutine() {
  closeRunElectricityEstimationModal();
  var backdrop = document.getElementById('gap-filling-progress-backdrop');
  if (backdrop) backdrop.classList.add('open');
  gapFillingProgressPercent = 15;
  gapFillingProgressMinsLeft = 105;
  updateGapFillingProgressUI();
  gapFillingProgressInterval = setInterval(function() {
    gapFillingProgressPercent += 2;
    if (gapFillingProgressMinsLeft > 0) gapFillingProgressMinsLeft -= 2;
    updateGapFillingProgressUI();
    if (gapFillingProgressPercent >= 100) completeGapFillingRoutine();
  }, 800);
}
function updateGapFillingProgressUI() {
  var fill = document.getElementById('gap-filling-progress-fill');
  var time = document.getElementById('gap-filling-progress-time');
  if (fill) fill.style.width = Math.min(gapFillingProgressPercent, 100) + '%';
  if (time) {
    if (gapFillingProgressMinsLeft <= 0) time.textContent = 'Almost done...';
    else if (gapFillingProgressMinsLeft < 60) time.textContent = 'About ' + gapFillingProgressMinsLeft + ' min remaining';
    else time.textContent = 'About ' + Math.floor(gapFillingProgressMinsLeft / 60) + ' hour' + (Math.floor(gapFillingProgressMinsLeft / 60) === 1 ? '' : 's') + ' ' + (gapFillingProgressMinsLeft % 60) + ' min remaining';
  }
}
function skipGapFillingToEnd() {
  if (gapFillingProgressInterval) { clearInterval(gapFillingProgressInterval); gapFillingProgressInterval = null; }
  gapFillingProgressPercent = 100;
  gapFillingProgressMinsLeft = 0;
  updateGapFillingProgressUI();
  completeGapFillingRoutine();
}
function completeGapFillingRoutine() {
  if (gapFillingProgressInterval) { clearInterval(gapFillingProgressInterval); gapFillingProgressInterval = null; }
  var backdrop = document.getElementById('gap-filling-progress-backdrop');
  if (backdrop) backdrop.classList.remove('open');
  applyGapFillingResults();
  showToast('Gap filling complete. Some gaps were filled; others could not be filled and need manual entry.', 'success');
}
var GAP_FILL_METHODS = [
  'Value from same month of prior year (max 2 years prior)',
  'Average value of surrounding months (+/- 2 months)',
  'Average value from past 6 months'
];
var UNFILLED_REASONS = [
  'No prior data available',
  'Insufficient history for estimation',
  'No matching method could be applied'
];
function ensureEstimationsTableGapsStyled() {
  var table = document.getElementById('estimations-table');
  if (!table) return;
  var numericCells = table.querySelectorAll('tbody td.numeric');
  numericCells.forEach(function(td) {
    if (td.classList.contains('estimations-cell-warning') || td.classList.contains('estimations-cell-filled') || td.classList.contains('estimations-cell-unfilled') || td.classList.contains('estimations-cell-approved')) return;
    var text = (td.textContent || '').trim();
    if (text !== '') return;
    td.classList.add('estimations-cell-warning');
    td.setAttribute('data-gap-days', '4');
    td.setAttribute('title', 'No data — entire month has no data');
    td.innerHTML = '<span class="estimations-warning-icon" aria-hidden="true"><i class="fa-solid fa-triangle-exclamation"></i></span> No data';
  });
}
function applyGapFillingResults() {
  var table = document.getElementById('estimations-table');
  if (!table) return;
  var warningCells = table.querySelectorAll('tbody td.numeric.estimations-cell-warning');
  var idx = 0;
  warningCells.forEach(function(td) {
    idx++;
    var useFilled = (idx % 5) !== 0;
    if (useFilled) {
      td.classList.remove('estimations-cell-warning', 'estimations-cell-unfilled');
      td.classList.add('estimations-cell-filled');
      var method = GAP_FILL_METHODS[(idx - 1) % GAP_FILL_METHODS.length];
      td.setAttribute('data-fill-method', method);
      td.removeAttribute('data-unfilled-reason');
      var num = (280 + (idx * 37) % 200).toFixed(1);
      var icon = td.querySelector('.estimations-warning-icon');
      if (icon) icon.className = 'estimations-filled-icon';
      else icon = null;
      td.innerHTML = '';
      var iconSpan = document.createElement('span');
      iconSpan.className = 'estimations-filled-icon';
      iconSpan.setAttribute('aria-hidden', 'true');
      iconSpan.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      td.appendChild(iconSpan);
      td.appendChild(document.createTextNode(' ' + num));
      td.title = 'Filled: ' + method;
    } else {
      td.classList.remove('estimations-cell-warning', 'estimations-cell-filled');
      td.classList.add('estimations-cell-unfilled');
      var reason = UNFILLED_REASONS[(idx - 1) % UNFILLED_REASONS.length];
      td.setAttribute('data-unfilled-reason', reason);
      td.removeAttribute('data-fill-method');
      td.innerHTML = '';
      var iconSpanU = document.createElement('span');
      iconSpanU.className = 'estimations-unfilled-icon';
      iconSpanU.setAttribute('aria-hidden', 'true');
      iconSpanU.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
      td.appendChild(iconSpanU);
      td.appendChild(document.createTextNode(' Unable to fill'));
      td.title = 'Unable to fill: ' + reason;
    }
  });
}
function showToast(message, type) {
  type = type || 'success';
  var container = document.getElementById('toast-container');
  if (!container) return;
  var toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.setAttribute('role', 'status');
  toast.innerHTML = '<span class="toast-icon"><i class="fa-solid fa-circle-check"></i></span><span>' + (message || 'Done') + '</span>';
  container.appendChild(toast);
  setTimeout(function() {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 6000);
}
document.addEventListener('DOMContentLoaded', function() {
  ensureEstimationsTableGapsStyled();
});
function openCreateEstimationsPreset(kind) {
  if (kind === 'gap-filling') { openCreateRoutineModal(); }
  if (kind === 'intensity') { /* Open create intensity preset modal/wizard */ }
}
function openCreateRoutineModal() {
  var backdrop = document.getElementById('create-routine-backdrop');
  var modal = document.getElementById('create-routine-modal');
  if (backdrop) backdrop.classList.add('open');
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  createRoutineDetailsChange();
}
function closeCreateRoutineModal() {
  var backdrop = document.getElementById('create-routine-backdrop');
  var modal = document.getElementById('create-routine-modal');
  if (backdrop) backdrop.classList.remove('open');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}
function createRoutineDetailsChange() {
  var scope = document.getElementById('create-routine-scope');
  var activity = document.getElementById('create-routine-activity');
  var empty = document.getElementById('create-routine-sites-empty');
  var content = document.getElementById('create-routine-sites-content');
  var hasSelection = (scope && scope.value) && (activity && activity.value);
  if (empty) empty.style.display = hasSelection ? 'none' : 'block';
  if (content) content.style.display = hasSelection ? 'block' : 'none';
}
function toggleCreateRoutineEntityRow(btn) {
  var tr = btn.closest('tr');
  if (!tr) return;
  var expanded = btn.getAttribute('aria-expanded') === 'true';
  var next = tr.nextElementSibling;
  while (next && next.classList.contains('create-routine-site-subrow')) {
    next.style.display = expanded ? 'none' : 'table-row';
    next = next.nextElementSibling;
  }
  btn.classList.toggle('expanded', !expanded);
  btn.setAttribute('aria-expanded', !expanded);
}
function toggleCreateRoutineEntitiesSelectAll() {
  var master = document.getElementById('create-routine-sites-select-all');
  var checkboxes = document.querySelectorAll('.create-routine-site-cb');
  if (!master) return;
  checkboxes.forEach(function(cb) { cb.checked = master.checked; });
}
function toggleCreateRoutineMethod(el) {
  var isOn = el.classList.toggle('on');
  el.setAttribute('aria-pressed', isOn);
  var row = el.closest('.create-routine-method-row');
  if (row) {
    var badge = row.querySelector('.create-routine-method-badge');
    if (badge) {
      badge.textContent = isOn ? 'Included' : 'Excluded';
      badge.classList.toggle('included', isOn);
      badge.classList.toggle('excluded', !isOn);
    }
  }
}
var createRoutineMethodDragSource = null;
function createRoutineMethodDragStart(ev) {
  createRoutineMethodDragSource = ev.currentTarget;
  ev.currentTarget.classList.add('dragging');
  ev.dataTransfer.effectAllowed = 'move';
  ev.dataTransfer.setData('text/plain', '');
  ev.dataTransfer.setDragImage(ev.currentTarget, 0, 0);
}
function createRoutineMethodDragOver(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
  var row = ev.currentTarget;
  if (row !== createRoutineMethodDragSource) row.classList.add('drag-over');
}
function createRoutineMethodDragLeave(ev) {
  ev.currentTarget.classList.remove('drag-over');
}
function createRoutineMethodDrop(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.remove('drag-over');
  var list = document.getElementById('create-routine-methods-list');
  var target = ev.currentTarget;
  if (!list || !createRoutineMethodDragSource || createRoutineMethodDragSource === target) return;
  if (createRoutineMethodDragSource.nextSibling === target) return;
  list.insertBefore(createRoutineMethodDragSource, target);
}
function createRoutineMethodDragEnd(ev) {
  ev.currentTarget.classList.remove('dragging');
  document.querySelectorAll('.create-routine-method-row.drag-over').forEach(function(r) { r.classList.remove('drag-over'); });
  createRoutineMethodDragSource = null;
}
function createRoutineSegmented(btn, value) {
  var group = btn.closest('.create-routine-segmented');
  if (!group) return;
  group.querySelectorAll('button').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
}
function saveCreateRoutine() {
  closeCreateRoutineModal();
  openRoutineSavedConfirm('Routine saved');
}
function saveCreateRoutineDraft() {
  closeCreateRoutineModal();
  openRoutineSavedConfirm('Routine saved as draft');
}
function openCreateIntensityRoutineModal() {
  var backdrop = document.getElementById('create-intensity-routine-backdrop');
  var modal = document.getElementById('create-intensity-routine-modal');
  if (backdrop) backdrop.classList.add('open');
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  createIntensityRoutineDetailsChange();
}
function closeCreateIntensityRoutineModal() {
  var backdrop = document.getElementById('create-intensity-routine-backdrop');
  var modal = document.getElementById('create-intensity-routine-modal');
  if (backdrop) backdrop.classList.remove('open');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}
function createIntensityRoutineDetailsChange() {
  var scope = document.getElementById('create-intensity-scope');
  var activity = document.getElementById('create-intensity-activity');
  var empty = document.getElementById('create-intensity-sites-empty');
  var content = document.getElementById('create-intensity-sites-content');
  var hasSelection = (scope && scope.value) && (activity && activity.value);
  if (empty) empty.style.display = hasSelection ? 'none' : 'block';
  if (content) content.style.display = hasSelection ? 'block' : 'none';
}
function toggleCreateIntensityEntitiesSelectAll() {
  var master = document.getElementById('create-intensity-sites-select-all');
  var checkboxes = document.querySelectorAll('#create-intensity-routine-modal .create-intensity-site-cb');
  if (!master) return;
  checkboxes.forEach(function(cb) { cb.checked = master.checked; });
}
function saveCreateIntensityRoutine() {
  closeCreateIntensityRoutineModal();
  openRoutineSavedConfirm('Routine saved');
}
function saveCreateIntensityRoutineDraft() {
  closeCreateIntensityRoutineModal();
  openRoutineSavedConfirm('Routine saved as draft');
}
function openRoutineSavedConfirm(title) {
  var backdrop = document.getElementById('routine-saved-confirm-backdrop');
  var modal = document.getElementById('routine-saved-confirm-modal');
  var titleEl = document.getElementById('routine-saved-confirm-title');
  if (titleEl) titleEl.textContent = title || 'Routine saved';
  if (backdrop) backdrop.classList.add('open');
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeRoutineSavedConfirm() {
  var backdrop = document.getElementById('routine-saved-confirm-backdrop');
  var modal = document.getElementById('routine-saved-confirm-modal');
  if (backdrop) backdrop.classList.remove('open');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}
// --- add intensity model wizard ---
var addIntensityModelWizardStep = 1;
var addIntensityModelWizardTotalSteps = 7;
function openAddIntensityModelWizard() {
  addIntensityModelWizardStep = 1;
  setAddIntensityModelWizardStep(1);
  var backdrop = document.getElementById('add-intensity-model-wizard-backdrop');
  var modal = document.getElementById('add-intensity-model-wizard-modal');
  if (backdrop) backdrop.classList.add('open');
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeAddIntensityModelWizard() {
  var backdrop = document.getElementById('add-intensity-model-wizard-backdrop');
  var modal = document.getElementById('add-intensity-model-wizard-modal');
  if (backdrop) backdrop.classList.remove('open');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}
var addIntensityUomConfig = {
  'Electric power': { label: 'Electric Power', options: [{ v: 'kWh', t: 'kWh' }, { v: 'MWh', t: 'MWh' }, { v: 'GJ', t: 'GJ' }], default: 'kWh' },
  'Natural gas': { label: 'Natural gas (therms, kWh, m³)', options: [{ v: 'therms', t: 'therms' }, { v: 'kWh', t: 'kWh' }, { v: 'm3', t: 'm³' }, { v: 'cf', t: 'cf' }], default: 'therms' },
  'District heating / cooling': { label: 'District heating / cooling', options: [{ v: 'kWh', t: 'kWh' }, { v: 'GJ', t: 'GJ' }, { v: 'MMBtu', t: 'MMBtu' }], default: 'kWh' },
  'Fuel oil': { label: 'Fuel oil (gallons, liters)', options: [{ v: 'gallons', t: 'gallons' }, { v: 'liters', t: 'liters' }], default: 'gallons' },
  'Fleet / Diesel': { label: 'Diesel (gallons, liters)', options: [{ v: 'gallons', t: 'gallons' }, { v: 'liters', t: 'liters' }], default: 'gallons' },
  'Fleet / Gasoline': { label: 'Gasoline (gallons, liters)', options: [{ v: 'gallons', t: 'gallons' }, { v: 'liters', t: 'liters' }], default: 'gallons' },
  'Refrigerants': { label: 'Refrigerants', options: [{ v: 'kg', t: 'kg' }, { v: 'lbs', t: 'lbs' }, { v: 'MT', t: 'MT' }], default: 'kg' },
  'Business travel': { label: 'Business travel', options: [{ v: 'km', t: 'km' }, { v: 'miles', t: 'miles' }], default: 'miles' },
  'Employee commuting': { label: 'Employee commuting', options: [{ v: 'km', t: 'km' }, { v: 'miles', t: 'miles' }], default: 'miles' },
  'Waste': { label: 'Waste', options: [{ v: 'kg', t: 'kg' }, { v: 'tons', t: 'tons' }, { v: 'MT', t: 'MT' }], default: 'kg' }
};
function buildAddIntensityUomList() {
  var panel = document.getElementById('add-intensity-data-types-panel');
  var listEl = document.getElementById('add-intensity-uom-list');
  if (!panel || !listEl) return;
  var selected = [];
  panel.querySelectorAll('input[type="checkbox"]:checked').forEach(function(cb) { selected.push(cb.value); });
  var html = '';
  selected.forEach(function(dataType) {
    var cfg = addIntensityUomConfig[dataType];
    if (!cfg) cfg = { label: dataType, options: [{ v: '—', t: '—' }], default: '—' };
    var opts = cfg.options.map(function(o) { return '<option value="' + o.v + '"' + (o.v === cfg.default ? ' selected' : '') + '>' + o.t + '</option>'; }).join('');
    html += '<div class="add-intensity-uom-row" data-dtype="' + dataType.replace(/"/g, '&quot;') + '" data-label="' + (cfg.label || dataType).toLowerCase() + '"><span class="add-intensity-uom-row-label">' + (cfg.label || dataType) + '</span><select class="form-select add-intensity-uom-select" aria-label="Unit for ' + (cfg.label || dataType) + '">' + opts + '</select></div>';
  });
  listEl.innerHTML = html || '<p class="add-intensity-uom-empty" style="color: var(--ghg-text-muted); font-size: 14px; margin: 0;">Select data types on the Intensity step to see unit options here.</p>';
  filterAddIntensityUomBySearch();
}
function filterAddIntensityUomBySearch() {
  var q = (document.getElementById('add-intensity-uom-search') && document.getElementById('add-intensity-uom-search').value || '').toLowerCase();
  var listEl = document.getElementById('add-intensity-uom-list');
  if (!listEl) return;
  listEl.querySelectorAll('.add-intensity-uom-row').forEach(function(row) {
    var label = (row.getAttribute('data-label') || '').toLowerCase();
    var show = !q || label.indexOf(q) !== -1 || (row.querySelector('select') && row.querySelector('select').selectedOptions[0] && row.querySelector('select').selectedOptions[0].text.toLowerCase().indexOf(q) !== -1);
    row.style.display = show ? '' : 'none';
  });
}
function setAddIntensityModelWizardStep(step) {
  addIntensityModelWizardStep = step;
  if (step === 3) buildAddIntensityUomList();
  var stepper = document.getElementById('add-intensity-model-wizard-stepper');
  if (stepper) {
    stepper.querySelectorAll('.wizard-step').forEach(function(el) {
      var n = parseInt(el.getAttribute('data-step'), 10);
      el.classList.remove('active', 'completed');
      if (n === step) el.classList.add('active');
      else if (n < step) el.classList.add('completed');
    });
    stepper.querySelectorAll('.step-connector').forEach(function(conn, i) {
      conn.classList.toggle('completed', i < step - 1);
    });
  }
  document.querySelectorAll('#add-intensity-model-wizard-modal .wizard-step-content').forEach(function(el) {
    el.classList.toggle('active', parseInt(el.getAttribute('data-step'), 10) === step);
  });
  var backBtn = document.getElementById('add-intensity-model-wizard-back-btn');
  var nextBtn = document.getElementById('add-intensity-model-wizard-next-btn');
  var createBtn = document.getElementById('add-intensity-model-wizard-create-btn');
  if (backBtn) backBtn.style.display = step === 1 ? 'none' : 'inline-flex';
  if (nextBtn) nextBtn.style.display = step === addIntensityModelWizardTotalSteps ? 'none' : 'inline-flex';
  if (createBtn) createBtn.style.display = step === addIntensityModelWizardTotalSteps ? 'inline-flex' : 'none';
  var previewEl = document.getElementById('add-intensity-dataset-preview-persistent');
  if (previewEl) previewEl.style.display = (step >= 3 && step <= 7) ? 'block' : 'none';
  if (step < 3 || step > 7) closeIntensityColumnsPanel();
  if (step === 6) updateAggregationMatrixCounts();
  if (step === 7) buildReviewStepAggregationSummary();
}
function buildReviewStepAggregationSummary() {
  var tbody = document.getElementById('add-intensity-review-aggregation-tbody');
  if (!tbody) return;
  var rows = [];
  for (var ri = 0; ri < 3; ri++) {
    var rowSel = document.getElementById('add-intensity-matrix-row-' + ri);
    var primaryVal = rowSel && rowSel.value ? rowSel.value : '';
    var primaryLabel = primaryVal && rowSel.selectedOptions[0] ? rowSel.selectedOptions[0].text : '';
    for (var ci = 0; ci < 3; ci++) {
      var colSel = document.getElementById('add-intensity-matrix-col-' + ci);
      var secondaryVal = colSel && colSel.value ? colSel.value : '';
      var secondaryLabel = secondaryVal && colSel.selectedOptions[0] ? colSel.selectedOptions[0].text : '';
      if (!primaryVal || !secondaryVal) continue;
      var countEl = document.getElementById('agg-cell-' + ri + '-' + ci);
      var countText = countEl ? countEl.textContent : '— entities';
      var seed = (primaryVal + '-' + secondaryVal + '-' + ri + '-' + ci).split('').reduce(function(a, b) { return ((a << 5) - a) + b.charCodeAt(0); }, 0);
      var intensityNum = (Math.abs(seed % 100) / 100 + 0.15).toFixed(2);
      rows.push({ primary: primaryLabel, secondary: secondaryLabel, entities: countText, intensity: intensityNum + ' kWh/sq ft' });
    }
  }
  var html = '';
  if (rows.length === 0) {
    html = '<tr><td colspan="4" style="color: var(--ghg-text-muted);">Go to the Aggregation step and select primary and secondary attributes for each row and column to see intensity values by group.</td></tr>';
  } else {
    rows.forEach(function(r) {
      html += '<tr><td>' + (r.primary || '—').replace(/</g, '&lt;') + '</td><td>' + (r.secondary || '—').replace(/</g, '&lt;') + '</td><td>' + (r.entities || '—').replace(/</g, '&lt;') + '</td><td>' + (r.intensity || '—').replace(/</g, '&lt;') + '</td></tr>';
    });
  }
  tbody.innerHTML = html;
}
function applySeraChoicesAndExplanations() {
  var primaryLabels = { global: 'Global', region: 'Region', country: 'Country', state: 'State' };
  var secondaryLabels = { storage: 'Storage', warehouse: 'Warehouse', office: 'Office', retail: 'Retail', outlet: 'Outlet', distribution: 'Distribution', showroom: 'Showroom', 'data-center': 'Data center' };
  var seraPrimary = ['country', 'region', 'global'];
  var seraSecondary = ['office', 'retail', 'warehouse'];
  var primaryReasons = {
    country: 'Most granular geographic level in your data; improves estimate accuracy for location-specific intensity.',
    region: 'Good balance between granularity and sample size for regional patterns.',
    global: 'Fallback when fewer entities are available; ensures coverage for all groups.'
  };
  var secondaryReasons = {
    office: 'Strong representation in your inventory; reliable intensity estimates.',
    retail: 'Common facility type with consistent reporting; good for aggregation.',
    warehouse: 'High coverage in the dataset; suitable as a secondary dimension.'
  };
  var r, c, val;
  for (r = 0; r < 3; r++) {
    var rowSel = document.getElementById('add-intensity-matrix-row-' + r);
    if (rowSel) {
      rowSel.value = seraPrimary[r];
      rowSel.title = primaryReasons[seraPrimary[r]] || '';
    }
  }
  for (c = 0; c < 3; c++) {
    var colSel = document.getElementById('add-intensity-matrix-col-' + c);
    if (colSel) {
      colSel.value = seraSecondary[c];
      colSel.title = secondaryReasons[seraSecondary[c]] || '';
    }
  }
  updateAggregationMatrixCounts();
  var listEl = document.getElementById('add-intensity-sera-explain-popover-list');
  if (listEl) {
    var html = '';
    html += '<div class="sera-explain-popover-section-title">Primary attributes</div>';
    for (r = 0; r < 3; r++) {
      val = seraPrimary[r];
      html += '<div class="add-intensity-attribute-explanation-item"><strong>Primary ' + (r + 1) + ': ' + (primaryLabels[val] || val) + '</strong> — ' + (primaryReasons[val] || 'Recommended for this aggregation level.') + '</div>';
    }
    html += '<div class="sera-explain-popover-section-title">Secondary attributes</div>';
    for (c = 0; c < 3; c++) {
      val = seraSecondary[c];
      html += '<div class="add-intensity-attribute-explanation-item"><strong>Secondary ' + (c + 1) + ': ' + (secondaryLabels[val] || val) + '</strong> — ' + (secondaryReasons[val] || 'Recommended for this dimension.') + '</div>';
    }
    listEl.innerHTML = html;
  }
}
function fillAggregationWithSera() {
  var initial = document.querySelector('#add-intensity-sera-toolbar .sera-toolbar-initial');
  var thinking = document.getElementById('add-intensity-sera-thinking');
  var actions = document.getElementById('add-intensity-sera-actions');
  if (initial) initial.classList.add('hidden');
  if (thinking) thinking.classList.remove('hidden');
  if (actions) actions.classList.add('hidden');
  window.setTimeout(function() {
    applySeraChoicesAndExplanations();
    if (thinking) thinking.classList.add('hidden');
    if (actions) actions.classList.remove('hidden');
  }, 1500);
}
function tryAgainSera() {
  var thinking = document.getElementById('add-intensity-sera-thinking');
  var actions = document.getElementById('add-intensity-sera-actions');
  if (actions) actions.classList.add('hidden');
  if (thinking) thinking.classList.remove('hidden');
  var popover = document.getElementById('add-intensity-sera-explain-popover');
  if (popover) popover.classList.add('hidden');
  window.setTimeout(function() {
    applySeraChoicesAndExplanations();
    if (thinking) thinking.classList.add('hidden');
    if (actions) actions.classList.remove('hidden');
  }, 1500);
}
function positionSeraExplainPopover() {
  var popover = document.getElementById('add-intensity-sera-explain-popover');
  var btn = document.getElementById('add-intensity-sera-explain-btn');
  var caret = document.getElementById('add-intensity-sera-explain-popover-caret');
  if (!popover || !btn || popover.classList.contains('hidden')) return;
  var rect = btn.getBoundingClientRect();
  var popoverWidth = 360;
  var popoverLeft = rect.right - popoverWidth;
  var popoverTop = rect.bottom + 6;
  popover.style.top = popoverTop + 'px';
  popover.style.left = popoverLeft + 'px';
  if (caret) {
    var caretCenter = rect.left + rect.width / 2 - popoverLeft;
    caret.style.left = (caretCenter - 7) + 'px';
    caret.style.marginLeft = '0';
  }
}
function toggleSeraExplainPopover(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  var popover = document.getElementById('add-intensity-sera-explain-popover');
  var btn = document.getElementById('add-intensity-sera-explain-btn');
  var scrollEl = document.querySelector('.add-intensity-model-wizard-content-wrap');
  if (!popover) return;
  var isOpen = !popover.classList.contains('hidden');
  if (isOpen) {
    popover.classList.add('hidden');
    popover.style.top = '';
    popover.style.left = '';
    var caret = document.getElementById('add-intensity-sera-explain-popover-caret');
    if (caret) { caret.style.left = ''; caret.style.marginLeft = ''; }
    document.removeEventListener('click', closeSeraExplainPopover);
    if (scrollEl) scrollEl.removeEventListener('scroll', positionSeraExplainPopover);
  } else {
    positionSeraExplainPopover();
    popover.classList.remove('hidden');
    document.addEventListener('click', closeSeraExplainPopover);
    if (scrollEl) scrollEl.addEventListener('scroll', positionSeraExplainPopover);
  }
}
function closeSeraExplainPopover(ev) {
  var popover = document.getElementById('add-intensity-sera-explain-popover');
  var btn = document.getElementById('add-intensity-sera-explain-btn');
  var scrollEl = document.querySelector('.add-intensity-model-wizard-content-wrap');
  if (popover && !popover.contains(ev.target) && btn && !btn.contains(ev.target)) {
    popover.classList.add('hidden');
    popover.style.top = '';
    popover.style.left = '';
    var caret = document.getElementById('add-intensity-sera-explain-popover-caret');
    if (caret) { caret.style.left = ''; caret.style.marginLeft = ''; }
    document.removeEventListener('click', closeSeraExplainPopover);
    if (scrollEl) scrollEl.removeEventListener('scroll', positionSeraExplainPopover);
  }
}
function updateAggregationMatrixCounts() {
  var primaryGranularity = { global: 0, region: 1, country: 2, state: 3 };
  var secondaryGranularity = { storage: 0, warehouse: 1, office: 2, retail: 3, outlet: 4, distribution: 5, showroom: 6, 'data-center': 7 };
  var rowVals = [];
  var colVals = [];
  for (var r = 0; r < 3; r++) {
    var sel = document.getElementById('add-intensity-matrix-row-' + r);
    rowVals[r] = sel && sel.value ? sel.value : '';
  }
  for (var c = 0; c < 3; c++) {
    var sel = document.getElementById('add-intensity-matrix-col-' + c);
    colVals[c] = sel && sel.value ? sel.value : '';
  }
  var anySelected = rowVals.some(function(v) { return v; }) && colVals.some(function(v) { return v; });
  for (var ri = 0; ri < 3; ri++) {
    for (var ci = 0; ci < 3; ci++) {
      var spanEl = document.getElementById('agg-cell-' + ri + '-' + ci);
      if (!spanEl) continue;
      var cellDiv = spanEl.closest('.matrix-cell');
      if (cellDiv) {
        cellDiv.classList.remove('matrix-cell-unfilled', 'matrix-cell-quality-0', 'matrix-cell-quality-1', 'matrix-cell-quality-2', 'matrix-cell-quality-3', 'matrix-cell-quality-4');
        if (!anySelected || !rowVals[ri] || !colVals[ci]) {
          cellDiv.classList.add('matrix-cell-unfilled');
        } else {
          var pScore = primaryGranularity[rowVals[ri]] !== undefined ? primaryGranularity[rowVals[ri]] : 0;
          var sScore = secondaryGranularity[colVals[ci]] !== undefined ? secondaryGranularity[colVals[ci]] : 0;
          var total = pScore + sScore;
          var quality = Math.min(4, Math.floor(total * 5 / 11));
          cellDiv.classList.add('matrix-cell-quality-' + quality);
        }
      }
      if (!anySelected || !rowVals[ri] || !colVals[ci]) {
        spanEl.textContent = '— entities';
        spanEl.classList.add('empty');
        continue;
      }
      var seed = (rowVals[ri] + '-' + colVals[ci] + '-' + ri + '-' + ci).split('').reduce(function(a, b) { return ((a << 5) - a) + b.charCodeAt(0); }, 0);
      var count = Math.abs(seed % 480) + 12;
      spanEl.textContent = count + ' entities';
      spanEl.classList.remove('empty');
    }
  }
}
function handleIntensityColumnDragstart(ev) {
  var row = ev.target.closest('.add-intensity-columns-row');
  if (!row) return;
  row.classList.add('dragging');
  var list = document.getElementById('add-intensity-columns-list');
  if (!list) return;
  var idx = Array.prototype.indexOf.call(list.children, row);
  ev.dataTransfer.setData('text/plain', String(idx));
  ev.dataTransfer.effectAllowed = 'move';
}
function handleIntensityColumnDragover(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = 'move';
}
function handleIntensityColumnDrop(ev) {
  ev.preventDefault();
  var list = document.getElementById('add-intensity-columns-list');
  if (!list) return;
  var fromIdx = parseInt(ev.dataTransfer.getData('text/plain'), 10);
  var toRow = ev.target.closest('.add-intensity-columns-row');
  if (!toRow || toRow.parentNode !== list) return;
  var fromRow = list.children[fromIdx];
  if (!fromRow || fromRow === toRow) return;
  list.insertBefore(fromRow, toRow);
}
function handleIntensityColumnDragend(ev) {
  var row = ev.target.closest('.add-intensity-columns-row');
  if (row) row.classList.remove('dragging');
}
function closeIntensityColumnsPanel() {
  var dd = document.getElementById('add-intensity-columns-dropdown');
  if (!dd) return;
  dd.classList.remove('open');
  var btn = dd.querySelector('.add-intensity-columns-btn');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  document.removeEventListener('click', closeIntensityColumnsPanelOnClick);
}
function closeIntensityColumnsPanelOnClick(ev) {
  var dd = document.getElementById('add-intensity-columns-dropdown');
  if (dd && !dd.contains(ev.target)) closeIntensityColumnsPanel();
}
function toggleIntensityColumnsPanel(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  var dd = document.getElementById('add-intensity-columns-dropdown');
  var btn = dd && dd.querySelector('.add-intensity-columns-btn');
  if (!dd || !btn) return;
  var isOpen = dd.classList.contains('open');
  if (isOpen) {
    closeIntensityColumnsPanel();
  } else {
    dd.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    setTimeout(function() { document.addEventListener('click', closeIntensityColumnsPanelOnClick); }, 0);
  }
}
function applyIntensityDatasetColumns() {
  var list = document.getElementById('add-intensity-columns-list');
  if (!list) return;
  var rows = list.querySelectorAll('.add-intensity-columns-row');
  var order = [];
  var visibility = [];
  for (var r = 0; r < rows.length; r++) {
    var cb = rows[r].querySelector('input[type="checkbox"][data-col-index]');
    if (cb) {
      order.push(parseInt(cb.getAttribute('data-col-index'), 10));
      visibility.push(cb.checked);
    }
  }
  var tables = document.querySelectorAll('#add-intensity-dataset-preview-persistent .add-intensity-dataset-preview-table');
  tables.forEach(function(table) {
    var headerRow = table.querySelector('thead tr');
    var bodyRows = table.querySelectorAll('tbody tr');
    var ths = headerRow ? Array.prototype.slice.call(headerRow.querySelectorAll('th')) : [];
    if (ths.length && !ths[0].getAttribute('data-col-index')) {
      ths.forEach(function(th, i) { th.setAttribute('data-col-index', String(i)); });
      bodyRows.forEach(function(tr) {
        var tds = tr.querySelectorAll('td');
        for (var k = 0; k < tds.length; k++) tds[k].setAttribute('data-col-index', String(k));
      });
    }
    var thsByIdx = {};
    ths.forEach(function(th) { thsByIdx[parseInt(th.getAttribute('data-col-index'), 10)] = th; });
    if (headerRow && ths.length === 31) {
      while (headerRow.firstChild) headerRow.removeChild(headerRow.firstChild);
      for (var i = 0; i < order.length; i++) {
        var th = thsByIdx[order[i]];
        if (th) { headerRow.appendChild(th); th.style.display = visibility[i] ? '' : 'none'; }
      }
    }
    bodyRows.forEach(function(tr) {
      var tds = tr.querySelectorAll('td');
      var tdsByIdx = {};
      for (var t = 0; t < tds.length; t++) tdsByIdx[parseInt(tds[t].getAttribute('data-col-index'), 10)] = tds[t];
      if (tds.length === 31) {
        while (tr.firstChild) tr.removeChild(tr.firstChild);
        for (var j = 0; j < order.length; j++) {
          var td = tdsByIdx[order[j]];
          if (td) { tr.appendChild(td); td.style.display = visibility[j] ? '' : 'none'; }
        }
      }
    });
  });
  closeIntensityColumnsPanel();
}
function resetIntensityDatasetColumns() {
  var list = document.getElementById('add-intensity-columns-list');
  if (!list) return;
  var rows = Array.prototype.slice.call(list.querySelectorAll('.add-intensity-columns-row'));
  rows.sort(function(a, b) {
    var ai = parseInt(a.querySelector('input[data-col-index]').getAttribute('data-col-index'), 10);
    var bi = parseInt(b.querySelector('input[data-col-index]').getAttribute('data-col-index'), 10);
    return ai - bi;
  });
  rows.forEach(function(row) { list.appendChild(row); });
  list.querySelectorAll('input[type="checkbox"][data-col-index]').forEach(function(cb) { cb.checked = true; });
  applyIntensityDatasetColumns();
}
function addIntensityModelWizardNext() {
  if (addIntensityModelWizardStep < addIntensityModelWizardTotalSteps) {
    setAddIntensityModelWizardStep(addIntensityModelWizardStep + 1);
  }
}
function addIntensityModelWizardPrev() {
  if (addIntensityModelWizardStep > 1) {
    setAddIntensityModelWizardStep(addIntensityModelWizardStep - 1);
  }
}
function updateIntensityPreviewRecordsLabel() {
  var sel = document.getElementById('add-intensity-preview-records-per-page');
  var label = document.getElementById('add-intensity-previewing-text');
  if (sel && label) label.textContent = 'Previewing top ' + sel.value + ' records of 422,365';
}
function toggleDataTypesDropdown(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  var trigger = document.getElementById('add-intensity-data-types-trigger');
  var panel = document.getElementById('add-intensity-data-types-panel');
  if (!trigger || !panel) return;
  var isOpen = trigger.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    document.removeEventListener('click', closeDataTypesDropdownOnClick);
  } else {
    trigger.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    setTimeout(function() { document.addEventListener('click', closeDataTypesDropdownOnClick); }, 0);
  }
}
function closeDataTypesDropdownOnClick(ev) {
  var wrap = document.getElementById('add-intensity-data-types-dropdown');
  if (wrap && !wrap.contains(ev.target)) {
    var trigger = document.getElementById('add-intensity-data-types-trigger');
    var panel = document.getElementById('add-intensity-data-types-panel');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    if (panel) panel.setAttribute('aria-hidden', 'true');
    document.removeEventListener('click', closeDataTypesDropdownOnClick);
  }
}
function updateDataTypesTags() {
  var panel = document.getElementById('add-intensity-data-types-panel');
  var tagsEl = document.getElementById('add-intensity-data-types-tags');
  if (!panel || !tagsEl) return;
  var checked = panel.querySelectorAll('input[type="checkbox"]:checked');
  var html = '';
  for (var i = 0; i < checked.length; i++) {
    var val = checked[i].value;
    var esc = (val || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    html += '<span class="add-intensity-data-types-tag" data-value="' + esc + '">' + esc + '<button type="button" class="add-intensity-data-types-tag-remove" onclick="var t=this.closest(\'.add-intensity-data-types-tag\'); if(t) removeDataTypesTag(t.getAttribute(\'data-value\')); event.stopPropagation();" aria-label="Remove">&times;</button></span>';
  }
  tagsEl.innerHTML = html;
}
function removeDataTypesTag(value) {
  var panel = document.getElementById('add-intensity-data-types-panel');
  if (!panel) return;
  var inputs = panel.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value === value) { inputs[i].checked = false; updateDataTypesTags(); return; }
  }
}
// --- estimation settings & cell details ---
function switchEstimationSettingsTab(tabName) {
  var tabs = document.querySelectorAll('.estimation-settings-tab');
  var panels = document.querySelectorAll('.estimation-settings-panel');
  tabs.forEach(function(t) {
    t.classList.toggle('active', t.id === 'est-settings-tab-' + tabName);
    t.setAttribute('aria-selected', t.id === 'est-settings-tab-' + tabName);
  });
  panels.forEach(function(p) {
    p.classList.toggle('active', p.id === 'estimation-settings-panel-' + tabName);
  });
}
function openEditGapRoutine(id) {
  switchView('estimation-settings');
  var modalTitle = document.querySelector('#create-routine-modal .modal-title');
  if (modalTitle) modalTitle.textContent = 'Edit gap filling routine';
  openCreateRoutineModal();
}
function openEditIntensityRoutine(id) {
  switchView('estimation-settings');
  var modalTitle = document.querySelector('#create-intensity-routine-modal .modal-title');
  if (modalTitle) modalTitle.textContent = 'Edit intensity estimation routine';
  openCreateIntensityRoutineModal();
}
function openEntityTypeEdit(entityTypeId) {
  switchView('entity-type-settings');
  // Placeholder: open edit entity type modal when implemented
}
function openGapFillingReportDetail(reportId) {
  var backdrop = document.getElementById('gap-report-detail-backdrop');
  var modal = document.getElementById('gap-report-detail-modal');
  if (backdrop) backdrop.classList.add('open');
  if (modal) modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  buildGapReportTimeseriesTable();
  switchGapReportView('list');
}
function closeGapFillingReportDetail() {
  var backdrop = document.getElementById('gap-report-detail-backdrop');
  var modal = document.getElementById('gap-report-detail-modal');
  if (backdrop) backdrop.classList.remove('open');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
  closeReportCellPopover();
}
var gapReportViewMode = 'list';
function switchGapReportView(view) {
  gapReportViewMode = view;
  var listWrap = document.getElementById('gap-report-list-wrap');
  var tsWrap = document.getElementById('gap-report-timeseries-wrap');
  document.querySelectorAll('.gap-report-view-toggle button').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-view') === view);
  });
  if (listWrap) listWrap.classList.toggle('hidden', view !== 'list');
  if (tsWrap) tsWrap.classList.toggle('active', view === 'timeseries');
}
var GAP_REPORT_GRID = {
  'Alaska Regional Hospital': [412.8, 387.2, 456.1, 398.5, 521.3, 489.0, 512.4, 498.6, 534.7, 502.4, 490.2, 478.9],
  'West Hills Hospital & Medical Center': [298.3, 312.6, 276.4, 334.8, 289.1, 305.2, 301.5, 267.9, 318.2, 295.8, 289.4, 289.4],
  'North Suburban Medical Center': [156.7, 178.4, 192.3, 165.2, 188.6, 203.8, 187.5, 214.6, 198.2, 176.9, 193.5, 209.1],
  'Rose Medical Center': [445.2, 428.6, 471.5, 462.3, 491.8, 438.5, 507.2, 473.9, 456.1, 472.8, 262.8, 269.1],
  'Sky Ridge Medical Center': [234.6, 258.3, 241.7, 251.3, 264.8, 259.2, 272.4, 265.8, 248.9, 256.5, 262.8, 269.1]
};
function buildGapReportTimeseriesTable() {
  var tbody = document.getElementById('gap-report-timeseries-tbody');
  if (!tbody) return;
  var listTable = document.getElementById('gap-report-detail-table');
  if (!listTable) return;
  var rows = listTable.querySelectorAll('tbody tr');
  var reportCells = {};
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var entity = (r.getAttribute('data-entity') || '').replace(/&amp;/g, '&');
    var period = r.getAttribute('data-period') || '';
    var methodUsed = r.getAttribute('data-method-used') || '';
    var methodFailed = r.getAttribute('data-method-failed') || '';
    var filled = r.getAttribute('data-filled') === 'true';
    var value = r.getAttribute('data-value') || '';
    reportCells[entity + '|' + period] = { methodUsed: methodUsed, methodFailed: methodFailed, filled: filled, value: value };
  }
  var months = ['Jul 24','Aug 24','Sep 24','Oct 24','Nov 24','Dec 24','Jan 24','Feb 24','Mar 24','Apr 24','May 24','Jun 24'];
  var entities = [];
  for (var k in reportCells) { var e = k.split('|')[0]; if (entities.indexOf(e) === -1) entities.push(e); }
  entities.sort();
  tbody.innerHTML = '';
  entities.forEach(function(entity) {
    var gridRow = GAP_REPORT_GRID[entity];
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + (entity.replace(/&/g, '&amp;')) + '</td><td>kWh</td>';
    for (var m = 0; m < months.length; m++) {
      var period = months[m];
      var key = entity + '|' + period;
      var cell = reportCells[key];
      var td = document.createElement('td');
      td.className = 'numeric';
      var displayVal = (gridRow && gridRow[m] != null) ? String(gridRow[m]) : '—';
      if (cell) {
        td.setAttribute('data-entity', entity);
        td.setAttribute('data-period', period);
        td.setAttribute('data-method-used', cell.methodUsed);
        td.setAttribute('data-method-failed', cell.methodFailed);
        td.setAttribute('data-filled', cell.filled ? 'true' : 'false');
        if (cell.filled && cell.value) {
          displayVal = cell.value;
          td.classList.add('cell-filled');
          var span = document.createElement('span');
          span.className = 'report-cell-content';
          span.innerHTML = '<i class="fa-solid fa-circle-check report-cell-icon report-cell-icon-filled" aria-hidden="true"></i>';
          span.appendChild(document.createTextNode(displayVal));
          td.appendChild(span);
        } else {
          td.classList.add('cell-unfilled');
          var span = document.createElement('span');
          span.className = 'report-cell-content';
          span.innerHTML = '<i class="fa-solid fa-circle-xmark report-cell-icon report-cell-icon-unfilled" aria-hidden="true"></i>';
          span.appendChild(document.createTextNode('No data'));
          td.appendChild(span);
        }
      } else {
        if (gridRow && gridRow[m] != null) displayVal = String(gridRow[m]);
        td.textContent = displayVal;
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
}
function handleGapReportListCellClick(ev) {
  var tr = ev.target.closest('tbody tr');
  if (!tr) return;
  var entity = (tr.getAttribute('data-entity') || '').replace(/&amp;/g, '&');
  var period = tr.getAttribute('data-period') || '';
  var methodUsed = tr.getAttribute('data-method-used') || '';
  var methodFailed = tr.getAttribute('data-method-failed') || '';
  var filled = tr.getAttribute('data-filled') === 'true';
  showReportCellPopover(ev.target, entity, period, methodUsed, methodFailed, filled);
}
function handleGapReportTimeseriesCellClick(ev) {
  var td = ev.target.closest('td.numeric');
  if (!td || !td.hasAttribute('data-entity')) return;
  var entity = td.getAttribute('data-entity') || '';
  var period = td.getAttribute('data-period') || '';
  var methodUsed = td.getAttribute('data-method-used') || '';
  var methodFailed = td.getAttribute('data-method-failed') || '';
  var filled = td.getAttribute('data-filled') === 'true';
  showReportCellPopover(td, entity, period, methodUsed, methodFailed, filled);
}
function showReportCellPopover(anchor, entity, period, methodUsed, methodFailed, filled, opts) {
  var pop = document.getElementById('report-cell-popover');
  var titleEl = document.getElementById('report-cell-popover-title');
  var methodEl = document.getElementById('report-cell-popover-method');
  var reasonEl = document.getElementById('report-cell-popover-reason');
  var factorEl = document.getElementById('report-cell-popover-factor');
  var sourceEl = document.getElementById('report-cell-popover-source');
  if (!pop || !titleEl) return;
  closeReportCellPopover();
  opts = opts || {};
  titleEl.textContent = entity + ' · ' + period;
  if (opts.type === 'intensity') {
    if (methodEl) methodEl.style.display = 'none';
    if (reasonEl) reasonEl.style.display = 'none';
    if (factorEl) { factorEl.textContent = 'Intensity factor: ' + (opts.factor || '—') + ' kWh per sq ft'; factorEl.style.display = ''; }
    if (sourceEl) { sourceEl.textContent = 'Source: ' + (opts.source || '—'); sourceEl.style.display = ''; }
  } else {
    if (factorEl) factorEl.style.display = 'none';
    if (sourceEl) sourceEl.style.display = 'none';
    if (methodEl && reasonEl) {
      if (filled && methodUsed) {
        methodEl.textContent = 'Method used: ' + methodUsed;
        methodEl.style.display = '';
        reasonEl.style.display = (methodFailed && methodFailed !== '—') ? '' : 'none';
        reasonEl.textContent = (methodFailed && methodFailed !== '—') ? 'Higher-priority attempts: ' + methodFailed : '';
      } else {
        methodEl.style.display = 'none';
        reasonEl.style.display = '';
        reasonEl.textContent = methodFailed || 'Unable to fill.';
      }
    }
  }
  pop.classList.add('open');
  var rect = anchor.getBoundingClientRect();
  var popWidth = 320;
  var left = rect.left + rect.width / 2 - popWidth / 2;
  if (left < 8) left = 8;
  if (left + popWidth > window.innerWidth - 8) left = window.innerWidth - popWidth - 8;
  var top = rect.bottom + 8;
  if (top + 120 > window.innerHeight - 8) top = rect.top - 120 - 8;
  pop.style.left = left + 'px';
  pop.style.top = top + 'px';
  setTimeout(function() { document.addEventListener('click', closeReportCellPopoverOnClick, true); }, 100);
}
function closeReportCellPopoverOnClick(ev) {
  var pop = document.getElementById('report-cell-popover');
  if (pop && pop.classList.contains('open') && ev.target !== pop && !pop.contains(ev.target)) {
    closeReportCellPopover();
    document.removeEventListener('click', closeReportCellPopoverOnClick, true);
  }
}
function closeReportCellPopover() {
  var pop = document.getElementById('report-cell-popover');
  if (pop) pop.classList.remove('open');
  document.removeEventListener('click', closeReportCellPopoverOnClick, true);
}
var intensityReportFactor = '0.28';
var intensityReportSource = 'Entity data';
function openIntensityReportDetail(reportId) {
  var backdrop = document.getElementById('intensity-report-detail-backdrop');
  var modal = document.getElementById('intensity-report-detail-modal');
  var factorEl = document.getElementById('intensity-report-factor-value');
  var sourceEl = document.getElementById('intensity-report-source');
  if (backdrop) backdrop.classList.add('open');
  if (modal) modal.classList.add('open');
  if (reportId === 'r-int-2') {
    intensityReportFactor = '0.35';
    intensityReportSource = 'CBECS fallback';
    if (factorEl) factorEl.textContent = '0.35';
    if (sourceEl) { sourceEl.textContent = 'CBECS fallback — insufficient entity data to compute intensity (fewer than minimum months or no eligible entities).'; sourceEl.classList.add('cbecs'); }
  } else {
    intensityReportFactor = '0.28';
    intensityReportSource = 'Entity data';
    if (factorEl) factorEl.textContent = '0.28';
    if (sourceEl) { sourceEl.textContent = 'Calculated from intensity of 12 entities with sufficient data (min 6 months). Weighted average of entity-level intensities.'; sourceEl.classList.remove('cbecs'); }
  }
  var listTable = document.getElementById('intensity-report-detail-table');
  if (listTable) {
    listTable.querySelectorAll('tbody tr').forEach(function(tr) {
      tr.setAttribute('data-factor', intensityReportFactor);
      tr.setAttribute('data-source', intensityReportSource);
      var srcTd = tr.children[3];
      if (srcTd) srcTd.textContent = intensityReportSource;
    });
  }
  buildIntensityReportTimeseriesTable();
  switchIntensityReportView('list');
  document.body.style.overflow = 'hidden';
}
function closeIntensityReportDetail() {
  var backdrop = document.getElementById('intensity-report-detail-backdrop');
  var modal = document.getElementById('intensity-report-detail-modal');
  if (backdrop) backdrop.classList.remove('open');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
  closeReportCellPopover();
}
function switchIntensityReportView(view) {
  var listWrap = document.getElementById('intensity-report-list-wrap');
  var tsWrap = document.getElementById('intensity-report-timeseries-wrap');
  document.querySelectorAll('.intensity-report-view-toggle button').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-view') === view);
  });
  if (listWrap) listWrap.classList.toggle('hidden', view !== 'list');
  if (tsWrap) tsWrap.classList.toggle('active', view === 'timeseries');
}
var INTENSITY_REPORT_GRID = {
  'Alaska Regional Hospital': [412.8, 387.2, 456.1, 398.5, 521.3, 489.0, 512.4, 498.6, 534.7, 502.4, 490.2, 478.9],
  'West Hills Hospital & Medical Center': [298.3, 312.6, 276.4, 334.8, 289.1, 305.2, 301.5, 267.9, 318.2, 295.8, 289.4, 289.4],
  'North Suburban Medical Center': [156.7, 178.4, 192.3, 165.2, 188.6, 203.8, 187.5, 214.6, 198.2, 176.9, 193.5, 209.1],
  'Rose Medical Center': [445.2, 428.6, 471.5, 462.3, 491.8, 438.5, 507.2, 473.9, 456.1, 472.8, 262.8, 269.1],
  'Sky Ridge Medical Center': [234.6, 258.3, 241.7, 251.3, 264.8, 259.2, 272.4, 265.8, 248.9, 256.5, 262.8, 269.1]
};
function buildIntensityReportTimeseriesTable() {
  var tbody = document.getElementById('intensity-report-timeseries-tbody');
  if (!tbody) return;
  var listTable = document.getElementById('intensity-report-detail-table');
  if (!listTable) return;
  var rows = listTable.querySelectorAll('tbody tr');
  var reportCells = {};
  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var entity = (r.getAttribute('data-entity') || '').replace(/&amp;/g, '&');
    var period = r.getAttribute('data-period') || '';
    var value = r.getAttribute('data-value') || '';
    var factor = r.getAttribute('data-factor') || intensityReportFactor;
    var source = r.getAttribute('data-source') || intensityReportSource;
    reportCells[entity + '|' + period] = { value: value, factor: factor, source: source };
  }
  var months = ['Jul 24','Aug 24','Sep 24','Oct 24','Nov 24','Dec 24','Jan 24','Feb 24','Mar 24','Apr 24','May 24','Jun 24'];
  var entities = [];
  for (var k in reportCells) { var e = k.split('|')[0]; if (entities.indexOf(e) === -1) entities.push(e); }
  entities.sort();
  tbody.innerHTML = '';
  entities.forEach(function(entity) {
    var gridRow = INTENSITY_REPORT_GRID[entity];
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + (entity.replace(/&/g, '&amp;')) + '</td><td>kWh</td>';
    for (var m = 0; m < months.length; m++) {
      var period = months[m];
      var key = entity + '|' + period;
      var cell = reportCells[key];
      var td = document.createElement('td');
      td.className = 'numeric';
      var displayVal = (gridRow && gridRow[m] != null) ? String(gridRow[m]) : '—';
      if (cell) {
        td.setAttribute('data-entity', entity);
        td.setAttribute('data-period', period);
        td.setAttribute('data-factor', cell.factor);
        td.setAttribute('data-source', cell.source);
        displayVal = cell.value || displayVal;
        td.classList.add('cell-filled');
        var span = document.createElement('span');
        span.className = 'report-cell-content';
        span.innerHTML = '<i class="fa-solid fa-circle-check report-cell-icon report-cell-icon-filled" aria-hidden="true"></i>';
        span.appendChild(document.createTextNode(displayVal));
        td.appendChild(span);
      } else {
        if (gridRow && gridRow[m] != null) displayVal = String(gridRow[m]);
        td.textContent = displayVal;
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
}
function handleIntensityReportListCellClick(ev) {
  var tr = ev.target.closest('tbody tr');
  if (!tr) return;
  var entity = (tr.getAttribute('data-entity') || '').replace(/&amp;/g, '&');
  var period = tr.getAttribute('data-period') || '';
  var factor = tr.getAttribute('data-factor') || intensityReportFactor;
  var source = tr.getAttribute('data-source') || intensityReportSource;
  showReportCellPopover(ev.target, entity, period, null, null, true, { type: 'intensity', factor: factor, source: source });
}
function handleIntensityReportTimeseriesCellClick(ev) {
  var td = ev.target.closest('td.numeric');
  if (!td || !td.hasAttribute('data-entity')) return;
  var entity = td.getAttribute('data-entity') || '';
  var period = td.getAttribute('data-period') || '';
  var factor = td.getAttribute('data-factor') || '';
  var source = td.getAttribute('data-source') || '';
  showReportCellPopover(td, entity, period, null, null, true, { type: 'intensity', factor: factor, source: source });
}
var estimationsCellDetailsTargetCell = null;
var estimationsCellDetailsCloseListener = null;
function handleEstimationsCellClick(ev) {
  var td = ev.target.closest('td');
  if (!td || !td.classList.contains('numeric')) return;
  var tr = td.closest('tr');
  var table = document.getElementById('estimations-table');
  if (!tr || !table) return;
  var colIndex = Array.prototype.indexOf.call(tr.children, td);
  if (colIndex < 2) return;
  var headerRow = table.querySelector('thead tr');
  var th = headerRow && headerRow.children[colIndex];
  var period = th ? th.textContent.trim() : '';
  var entity = tr.children[0] ? tr.children[0].textContent.trim() : '';
  var uom = tr.children[1] ? tr.children[1].textContent.trim() : '';
  var rawValue = td.textContent.trim().replace(/\s*No data\s*/, 'No data').replace(/\s*Unable to fill\s*/, 'Unable to fill').trim();
  var isFilled = td.classList.contains('estimations-cell-filled');
  var isUnfilled = td.classList.contains('estimations-cell-unfilled');
  var isApproved = td.classList.contains('estimations-cell-approved');
  var isWarning = td.classList.contains('estimations-cell-warning');
  var value = rawValue.replace(/^[\s\s▲\u25B2✓✗]*/, '').trim();
  var entries = [];
  try {
    var stored = td.getAttribute('data-entries');
    if (stored) {
      entries = JSON.parse(stored);
      if (entries.length > 0) {
        var total = 0;
        var uomFirst = '';
        entries.forEach(function(e) {
          total += e.num;
          if (!uomFirst && e.uom) uomFirst = e.uom;
        });
        value = (Math.round(total * 100) / 100) + (uomFirst ? ' ' + uomFirst : '');
      }
    }
  } catch (e) {}
  var status;
  var source;
  if (isFilled) {
    status = 'Filled';
    source = td.getAttribute('data-fill-method') || 'Gap filling routine';
  } else if (isUnfilled) {
    status = 'No data';
    source = '—';
  } else if (isApproved) {
    status = 'Approved';
    value = 'Approved';
    source = '—';
  } else {
    status = isWarning ? (value === 'No data' ? 'No data' : 'Estimated') : 'Reported';
    source = (status === 'Reported' ? 'Meter / direct input' : (status === 'Estimated' ? 'Gap filling or estimation' : '—'));
  }
  if (value === '' && rawValue.indexOf('No data') !== -1 && !isApproved) value = 'No data';
  var dataTypeEl = document.getElementById('estimations-data-type-label');
  var dataType = dataTypeEl ? dataTypeEl.textContent : 'Electric power';
  openEstimationsCellDetails(td, entity, period, uom, value, status, dataType, source, entries);
}
function parseLocalDateString(str) {
  if (!str || typeof str !== 'string') return null;
  var match = str.trim().match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return new Date(str);
  var y = parseInt(match[1], 10);
  var m = parseInt(match[2], 10) - 1;
  var d = parseInt(match[3], 10);
  var date = new Date(y, m, d);
  return isNaN(date.getTime()) ? null : date;
}
function formatEntryDateRange(from, to) {
  if (!from && !to) return '';
  if (!to) return from;
  if (!from) return to;
  if (from === to) return from;
  return from + ' – ' + to;
}
function formatEntryDateDisplay(fromStr, toStr) {
  if (!fromStr && !toStr) return '';
  var from = fromStr ? parseLocalDateString(fromStr) : null;
  var to = toStr ? parseLocalDateString(toStr) : null;
  if (!from && !to) return formatEntryDateRange(fromStr, toStr);
  function fmt(d) {
    if (!d || isNaN(d.getTime())) return '';
    var m = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return m[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  if (from && to && from.getTime() === to.getTime()) return fmt(from);
  return (fmt(from) && fmt(to)) ? fmt(from) + ' – ' + fmt(to) : formatEntryDateRange(fromStr, toStr);
}
function openEstimationsCellDetails(td, entity, period, uom, value, status, dataType, source, entries) {
  var drawer = document.getElementById('estimations-cell-popover');
  var backdrop = document.getElementById('estimations-drawer-backdrop');
  var fillGapSection = document.getElementById('estimations-cell-fill-gap');
  var fillGapInput = document.getElementById('estimations-fill-gap-input');
  if (!drawer || !backdrop) return;
  document.querySelectorAll('.estimations-cell-selected').forEach(function(cell) { cell.classList.remove('estimations-cell-selected'); });
  if (td) td.classList.add('estimations-cell-selected');
  estimationsCellDetailsTargetCell = td;
  setEl('estimations-detail-entity', entity);
  setEl('estimations-detail-period', period);
  setEl('estimations-detail-value', value);
  setEl('estimations-detail-data-type', dataType || '—');
  var valueLabelEl = document.getElementById('estimations-detail-value-label');
  if (valueLabelEl) valueLabelEl.textContent = (entries && entries.length > 1) ? 'Total value' : 'Value';
  var dateRangeWrap = document.getElementById('estimations-detail-date-range-wrap');
  var dateRangeEl = document.getElementById('estimations-detail-date-range');
  if (dateRangeWrap && dateRangeEl) {
    if (entries && entries.length > 0) {
      var actualRangeStr = '';
      if (entries.length === 1) {
        actualRangeStr = formatEntryDateDisplay(entries[0].from, entries[0].to) || '—';
      } else {
        var earliest = '';
        var latest = '';
        entries.forEach(function(e) {
          var from = e.from || e.to;
          var to = e.to || e.from;
          if (from && (!earliest || from < earliest)) earliest = from;
          if (to && (!latest || to > latest)) latest = to;
        });
        actualRangeStr = formatEntryDateDisplay(earliest, latest) || '—';
      }
      dateRangeEl.textContent = actualRangeStr;
      dateRangeWrap.style.display = 'block';
    } else {
      dateRangeWrap.style.display = 'none';
      dateRangeEl.textContent = '';
    }
  }
  var entriesWrap = document.getElementById('estimations-detail-entries-wrap');
  var entriesList = document.getElementById('estimations-detail-entries');
  if (entriesWrap && entriesList) {
    var esc = function(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); };
    if (entries && entries.length === 1) {
      entriesWrap.style.display = 'block';
      var entriesLabel = document.getElementById('estimations-detail-entries-label');
      if (entriesLabel) { entriesLabel.textContent = ''; entriesLabel.style.display = 'none'; }
      entriesList.innerHTML = '';
      var e = entries[0];
      var singleBlock = document.createElement('div');
      singleBlock.className = 'estimations-single-entry-details';
      singleBlock.innerHTML = '<div class="activity-row-detail-row"><span class="activity-row-detail-label">Record type</span><span class="activity-row-detail-value">' + esc(e.recordType || '—') + '</span></div><div class="activity-row-detail-row"><span class="activity-row-detail-label">Renewable energy</span><span class="activity-row-detail-value">' + esc(e.renewable || '—') + '</span></div>';
      entriesList.appendChild(singleBlock);
    } else if (entries && entries.length > 1) {
      entriesWrap.style.display = 'block';
      var entriesLabel = document.getElementById('estimations-detail-entries-label');
      if (entriesLabel) { entriesLabel.textContent = 'Entries'; entriesLabel.style.display = 'block'; }
      entriesList.innerHTML = '';
      entries.forEach(function(e, i) {
        var entryVal = (Math.round(e.num * 100) / 100) + (e.uom ? ' ' + e.uom : '');
        var dateStr = formatEntryDateDisplay(e.from, e.to);
        var item = document.createElement('div');
        item.className = 'estimations-entry-accordion';
        item.setAttribute('data-entry-index', i);
        var header = document.createElement('button');
        header.type = 'button';
        header.className = 'estimations-entry-accordion-header';
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('aria-controls', 'estimations-entry-content-' + i);
        header.id = 'estimations-entry-header-' + i;
        header.innerHTML = '<span class="entry-summary"><span class="entry-summary-value">' + esc(entryVal) + '</span>' + (dateStr ? '<span class="entry-summary-dates">' + esc(dateStr) + '</span>' : '') + '</span><i class="fa-solid fa-chevron-down entry-accordion-chevron" aria-hidden="true"></i>';
        header.onclick = function() {
          item.classList.toggle('expanded');
          header.setAttribute('aria-expanded', item.classList.contains('expanded'));
        };
        var content = document.createElement('div');
        content.id = 'estimations-entry-content-' + i;
        content.className = 'estimations-entry-accordion-content';
        content.setAttribute('role', 'region');
        content.setAttribute('aria-labelledby', 'estimations-entry-header-' + i);
        content.innerHTML = '<div class="activity-row-detail-row"><span class="activity-row-detail-label">Record type</span><span class="activity-row-detail-value">' + esc(e.recordType || '—') + '</span></div><div class="activity-row-detail-row"><span class="activity-row-detail-label">Renewable energy</span><span class="activity-row-detail-value">' + esc(e.renewable || '—') + '</span></div>';
        item.appendChild(header);
        item.appendChild(content);
        entriesList.appendChild(item);
      });
    } else {
      entriesWrap.style.display = 'none';
      entriesList.innerHTML = '';
    }
  }
  var isFilledCell = td && td.classList.contains('estimations-cell-filled');
  var isUnfilledCell = td && td.classList.contains('estimations-cell-unfilled');
  var isApprovedCell = td && td.classList.contains('estimations-cell-approved');
  var isGap = (status === 'No data' || status === 'Estimated') && !isFilledCell && !isUnfilledCell && !isApprovedCell;
  var gapReasonRow = document.getElementById('estimations-detail-gap-reason-row');
  var gapReasonLabel = document.getElementById('estimations-detail-gap-reason-label');
  var gapReasonEl = document.getElementById('estimations-detail-gap-reason');
  var showReason = isGap || isFilledCell || isUnfilledCell || isApprovedCell;
  if (gapReasonRow) gapReasonRow.style.display = showReason ? 'block' : 'none';
  if (gapReasonLabel) gapReasonLabel.textContent = isFilledCell ? 'Gap fill method' : 'Reason for gap alert';
  if (showReason && gapReasonEl) {
    if (isApprovedCell) {
      var approvedReason = td.getAttribute('data-approved-reason') || '';
      gapReasonEl.textContent = 'Approved: ' + (approvedReason || 'No reason provided.');
    } else if (isFilledCell) {
      var method = td.getAttribute('data-fill-method') || 'Gap filling routine';
      gapReasonEl.textContent = method;
    } else if (isUnfilledCell) {
      var reason = td.getAttribute('data-unfilled-reason') || 'Could not be filled';
      gapReasonEl.textContent = 'Unable to fill: ' + reason;
    } else if (status === 'No data') {
      gapReasonEl.textContent = 'Entire month has no data — fill below to complete.';
    } else {
      var gapDays = td.getAttribute('data-gap-days');
      if (gapDays === 'partial') {
        gapReasonEl.textContent = 'Partial manual entry — more dates in this period need to be filled.';
      } else {
        gapReasonEl.textContent = gapDays ? 'Gap of ' + gapDays + ' day' + (gapDays === '1' ? '' : 's') + ' in this period — fill below to complete.' : 'Gap of a few days in this period — fill below to complete.';
      }
    }
  }
  if (fillGapSection) fillGapSection.style.display = (isGap || isUnfilledCell) ? 'block' : 'none';
  var approveGapBlock = document.getElementById('estimations-cell-approve-gap');
  if (approveGapBlock) approveGapBlock.style.display = isGap ? 'block' : 'none';
  var approveForm = document.getElementById('estimations-approve-gap-form');
  var approveReasonInput = document.getElementById('estimations-approve-gap-reason');
  if (approveForm) approveForm.style.display = 'none';
  if (approveReasonInput) approveReasonInput.value = '';
  var fillGapInputRow = document.getElementById('estimations-cell-fill-gap-input-row');
  if (fillGapInputRow) fillGapInputRow.style.display = 'none';
  if (fillGapInput) { fillGapInput.value = (value && value !== 'No data') ? value : ''; fillGapInput.placeholder = 'Enter value'; }
  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
}
function setEl(id, text) {
  var el = document.getElementById(id);
  if (el) el.textContent = text || '—';
}
var addActivityDataTargetCell = null;
var addActivityDataPeriod = '';
function openAddActivityDataModal() {
  addActivityDataTargetCell = estimationsCellDetailsTargetCell;
  closeEstimationsCellDetails();
  var backdrop = document.getElementById('add-activity-data-backdrop');
  var modal = document.getElementById('add-activity-data-modal');
  if (!backdrop || !modal) return;
  addActivityDataCurrentStep = 1;
  setAddActivityDataStep(1);
  var periodStr = '';
  var td = addActivityDataTargetCell;
  if (td) {
    var tr = td.closest('tr');
    var table = document.getElementById('estimations-table');
    if (tr && table) {
      var colIndex = Array.prototype.indexOf.call(tr.children, td);
      var headerRow = table.querySelector('thead tr');
      var th = headerRow && headerRow.children[colIndex];
      if (th) periodStr = th.textContent.trim();
    }
  }
  addActivityDataPeriod = periodStr;
  var columnWrap = document.getElementById('add-activity-data-column-wrap');
  var columnName = document.getElementById('add-activity-data-column-name');
  if (columnWrap && columnName) {
    if (periodStr) {
      columnName.textContent = periodStr;
      columnWrap.style.display = '';
    } else {
      columnWrap.style.display = 'none';
      columnName.textContent = '';
    }
  }
  var dateErrorEl = document.getElementById('add-activity-data-date-error');
  if (dateErrorEl) { dateErrorEl.style.display = 'none'; dateErrorEl.textContent = ''; }
  var entityEl = document.getElementById('estimations-detail-entity');
  var periodEl = document.getElementById('estimations-detail-period');
  var entitySelect = document.getElementById('add-activity-entity');
  if (entitySelect && entityEl) {
    var entityName = entityEl.textContent.trim();
    if (entityName && entityName !== '—') {
      var opt = Array.prototype.find.call(entitySelect.options, function(o) { return o.value === entityName; });
      if (opt) entitySelect.value = opt.value;
    } else entitySelect.value = '';
  }
  var dateFrom = document.getElementById('add-activity-date-from');
  var dateTo = document.getElementById('add-activity-date-to');
  if (dateFrom) dateFrom.value = '';
  if (dateTo) dateTo.value = '';
  function clearAddActivityDateError() {
    var dateErrorEl = document.getElementById('add-activity-data-date-error');
    if (dateErrorEl) { dateErrorEl.style.display = 'none'; dateErrorEl.textContent = ''; }
  }
  if (dateFrom) { dateFrom.oninput = clearAddActivityDateError; dateFrom.onchange = clearAddActivityDateError; }
  if (dateTo) { dateTo.oninput = clearAddActivityDateError; dateTo.onchange = clearAddActivityDateError; }
  var activityTypeSelect = document.getElementById('add-activity-type');
  if (activityTypeSelect) activityTypeSelect.value = 'Electric power';
  backdrop.classList.add('open');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
var addActivityDataCurrentStep = 1;
function setAddActivityDataStep(step) {
  addActivityDataCurrentStep = step;
  var s1 = document.getElementById('add-activity-data-step1');
  var s2 = document.getElementById('add-activity-data-step2');
  var progressFill = document.getElementById('add-activity-data-progress-fill');
  var backBtn = document.getElementById('add-activity-data-back-btn');
  var nextBtn = document.getElementById('add-activity-data-next-btn');
  var saveBtn = document.getElementById('add-activity-data-save-btn');
  if (s1) s1.classList.toggle('active', step === 1);
  if (s2) s2.classList.toggle('active', step === 2);
  if (progressFill) progressFill.style.width = (step === 1 ? 33 : 100) + '%';
  if (backBtn) backBtn.style.display = step === 1 ? 'none' : '';
  if (nextBtn) nextBtn.style.display = step === 2 ? 'none' : '';
  if (saveBtn) saveBtn.style.display = step === 2 ? '' : 'none';
}
function nextAddActivityDataStep() {
  var dateFromEl = document.getElementById('add-activity-date-from');
  var dateToEl = document.getElementById('add-activity-date-to');
  var dateErrorEl = document.getElementById('add-activity-data-date-error');
  var fromStr = dateFromEl && dateFromEl.value ? dateFromEl.value.trim() : '';
  var toStr = dateToEl && dateToEl.value ? dateToEl.value.trim() : '';
  var periodStr = addActivityDataPeriod;
  var periodRange = parsePeriodToMonthRange(periodStr);
  var hasError = false;
  if (dateErrorEl) { dateErrorEl.style.display = 'none'; dateErrorEl.textContent = ''; }
  if (periodRange && (fromStr || toStr)) {
    var fromDate = fromStr ? parseLocalDateString(fromStr) : null;
    var toDate = toStr ? parseLocalDateString(toStr) : null;
    if (!fromDate && toDate) fromDate = toDate;
    if (fromDate && !toDate) toDate = fromDate;
    if (fromDate && toDate && !isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
      if (fromDate.getTime() > toDate.getTime()) { var tmp = fromDate; fromDate = toDate; toDate = tmp; }
      var monthStart = new Date(periodRange.start.getFullYear(), periodRange.start.getMonth(), periodRange.start.getDate()).getTime();
      var monthEnd = new Date(periodRange.end.getFullYear(), periodRange.end.getMonth(), periodRange.end.getDate()).getTime();
      var userStart = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()).getTime();
      var userEnd = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate()).getTime();
      var overlaps = userStart <= monthEnd && userEnd >= monthStart;
      if (!overlaps) {
        hasError = true;
        var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var monthLabel = monthNames[periodRange.start.getMonth()] + ' ' + periodRange.start.getFullYear();
        if (dateErrorEl) {
          dateErrorEl.textContent = 'The date range must include at least one day in ' + monthLabel + ' (the selected column).';
          dateErrorEl.style.display = 'block';
        }
      }
    }
  }
  if (!hasError) setAddActivityDataStep(2);
}
function backAddActivityDataStep() {
  setAddActivityDataStep(1);
}
function closeAddActivityDataModal() {
  var backdrop = document.getElementById('add-activity-data-backdrop');
  var modal = document.getElementById('add-activity-data-modal');
  if (backdrop) backdrop.classList.remove('open');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}
function parsePeriodToMonthRange(periodStr) {
  if (!periodStr || typeof periodStr !== 'string') return null;
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var parts = periodStr.trim().split(/\s+/);
  if (parts.length < 2) return null;
  var monthIdx = months.indexOf(parts[0]);
  if (monthIdx === -1) return null;
  var y = parseInt(parts[1], 10);
  var year = y < 100 ? 2000 + y : y;
  var start = new Date(year, monthIdx, 1);
  var end = new Date(year, monthIdx + 1, 0);
  return { start: start, end: end };
}
function parseOneEntryFromCellText(text) {
  if (!text || typeof text !== 'string') return null;
  var stripped = text.replace(/^[\s\s▲\u25B2✓✗]*/, '').trim();
  var match = stripped.match(/^([\d.,]+)\s*(.*)$/);
  if (!match) return null;
  var num = parseFloat(match[1].replace(',', ''));
  if (isNaN(num)) return null;
  return { num: num, uom: (match[2] || '').trim(), from: '', to: '' };
}
function saveAddActivityData() {
  var usageVal = document.getElementById('add-activity-usage-value');
  var usageUom = document.getElementById('add-activity-usage-uom');
  var spendVal = document.getElementById('add-activity-spend-value');
  var spendUomEl = document.getElementById('add-activity-spend-uom');
  var dateFromEl = document.getElementById('add-activity-date-from');
  var dateToEl = document.getElementById('add-activity-date-to');
  var td = addActivityDataTargetCell;
  var newNum = NaN;
  var newUom = '';
  if (usageVal && usageVal.value.trim() !== '') {
    newNum = parseFloat(usageVal.value.trim());
    newUom = usageUom && usageUom.value ? usageUom.value : '';
  } else if (spendVal && spendVal.value.trim() !== '') {
    newNum = parseFloat(spendVal.value.trim());
    newUom = spendUomEl && spendUomEl.value ? spendUomEl.value : '';
  }
  if (!td || isNaN(newNum)) {
    addActivityDataTargetCell = null;
    closeAddActivityDataModal();
    return;
  }
  var fromStr = dateFromEl && dateFromEl.value ? dateFromEl.value.trim() : '';
  var toStr = dateToEl && dateToEl.value ? dateToEl.value.trim() : '';
  var recordType = '';
  var recordTypeRadios = document.querySelectorAll('input[name="add-activity-record-type"]:checked');
  if (recordTypeRadios.length) recordType = recordTypeRadios[0].value;
  var renewable = '';
  var renewableRadios = document.querySelectorAll('input[name="add-activity-renewable"]:checked');
  if (renewableRadios.length) renewable = renewableRadios[0].value;
  var entries = [];
  try {
    var stored = td.getAttribute('data-entries');
    if (stored) entries = JSON.parse(stored);
  } catch (e) {}
  if (entries.length === 0 && (td.classList.contains('estimations-cell-filled') || td.classList.contains('estimations-cell-warning'))) {
    var one = parseOneEntryFromCellText(td.textContent);
    if (one) entries.push(one);
  }
  entries.push({ num: newNum, uom: newUom, from: fromStr, to: toStr, recordType: recordType, renewable: renewable });
  var totalNum = 0;
  var displayUom = '';
  entries.forEach(function(e) {
    totalNum += e.num;
    if (!displayUom && e.uom) displayUom = e.uom;
  });
  var displayVal = (Math.round(totalNum * 100) / 100) + (displayUom ? ' ' + displayUom : '');
  td.setAttribute('data-entries', JSON.stringify(entries));
  var periodStr = '';
  var tr = td.closest('tr');
  var table = document.getElementById('estimations-table');
  if (tr && table) {
    var colIndex = Array.prototype.indexOf.call(tr.children, td);
    var headerRow = table.querySelector('thead tr');
    var th = headerRow && headerRow.children[colIndex];
    if (th) periodStr = th.textContent.trim();
  }
  var periodRange = parsePeriodToMonthRange(periodStr);
  var fullCoverage = false;
  if (periodRange && entries.length > 0) {
    var ps = periodRange.start.getTime();
    var pe = periodRange.end.getTime();
    var dayMs = 86400000;
    var entryRanges = [];
    entries.forEach(function(e) {
      var from = e.from ? parseLocalDateString(e.from) : null;
      var to = e.to ? parseLocalDateString(e.to) : null;
      if (!from && to) from = to;
      if (from && !to) to = from;
      if (from && to && !isNaN(from.getTime()) && !isNaN(to.getTime())) {
        var fromDay = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
        var toDay = new Date(to.getFullYear(), to.getMonth(), to.getDate()).getTime();
        if (fromDay <= toDay) entryRanges.push({ start: fromDay, end: toDay });
      }
    });
    if (entryRanges.length > 0) {
      var allDaysCovered = true;
      for (var d = ps; d <= pe; d += dayMs) {
        var covered = entryRanges.some(function(r) { return d >= r.start && d <= r.end; });
        if (!covered) { allDaysCovered = false; break; }
      }
      fullCoverage = allDaysCovered;
    }
  }
  td.classList.remove('estimations-cell-warning', 'estimations-cell-unfilled', 'estimations-cell-approved');
  var icon = td.querySelector('.estimations-warning-icon');
  if (icon) icon.remove();
  if (fullCoverage) {
    td.classList.add('estimations-cell-filled');
    td.setAttribute('data-fill-method', 'Manual entry');
    td.removeAttribute('data-gap-days');
    td.removeAttribute('data-unfilled-reason');
    td.title = 'Manual entry — period fully covered';
    td.innerHTML = '<span class="estimations-filled-icon" aria-hidden="true"><i class="fa-solid fa-circle-check"></i></span> ' + displayVal;
  } else {
    td.classList.add('estimations-cell-warning');
    var gapDaysAttr = 'partial';
    if (periodRange && entries.length > 0) {
      var ps = periodRange.start.getTime();
      var pe = periodRange.end.getTime();
      var dayMs = 86400000;
      var entryRanges = [];
      entries.forEach(function(e) {
        var from = e.from ? parseLocalDateString(e.from) : null;
        var to = e.to ? parseLocalDateString(e.to) : null;
        if (!from && to) from = to;
        if (from && !to) to = from;
        if (from && to && !isNaN(from.getTime()) && !isNaN(to.getTime())) {
          var fromDay = new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime();
          var toDay = new Date(to.getFullYear(), to.getMonth(), to.getDate()).getTime();
          if (fromDay <= toDay) entryRanges.push({ start: fromDay, end: toDay });
        }
      });
      if (entryRanges.length > 0) {
        var uncoveredCount = 0;
        for (var d = ps; d <= pe; d += dayMs) {
          var covered = entryRanges.some(function(r) { return d >= r.start && d <= r.end; });
          if (!covered) uncoveredCount++;
        }
        if (uncoveredCount > 0) gapDaysAttr = String(uncoveredCount);
      }
    }
    td.setAttribute('data-gap-days', gapDaysAttr);
    td.title = gapDaysAttr === 'partial' ? 'Partial data — more dates in this period need to be filled' : 'Partial data — ' + gapDaysAttr + ' day' + (gapDaysAttr === '1' ? '' : 's') + ' in this period still need to be filled';
    td.innerHTML = '<span class="estimations-warning-icon" aria-hidden="true"><i class="fa-solid fa-triangle-exclamation"></i></span> ' + displayVal;
  }
  addActivityDataTargetCell = null;
  closeAddActivityDataModal();
}
function revealEstimationsFillGapInput() {
  var row = document.getElementById('estimations-cell-fill-gap-input-row');
  var input = document.getElementById('estimations-fill-gap-input');
  if (row) row.style.display = 'flex';
  if (input) { input.focus(); }
}
function saveEstimationsFillGap() {
  var input = document.getElementById('estimations-fill-gap-input');
  var td = estimationsCellDetailsTargetCell;
  if (!input || !td) return;
  var val = input.value.trim();
  if (!val) return;
  td.textContent = val;
  td.classList.remove('estimations-cell-warning');
  var icon = td.querySelector('.estimations-warning-icon');
  if (icon) icon.remove();
  closeEstimationsCellDetails();
}
function closeEstimationsCellDetails() {
  var drawer = document.getElementById('estimations-cell-popover');
  var backdrop = document.getElementById('estimations-drawer-backdrop');
  if (estimationsCellDetailsTargetCell) {
    estimationsCellDetailsTargetCell.classList.remove('estimations-cell-selected');
  }
  estimationsCellDetailsTargetCell = null;
  if (backdrop) { backdrop.classList.remove('open'); backdrop.setAttribute('aria-hidden', 'true'); }
  if (drawer) { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); }
}
function revealApproveGapReason() {
  var form = document.getElementById('estimations-approve-gap-form');
  var btn = document.getElementById('estimations-approve-gap-btn');
  var textarea = document.getElementById('estimations-approve-gap-reason');
  if (form) form.style.display = 'block';
  if (btn) btn.style.display = 'none';
  if (textarea) { textarea.focus(); textarea.placeholder = 'e.g. Meter was under maintenance; data not available for this period'; }
}
function submitApproveGap() {
  var td = estimationsCellDetailsTargetCell;
  var textarea = document.getElementById('estimations-approve-gap-reason');
  if (!td || !textarea) return;
  var reason = textarea.value.trim();
  if (!reason) {
    textarea.setAttribute('aria-invalid', 'true');
    textarea.placeholder = 'Please explain why the gap was approved (required).';
    return;
  }
  textarea.removeAttribute('aria-invalid');
  td.classList.remove('estimations-cell-warning');
  td.classList.add('estimations-cell-approved');
  td.setAttribute('data-approved-reason', reason);
  td.setAttribute('title', 'Approved: ' + reason);
  td.innerHTML = '<span class="estimations-approved-icon" aria-hidden="true"><i class="fa-solid fa-circle-check"></i></span> Approved';
  var form = document.getElementById('estimations-approve-gap-form');
  var btn = document.getElementById('estimations-approve-gap-btn');
  if (form) form.style.display = 'none';
  if (btn) btn.style.display = '';
  if (textarea) textarea.value = '';
  closeEstimationsCellDetails();
}

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
