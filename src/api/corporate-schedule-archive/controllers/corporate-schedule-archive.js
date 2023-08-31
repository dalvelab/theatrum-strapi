'use strict';

/**
 * corporate-schedule-archive controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::corporate-schedule-archive.corporate-schedule-archive', ({strapi}) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    if (!data || data.length === 0) {
      return { data, meta };
    }

    const sortedData = data.sort((a, b) => {
      return new Date(b.attributes.date) - new Date(a.attributes.date)
    });

    return { data: sortedData, meta };
  },
}));
