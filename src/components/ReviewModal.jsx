import { useState } from 'react'

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
	const [rating, setRating] = useState(0)
	const [reviewText, setReviewText] = useState('')

	if (!isOpen) return null

	const handleSubmit = () => {
		onSubmit({ rating, reviewText })
		onClose()
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-lg">
				<h2 className="text-xl font-bold mb-4">Write a Review</h2>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Rating
					</label>
					<input
						type="number"
						value={rating}
						onChange={(e) => setRating(e.target.value)}
						max="5"
						min="1"
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700">
						Review
					</label>
					<textarea
						value={reviewText}
						onChange={(e) => setReviewText(e.target.value)}
						rows="4"
						className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					/>
				</div>
				<div className="flex justify-end">
					<button
						onClick={onClose}
						className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="bg-blue-500 text-white px-4 py-2 rounded-lg">
						Submit
					</button>
				</div>
			</div>
		</div>
	)
}

export default ReviewModal
