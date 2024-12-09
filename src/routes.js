import {
	Bed,
	CalendarEvent,
	Compass,
	Home,
	PhoneCall,
	PigMoney,
	Users,
	ShoppingBag,
} from 'tabler-icons-react'
import UserAvatar from '@/components/UserAvatar'

export const ROUTES = {
	HOME: '/',
	AUCTIONS: '/auctions',
	BIDDINGS: '/biddings',
	ABOUT_US: '/about-us',
	PROFILE: '/profile',
	LOGIN: '/login',
	SIGNGIN: '/signup',
}

export const ROUTE_INFO = [
	{
		id: 'ROUTE_HOME',
		name: 'Home',
		icon: <Home />,
		path: ROUTES.HOME,
	},
	{
		id: 'ROUTE_AUCTIONS',
		name: <>Auctions</>,
		icon: <Compass />,
		path: ROUTES.AUCTIONS,
	},

	{
		id: 'ROUTE_BIDDINGS',
		name: 'Biddings',
		icon: <CalendarEvent />,
		path: ROUTES.BIDDINGS,
	},
	{
		id: 'ROUTE_ABOUT_US',
		name: 'About Us',
		icon: <PhoneCall />,
		path: ROUTES.ABOUT_US,
	},
	{
		id: 'ROUTE_PROFILE',
		name: 'Profile',
		icon: <UserAvatar />,
		path: ROUTES.PROFILE,
	},
]
