import React, { useState } from 'react'

const BidModal = ({
	isOpen,
	onSubmit,
	onClose,
	title,
	minimumBid,
	currentBid,
	endDate,
	straightBid,
	maximumBid,
	setStraightBid,
	setMaximumBid,
}) => {
	const handleSubmit = () => {
		// Logic for submitting the bid
		onSubmit()
		console.log('Bid submitted:', { straightBid, maximumBid })
		onClose()
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg">
				<h2 className="text-xl font-bold mb-4">Submit Bid | {title}</h2>
				<div className="mb-4">
					<label className="block font-bold">Straight bid</label>
					<input
						type="number"
						min={currentBid}
						value={straightBid}
						onChange={(e) => setStraightBid(e.target.value)}
						className="w-full border rounded px-2 py-1"
					/>
				</div>
				<div className="mb-4">
					<label className="block font-bold">Maximum bid</label>
					<input
						min={currentBid}
						type="number"
						value={maximumBid}
						onChange={(e) => setMaximumBid(e.target.value)}
						className="w-full border rounded px-2 py-1"
					/>
				</div>
				<div className="mb-4">
					<p>Minimum Bid: ${minimumBid}</p>
					<p>Current Bid: ${currentBid}</p>
					<p>Ends in: {new Date(endDate).toLocaleString()}</p>
				</div>
				<div className="flex justify-end">
					<button
						onClick={onClose}
						className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						className="bg-blue-500 text-white px-4 py-2 rounded">
						Submit
					</button>
				</div>
			</div>
		</div>
	)
}

export default BidModal
