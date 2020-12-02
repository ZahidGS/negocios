import Vue from 'vue';
import VueRouter from 'vue-router';
import VuePageTransition from 'vue-page-transition';
import InicioEstablecimientos from '../components/InicioEstablecimientos';
import MostrarEstablecimiento from '../components/MostrarEstablecimiento';


const routes = [{
        path: '/',
        component: InicioEstablecimientos
    },
    {
        path: '/establecimiento/:id',
        name: 'establecimiento',
        component: MostrarEstablecimiento
    }
]

const router = new VueRouter({
    mode: 'history', //history elimina que en las rutas aparezca el #
    routes
});

Vue.use(VueRouter);
Vue.use(VuePageTransition);

export default router;