module.exports = {
  async afterCreate(event) {
    try {
      const pushService = strapi.service("api::push-subscription.push-subscription");

      const subscriptions = await strapi.entityService.findMany(
        'api::push-subscription.push-subscription',
        {
          fields: ['subscription'],
        }
      );

      const { data } = event.params;

      const payload = {
        title: "Обновление в расписании",
        body: data.title,
        icon: "/icon-192x192.png",
        data: {
          url: "https://work.theatrum.center/",
          dateOfArrival: Date.now(),
        },
      };

      pushService.sendToAll(
        subscriptions.map((sub) => sub.subscription),
        payload
      );
    } catch (error) {
      strapi.log.error("Error sending push notification:", error);
    }
  },
};
