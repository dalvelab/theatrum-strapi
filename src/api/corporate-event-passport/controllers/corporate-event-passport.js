'use strict';

/**
 * corporate-event-passport controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::corporate-event-passport.corporate-event-passport', ({strapi}) => ({
  async find() {
    const data = await strapi.entityService.findMany('api::corporate-event-passport.corporate-event-passport', {
      populate: ['events', 'events.document']
    });

    if (!data || data.events.length === 0) {
      return data;
    }

    const sortedEvents = data.events.sort((a, b) => a.title.localeCompare(b.title));

    return {data: {...data, events: sortedEvents}};
  },
}));
