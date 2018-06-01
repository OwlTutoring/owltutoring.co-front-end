import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Account from '@/components/Account'
import Contact from '@/components/Contact'
import Tutors from '@/components/Tutors'
import Tutor from '@/components/Tutor'

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
      path: '/Tutor/:id/',
      name: 'Tutor',
      props: true,
      component: Tutor
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
    }
  ]
})
