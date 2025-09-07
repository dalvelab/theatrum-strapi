'use strict';

/**
 * push-subscription controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::push-subscription.push-subscription', ({strapi}) => ({
  async find() {
    const response = await  strapi.entityService.findMany('api::push-subscription.push-subscription');

    return { data: response };
  }
}));
