import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Guests from '../views/Guests'
import Guest from '../views/Guest'
import Orders from '../views/Orders'
import Order from '../views/Order'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/guests',
    name: 'Guests',
    component: Guests
  },
  {
    path: '/guests/guest/:id',
    name: 'Guest',
    component: Guest,
    props: true
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/orders/order/:id',
    name: 'Order',
    component: Order,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
