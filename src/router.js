import Vue from 'vue';
import Router from 'vue-router';
import Timer from './views/Timer.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'timer',
      component: Timer,
    },
    {
      path: '/player',
      name: 'player',
      // route level code-splitting
      // this generates a separate chunk (Player.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Player" */ './views/Player.vue'),
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('./views/Setting.vue'),
    },
  ],
});
