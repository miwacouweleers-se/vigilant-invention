/**
 * Data Ownership Register – seed fixtures
 * Models: User, Team, Site, BusinessUnit, DataCategory, OwnershipRule
 * Loaded by the prototype for in-memory "API".
 */

(function (global) {
  'use strict';

  var Users = [
    { id: 'u1', name: 'Sarah Chen', email: 'sarah.chen@example.com', jobTitle: 'Sustainability Lead', role: 'admin', managerId: null, location: 'Chicago', businessUnit: 'bu-ops', active: true },
    { id: 'u2', name: 'Marcus Webb', email: 'marcus.webb@example.com', jobTitle: 'EMEA Data Manager', role: 'user', managerId: 'u1', location: 'London', businessUnit: 'bu-emea', active: true },
    { id: 'u3', name: 'James Park', email: 'james.park@example.com', jobTitle: 'Facilities Coordinator', role: 'user', managerId: 'u1', location: 'Chicago', businessUnit: 'bu-ops', active: true },
    { id: 'u4', name: 'Anna Lindqvist', email: 'anna.lindqvist@example.com', jobTitle: 'APAC Reporting', role: 'user', managerId: 'u2', location: 'Stockholm', businessUnit: 'bu-emea', active: true },
    { id: 'u5', name: 'Yuki Tanaka', email: 'yuki.tanaka@example.com', jobTitle: 'Site Lead Tokyo', role: 'user', managerId: null, location: 'Tokyo', businessUnit: 'bu-apac', active: true },
    { id: 'u6', name: 'Inactive User', email: 'inactive@example.com', jobTitle: 'Former Lead', role: 'user', managerId: 'u1', location: 'Chicago', businessUnit: 'bu-ops', active: false },
    { id: 'u7', name: 'Elena Rodriguez', email: 'elena.rodriguez@example.com', jobTitle: 'Mexico Site Lead', role: 'user', managerId: 'u1', location: 'Mexico City', businessUnit: 'bu-ops', active: true },
    { id: 'u8', name: 'David Kim', email: 'david.kim@example.com', jobTitle: 'Travel & Commuting', role: 'user', managerId: 'u1', location: 'Chicago', businessUnit: 'bu-ops', active: true },
    { id: 'u9', name: 'No Email User', email: '', jobTitle: 'Contractor', role: 'user', managerId: 'u2', location: 'London', businessUnit: 'bu-emea', active: true },
    { id: 'u10', name: 'Priya Sharma', email: 'priya.sharma@example.com', jobTitle: 'India Operations', role: 'user', managerId: 'u5', location: 'Mumbai', businessUnit: 'bu-apac', active: true }
  ];

  var Teams = [
    { id: 't1', name: 'Sustainability Core', email: 'sustainability@example.com', memberIds: ['u1', 'u2', 'u8'] },
    { id: 't2', name: 'Facilities & Energy', email: 'facilities@example.com', memberIds: ['u3', 'u5', 'u7'] },
    { id: 't3', name: 'APAC Data', email: 'apac-data@example.com', memberIds: ['u5', 'u10', 'u4'] }
  ];

  var Sites = [
    { id: 's1', name: 'Chicago HQ', code: 'CHI-HQ', region: 'AMER', businessUnit: 'bu-ops' },
    { id: 's2', name: 'London Office', code: 'LON-OFF', region: 'EMEA', businessUnit: 'bu-emea' },
    { id: 's3', name: 'Tokyo Office', code: 'TYO-OFF', region: 'APAC', businessUnit: 'bu-apac' },
    { id: 's4', name: 'Mexico City Plant', code: 'MEX-PLT', region: 'AMER', businessUnit: 'bu-ops' },
    { id: 's5', name: 'Stockholm Office', code: 'STO-OFF', region: 'EMEA', businessUnit: 'bu-emea' },
    { id: 's6', name: 'Mumbai Office', code: 'BOM-OFF', region: 'APAC', businessUnit: 'bu-apac' }
  ];

  var BusinessUnits = [
    { id: 'bu-ops', name: 'Operations', code: 'OPS', parentId: null },
    { id: 'bu-emea', name: 'EMEA', code: 'EMEA', parentId: null },
    { id: 'bu-apac', name: 'APAC', code: 'APAC', parentId: null }
  ];

  var DataCategories = [
    { id: 'cat-elec', name: 'Electricity', code: 'ELEC', description: 'Grid and renewable electricity' },
    { id: 'cat-fuel', name: 'Fuel', code: 'FUEL', description: 'Fleet and stationary fuel' },
    { id: 'cat-watr', name: 'Water', code: 'WATR', description: 'Water consumption and discharge' },
    { id: 'cat-wste', name: 'Waste', code: 'WSTE', description: 'Waste types and disposal' },
    { id: 'cat-trvl', name: 'Travel', code: 'TRVL', description: 'Business travel and commuting' }
  ];

  var OwnershipRules = [
    { id: 'r1', scope: 'site', siteId: 's1', businessUnitId: null, dataCategoryId: 'cat-elec', primaryUserId: 'u3', secondaryUserId: 'u1', approverUserId: 'u1', teamId: 't2', notes: 'HQ electricity', effectiveFrom: '2024-01-01', effectiveTo: null, active: true },
    { id: 'r2', scope: 'site', siteId: 's1', businessUnitId: null, dataCategoryId: 'cat-fuel', primaryUserId: 'u3', secondaryUserId: null, approverUserId: 'u1', teamId: null, notes: '', effectiveFrom: '2024-01-01', effectiveTo: null, active: true },
    { id: 'r3', scope: 'site', siteId: 's1', businessUnitId: null, dataCategoryId: 'cat-watr', primaryUserId: 'u3', secondaryUserId: 'u1', approverUserId: 'u1', teamId: null, notes: '', effectiveFrom: '2024-01-01', effectiveTo: null, active: true },
    { id: 'r4', scope: 'site', siteId: 's2', businessUnitId: null, dataCategoryId: 'cat-elec', primaryUserId: 'u2', secondaryUserId: 'u4', approverUserId: 'u2', teamId: 't1', notes: '', effectiveFrom: '2024-01-01', effectiveTo: null, active: true },
    { id: 'r5', scope: 'site', siteId: 's2', businessUnitId: null, dataCategoryId: 'cat-wste', primaryUserId: 'u2', secondaryUserId: null, approverUserId: 'u2', teamId: null, notes: '', effectiveFrom: '2024-01-01', effectiveTo: '2024-12-31', active: true },
    { id: 'r6', scope: 'site', siteId: 's3', businessUnitId: null, dataCategoryId: 'cat-elec', primaryUserId: 'u5', secondaryUserId: 'u10', approverUserId: 'u5', teamId: 't3', notes: '', effectiveFrom: '2024-01-01', effectiveTo: null, active: true },
    { id: 'r7', scope: 'site', siteId: 's3', businessUnitId: null, dataCategoryId: 'cat-fuel', primaryUserId: 'u5', secondaryUserId: null, approverUserId: 'u5', teamId: null, notes: '', effectiveFrom: '2024-01-01', effectiveTo: null, active: true },
    { id: 'r8', scope: 'site', siteId: 's4', businessUnitId: null, dataCategoryId: 'cat-elec', primaryUserId: 'u7', secondaryUserId: 'u1', approverUserId: 'u1', teamId: 't2', notes: '', effectiveFrom: '2024-06-01', effectiveTo: null, active: true },
    { id: 'r9', scope: 'businessUnit', siteId: null, businessUnitId: 'bu-emea', dataCategoryId: 'cat-wste', primaryUserId: 'u2', secondaryUserId: 'u4', approverUserId: 'u2', teamId: null, notes: 'BU-level waste for EMEA', effectiveFrom: '2025-01-01', effectiveTo: null, active: true },
    { id: 'r10', scope: 'global', siteId: null, businessUnitId: null, dataCategoryId: 'cat-trvl', primaryUserId: 'u8', secondaryUserId: 'u1', approverUserId: 'u1', teamId: 't1', notes: 'Global travel default', effectiveFrom: '2024-01-01', effectiveTo: null, active: true },
    { id: 'r11', scope: 'site', siteId: 's5', businessUnitId: null, dataCategoryId: 'cat-elec', primaryUserId: 'u6', secondaryUserId: 'u4', approverUserId: 'u2', teamId: null, notes: 'Inactive primary – tests fallback', effectiveFrom: '2024-01-01', effectiveTo: null, active: true },
    { id: 'r12', scope: 'site', siteId: 's6', businessUnitId: null, dataCategoryId: 'cat-elec', primaryUserId: 'u10', secondaryUserId: 'u5', approverUserId: 'u5', teamId: 't3', notes: '', effectiveFrom: '2025-06-01', effectiveTo: null, active: true }
  ];

  global.OwnershipFixtures = {
    users: Users,
    teams: Teams,
    sites: Sites,
    businessUnits: BusinessUnits,
    dataCategories: DataCategories,
    ownershipRules: OwnershipRules
  };
})(typeof window !== 'undefined' ? window : this);
