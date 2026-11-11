import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        if (to.hash) {
            return { el: to.hash, behavior: 'smooth' };
        }
        // When transitioning between screens with <transition mode="out-in"> (150ms),
        // ensure the scroll resets to top: 0 exactly as the new view mounts.
        return new Promise((resolve) => {
            setTimeout(() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                resolve({ top: 0, left: 0 });
            }, 160);
        });
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../domains/tennis-core/match-stats/MatchStatsView.vue')
        },
        {
            path: '/analytics',
            name: 'analytics',
            component: () => import('../domains/tennis-core/match-stats/MatchStatsView.vue')
        },
        {
            path: '/tournament',
            name: 'tournament',
            component: () => import('../domains/tournaments/tournament-hub/TournamentHubView.vue')
        },
        {
            path: '/kit-bag',
            name: 'kit-bag',
            component: () => import('../domains/equipment/kit-bag/KitBagView.vue')
        },
        {
            path: '/scouting',
            name: 'scouting',
            component: () => import('../pages/Scouting.vue')
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('../pages/SettingsView.vue')
        },
        {
            path: '/pro',
            name: 'pro',
            component: () => import('../pages/MarketingPaywall.vue')
        }
    ]
});

router.afterEach((to, from) => {
    if (to.path !== from.path) {
        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        }, 160);
    }
});

export default router;
