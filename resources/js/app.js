
require('./bootstrap');

window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('tareas', require('./components/TareasComponent.vue').default);
Vue.component('addbus', require('./components/AddBusComponent.vue').default);
// Vue.component('crear', require('./components/CrearComponent.vue').default);


const app = new Vue({
    el: '#app',
});
