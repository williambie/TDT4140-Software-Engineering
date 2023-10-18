import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const pinia = createPinia();

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import "@mdi/font/css/materialdesignicons.css";

const puDarkMode = {
  dark: true,
  colors: {
    background: '#000000',
    surface: '#212121',
    error: '#FF5F00',
  }
}

const puLightMode = {
  dark: false,
  colors: {
    error: '#FF5F00',
  }
}

const vuetify = createVuetify({
  theme: {
    defaultTheme: "puLightMode",
    themes: {
      puDarkMode,
      puLightMode
    }
  },
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

createApp(App).use(vuetify).use(router).use(pinia).mount("#app");
