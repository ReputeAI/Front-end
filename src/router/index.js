import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../pages/LandingPage.vue';
import Dashboard from '../pages/Dashboard.vue';
import Reviews from '../pages/Reviews.vue';
import Replies from '../pages/Replies.vue';
import Settings from '../pages/Settings.vue';
import Billing from '../pages/Billing.vue';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import Integrations from '../pages/Integrations.vue';
import IntegrationCallback from '../pages/IntegrationCallback.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/dashboard', component: Dashboard },
  { path: '/reviews', component: Reviews },
  { path: '/replies', component: Replies },
  { path: '/integrations', component: Integrations },
  { path: '/integrations/callback', component: IntegrationCallback },
  { path: '/settings', component: Settings },
  { path: '/billing', component: Billing }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
