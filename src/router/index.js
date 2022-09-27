import { createRouter, createWebHistory } from 'vue-router'

import Welcome from '../views/Welcome.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/game/:id',
      name: 'game',
      component: () => import('../views/Game.vue')
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/Games.vue')
    },
    {
      path: '/actions',
      name: 'actions',
      component: () => import('../views/Actions.vue')
    },
    {
      path: '/decks',
      name: 'decks',
      component: () => import('../views/Decks.vue')
    },
    {
      path: '/deck/edit/:id',
      name: 'edit_deck',
      component: () => import('../views/Deck.vue')
    },
    {
      path: '/game/new',
      name: 'new_game',
      component: () => import('../views/NewGame.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/404.vue')
    }
  ]
})

export default router
