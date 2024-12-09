import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const CreateAuctionItem = () => {
	const session = useSession()
	const router = useRouter()

	const [user, setUser] = useState(null)
	useEffect(() => {
		if (session.data) {
			setUser(session.data.user)
		} else {
			router.push('/login')
		}
	}, [session, router])

	const [form, setForm] = useState({
		title: '',
		description: '',
		minimumBid: '',
		currentBid: '',
		endDate: '',
		imageUrl: '',
	})

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch('/api/auction', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...form, postedBy: user.email }),
			})
			const result = await response.json()
			console.log(result)
			router.push('/')
		} catch (error) {
			console.error('Failed to create auction item', error)
		}
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-4">Create New Auction Item</h1>
			<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="title">
						Title
					</label>
					<input
						type="text"
						name="title"
						id="title"
						value={form.title}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="description">
						Description
					</label>
					<textarea
						name="description"
						id="description"
						value={form.description}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="minimumBid">
						Minimum Bid
					</label>
					<input
						type="number"
						name="minimumBid"
						id="minimumBid"
						value={form.minimumBid}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="currentBid">
						Current Bid
					</label>
					<input
						type="number"
						name="currentBid"
						id="currentBid"
						value={form.currentBid}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="endDate">
						End Date
					</label>
					<input
						type="datetime-local"
						name="endDate"
						id="endDate"
						value={form.endDate}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="imageUrl">
						Image URL
					</label>
					<input
						type="text"
						name="imageUrl"
						id="imageUrl"
						value={form.imageUrl}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						required
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
						Create Auction Item
					</button>
				</div>
			</form>
		</div>
	)
}

export default CreateAuctionItem
