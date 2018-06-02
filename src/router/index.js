import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Account from '@/components/Account'
import Contact from '@/components/Contact'
import Tutors from '@/components/Tutors'
import Tutor from '@/components/Tutor'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Logout from '@/components/Logout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Tutors/',
      name: 'Tutors',
      component: Tutors,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }
  ]
})
