'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::corporate-schedule.corporate-schedule', ({strapi}) => ({
  async find() {
    const data = await strapi.entityService.findMany("api::corporate-schedule.corporate-schedule", {
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

    const data = await strapi.entityService.findMany("api::corporate-schedule.corporate-schedule", {
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
