import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./Home.vue')
        },
        {
            path: '/analytics',
            name: 'analytics',
            component: () => import('../domains/tennis-core/match-stats/MatchStatsView.vue')
        },
        {
            path: '/kit-bag',
            name: 'kit-bag',
            component: () => import('../domains/equipment/kit-bag/KitBagView.vue')
        },
        {
            path: '/tournament',
            name: 'tournament',
            component: () => import('../domains/tournaments/tournament-hub/TournamentHubView.vue')
        },
        {
            path: '/scouting',
            name: 'scouting',
            component: () => import('../pages/Scouting.vue') // Kept pending per user request
        }
    ]
})

export default router
