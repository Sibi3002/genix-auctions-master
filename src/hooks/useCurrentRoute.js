import { ROUTES, ROUTE_INFO } from '@/routes'
import { useRouter } from 'next/router'

function getActiveRoute(path) {
	if (path === '/') return ROUTES.HOME
	for (let route of ROUTE_INFO) {
		if (route.path === ROUTES.HOME) continue
		if (path.startsWith(route.path)) return route.path
	}
	return 'INVALID'
}

const useCurrentRoute = () => {
	const router = useRouter()
	let activeLink = getActiveRoute(router.pathname)
	return activeLink
}

export default useCurrentRoute
