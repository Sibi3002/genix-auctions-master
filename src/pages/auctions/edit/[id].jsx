import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import useSWR from 'swr'
import Link from 'next/link'

const EditAuction = () => {
	const router = useRouter()
	const { id } = router.query
	const [data, setData] = useState()

	const [formData, setFormData] = useState({
		title: '',
		description: '',
		minimumBid: '',
		currentBid: '',
		endDate: '',
		imageUrl: '',
	})
	useEffect(() => {
		const fetcher = async () => {
			const res = await fetch(`/api/auctions/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const json = await res.json()
			console.log(json)
			setData(json.data)
		}
		fetcher()
	}, [])
	useEffect(() => {
		if (data) {
			setFormData({
				title: data.title,
				description: data.description,
				minimumBid: data.minimumBid,
				currentBid: data.currentBid,
				endDate: new Date(data.endDate).toISOString().slice(0, 16),
				imageUrl: data.imageUrl,
			})
		}
	}, [data])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const response = await fetch(`/api/update-item?id=${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})

		if (response.ok) {
			router.push('/auctions')
		} else {
			console.error('Failed to update auction item')
		}
	}

	if (!data) return <div>Loading...</div>

	return (
		<div className="container mx-auto px-4 py-8">
			<Link href="/auctions" className="text-blue-500">
				Back to catalog
			</Link>
			<h1 className="text-2xl font-bold mb-4">Edit Auction Item</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Title
					</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Description
					</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Minimum Bid
					</label>
					<input
						type="number"
						name="minimumBid"
						value={formData.minimumBid}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Current Bid
					</label>
					<input
						type="number"
						name="currentBid"
						value={formData.currentBid}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						End Date
					</label>
					<input
						type="datetime-local"
						name="endDate"
						value={formData.endDate}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Image URL
					</label>
					<input
						type="text"
						name="imageUrl"
						value={formData.imageUrl}
						onChange={handleChange}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					/>
				</div>
				<div>
					<button
						type="submit"
						className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						Save Changes
					</button>
				</div>
			</form>
		</div>
	)
}

export default EditAuction
