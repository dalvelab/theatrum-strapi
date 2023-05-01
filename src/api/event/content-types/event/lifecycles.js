const CyrillicToTranslit = require("cyrillic-to-translit-js");

const cyrillicToTranslit = new CyrillicToTranslit();

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.title) {
      const title = data.title.replace(/,/gi, '');

      data.slug = cyrillicToTranslit
        .transform(title, "-")
        .toLowerCase();
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (data.title) {
      const title = data.title.replace(/,/gi, '');

      data.slug = cyrillicToTranslit
        .transform(title, "-")
        .toLowerCase();
    }
  },
};
