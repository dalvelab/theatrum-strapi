'use strict';

/**
 * push-subscription router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::push-subscription.push-subscription');
