import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/:lang?',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/Index.vue') },
      {
        path: 'about',
        name: 'about',
        component: () => import('pages/About.vue')
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
