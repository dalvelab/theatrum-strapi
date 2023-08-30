'use strict';

/**
 * corporate-schedule controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::corporate-schedule.corporate-schedule', ({strapi}) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    if (!data || data.length === 0) {
      return { data, meta };
    }

    const sortedData = data.sort((a, b) => {
      return new Date(a.attributes.date) - new Date(b.attributes.date)
    });

    return { data: sortedData, meta };
  },
}));

