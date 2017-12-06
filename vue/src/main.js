// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css'
import 'bulma/bulma.sass'
import 'leaflet/dist/leaflet.css'
import Vue2Leaflet from 'vue2-leaflet'
import VeeValidate from 'vee-validate'
import '@/assets/js/bulma.js'
import '@/assets/js/main.js'
import '@/assets/sass/main.scss'
import vSelect from 'vue-select'
import Datepicker from 'vuejs-datepicker'

Vue.config.productionTip = false
//leafletcomponents voor maps
Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
Vue.component('v-popup', Vue2Leaflet.Popup);
Vue.component('v-icondefault', Vue2Leaflet.IconDefault)
//multiselect plugin component
Vue.component('v-select', vSelect)
//vuedatepicker
Vue.component('datepicker', Datepicker);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
