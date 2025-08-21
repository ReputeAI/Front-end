import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
import Dashboard from '../pages/Dashboard.vue';
import Reviews from '../pages/Reviews.vue';
import Settings from '../pages/Settings.vue';
import Billing from '../pages/Billing.vue';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/dashboard', component: Dashboard },
  { path: '/reviews', component: Reviews },
  { path: '/settings', component: Settings },
  { path: '/billing', component: Billing }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
