const CyrillicToTranslit = require("cyrillic-to-translit-js");

const cyrillicToTranslit = new CyrillicToTranslit();

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.title) {
      const newDate = new Date();

      const title = data.title.replace(/,/gi, '').replace(/_/g, ' ');
      const date = `${String(newDate.getDate()).padStart(2, '0')}-${String(newDate.getMonth()).padStart(2, '0')}-${newDate.getFullYear()}`;

      data.slug = cyrillicToTranslit
        .transform(`${title}_${date}`, "-")
        .toLowerCase();
    }
  },
  beforeUpdate(event) { 
    const { data } = event.params;
    if (data.title) {
      const created_at = data.slug.split('_')[1]; 
      const title = data.title.replace(/,/gi, '').replace(/_/g, ' ');

      data.slug = cyrillicToTranslit
        .transform(`${title}_${created_at}`, "-")
        .toLowerCase();
    }
  },
};
