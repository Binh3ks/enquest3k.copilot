import station2Data from '../data/hubs/station2_content_bank.json';

/**
 * Async-Ready Content Bank Service Interface.
 * Standardized for future database/API migration with 0 client code changes.
 */
export const contentBankService = {
  /**
   * Fetch all content items for a specific week and station
   */
  async getStationContent({ week = 'W33', station = '2', mode = 'learn' }) {
    // Simulate async API delay (60ms)
    await new Promise((resolve) => setTimeout(resolve, 60));
    
    return station2Data.filter(
      (item) => item.station === String(station) && (!week || item.week === week)
    );
  },

  /**
   * Get single item by content_id
   */
  async getContentById(contentId) {
    await new Promise((resolve) => setTimeout(resolve, 30));
    const found = station2Data.find((item) => item.content_id === contentId);
    if (!found) throw new Error(`Content ID ${contentId} not found`);
    return found;
  }
};
