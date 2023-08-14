import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ChoiceMethod from '../components/ChoiceMethod.vue'
import ShifrSelect from '../views/ShifrSelect.vue'
import MorzeTheory from '../components/ShifrsFolder/morze/MorzeTheory.vue'
import MorzeCalc from '../components/ShifrsFolder/morze/MorzeCalc.vue'
import Error from '../components/ErrorText.vue'
import GroupCalc from '../components/ShifrsFolder/group/GroupCalc.vue'
import HillCalc from '../components/ShifrsFolder/Hill/HillCalc.vue'
import MercHelCalc from '../components/ShifrsFolder/MercHelman/MercHelmanCalc.vue'
import MessiOmurCalc from '../components/ShifrsFolder/MessiOmur/MessiOmurCalc.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  { path: '/404', component: Error },  
  {path: '/:catchAll(.*)', redirect:'404'},
  {
    path: '/game', component: () => import('../game/PokeGm.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutPage.vue')
  },
  {
    path: '/shifr',
    name: 'shifr',
    component: ShifrSelect
  },
  {
  path: '/shifr',
  component: ChoiceMethod,
  children: [
    {
      path: 'morze-theory',
      component: MorzeTheory
    },
    {
      path: 'morze-calculator',
      component: MorzeCalc
    },
    {
      path: 'group-theory',
      component: () => import('../components/ShifrsFolder/group/GroupTheory.vue')
    },
    {
      path: 'group-calculator',
      component: GroupCalc
    },
    {
      path: 'hill-theory',
      component: () => import('../components/ShifrsFolder/Hill/HillTheory.vue')
    },
    {
      path: 'hill-calculator',
      component: HillCalc
    },
    {
      path: 'merc-helman-theory',
      component: () => import('../components/ShifrsFolder/MercHelman/MercHelmanTheory.vue')
    },
    {
      path: 'merc-helman-calculator',
      component: MercHelCalc
    },
    {
      path: 'messi-omur-theory',
      component: () => import('../components/ShifrsFolder/MessiOmur/MessiOmurTheory.vue')
    },
    {
      path: 'messi-omur-calculator',
      component: MessiOmurCalc
    }

  ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
