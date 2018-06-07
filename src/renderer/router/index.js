import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shell',
      component: require('@/components/Shell').default,
      children: [
        {
          path: '/browse/:path',
          name: 'browse',
          component: require('@/components/DirBrowser').default,
          props: true,
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
