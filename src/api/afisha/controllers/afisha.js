'use strict';

/**
 * afisha controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::afisha.afisha', ({strapi}) => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);

    if (!data || data.length === 0) {
      return { data, meta };
    }

    const sortedData = data.map((afisha) => {
      if (!afisha.attributes.tickets || afisha.attributes.tickets.length < 2) {
        return afisha;
      }

      const sortTickets = afisha.attributes.tickets.sort((a, b) => new Date(a.date) - new Date(b.date))
      
      afisha.attributes.tickets = sortTickets;
      
      return afisha;
    })
    .sort((a, b) => {
      if (!a.attributes.tickets) {
        return;
      }

      return new Date(a.attributes.tickets[0].date) - new Date(b.attributes.tickets[0].date)
    });

    return { data: sortedData, meta };
  },
  async findOne(ctx) {
    const { data, meta } = await super.findOne(ctx);

    if (!data || !data.attributes.tickets || data.attributes.tickets.length < 2) {
      return { data, meta };
    }

    const sortedTickets = data.attributes.tickets.sort((a, b) => new Date(a.date) - new Date(b.date));

    data.attributes.tickets = sortedTickets;

    return { data, meta };
  }
}));
