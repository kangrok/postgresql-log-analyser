import { createApp } from 'vue';
import App from './App.vue'

// Vue.config.productionTip = false;

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from "vuetify/labs/components";

const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable,
  },
  directives,
})

createApp(App).use(vuetify).mount('#app')