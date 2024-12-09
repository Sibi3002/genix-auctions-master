import React from 'react'
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa'
import Logo from './Logo'

const Footer = () => {
	return (
		<footer className=" text-white ">
			<div className="container bg-gray-900 mx-auto py-8 flex flex-col items-center justify-between px-4 md:flex">
				<div className="container  mx-auto  px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
					<div className="flex flex-col md:flex-row items-center">
						<Logo text={'white'} />
						<div>
							<nav className="mt-4 md:mt-0">
								<ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
									<li>
										<a href="#" className="hover:underline">
											Products
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline">
											About us
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline">
											Contact
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline">
											Auctions
										</a>
									</li>
									<li>
										<a href="#" className="hover:underline">
											Bidding
										</a>
									</li>
								</ul>
							</nav>
						</div>
					</div>
					<div className="flex space-x-4 mt-6 md:mt-0">
						<a href="#" className="text-gray-400 hover:text-white">
							<FaTwitter />
						</a>
						<a href="#" className="text-gray-400 hover:text-white">
							<FaFacebookF />
						</a>
						<a href="#" className="text-gray-400 hover:text-white">
							<FaInstagram />
						</a>
						<a href="#" className="text-gray-400 hover:text-white">
							<FaGithub />
						</a>
					</div>
				</div>
				<div className="text-center text-gray-400 text-sm mt-8">
					© Copyright 2024, All Rights Reserved by Genix
				</div>
			</div>
		</footer>
	)
}

export default Footer
