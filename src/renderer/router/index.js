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
          path: '/working/:path',
          name: 'working',
          component: require('@/components/WorkingPane').default,
          props: true,
          children: [
            {
              path: '/working/:path/file/:name',
              name: 'working/file',
              component: require('@/components/FileInspector').default,
              props: true,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
