import React, { useEffect, useState } from 'react'
import SideImage from '@/assets/signup.png'
import SuccessImage from '@/assets/success.png'
import Image from 'next/image'
import { ROUTES } from '@/routes'
import Link from 'next/link'
import { ChevronRight } from 'tabler-icons-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const SignUpForm = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		receiveEmails: true,
	})
	const session = useSession()
	const router = useRouter()

	useEffect(() => {
		if (session.data) {
			console.log(session.data)
			router.push('/')
		}
	}, [session])
	const [success, setSuccess] = useState(false)

	const [errors, setErrors] = useState({
		email: '',
		password: '',
	})
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		})
	}

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	const validatePassword = (password) => {
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/
		return passwordRegex.test(password)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		let valid = true

		if (!validateEmail(formData.email)) {
			setErrors((errors) => ({ ...errors, email: 'Invalid email address' }))
			valid = false
		} else {
			setErrors((errors) => ({ ...errors, email: '' }))
		}

		if (!validatePassword(formData.password)) {
			setErrors((errors) => ({
				...errors,
				password:
					'Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 symbol from !@#$%^&*()',
			}))
			valid = false
		} else {
			setErrors((errors) => ({ ...errors, password: '' }))
		}

		if (valid) {
			const response = await fetch('/api/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username: formData.firstName,
					lastname: formData.lastName,
					email: formData.email,
					password: formData.password,
				}),
			})
			const result = await response.json()
			console.log(result)
			console.log('Form submitted:', formData)
			setSuccess(true)
		}
	}

	return (
		<>
			{!success ? (
				<div className="min-h-screen flex items-center justify-center lg:justify-between ">
					<div className="bg-white ml-24 p-8 rounded-lg max-w-md w-full">
						<h2 className="text-2xl font-bold mb-6 text-gray-800">Sign up</h2>
						<p className="text-gray-600 my-3">
							New Bidders, as soon as youhave submitted your information you
							will be eligible to bid in auction.
						</p>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<label className="block text-gray-700">First Name</label>
								<input
									type="text"
									name="firstName"
									value={formData.firstName}
									onChange={handleChange}
									className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
									required
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700">Last Name</label>
								<input
									type="text"
									name="lastName"
									value={formData.lastName}
									onChange={handleChange}
									className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
									required
								/>
							</div>
							<div className="mb-4">
								<label className="block text-gray-700">Email Address</label>
								{errors.email ? (
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="mt-1 p-2 w-full border rounded-md border-red-500 focus:outline-none focus:ring focus:border-blue-300"
										required
									/>
								) : (
									<input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
										required
									/>
								)}
								{errors.email && (
									<p className="text-red-500 text-sm mt-1">{errors.email}</p>
								)}
							</div>
							<div className="mb-4">
								<label className="block text-gray-700">Password</label>
								{errors.password ? (
									<input
										type="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										className="mt-1 p-2 w-full border rounded-md border-red-500 focus:outline-none focus:ring focus:border-red-500"
										required
									/>
								) : (
									<input
										type="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
										required
									/>
								)}
								{errors.password && (
									<p className="text-red-500 text-sm mt-1">{errors.password}</p>
								)}
							</div>
							<div className="mb-4 flex items-center">
								<input
									type="checkbox"
									name="receiveEmails"
									checked={formData.receiveEmails}
									onChange={handleChange}
									className="mr-2"
								/>
								<label className="text-gray-700">Receive outbid emails</label>
							</div>
							<button
								type="submit"
								className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">
								Submit
							</button>
						</form>
						<div className="mt-4 text-center">
							<div className="flex justify-center items-center gap-3">
								<hr className="h-px w-20 my-8 bg-black border-0" />
								<p className="text-gray-600">or sign up with</p>
								<hr className="h-px w-20 my-8 bg-black border-0" />
							</div>
							<div className="flex justify-center mt-2">
								<button className="bg-gray-200 p-2 rounded-md mx-1">
									Google
								</button>
								<button className="bg-gray-200 p-2 rounded-md mx-1">
									Apple
								</button>
								<button className="bg-gray-200 p-2 rounded-md mx-1">
									Facebook
								</button>
							</div>
						</div>
						<div className="mt-4 text-center">
							Want to know more?{' '}
							<a
								href="#auction-rules"
								className="text-blue-500 hover:underline">
								Auction rules
							</a>
						</div>
					</div>
					<Image
						src={SideImage}
						alt="signup"
						className="mr-40 hidden lg:block"
					/>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center">
					<Image className="object-cover" alt="success" src={SuccessImage} />
					<Link className="w-24" href={ROUTES.LOGIN}>
						<div className="flex overflow-hidden items-center justify-center  h-10 bg-blue-500 rounded-md px-2 text-white hover:text-white hover:bg-blue-400/80 cursor-pointer">
							Login <ChevronRight />
						</div>
					</Link>
				</div>
			)}
		</>
	)
}

export default SignUpForm
