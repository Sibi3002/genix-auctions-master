import GenixLogo from '@/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'

const Logo = ({ text }) => {
	return (
		<Link href="/">
			<div className="neumorphic-nav-inner rounded-full p-0 pr-8 pl-4 hover:text-black cursor-pointer hover:bg-slate-400/20">
				<div className="flex items-center">
					<div className="flex items-center justify-center w-14 h-14">
						<Image src={GenixLogo} alt="logo" />
					</div>
					{text === 'black' && (
						<div className="hidden xl:flex xl:flex-col  font-semibold text-black text-2xl">
							Genix Auctions
						</div>
					)}
					{text === 'white' && (
						<div className="hidden xl:flex xl:flex-col  font-semibold text-white text-2xl">
							Genix Auctions
						</div>
					)}
				</div>
			</div>
		</Link>
	)
}

export default Logo
