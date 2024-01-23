import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductDetails from '../views/ProductDetails.vue';
import CreateProduct from '../views/CreateProduct.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetails },
  { path: '/create-product', component: CreateProduct },
];

const router = createRouter({
  history: createWebHistory('/last-try/'),
  routes,
});

export default router;
