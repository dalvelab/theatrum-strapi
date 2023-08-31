module.exports = {
  deletePastEventsFromAfisha: {
    task: async ({ strapi }) => {
      try {
        const afisha = await strapi.entityService.findMany("api::afisha.afisha", {
          populate: {
            tickets: {
              fields: ['date'],
              sort: 'date:asc'
            }
          }
        });

        const currentDate = new Date();
        
        afisha.forEach((event) => {
          if (new Date(event.tickets[0].date) < currentDate && event.tickets.length === 1) {
            strapi.entityService.delete("api::afisha.afisha", event.id);
          }

          if (new Date(event.tickets[0].date) < currentDate && event.tickets.length > 1) {
            const tickets = event.tickets.filter((ticket) => new Date(ticket.date) > currentDate);

            if (tickets.length === 0) {
              strapi.entityService.delete("api::afisha.afisha", event.id);
              return;
            }

            strapi.entityService.update("api::afisha.afisha", event.id, {
              data: {
                tickets,
              }
            })
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    options: {
      // rule: '*/1 * * * *',
      rule: "* 22 * * *",
    },
  },
  movePastEventsFromScheduleToArhive: {
    task: async ({ strapi }) => {
      try {
        const currentSchedule = await strapi.entityService.findMany("api::corporate-schedule.corporate-schedule", {
          populate: ["people", "people.worker"]
        });

        if (!currentSchedule || currentSchedule.length === 0) {
          return;
        }

        const currentDate = new Date();

        const outdatedEvents = currentSchedule.filter((event) => new Date(event.date) < currentDate);
        
        // ADD EVENTS TO ARCHIVE
        outdatedEvents.forEach((event) => strapi.entityService.create("api::corporate-schedule-archive.corporate-schedule-archive", {
          data: {
            ...event
          },
          populate: ["people", "people.worker"]
        }));
        // DELETE ADDED TO ARCHIVE EVENTS
        outdatedEvents.forEach((event) => strapi.entityService.delete("api::corporate-schedule.corporate-schedule", event.id));
      } catch (error) {
        console.error(error);
      }
    },
    options: {
      // rule: '*/1 * * * *',
      rule: "* 22 * * *",
    },
  },
};