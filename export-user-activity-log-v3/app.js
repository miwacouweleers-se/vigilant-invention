/* User activity log V3 – standalone prototype */

var ACTIVITY_LOG_DATA = [
  { id: 13, product: 'Carbon Performance', timestamp: '2025-02-20 13:00:00', user: 'Jane Admin', email: 'jane.admin@company.com', action: 'updated', where: 'Inventory', objectType: 'Activity record', objectId: 'Chicago HQ / Stationary combustion — Natural gas', recordId: 100001, valueAtTime: 'Quantity: 125.4 MWh, Data source: Energy_Meters_Jan2025.csv, Period: Jan 2025', valueBefore: 'Quantity: 118.2 MWh, Data source: Energy_Meters_Jan2025.csv, Period: Jan 2025', valueAfter: 'Quantity: 125.4 MWh, Data source: Energy_Meters_Jan2025.csv, Period: Jan 2025', agentAssisted: true },
  { id: 14, product: 'Carbon Performance', timestamp: '2025-02-20 10:30:00', user: 'James Park', email: 'james.park@company.com', action: 'updated', where: 'Inventory', objectType: 'Activity record', objectId: 'Chicago HQ / Stationary combustion — Natural gas', recordId: 100001, valueAtTime: 'Quantity: 118.2 MWh, Data source: Energy_Meters_Jan2025.csv, Period: Jan 2025', valueBefore: 'Quantity: 110.0 MWh, Data source: Energy_Meters_Jan2025.csv, Period: Jan 2025', valueAfter: 'Quantity: 118.2 MWh, Data source: Energy_Meters_Jan2025.csv, Period: Jan 2025', agentAssisted: false },
  { id: 15, product: 'Carbon Performance', timestamp: '2025-02-18 14:00:00', user: 'Jane Admin', email: 'jane.admin@company.com', action: 'created', where: 'Inventory', objectType: 'Activity record', objectId: 'Chicago HQ / Stationary combustion — Natural gas', recordId: 100001, valueAtTime: 'Quantity: 110.0 MWh, Data source: Energy_Meters_Jan2025.csv, Period: Jan 2025', valueAfter: 'Quantity: 110.0 MWh, Data source: Energy_Meters_Jan2025.csv, Period: Jan 2025', agentAssisted: true },
  { id: 30, product: 'Carbon Performance', timestamp: '2025-02-16 11:00:00', user: 'James Park', email: 'james.park@company.com', action: 'viewed', where: 'Inventory', objectType: 'Activity record', objectId: 'Chicago HQ / Stationary combustion — Natural gas', recordId: 100001, valueAtTime: 'Quantity: 105.0 MWh, Data source: Energy_Meters_Jan2025.csv, Period: Jan 2025', valueAfter: 'Quantity: 105.0 MWh, Data source: Energy_Meters_Jan2025.csv, Period: Jan 2025' },
  { id: 16, product: 'Carbon Performance', timestamp: '2025-02-20 11:20:00', user: 'Sarah Chen', email: 'sarah.chen@company.com', action: 'updated', where: 'Inventory', objectType: 'Activity record', objectId: 'London Office / Mobile combustion — Fleet', recordId: 100002, valueAtTime: 'Quantity: 2,840 L diesel, Data source: Fleet_Data_Q1.xlsx, Period: Q1 2025', valueBefore: 'Quantity: 2,400 L diesel, Data source: Fleet_Data_Q1.xlsx, Period: Q1 2025', valueAfter: 'Quantity: 2,840 L diesel, Data source: Fleet_Data_Q1.xlsx, Period: Q1 2025' },
  { id: 17, product: 'Carbon Performance', timestamp: '2025-02-19 15:00:00', user: 'Marcus Webb', email: 'marcus.webb@company.com', action: 'updated', where: 'Inventory', objectType: 'Activity record', objectId: 'London Office / Mobile combustion — Fleet', recordId: 100002, valueAtTime: 'Quantity: 2,650 L diesel, Data source: Fleet_Data_Q1.xlsx, Period: Q1 2025', valueBefore: 'Quantity: 2,400 L diesel, Data source: Fleet_Data_Q1.xlsx, Period: Q1 2025', valueAfter: 'Quantity: 2,650 L diesel, Data source: Fleet_Data_Q1.xlsx, Period: Q1 2025' },
  { id: 18, product: 'Carbon Performance', timestamp: '2025-02-19 09:00:00', user: 'Sarah Chen', email: 'sarah.chen@company.com', action: 'created', where: 'Inventory', objectType: 'Activity record', objectId: 'London Office / Mobile combustion — Fleet', recordId: 100002, valueAtTime: 'Quantity: 2,400 L diesel, Data source: Fleet_Data_Q1.xlsx, Period: Q1 2025', valueAfter: 'Quantity: 2,400 L diesel, Data source: Fleet_Data_Q1.xlsx, Period: Q1 2025' },
  { id: 31, product: 'Carbon Performance', timestamp: '2025-02-17 16:30:00', user: 'Anna Lindqvist', email: 'anna.lindqvist@company.com', action: 'viewed', where: 'Inventory', objectType: 'Activity record', objectId: 'London Office / Mobile combustion — Fleet', recordId: 100002, valueAtTime: 'Quantity: 2,200 L diesel, Data source: Fleet_Data_Q1.xlsx, Period: Q1 2025', valueAfter: 'Quantity: 2,200 L diesel, Data source: Fleet_Data_Q1.xlsx, Period: Q1 2025' },
  { id: 19, product: 'Carbon Performance', timestamp: '2025-02-19 16:45:00', user: 'James Park', email: 'james.park@company.com', action: 'created', where: 'Inventory', objectType: 'Activity record', objectId: 'Tokyo Office / Business travel — Air', recordId: 100003, valueAtTime: 'Quantity: 12,500 km, Data source: Travel_Expenses_Feb.xlsx, Period: Feb 2025', valueAfter: 'Quantity: 12,500 km, Data source: Travel_Expenses_Feb.xlsx, Period: Feb 2025' },
  { id: 20, product: 'Carbon Performance', timestamp: '2025-02-19 11:00:00', user: 'Anna Lindqvist', email: 'anna.lindqvist@company.com', action: 'updated', where: 'Inventory', objectType: 'Activity record', objectId: 'London Office / Waste — General', recordId: 100004, valueAtTime: 'Quantity: 2.1 tonnes, Data source: Waste_Weights_Q1.xlsx, Period: Jan 2025', valueBefore: 'Quantity: 1.8 tonnes, Data source: Waste_Weights_Q1.xlsx, Period: Jan 2025', valueAfter: 'Quantity: 2.1 tonnes, Data source: Waste_Weights_Q1.xlsx, Period: Jan 2025' },
  { id: 21, product: 'Carbon Performance', timestamp: '2025-02-18 16:30:00', user: 'Marcus Webb', email: 'marcus.webb@company.com', action: 'updated', where: 'Inventory', objectType: 'Activity record', objectId: 'London Office / Waste — General', recordId: 100004, valueAtTime: 'Quantity: 1.8 tonnes, Data source: Waste_Weights_Q1.xlsx, Period: Jan 2025', valueBefore: 'Quantity: 1.5 tonnes, Data source: Waste_Weights_Q1.xlsx, Period: Jan 2025', valueAfter: 'Quantity: 1.8 tonnes, Data source: Waste_Weights_Q1.xlsx, Period: Jan 2025' },
  { id: 22, product: 'Carbon Performance', timestamp: '2025-02-17 10:15:00', user: 'Anna Lindqvist', email: 'anna.lindqvist@company.com', action: 'created', where: 'Inventory', objectType: 'Activity record', objectId: 'London Office / Waste — General', recordId: 100004, valueAtTime: 'Quantity: 1.5 tonnes, Data source: Waste_Weights_Q1.xlsx, Period: Jan 2025', valueAfter: 'Quantity: 1.5 tonnes, Data source: Waste_Weights_Q1.xlsx, Period: Jan 2025' },
  { id: 1, product: 'Reporting and Compliance', timestamp: '2025-02-20 14:32:00', user: 'Jane Admin', email: 'jane.admin@company.com', action: 'updated', where: 'Data Owner Directory', objectType: 'Ownership rule', objectId: 'Chicago HQ / Energy', valueAtTime: 'Primary: James Park, Secondary: Sarah Chen', valueBefore: 'Primary: Jane Admin, Secondary: Sarah Chen', valueAfter: 'Primary: James Park, Secondary: Sarah Chen', agentAssisted: false },
  { id: 2, product: 'Reporting and Compliance', timestamp: '2025-02-20 14:28:15', user: 'Jane Admin', email: 'jane.admin@company.com', action: 'created', where: 'Data Campaigns', objectType: 'Campaign', objectId: 'Q1 2025 Sustainability Data', valueAtTime: 'Period: Jan–Mar 2025, Modules: Energy, Fuel, Travel', valueAfter: 'Period: Jan–Mar 2025, Modules: Energy, Fuel, Travel', agentAssisted: true },
  { id: 3, product: 'Reporting and Compliance', timestamp: '2025-02-20 13:45:00', user: 'Marcus Webb', email: 'marcus.webb@company.com', action: 'viewed', where: 'Data Owner Directory', objectType: 'Ownership rule', objectId: 'London Office / Waste', valueAtTime: 'Primary: Marcus Webb, Secondary: Anna Lindqvist', valueAfter: 'Primary: Marcus Webb, Secondary: Anna Lindqvist' },
  { id: 4, product: 'Reporting and Compliance', timestamp: '2025-02-20 12:10:22', user: 'Sarah Chen', email: 'sarah.chen@company.com', action: 'updated', where: 'Unit of measurement conversions', objectType: 'UoM group', objectId: 'Energy', valueAtTime: 'Units: kWh, GJ, MWh (default: kWh)', valueBefore: 'Units: kWh, MWh (default: kWh)', valueAfter: 'Units: kWh, GJ, MWh (default: kWh)', agentAssisted: true },
  { id: 5, product: 'Reporting and Compliance', timestamp: '2025-02-20 11:55:00', user: 'Jane Admin', email: 'jane.admin@company.com', action: 'deleted', where: 'Data Owner Directory', objectType: 'Ownership rule', objectId: 'Phoenix Entity / Travel', valueAtTime: '(removed)', valueBefore: 'Primary: Alex Rivera, Secondary: (none)', agentAssisted: false },
  { id: 6, product: 'Reporting and Compliance', timestamp: '2025-02-20 11:30:00', user: 'Jane Admin', email: 'jane.admin@company.com', action: 'updated', where: 'Data Owner Directory', objectType: 'Ownership rule', objectId: 'Chicago HQ / Energy', valueAtTime: 'Primary: James Park, Secondary: Sarah Chen; Team: Operations', valueBefore: 'Primary: James Park, Secondary: Sarah Chen', valueAfter: 'Primary: James Park, Secondary: Sarah Chen; Team: Operations' },
  { id: 7, product: 'Reporting and Compliance', timestamp: '2025-02-19 16:00:00', user: 'Anna Lindqvist', email: 'anna.lindqvist@company.com', action: 'viewed', where: 'Data Campaigns', objectType: 'Campaign', objectId: 'Q1 2025 Sustainability Data', valueAtTime: 'Status: Draft', valueAfter: 'Status: Draft' },
  { id: 8, product: 'Reporting and Compliance', timestamp: '2025-02-19 15:22:00', user: 'Jane Admin', email: 'jane.admin@company.com', action: 'created', where: 'Data Owner Directory', objectType: 'Ownership rule', objectId: 'Tokyo Office / Fuel', valueAtTime: 'Primary: Yuki Tanaka, Secondary: Priya Sharma', valueAfter: 'Primary: Yuki Tanaka, Secondary: Priya Sharma' },
  { id: 9, product: 'Reporting and Compliance', timestamp: '2025-02-20 10:15:00', user: 'Sarah Chen', email: 'sarah.chen@company.com', action: 'created', where: 'Imports', objectType: 'Import', objectId: 'Fleet_Data_Q1.xlsx', valueAtTime: 'Campaign: Q1 2025, 1,240 records imported, status: Completed', valueAfter: 'Campaign: Q1 2025, 1,240 records imported, status: Completed' },
  { id: 10, product: 'Reporting and Compliance', timestamp: '2025-02-20 09:42:33', user: 'James Park', email: 'james.park@company.com', action: 'created', where: 'Imports', objectType: 'Import', objectId: 'Energy_Meters_Jan2025.csv', valueAtTime: 'Campaign: Q1 2025, 89 records imported, status: Completed', valueAfter: 'Campaign: Q1 2025, 89 records imported, status: Completed' },
  { id: 11, product: 'Reporting and Compliance', timestamp: '2025-02-19 17:20:00', user: 'Anna Lindqvist', email: 'anna.lindqvist@company.com', action: 'created', where: 'Imports', objectType: 'Import', objectId: 'Travel_Expenses_Feb.xlsx', valueAtTime: 'Campaign: Q1 2025, 312 records imported, status: Completed', valueAfter: 'Campaign: Q1 2025, 312 records imported, status: Completed' },
  { id: 12, product: 'Reporting and Compliance', timestamp: '2025-02-19 14:05:00', user: 'Marcus Webb', email: 'marcus.webb@company.com', action: 'viewed', where: 'Imports', objectType: 'Import', objectId: 'Waste_Weights_Q1.xlsx', valueAtTime: 'Campaign: Q1 2025, 56 records, status: Completed', valueAfter: 'Campaign: Q1 2025, 56 records, status: Completed' },
  { id: 23, product: 'Climate Risk', timestamp: '2025-02-20 15:20:00', user: 'Sarah Chen', email: 'sarah.chen@company.com', action: 'created', where: 'Strategy', objectType: 'Target', objectId: 'Net-zero by 2040 (Scope 1 & 2)', valueAtTime: 'Baseline: FY 2024, Target year: 2040, Reduction: 100%', valueAfter: 'Baseline: FY 2024, Target year: 2040, Reduction: 100%' },
  { id: 24, product: 'Climate Risk', timestamp: '2025-02-20 14:55:00', user: 'Jane Admin', email: 'jane.admin@company.com', action: 'created', where: 'Strategy', objectType: 'Initiative', objectId: 'Fleet electrification program', valueAtTime: 'Status: Planning, Owner: James Park, Start: Q2 2025', valueAfter: 'Status: Planning, Owner: James Park, Start: Q2 2025' },
  { id: 25, product: 'Climate Risk', timestamp: '2025-02-19 11:30:00', user: 'James Park', email: 'james.park@company.com', action: 'updated', where: 'Strategy', objectType: 'Target', objectId: 'Net-zero by 2040 (Scope 1 & 2)', valueAtTime: 'Baseline: FY 2024, Target year: 2040, Reduction: 100%, Approved by leadership', valueBefore: 'Baseline: FY 2024, Target year: 2040, Reduction: 100%', valueAfter: 'Baseline: FY 2024, Target year: 2040, Reduction: 100%, Approved by leadership' },
  { id: 26, product: 'Reporting and Compliance', timestamp: '2025-02-18 09:00:00', user: 'Jane Admin', email: 'jane.admin@company.com', action: 'updated', where: 'Data Owner Directory', objectType: 'Ownership rule', objectId: 'Chicago HQ / Energy', valueAtTime: 'Primary: Jane Admin, Secondary: Sarah Chen', valueBefore: 'Primary: James Park, Secondary: Sarah Chen', valueAfter: 'Primary: Jane Admin, Secondary: Sarah Chen' },
  { id: 27, product: 'Reporting and Compliance', timestamp: '2025-02-15 14:20:00', user: 'James Park', email: 'james.park@company.com', action: 'created', where: 'Data Owner Directory', objectType: 'Ownership rule', objectId: 'Chicago HQ / Energy', valueAtTime: 'Primary: James Park, Secondary: Sarah Chen', valueAfter: 'Primary: James Park, Secondary: Sarah Chen' },
  { id: 28, product: 'Reporting and Compliance', timestamp: '2025-02-17 11:00:00', user: 'Jane Admin', email: 'jane.admin@company.com', action: 'updated', where: 'Data Campaigns', objectType: 'Campaign', objectId: 'Q1 2025 Sustainability Data', valueAtTime: 'Period: Jan–Mar 2025, Modules: Energy, Fuel, Travel, Status: Draft', valueBefore: 'Period: Jan–Mar 2025, Modules: Energy, Fuel, Travel', valueAfter: 'Period: Jan–Mar 2025, Modules: Energy, Fuel, Travel, Status: Draft' },
  { id: 29, product: 'Reporting and Compliance', timestamp: '2025-02-17 10:00:00', user: 'Sarah Chen', email: 'sarah.chen@company.com', action: 'created', where: 'Strategy', objectType: 'Target', objectId: 'Net-zero by 2040 (Scope 1 & 2)', valueAtTime: 'Baseline: FY 2024, Target year: 2040, Reduction: 100%', valueAfter: 'Baseline: FY 2024, Target year: 2040, Reduction: 100%' },
];
function activityLogEscape(s) {
  if (s == null || s === undefined) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function formatRecordId(recordId) {
  if (recordId == null || recordId === undefined) return '';
  return 'REC' + String(recordId).padStart(6, '0');
}
function getAffectedItemMain(r) {
  if (!r) return '';
  if (r.objectType === 'Activity record' && r.recordId != null) return formatRecordId(r.recordId);
  return r.objectId || '';
}
function getAffectedItemSub(r) {
  if (!r) return '';
  return r.objectType || '';
}
function getAffectedItemLabel(r) {
  var main = getAffectedItemMain(r), sub = getAffectedItemSub(r);
  if (sub) return main ? main + ' (' + sub + ')' : sub;
  return main;
}
function getImportActivityType(objectId) {
  if (!objectId) return '';
  var s = String(objectId).toLowerCase();
  if (s.indexOf('fleet') !== -1) return 'Fleet';
  if (s.indexOf('energy') !== -1) return 'Energy';
  if (s.indexOf('travel') !== -1) return 'Travel';
  if (s.indexOf('waste') !== -1) return 'Waste';
  if (s.indexOf('fuel') !== -1) return 'Fuel';
  return '';
}
function getRecordPreviewSummary(r) {
  if (!r) return '';
  var type = r.objectType || 'Item';
  var obj = r.objectId || '';
  var val = (r.valueAtTime || '').trim();
  var firstLine = val ? val.split(/\s*,\s*/)[0] : '';
  if (type === 'Import' && (val || obj)) {
    var recordsMatch = val ? val.match(/(\d[\d,]*)\s+records(?:\s+imported)?/i) : null;
    var recordCount = recordsMatch ? recordsMatch[1] + ' records' : '';
    var activityType = getImportActivityType(obj);
    var parts = [];
    if (recordCount) parts.push(recordCount);
    if (activityType) parts.push('Activity type: ' + activityType);
    return (parts.length ? parts.join(' · ') : (val || obj).slice(0, 120)) + ((val || obj).length > 120 ? '…' : '');
  }
  if (type === 'Activity record' && obj) {
    return 'Activity at ' + obj + (firstLine ? '. ' + firstLine + '.' : '.');
  }
  if (obj && val) return type + ': ' + obj + ' — ' + (firstLine || val.slice(0, 80)) + (val.length > 80 ? '…' : '');
  if (obj) return type + ': ' + obj + '.';
  return type + (val ? ': ' + val.slice(0, 100) + (val.length > 100 ? '…' : '') : '');
}
function getAffectedItemHref(r) {
  if (!r) return '#';
  if (r.objectType === 'Activity record' && r.recordId != null) return '#record/' + r.recordId;
  var type = (r.objectType || '').replace(/\s+/g, '-').toLowerCase();
  var id = r.objectId != null ? encodeURIComponent(String(r.objectId)) : '';
  if (type && id) return '#' + type + '/' + id;
  return '#';
}
function getAffectedItemHtml(r) {
  var mainRaw = getAffectedItemMain(r);
  var main = activityLogEscape(mainRaw);
  var sub = activityLogEscape(getAffectedItemSub(r));
  if (!mainRaw && !sub) return '';
  var href = getAffectedItemHref(r);
  var aid = r.id != null ? activityLogEscape(String(r.id)) : '';
  var linkClass = r.objectType === 'Activity record' && r.recordId != null ? 'activity-log-affected-record-link' : 'activity-log-affected-item-link';
  var dataRecord = r.objectType === 'Activity record' && r.recordId != null ? ' data-record-id="' + activityLogEscape(String(r.recordId)) + '"' : '';
  var mainHtml = '<a href="' + activityLogEscape(href) + '" class="' + linkClass + '" data-activity-id="' + aid + '"' + dataRecord + ' onclick="event.stopPropagation()">' + main + '</a>';
  var inner = '<span class="activity-log-affected-main">' + mainHtml + '</span>' + (sub ? '<span class="activity-log-affected-sub">' + sub + '</span>' : '');
  return '<span class="activity-log-affected-preview-trigger" data-activity-id="' + aid + '">' + inner + '</span>';
}
function getAffectedItemBusinessEntity(r) {
  if (!r || !r.objectId) return '';
  var idx = String(r.objectId).indexOf(' / ');
  return idx >= 0 ? String(r.objectId).slice(0, idx).trim() : '';
}
function getAffectedItemActivityType(r) {
  if (!r || !r.objectId) return '';
  var idx = String(r.objectId).indexOf(' / ');
  return idx >= 0 ? String(r.objectId).slice(idx + 3).trim() : '';
}
function formatValueChangeForTable(val) {
  if (val == null || val === '') return '';
  var s = String(val).trim();
  var parts = s.split(/\s*,\s*/).filter(function(p) { return p.length > 0; });
  if (parts.length > 1) return parts.length + ' values changed';
  return s;
}

function activityLogCsvEscape(s) {
  if (s == null || s === undefined) return '';
  var str = String(s);
  if (str.indexOf('"') !== -1) str = str.replace(/"/g, '""');
  if (str.indexOf(',') !== -1 || str.indexOf('"') !== -1 || str.indexOf('\n') !== -1 || str.indexOf('\r') !== -1) return '"' + str + '"';
  return str;
}

function openActivityLogFullDetails(activityId) {
  var row = ACTIVITY_LOG_DATA.filter(function(r) { return r.id === activityId; })[0];
  var content = document.getElementById('activity-log-full-details-content');
  var modal = document.getElementById('activity-log-full-details-modal');
  if (content && modal && row) {
    content.textContent = row.valueAtTime || '';
    modal.classList.add('open');
  }
}
function closeActivityLogFullDetails() {
  var modal = document.getElementById('activity-log-full-details-modal');
  if (modal) modal.classList.remove('open');
}


function formatAuditTrailTimestamp(ts) {
  if (!ts || ts.length < 16) return ts || '';
  var parts = ts.split(/[\s-:]/);
  if (parts.length < 5) return ts;
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var y = parts[0], m = parseInt(parts[1], 10) - 1, d = parts[2], h = parseInt(parts[3], 10), min = parts[4];
  var hour = h > 12 ? h - 12 : (h === 0 ? 12 : h);
  var ampm = h >= 12 ? 'pm' : 'am';
  return months[m] + ' ' + d + ', ' + y + ' @ ' + hour + ':' + min + ampm;
}
function formatAuditTrailDate(ts) {
  if (!ts || ts.length < 10) return ts || '';
  var parts = ts.split(/[\s-:]/);
  if (parts.length < 3) return ts;
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var y = parts[0], m = parseInt(parts[1], 10) - 1, d = parts[2];
  return months[m] + ' ' + d + ', ' + y;
}
function buildAuditTrailEventHtml(r) {
  var actionLabel = (r.action ? (r.action.charAt(0).toUpperCase() + r.action.slice(1)) : '') + (r.where ? ' · ' + r.where : '');
  var timeStr = formatAuditTrailTimestamp(r.timestamp);
  var vb = r.valueBefore != null && r.valueBefore !== '' ? activityLogEscape(r.valueBefore) : '';
  var va = r.valueAfter != null && r.valueAfter !== '' ? activityLogEscape(r.valueAfter) : '';
  var detailHtml = '';
  if (vb && va) {
    detailHtml = '<span class="audit-trail-event-detail"><span class="audit-trail-pill" title="' + vb + '">' + (vb.length > 40 ? vb.slice(0, 37) + '…' : vb) + '</span><span class="audit-trail-pill-arrow" aria-hidden="true">→</span><span class="audit-trail-pill" title="' + va + '">' + (va.length > 40 ? va.slice(0, 37) + '…' : va) + '</span></span>';
  } else if (va) {
    detailHtml = '<span class="audit-trail-event-detail"><span class="audit-trail-pill" title="' + va + '">' + (va.length > 60 ? va.slice(0, 57) + '…' : va) + '</span></span>';
  } else if (vb) {
    detailHtml = '<span class="audit-trail-event-detail"><span class="audit-trail-pill" title="' + vb + '">' + (vb.length > 60 ? vb.slice(0, 57) + '…' : vb) + '</span></span>';
  } else if (r.valueAtTime) {
    var v = activityLogEscape(r.valueAtTime);
    detailHtml = '<span class="audit-trail-event-detail"><span class="audit-trail-pill" title="' + v + '">' + (v.length > 60 ? v.slice(0, 57) + '…' : v) + '</span></span>';
  }
  return '<div class="audit-trail-event">' +
    '<span class="audit-trail-event-marker" aria-hidden="true"></span>' +
    '<div class="audit-trail-event-content">' +
    '<div class="audit-trail-event-desc">' + activityLogEscape(actionLabel) + '</div>' +
    '<div class="audit-trail-event-time">' + activityLogEscape(timeStr) + '</div>' +
    (detailHtml || '') +
    '</div></div>';
}
function buildAuditTrailTimelineHtml(trail) {
  var byDate = {};
  trail.forEach(function(r) {
    var key = r.timestamp ? r.timestamp.slice(0, 10) : '';
    if (!byDate[key]) byDate[key] = [];
    byDate[key].push(r);
  });
  var dates = Object.keys(byDate).sort().reverse();
  var html = '';
  dates.forEach(function(dateKey) {
    var events = byDate[dateKey];
    var dateLabel = dateKey ? formatAuditTrailDate(events[0].timestamp) : 'Unknown date';
    var n = events.length;
    var eventLabel = n === 1 ? '1 event' : n + ' events';
    html += '<div class="audit-trail-date-group" data-date="' + activityLogEscape(dateKey) + '">' +
      '<button type="button" class="audit-trail-date-header" onclick="toggleAuditTrailDateSection(this)" aria-expanded="true">' +
      '<span>' + activityLogEscape(dateLabel) + ' · ' + eventLabel + '</span>' +
      '<span class="audit-trail-date-chevron" aria-hidden="true">▼</span>' +
      '</button>' +
      '<div class="audit-trail-date-body">' +
      events.map(buildAuditTrailEventHtml).join('') +
      '</div></div>';
  });
  return html;
}
function toggleAuditTrailDateSection(btn) {
  var group = btn && btn.closest('.audit-trail-date-group');
  if (!group) return;
  group.classList.toggle('collapsed');
  btn.setAttribute('aria-expanded', group.classList.contains('collapsed') ? 'false' : 'true');
}
var activityRecordPreviewShowTimer = null;
var activityRecordPreviewHideTimer = null;
function showActivityRecordPreview(linkEl) {
  var activityId = linkEl.getAttribute('data-activity-id');
  if (!activityId) return;
  var row = ACTIVITY_LOG_DATA.filter(function(r) { return String(r.id) === activityId; })[0];
  if (!row) return;
  var pop = document.getElementById('activity-record-preview-popover');
  var body = document.getElementById('activity-record-preview-popover-body');
  if (!pop || !body) return;
  body.textContent = getRecordPreviewSummary(row);
  var rect = linkEl.getBoundingClientRect();
  pop.style.display = '';
  var pad = 12;
  var popWidth = 320;
  var popHeight = Math.min(pop.offsetHeight || 120, window.innerHeight - pad * 2);
  var viewW = window.innerWidth;
  var viewH = window.innerHeight;
  var top = rect.bottom + 8;
  if (top + popHeight > viewH - pad) top = rect.top - 8 - popHeight;
  if (top < pad) top = pad;
  if (top + popHeight > viewH - pad) top = viewH - popHeight - pad;
  var left = rect.left;
  if (left + popWidth > viewW - pad) left = viewW - popWidth - pad;
  if (left < pad) left = pad;
  pop.style.top = top + 'px';
  pop.style.left = left + 'px';
  pop.setAttribute('aria-hidden', 'false');
}
function hideActivityRecordPreview() {
  var pop = document.getElementById('activity-record-preview-popover');
  if (pop) { pop.style.display = 'none'; pop.setAttribute('aria-hidden', 'true'); }
}
function bindActivityRecordPreviewPopover() {
  document.addEventListener('mouseover', function(ev) {
    var trigger = ev.target.closest('.activity-log-affected-preview-trigger');
    if (trigger && trigger.getAttribute('data-activity-id')) {
      if (activityRecordPreviewHideTimer) { clearTimeout(activityRecordPreviewHideTimer); activityRecordPreviewHideTimer = null; }
      if (!activityRecordPreviewShowTimer) activityRecordPreviewShowTimer = setTimeout(function() { activityRecordPreviewShowTimer = null; showActivityRecordPreview(trigger); }, 400);
      return;
    }
    var pop = document.getElementById('activity-record-preview-popover');
    if (pop && ev.target.closest('#activity-record-preview-popover')) return;
    if (activityRecordPreviewShowTimer) { clearTimeout(activityRecordPreviewShowTimer); activityRecordPreviewShowTimer = null; }
    activityRecordPreviewHideTimer = setTimeout(function() { activityRecordPreviewHideTimer = null; hideActivityRecordPreview(); }, 150);
  });
  document.addEventListener('mouseout', function(ev) {
    var trigger = ev.target.closest('.activity-log-affected-preview-trigger');
    var pop = document.getElementById('activity-record-preview-popover');
    if (trigger || (pop && ev.relatedTarget && pop.contains(ev.relatedTarget))) return;
    if (activityRecordPreviewShowTimer) { clearTimeout(activityRecordPreviewShowTimer); activityRecordPreviewShowTimer = null; }
    activityRecordPreviewHideTimer = setTimeout(function() { activityRecordPreviewHideTimer = null; hideActivityRecordPreview(); }, 150);
  });
}
bindActivityRecordPreviewPopover();

function openActivityRowDetailDrawerV2(activityId) {
  var row = ACTIVITY_LOG_DATA.filter(function(r) { return r.id === activityId; })[0];
  if (!row) return;
  var objectType = row.objectType, objectId = row.objectId;
  document.getElementById('activity-row-detail-timestamp-v2').textContent = row.timestamp || '';
  var whoElV2 = document.getElementById('activity-row-detail-who-v2');
  if (whoElV2) {
    whoElV2.innerHTML = (row.user ? activityLogEscape(row.user) : '') + (row.email ? '<span class="activity-log-user-email">' + activityLogEscape(row.email) + '</span>' : '');
  }
  document.getElementById('activity-row-detail-action-v2').textContent = row.action || '';
  document.getElementById('activity-row-detail-where-v2').textContent = row.where || '';
  var objDetailV2 = document.getElementById('activity-row-detail-object-v2');
  if (objDetailV2) objDetailV2.innerHTML = getAffectedItemHtml(row);
  var entityElV2 = document.getElementById('activity-row-detail-entity-v2');
  var activityTypeElV2 = document.getElementById('activity-row-detail-activity-type-v2');
  var entityRowV2 = document.getElementById('activity-row-detail-entity-type-row-v2');
  var activityTypeRowV2 = document.getElementById('activity-row-detail-activity-type-row-v2');
  var entityVal = getAffectedItemBusinessEntity(row);
  var activityTypeVal = getAffectedItemActivityType(row);
  if (entityElV2) entityElV2.textContent = entityVal || '—';
  if (activityTypeElV2) activityTypeElV2.textContent = activityTypeVal || '—';
  if (entityRowV2) entityRowV2.style.display = (entityVal || activityTypeVal) ? '' : 'none';
  if (activityTypeRowV2) activityTypeRowV2.style.display = (entityVal || activityTypeVal) ? '' : 'none';
  document.getElementById('activity-row-detail-value-v2').textContent = row.valueAtTime || '';
  var trail = ACTIVITY_LOG_DATA.filter(function(r) { return r.objectType === objectType && r.objectId === objectId; }).sort(function(a, b) { return a.timestamp < b.timestamp ? 1 : -1; });
  var eventsEl = document.getElementById('audit-trail-timeline-events-v2');
  if (eventsEl) eventsEl.innerHTML = buildAuditTrailTimelineHtml(trail);
  document.getElementById('activity-row-detail-backdrop-v2').classList.add('open');
  document.getElementById('activity-row-detail-drawer-v2').classList.add('open');
}
function closeActivityRowDetailDrawerV2() {
  document.getElementById('activity-row-detail-backdrop-v2').classList.remove('open');
  document.getElementById('activity-row-detail-drawer-v2').classList.remove('open');
}
// User activity log V3 (same logic as V2, -v3 element IDs; reuses V2 drawer)
var activityLogV3AuditFilter = null;
function setAuditFilterV3(objectType, objectId) {
  activityLogV3AuditFilter = { objectType: objectType, objectId: objectId };
  var input = document.getElementById('activity-log-search-v3');
  var clearBtn = document.getElementById('activity-log-v3-search-clear');
  var wrapper = input && input.closest('.activity-log-v2-search-wrapper');
  if (input) {
    input.value = 'Audit trail: ' + objectType + ' — ' + objectId;
    input.readOnly = true;
  }
  if (clearBtn) clearBtn.classList.add('visible');
  if (wrapper) wrapper.classList.add('has-audit-filter');
  activityLogRenderV3();
}
function clearAuditFilterV3() {
  activityLogV3AuditFilter = null;
  var input = document.getElementById('activity-log-search-v3');
  var clearBtn = document.getElementById('activity-log-v3-search-clear');
  var wrapper = input && input.closest('.activity-log-v2-search-wrapper');
  if (input) {
    input.value = '';
    input.readOnly = false;
  }
  if (clearBtn) clearBtn.classList.remove('visible');
  if (wrapper) wrapper.classList.remove('has-audit-filter');
  activityLogRenderV3();
}
function handleActivityRowClickV3(ev) {
  if (ev.target.closest('button') || ev.target.closest('.activity-log-view-details')) return;
  var tr = ev.currentTarget;
  var id = tr.getAttribute('data-activity-id');
  if (id) openActivityRowDetailDrawerV2(parseInt(id, 10));
}
function activityLogApplyFiltersV3() { activityLogRenderV3(); }
function activityLogProductChangeV3() {
  var productEl = document.getElementById('activity-log-product-v3');
  var productValue = productEl ? productEl.value : 'Carbon Performance';
  var thProduct = document.getElementById('activity-log-th-product-v3');
  var accordionProduct = document.getElementById('activity-log-filter-accordion-product-v3');
  if (thProduct) thProduct.style.display = productValue === 'all' ? '' : 'none';
  if (accordionProduct) accordionProduct.style.display = productValue === 'all' ? '' : 'none';
  activityLogRenderV3();
}
function activityLogTimeframeChangeV3() {
  var timeframeEl = document.getElementById('activity-log-timeframe-v3');
  var customRow = document.getElementById('activity-log-custom-dates-v3');
  if (customRow) customRow.style.display = (timeframeEl && timeframeEl.value === 'custom') ? 'inline-flex' : 'none';
  activityLogApplyFiltersV3();
}
function getActivityLogSelectedFiltersV3() {
  function getChecked(containerId) {
    var el = document.getElementById(containerId);
    if (!el) return [];
    return Array.prototype.slice.call(el.querySelectorAll('input[type="checkbox"]:checked')).map(function(cb) { return cb.value; });
  }
  return {
    users: getChecked('activity-log-filter-user-options-v3'),
    actions: getChecked('activity-log-filter-action-options-v3'),
    objectTypes: getChecked('activity-log-filter-object-options-v3'),
    pages: getChecked('activity-log-filter-page-options-v3'),
    products: getChecked('activity-log-filter-product-options-v3')
  };
}
function activityLogPopulateFiltersV3() {
  var users = {}, objectTypes = {}, pages = {};
  ACTIVITY_LOG_DATA.forEach(function(row) {
    users[row.user] = true;
    objectTypes[row.objectType] = true;
    if (row.where) pages[row.where] = true;
  });
  var userOpts = document.getElementById('activity-log-filter-user-options-v3');
  var objectOpts = document.getElementById('activity-log-filter-object-options-v3');
  var pageOpts = document.getElementById('activity-log-filter-page-options-v3');
  if (userOpts && userOpts.children.length === 0) {
    Object.keys(users).sort().forEach(function(u) {
      var label = document.createElement('label');
      label.innerHTML = '<input type="checkbox" value="' + activityLogEscape(u) + '" onchange="activityLogApplyFiltersV3(); updateActivityLogFilterBadgeV3(); renderActivityLogFilterPillsV3();"> ' + activityLogEscape(u);
      userOpts.appendChild(label);
    });
  }
  if (objectOpts && objectOpts.children.length === 0) {
    Object.keys(objectTypes).sort().forEach(function(t) {
      var label = document.createElement('label');
      label.innerHTML = '<input type="checkbox" value="' + activityLogEscape(t) + '" onchange="activityLogApplyFiltersV3(); updateActivityLogFilterBadgeV3(); renderActivityLogFilterPillsV3();"> ' + activityLogEscape(t);
      objectOpts.appendChild(label);
    });
  }
  if (pageOpts && pageOpts.children.length === 0) {
    Object.keys(pages).sort().forEach(function(p) {
      var label = document.createElement('label');
      label.innerHTML = '<input type="checkbox" value="' + activityLogEscape(p) + '" onchange="activityLogApplyFiltersV3(); updateActivityLogFilterBadgeV3(); renderActivityLogFilterPillsV3();"> ' + activityLogEscape(p);
      pageOpts.appendChild(label);
    });
  }
}
function renderActivityLogFilterPillsV3() {
  var wrap = document.getElementById('activity-log-filter-pills-v3');
  if (!wrap) return;
  var f = getActivityLogSelectedFiltersV3();
  var productEl = document.getElementById('activity-log-product-v3');
  var showProductFilter = productEl && productEl.value === 'all';
  var pills = [];
  f.users.forEach(function(v) { pills.push({ type: 'user', value: v, label: 'User: ' + v }); });
  f.actions.forEach(function(v) { pills.push({ type: 'action', value: v, label: 'Action: ' + v }); });
  f.objectTypes.forEach(function(v) { pills.push({ type: 'objectType', value: v, label: 'Object type: ' + v }); });
  f.pages.forEach(function(v) { pills.push({ type: 'page', value: v, label: 'Page: ' + v }); });
  if (showProductFilter) f.products.forEach(function(v) { pills.push({ type: 'product', value: v, label: 'Product: ' + v }); });
  wrap.innerHTML = pills.map(function(p) {
    return '<span class="activity-log-filter-pill" data-filter-type="' + p.type + '" data-filter-value="' + activityLogEscape(p.value) + '">' + activityLogEscape(p.label) + '<button type="button" class="activity-log-filter-pill-remove" onclick="event.stopPropagation(); var pill=this.closest(\'.activity-log-filter-pill\'); if(pill) removeActivityLogFilterPillV3(pill.getAttribute(\'data-filter-type\'), pill.getAttribute(\'data-filter-value\'));" aria-label="Remove filter">&times;</button></span>';
  }).join('');
  var clearAllBtn = document.getElementById('activity-log-filter-clear-all-v3');
  if (clearAllBtn) clearAllBtn.style.display = pills.length > 0 ? 'inline-block' : 'none';
}
function removeActivityLogFilterPillV3(filterType, value) {
  var containerId = filterType === 'user' ? 'activity-log-filter-user-options-v3' : filterType === 'action' ? 'activity-log-filter-action-options-v3' : filterType === 'objectType' ? 'activity-log-filter-object-options-v3' : filterType === 'page' ? 'activity-log-filter-page-options-v3' : 'activity-log-filter-product-options-v3';
  var el = document.getElementById(containerId);
  if (!el) return;
  var inputs = el.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < inputs.length; i++) { if (inputs[i].value === value) { inputs[i].checked = false; break; } }
  activityLogApplyFiltersV3();
  updateActivityLogFilterBadgeV3();
  renderActivityLogFilterPillsV3();
}
function getFilteredActivityLogRowsForV3() {
  var searchInput = document.getElementById('activity-log-search-v3');
  var search = (searchInput && !searchInput.readOnly) ? (searchInput.value || '') : '';
  var productEl = document.getElementById('activity-log-product-v3');
  var productValue = (productEl && productEl.value) ? productEl.value : 'Carbon Performance';
  var f = getActivityLogSelectedFiltersV3();
  var timeframeEl = document.getElementById('activity-log-timeframe-v3');
  var timeframe = (timeframeEl && timeframeEl.value) || '';
  var fromDate = '', toDate = '';
  if (timeframe === 'custom') {
    fromDate = (document.getElementById('activity-log-from-v3') || {}).value || '';
    toDate = (document.getElementById('activity-log-to-v3') || {}).value || '';
  } else if (timeframe) {
    var today = new Date();
    var y = today.getFullYear(), m = String(today.getMonth() + 1).padStart(2, '0'), d = String(today.getDate()).padStart(2, '0');
    toDate = y + '-' + m + '-' + d;
    if (timeframe === 'today' || timeframe === 'yesterday') {
      if (timeframe === 'yesterday') {
        var yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
        fromDate = toDate = yesterday.getFullYear() + '-' + String(yesterday.getMonth() + 1).padStart(2, '0') + '-' + String(yesterday.getDate()).padStart(2, '0');
      } else { fromDate = toDate; }
    } else if (timeframe === 'last7' || timeframe === 'last30') {
      var from = new Date(today); from.setDate(from.getDate() - (timeframe === 'last7' ? 7 : 30));
      fromDate = from.getFullYear() + '-' + String(from.getMonth() + 1).padStart(2, '0') + '-' + String(from.getDate()).padStart(2, '0');
    }
  }
  var q = search.toLowerCase().trim();
  return ACTIVITY_LOG_DATA.filter(function(r) {
    if (productValue !== 'all' && (r.product || 'Carbon Performance') !== productValue) return false;
    if (productValue === 'all' && f.products.length && f.products.indexOf(r.product || '') === -1) return false;
    if (f.users.length && f.users.indexOf(r.user) === -1) return false;
    if (f.actions.length && f.actions.indexOf(r.action) === -1) return false;
    if (f.objectTypes.length && f.objectTypes.indexOf(r.objectType) === -1) return false;
    if (f.pages.length && f.pages.indexOf(r.where) === -1) return false;
    if (activityLogV3AuditFilter && (r.objectType !== activityLogV3AuditFilter.objectType || r.objectId !== activityLogV3AuditFilter.objectId)) return false;
    var rowDate = (r.timestamp || '').slice(0, 10);
    if (fromDate && rowDate < fromDate) return false;
    if (toDate && rowDate > toDate) return false;
    if (q) {
      var text = (r.timestamp + ' ' + r.user + ' ' + r.action + ' ' + r.where + ' ' + r.objectType + ' ' + r.objectId + ' ' + (r.valueBefore || '') + ' ' + (r.valueAfter || '')).toLowerCase();
      if (text.indexOf(q) === -1) return false;
    }
    return true;
  });
}
function exportActivityLogV3() {
  var rows = getFilteredActivityLogRowsForV3();
  var productEl = document.getElementById('activity-log-product-v3');
  var showProductColumn = productEl && productEl.value === 'all';
  var header = showProductColumn ? 'Timestamp,User,Action,Page,Product,Affected item,Details,Agent Assisted' : 'Timestamp,User,Action,Page,Affected item,Details,Agent Assisted';
  var lines = [header].concat(rows.map(function(r) {
    var obj = getAffectedItemLabel(r);
    var agentAssisted = r.agentAssisted === true ? 'Yes' : 'No';
    var details = (r.valueAtTime || '').trim();
    var product = (r.product || '').trim();
    if (showProductColumn) {
      return activityLogCsvEscape(r.timestamp) + ',' + activityLogCsvEscape(r.user) + ',' + activityLogCsvEscape(r.action) + ',' + activityLogCsvEscape(r.where) + ',' + activityLogCsvEscape(product) + ',' + activityLogCsvEscape(obj) + ',' + activityLogCsvEscape(details) + ',' + activityLogCsvEscape(agentAssisted);
    }
    return activityLogCsvEscape(r.timestamp) + ',' + activityLogCsvEscape(r.user) + ',' + activityLogCsvEscape(r.action) + ',' + activityLogCsvEscape(r.where) + ',' + activityLogCsvEscape(obj) + ',' + activityLogCsvEscape(details) + ',' + activityLogCsvEscape(agentAssisted);
  }));
  var csv = lines.join('\r\n');
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'activity-log-' + new Date().toISOString().slice(0, 10) + '.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}
function activityLogRenderV3() {
  var tbody = document.getElementById('activity-log-tbody-v3');
  if (!tbody) return;
  var productEl = document.getElementById('activity-log-product-v3');
  var productValue = (productEl && productEl.value) ? productEl.value : 'Carbon Performance';
  var showProductColumn = productValue === 'all';
  var thProduct = document.getElementById('activity-log-th-product-v3');
  var accordionProduct = document.getElementById('activity-log-filter-accordion-product-v3');
  if (thProduct) thProduct.style.display = showProductColumn ? '' : 'none';
  if (accordionProduct) accordionProduct.style.display = showProductColumn ? '' : 'none';
  var rows = getFilteredActivityLogRowsForV3();
  var objTypeEsc, objIdEsc, ts, who, emailEsc, act, where, productEsc, objHtml, detailsPreview, agentAssisted;
  tbody.innerHTML = rows.map(function(r) {
    objTypeEsc = activityLogEscape(r.objectType).replace(/'/g, "\\'");
    objIdEsc = activityLogEscape(r.objectId).replace(/'/g, "\\'");
    ts = activityLogEscape(r.timestamp);
    who = activityLogEscape(r.user);
    emailEsc = activityLogEscape(r.email || '');
    act = activityLogEscape(r.action);
    where = activityLogEscape(r.where);
    productEsc = activityLogEscape(r.product || '');
    objHtml = getAffectedItemHtml(r);
    detailsPreview = (r.valueAtTime || '').trim();
    if (detailsPreview.length > 80) detailsPreview = detailsPreview.slice(0, 77) + '…';
    detailsPreview = detailsPreview ? activityLogEscape(detailsPreview) : '';
    agentAssisted = r.agentAssisted === true ? 'Yes' : 'No';
    var productTd = showProductColumn ? '<td class="activity-log-product-cell">' + productEsc + '</td>' : '';
    return '<tr data-activity-id="' + r.id + '" data-object-type="' + activityLogEscape(r.objectType) + '" data-object-id="' + activityLogEscape(r.objectId) + '" onclick="handleActivityRowClickV3(event)">' +
      '<td class="activity-log-ts-cell"><span class="activity-log-v2-line-clamp">' + ts + '</span></td>' +
      productTd +
      '<td class="activity-log-user-cell"><span class="activity-log-v2-line-clamp">' + who + '</span>' + (emailEsc ? '<span class="activity-log-user-email">' + emailEsc + '</span>' : '') + '</td>' +
      '<td class="activity-log-action-cell"><span class="activity-log-v2-line-clamp">' + act + '</span></td>' +
      '<td class="activity-log-where-cell"><span class="activity-log-v2-line-clamp">' + where + '</span></td>' +
      '<td class="activity-log-affected-cell">' + objHtml + '</td>' +
      '<td class="activity-log-details-cell">' + (detailsPreview ? '<span class="activity-log-v2-line-clamp" title="' + activityLogEscape(r.valueAtTime || '') + '">' + detailsPreview + '</span>' : '<span class="activity-log-empty-cell">—</span>') + '<button type="button" class="activity-log-view-details" onclick="event.stopPropagation(); openActivityLogFullDetails(' + r.id + ')" aria-label="View full details">View</button></td>' +
      '<td class="activity-log-agent-cell">' + agentAssisted + '</td></tr>';
  }).join('');
  renderActivityLogFilterPillsV3();
  var input = document.getElementById('activity-log-search-v3');
  var clearBtn = document.getElementById('activity-log-v3-search-clear');
  var wrapper = input && input.closest('.activity-log-v2-search-wrapper');
  if (activityLogV3AuditFilter && input && clearBtn && wrapper) {
    input.value = 'Audit trail: ' + activityLogV3AuditFilter.objectType + ' — ' + activityLogV3AuditFilter.objectId;
    input.readOnly = true;
    clearBtn.classList.add('visible');
    wrapper.classList.add('has-audit-filter');
  } else if (input && clearBtn && wrapper) {
    input.readOnly = false;
    clearBtn.classList.remove('visible');
    wrapper.classList.remove('has-audit-filter');
  }
}
function toggleActivityLogFiltersV3(ev) {
  ev.stopPropagation();
  var btn = document.getElementById('activity-log-filters-btn-v3');
  var backdrop = document.getElementById('activity-log-filters-backdrop-v3');
  var drawer = document.getElementById('activity-log-filters-drawer-v3');
  if (!btn || !backdrop || !drawer) return;
  var isOpen = !backdrop.classList.contains('open');
  backdrop.classList.toggle('open', isOpen);
  drawer.classList.toggle('open', isOpen);
  backdrop.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}
function closeActivityLogFiltersDrawerV3() {
  var btn = document.getElementById('activity-log-filters-btn-v3');
  var backdrop = document.getElementById('activity-log-filters-backdrop-v3');
  var drawer = document.getElementById('activity-log-filters-drawer-v3');
  if (backdrop) backdrop.classList.remove('open');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.setAttribute('aria-hidden', 'true');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}
function toggleActivityLogFilterAccordionV3(section) {
  var drawer = document.getElementById('activity-log-filters-drawer-v3');
  if (!drawer) return;
  var item = drawer.querySelector('.activity-log-filter-accordion-item[data-accordion="' + section + '"]');
  if (!item) return;
  item.classList.toggle('expanded');
}
function clearAllActivityLogFiltersV3() {
  ['activity-log-filter-user-options-v3', 'activity-log-filter-action-options-v3', 'activity-log-filter-object-options-v3', 'activity-log-filter-page-options-v3', 'activity-log-filter-product-options-v3'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) { el.querySelectorAll('input[type="checkbox"]').forEach(function(cb) { cb.checked = false; }); }
  });
  activityLogApplyFiltersV3();
  updateActivityLogFilterBadgeV3();
  renderActivityLogFilterPillsV3();
}
function updateActivityLogFilterBadgeV3() {
  var f = getActivityLogSelectedFiltersV3();
  var productEl = document.getElementById('activity-log-product-v3');
  var showProductFilter = productEl && productEl.value === 'all';
  var n = f.users.length + f.actions.length + f.objectTypes.length + f.pages.length + (showProductFilter ? f.products.length : 0);
  var badge = document.getElementById('activity-log-filter-badge-v3');
  if (!badge) return;
  badge.textContent = n;
  badge.style.display = n > 0 ? 'inline-flex' : 'none';
}

