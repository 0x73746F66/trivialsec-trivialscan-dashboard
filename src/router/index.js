import { createRouter, createWebHistory } from "vue-router";
import publicRoutes from '@/router/public-routes.js'
import protectedRoutes from '@/router/protected-routes.js'

const allRoutes = Array.from(publicRoutes)
const routes = allRoutes.concat(protectedRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const publicPages = ["/", "/pricing", "/docs"]
  const publicPrefixes = ["/accept", "/login", "/docs", "/feature"]
  const authRequired =
    !publicPages.includes(to.path) &&
    !publicPrefixes.map((i) => to.path.startsWith(i)).includes(true)
  const logged_in = !!localStorage.getItem("/session/key")
  if (authRequired && !logged_in) {
    return "/"
  }
})
export default router
