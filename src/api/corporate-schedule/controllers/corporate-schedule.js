'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

function getMonthIndex(index) {
  return index < 10 ? `0${index}` : `${index}`
}

module.exports = createCoreController('api::corporate-schedule.corporate-schedule', ({strapi}) => ({
  async find() {
    const data = await strapi.entityService.findMany("api::corporate-schedule.corporate-schedule", {
      sort: {
        date: 'asc'
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

    const startDate = `${year}-${getMonthIndex(month)}-01T00:00:00`.toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' }).split(',')[0];
    const endDate = `${year}-${getMonthIndex(month)}-${new Date(year, month, 0).getDate()}T23:59:59`.toLocaleString('ru-RU', { timeZone: 'Asia/Yekaterinburg' }).split(',')[0];

    const data = await strapi.entityService.findMany("api::corporate-schedule.corporate-schedule", {
      filters: {
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        }
      },
      sort: {
        date: 'asc'
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
