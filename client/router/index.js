import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import About from '../views/About'
import Login from '../views/Login'
import ShipCrews from '../views/ShipCrews'
import NewShipCrew from '../views/NewShipCrew'
import PostsDashboard from '../views/Posts-Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'log in',
      component: Login
    },
    {
      path: '/scPosts',
      name: 'Ship Crew Posts',
      component: ShipCrews
    },
    {
      path: '/scPosts/new',
      name: 'New Ship Crew Post',
      component: NewShipCrew
    },
    {
      path: '/posts/dashboard',
      name: 'dashboard',
      component: PostsDashboard
    }
  ]
})
