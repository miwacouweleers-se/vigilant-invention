/**
 * Data Ownership – campaign integration (non-invasive)
 * Exposes resolveAssignmentsForCampaign for future campaign auto-assignment.
 * Does not modify existing campaign code.
 */

(function (global) {
  'use strict';

  var OwnershipLib = global.OwnershipLib;

  /**
   * Propose assignments for each (site|BU) × category in scope for a campaign.
   * @param {Object} scopeSelections - { siteIds?: string[], businessUnitIds?: string[] }
   * @param {string[]} categories - dataCategoryIds
   * @param {Object} dateRange - { from?: string, to?: string } (ISO dates; uses from for "as-of")
   * @param {Object} ctx - { rules, users, teams } (same as resolveOwners)
   * @returns {Object[]} Array of { siteId?, businessUnitId?, dataCategoryId, resolution: resolveOwners result }
   */
  function resolveAssignmentsForCampaign(scopeSelections, categories, dateRange, ctx) {
    if (!OwnershipLib || !OwnershipLib.resolveOwners) {
      return [];
    }
    var siteIds = scopeSelections.siteIds || [];
    var businessUnitIds = scopeSelections.businessUnitIds || [];
    var atDate = (dateRange && dateRange.from) || undefined;
    var results = [];
    var i, j;

    for (i = 0; i < siteIds.length; i++) {
      for (j = 0; j < categories.length; j++) {
        results.push({
          siteId: siteIds[i],
          businessUnitId: null,
          dataCategoryId: categories[j],
          resolution: OwnershipLib.resolveOwners(
            { siteId: siteIds[i], dataCategoryId: categories[j], atDate: atDate },
            ctx
          )
        });
      }
    }
    for (i = 0; i < businessUnitIds.length; i++) {
      for (j = 0; j < categories.length; j++) {
        results.push({
          siteId: null,
          businessUnitId: businessUnitIds[i],
          dataCategoryId: categories[j],
          resolution: OwnershipLib.resolveOwners(
            { businessUnitId: businessUnitIds[i], dataCategoryId: categories[j], atDate: atDate },
            ctx
          )
        });
      }
    }

    return results;
  }

  global.OwnershipIntegrations = {
    resolveAssignmentsForCampaign: resolveAssignmentsForCampaign
  };
})(typeof window !== 'undefined' ? window : this);
