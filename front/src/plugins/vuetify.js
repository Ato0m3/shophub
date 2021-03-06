import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
        theme: {
          themes: {
            light: {
              primary: '#2C5282',
              secondary: '#4C51BF',
              accent: '#8c9eff',
              error: '#b71c1c',
            },
          },
        },
});
