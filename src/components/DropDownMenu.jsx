import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const DropdownMenu = ({ user, photo }) => {
	return (
		<div className="absolute top-full right-10 w-72 bg-white border border-gray-200 rounded-md shadow-lg">
			<div className="flex items-center p-4">
				<Image
					src={photo}
					alt="Profile"
					width={100}
					height={100}
					className="w-10 h-10 rounded-full mr-3"
				/>
				<div className="flex-1">
					<p className="font-semibold">{user.name}</p>
					<p className="text-sm text-gray-500">{user.email}</p>
				</div>
			</div>
			<ul className="list-none p-0 m-0">
				<li className="border-t border-gray-200">
					<Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
						View profile
					</Link>
				</li>

				<li className="border-t border-gray-200">
					<Link
						href="/profile/create-auction"
						className="block px-4 py-2 hover:bg-gray-100">
						Create Auction
					</Link>
				</li>

				<li className="border-t border-gray-200">
					<Link
						href="/profile/my-bids"
						className="block px-4 py-2 hover:bg-gray-100">
						My bids
					</Link>
				</li>

				<li className="border-t border-gray-200">
					<Link
						href="/profile/my-auctions"
						className="block px-4 py-2 hover:bg-gray-100">
						My Auctions
					</Link>
				</li>

				<li className="border-t border-gray-200">
					<Link
						href="/notifications"
						className="block px-4 py-2 hover:bg-gray-100">
						Notifications
					</Link>
				</li>

				<li className="border-t border-gray-200">
					<button
						onClick={() => signOut()}
						className="block px-4 py-2 hover:bg-gray-100">
						Log out
					</button>
				</li>
			</ul>
		</div>
	)
}

export default DropdownMenu
