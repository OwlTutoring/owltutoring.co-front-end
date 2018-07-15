import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Account from '@/components/Account'
import Contact from '@/components/Contact'
import Tutors from '@/components/Tutors'
import Tutor from '@/components/Tutor'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Sessions from '@/components/Sessions'
import Pay from '@/components/Pay'
import TutorProfile from '@/components/TutorProfile'
import ForgotPassword from '@/components/ForgotPassword'
import ChangePassword from '@/components/ChangePassword'
import ChargeHistory from '@/components/ChargeHistory'
import VertifyEmail from '@/components/VertifyEmail'
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
      path: '/login/:nextPage?',
      name: 'Login',
      component: Login,
      props: true,
    },
    {
      path: '/signup/:nextPage?',
      name: 'SignUp',
      component: SignUp,
      props: true
    },
    {
      path: '/sessions/:display?',
      name: 'sessions',
      component: Sessions,
      props: true
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/tutorProfile',
      name: 'tutorProfile',
      component: TutorProfile
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: ForgotPassword
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: ChangePassword
    },
    {
      path: '/chargeHistory',
      name: 'chargeHistory',
      component: ChargeHistory
    },
    {
      path: '/vertifyEmail/:nextPage?',
      name: 'vertifyEmail',
      component: VertifyEmail
    }
  ]
})
