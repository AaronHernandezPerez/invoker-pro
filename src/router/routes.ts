import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/:lang?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      {
        path: 'about',
        name: 'about',
        component: () => import('pages/About.vue'),
      },
    ],
  },
];

export default routes;
