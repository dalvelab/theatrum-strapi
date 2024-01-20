'use strict';

/**
 * corporate-schedule-archive controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::corporate-schedule-archive.corporate-schedule-archive', ({strapi}) => ({
  async find() {
    const data = await strapi.entityService.findMany("api::corporate-schedule-archive.corporate-schedule-archive", {
      sort: {
        date: 'desc'
      }
    });

    if (!data || data.length === 0) {
      return {
        data: []
      };
    }

    const uniqueMonthsSet = new Set(data.map((event) => `${new Date(event.date).getMonth() + 1}-${new Date(event.date).getFullYear()}`));

    const uniqueMonths = [];

    uniqueMonthsSet.forEach((el) => uniqueMonths.push(el));

    return { data: uniqueMonths };
  },
    async findOne(ctx) {
    const id = ctx.params.id;

    const month = id.split('-')[0];
    const year = id.split('-')[1];

    const data = await strapi.entityService.findMany("api::corporate-schedule-archive.corporate-schedule-archive", {
      filters: {
        date: {
          $gte: new Date(`${year}-${month}-01`),
          $lte: new Date(`${year}-${month}-${new Date(year, month, 0).getDate()}`)
        }
      },
      sort: {
        date: 'desc'
      },
      populate: ["people", "people.worker"]
    });

    const response = data.map((event) => {
      return {
        id: event.id,
        attributes: {
          ...event
        }
      }
    }) 

    return { data: response };
  }
}));
