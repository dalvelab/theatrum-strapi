'use strict';

/**
 * push-subscription service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::push-subscription.push-subscription', ({ strapi }) => ({
  async sendNotification(subscription, payload) {
    try {
      const result = await webpush.sendNotification(subscription, JSON.stringify(payload));
      return result;
    } catch (error) {
      strapi.log.error('Error sending push notification:', error);
      throw error;
    }
  },

  async sendToAll(subscriptions, payload) {
    const results = [];
    for (const subscription of subscriptions) {
      try {
        const result = await this.sendNotification(subscription, payload);
        results.push({ success: true, result });
      } catch (error) {
        results.push({ success: false, error });
      }
    }
    return results;
  }
}));
