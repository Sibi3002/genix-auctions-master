import Logo from './Logo'
import Navbar from './NavBar'

const Header = () => {
	return (
		<div className=" h-20 w-full mx-auto  container  flex items-center justify-between">
			<div>
				<Logo text={'black'} />
			</div>
			<div>
				<Navbar />
			</div>
		</div>
	)
}

export default Header
