import classNames from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CaretDown, ChevronDown, Menu2, X } from 'tabler-icons-react'
import { ROUTE_INFO, ROUTES } from '@/routes'
import UserAvatar from './UserAvatar'
import { useSession } from 'next-auth/react'

const NavItem = ({ name, link }) => {
	return (
		<Link href={link}>
			<li
				className={classNames(
					'relative glass flex font-normal  whitespace-nowrap text-black cursor-pointer hover:underline rounded-full py-2 px-4'
				)}>
				{name}
				<ChevronDown />
			</li>
		</Link>
	)
}

const NavItemMobile = ({ name, link, icon, closeMenu }) => {
	const session = useSession()
	const [user, setUser] = useState(null)
	useEffect(() => {
		if (session.data) {
			setUser(session.data.user)
		}
	}, [session])

	return (
		<Link
			href={
				name !== 'Profile'
					? link
					: user === null
					? ROUTES.LOGIN
					: ROUTES.PROFILE
			}
			onClick={closeMenu}
			className="block">
			<li
				className={classNames(
					'flex items-center relative uppercase whitespace-nowrap text-black hover:text-black cursor-pointer hover:bg-slate-500/30 rounded-md'
				)}>
				<div className="flex items-center justify-center w-12 h-12">
					{name === 'Profile' ? <UserAvatar showLink={false} /> : icon}
				</div>
				<div className="ml-4">
					{name !== 'Profile'
						? name
						: user != null
						? user?.name ?? user.email
						: 'Login'}
				</div>
			</li>
		</Link>
	)
}

export const NavLinks = () => {
	return (
		<>
			{ROUTE_INFO.filter((route) => route.id !== 'ROUTE_PROFILE').map(
				(route) => (
					<NavItem key={route.id} link={route.path} name={route.name} />
				)
			)}
		</>
	)
}

export const NavLinksMobile = ({ closeMenu }) => {
	return (
		<>
			{ROUTE_INFO.map((route) => (
				<NavItemMobile
					icon={route.icon}
					key={route.id}
					link={route.path}
					name={route.name}
					closeMenu={closeMenu}
				/>
			))}
		</>
	)
}

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false)

	useEffect(() => {
		document.querySelector('body').style.overflow = menuOpen ? 'hidden' : 'auto'
	}, [menuOpen])

	return (
		<>
			<nav className="hidden  md:block">
				<ul className="rounded-full font-semibold text-black p-2 flex items-center space-x-2">
					<NavLinks />
					<UserAvatar />
				</ul>
			</nav>
			<nav className=" relative md:hidden">
				<div
					className={
						'glass uppercase whitespace-nowrap text-black hover:text-black cursor-pointer hover:bg-teal-400/20 rounded-full p-4'
					}
					onClick={() => {
						setMenuOpen((s) => !s)
					}}>
					{menuOpen ? <X /> : <Menu2 />}
				</div>
				<div
					className={classNames(
						'translate-x-[110vw] glass p-0 transition-all fixed w-full h-full sm:max-w-[24rem] top-0 right-0 rounded-none border-0 md:border-l',
						{ '!translate-x-0': menuOpen }
					)}>
					<div className="h-20 flex items-center p-4">
						<div className="flex-1 text-black text-xl">MENU</div>
						<div>
							<button
								onClick={() => setMenuOpen((_) => false)}
								className="glass uppercase whitespace-nowrap text-black hover:text-black cursor-pointer hover:bg-slate-400/20 rounded-full p-4">
								<X />
							</button>
						</div>
					</div>
					<ul className="p-4 pt-0 space-y-2">
						<NavLinksMobile closeMenu={() => setMenuOpen(false)} />
					</ul>
				</div>
			</nav>
		</>
	)
}

export default Navbar
