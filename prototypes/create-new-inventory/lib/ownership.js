/**
 * Data Ownership Register – resolution and coverage validation
 * Precedence: 1) Site + Category, 2) BU + Category, 3) Global + Category
 * Within a rule: primaryUser → secondaryUser → team → approverUser (first active).
 */

(function (global) {
  'use strict';

  function byId(list, id) {
    if (!id) return null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function ruleInDateWindow(rule, atDate) {
    if (!rule.active) return false;
    var d = atDate ? new Date(atDate) : new Date();
    if (rule.effectiveFrom && new Date(rule.effectiveFrom) > d) return false;
    if (rule.effectiveTo && new Date(rule.effectiveTo) < d) return false;
    return true;
  }

  /**
   * Resolve owners for a given scope and data category.
   * @param {Object} input - { siteId?, businessUnitId?, dataCategoryId, atDate? }
   * @param {Object} ctx - { rules: OwnershipRule[], users: User[], teams: Team[] }
   * @returns {Object} { primary?, secondary?, team?, approver?, sourceRuleId?, warnings: string[], resolved: boolean }
   */
  function resolveOwners(input, ctx) {
    var rules = ctx.rules || [];
    var users = ctx.users || [];
    var teams = ctx.teams || [];
    var siteId = input.siteId;
    var businessUnitId = input.businessUnitId;
    var dataCategoryId = input.dataCategoryId;
    var atDate = input.atDate;
    var warnings = [];
    var candidateRules = [];

    if (!dataCategoryId) {
      return { warnings: ['Missing dataCategoryId'], resolved: false };
    }

    for (var i = 0; i < rules.length; i++) {
      var r = rules[i];
      if (r.dataCategoryId !== dataCategoryId) continue;
      if (!ruleInDateWindow(r, atDate)) continue;

      if (r.scope === 'site' && r.siteId === siteId) {
        candidateRules.push({ rule: r, precedence: 1 });
      } else if (r.scope === 'businessUnit' && r.businessUnitId === businessUnitId) {
        candidateRules.push({ rule: r, precedence: 2 });
      } else if (r.scope === 'global' && !r.siteId && !r.businessUnitId) {
        candidateRules.push({ rule: r, precedence: 3 });
      }
    }

    candidateRules.sort(function (a, b) { return a.precedence - b.precedence; });
    var best = candidateRules.length ? candidateRules[0] : null;
    if (!best) {
      warnings.push('No applicable rule for this scope and category');
      return { warnings: warnings, resolved: false };
    }

    var rule = best.rule;
    var primary = byId(users, rule.primaryUserId);
    var secondary = byId(users, rule.secondaryUserId);
    var approver = byId(users, rule.approverUserId);
    var team = byId(teams, rule.teamId);

    if (primary && !primary.active) {
      warnings.push('Primary user inactive');
      primary = null;
    }
    if (secondary && !secondary.active) {
      warnings.push('Secondary user inactive');
      secondary = null;
    }
    if (approver && !approver.active) {
      warnings.push('Approver inactive');
      approver = null;
    }
    if (primary && !primary.email) warnings.push('Primary missing email');
    if (secondary && !secondary.email) warnings.push('Secondary missing email');
    if (approver && !approver.email) warnings.push('Approver missing email');

    var chosen = null;
    var chosenType = null;
    if (primary) {
      chosen = primary;
      chosenType = 'primary';
    } else if (secondary) {
      chosen = secondary;
      chosenType = 'secondary';
    } else if (team) {
      chosen = team;
      chosenType = 'team';
    } else if (approver) {
      chosen = approver;
      chosenType = 'approver';
    }

    if (!chosen) {
      warnings.push('No active primary, secondary, team, or approver');
      return {
        primary: primary || undefined,
        secondary: secondary || undefined,
        team: team || undefined,
        approver: approver || undefined,
        sourceRuleId: rule.id,
        warnings: warnings,
        resolved: false
      };
    }

    return {
      primary: primary || undefined,
      secondary: secondary || undefined,
      team: team || undefined,
      approver: approver || undefined,
      sourceRuleId: rule.id,
      warnings: warnings,
      resolved: true
    };
  }

  /**
   * Validate coverage over sites × categories and/or businessUnits × categories.
   * @param {Object} options - { siteIds?: string[], businessUnitIds?: string[], dataCategoryIds: string[], atDate?: string, rules, users, teams, sites, businessUnits }
   * @returns {Object} { gaps: [], overlaps: [], contactIssues: [] } – each item has scope info and messages
   */
  function validateCoverage(options) {
    var siteIds = options.siteIds || [];
    var businessUnitIds = options.businessUnitIds || [];
    var categoryIds = options.dataCategoryIds || [];
    var atDate = options.atDate;
    var ctx = {
      rules: options.rules || [],
      users: options.users || [],
      teams: options.teams || []
    };
    var gaps = [];
    var overlaps = [];
    var contactIssues = [];
    var checked = Object.create(null);

    function key(siteId, buId, catId) {
      return (siteId || '') + '|' + (buId || '') + '|' + catId;
    }

    function checkSiteCategory(sid, cid) {
      var k = key(sid, null, cid);
      if (checked[k]) return;
      checked[k] = true;
      var result = resolveOwners({ siteId: sid, dataCategoryId: cid, atDate: atDate }, ctx);
      if (!result.resolved && !result.sourceRuleId) {
        gaps.push({ scope: 'site', siteId: sid, businessUnitId: null, dataCategoryId: cid, message: 'No rule' });
      } else if (!result.resolved && result.sourceRuleId && result.warnings.length) {
        contactIssues.push({
          scope: 'site',
          siteId: sid,
          businessUnitId: null,
          dataCategoryId: cid,
          sourceRuleId: result.sourceRuleId,
          messages: result.warnings
        });
      }
    }

    function checkBUCategory(buid, cid) {
      var k = key(null, buid, cid);
      if (checked[k]) return;
      checked[k] = true;
      var result = resolveOwners({ businessUnitId: buid, dataCategoryId: cid, atDate: atDate }, ctx);
      if (!result.resolved && !result.sourceRuleId) {
        gaps.push({ scope: 'businessUnit', siteId: null, businessUnitId: buid, dataCategoryId: cid, message: 'No rule' });
      } else if (!result.resolved && result.sourceRuleId && result.warnings.length) {
        contactIssues.push({
          scope: 'businessUnit',
          siteId: null,
          businessUnitId: buid,
          dataCategoryId: cid,
          sourceRuleId: result.sourceRuleId,
          messages: result.warnings
        });
      }
    }

    for (var s = 0; s < siteIds.length; s++) {
      for (var c = 0; c < categoryIds.length; c++) {
        checkSiteCategory(siteIds[s], categoryIds[c]);
      }
    }
    for (var b = 0; b < businessUnitIds.length; b++) {
      for (var c2 = 0; c2 < categoryIds.length; c2++) {
        checkBUCategory(businessUnitIds[b], categoryIds[c2]);
      }
    }

    return { gaps: gaps, overlaps: overlaps, contactIssues: contactIssues };
  }

  global.OwnershipLib = {
    resolveOwners: resolveOwners,
    validateCoverage: validateCoverage
  };
})(typeof window !== 'undefined' ? window : this);
