import React, { useEffect, useState } from 'react'
import SideImage from '@/assets/login.png'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const SignUpForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		SignedIn: true,
	})
	const session = useSession()
	const router = useRouter()

	useEffect(() => {
		if (session.data) {
			console.log(session.data)
			router.push('/')
		}
	}, [session])

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
			// Handle form submission logic here
			await signIn('credentials', {
				username: formData.email,
				password: formData.password,
				callbackUrl: '/',
			})
			console.log('Form submitted:', formData)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center lg:justify-between ">
			<div className="bg-white ml-24 p-8 rounded-lg max-w-md w-full">
				<h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
				<p className="text-gray-600 my-3">
					Welcome back. Enter your credentials to access your account.
				</p>
				<form onSubmit={handleSubmit}>
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
							name="SignedIn"
							checked={formData.SignedIn}
							onChange={handleChange}
							className="mr-2"
						/>
						<label className="text-gray-700">Keep me signed in</label>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors">
						Continue
					</button>
				</form>
				<div className="mt-4 text-center">
					<div className="flex justify-center items-center gap-3">
						<hr className="h-px w-20 my-8 bg-black border-0" />
						<p className="text-gray-600">or sign up with</p>
						<hr className="h-px w-20 my-8 bg-black border-0" />
					</div>
					<div className="flex justify-center mt-2">
						<button className="bg-gray-200 p-2 rounded-md mx-1">Google</button>
						<button className="bg-gray-200 p-2 rounded-md mx-1">Apple</button>
						<button className="bg-gray-200 p-2 rounded-md mx-1">
							Facebook
						</button>
					</div>
				</div>
				<div className="mt-4 text-center">
					Don#&39;t have an account?
					<Link href="/signup" className="text-blue-500 hover:underline">
						Sign up here
					</Link>
				</div>
			</div>
			<Image src={SideImage} alt="logins" className="mr-40 hidden lg:block" />
		</div>
	)
}

export default SignUpForm
