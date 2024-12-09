import AuctionCard from '@/components/AuctionCard'
import React, { useEffect, useState } from 'react'

const AuctionPage = () => {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		const get_data = async () => {
			const res = await fetch('/api/get-auction', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
			const json = await res.json()
			setData(json.data)
		}
		get_data()
	}, [])
	useEffect(() => {
		if (data) {
			console.log(data)
			setLoading(true)
		}
	}, [data])
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-4">Auctions</h1>
			<div className=" w-full items-center gap-3 flex-wrap justify-start font-mono text-sm flex">
				{!loading && <div>Loading...</div>}
				{data && data.length ? (
					data.map((item, index) => <AuctionCard key={index} props={item} />)
				) : (
					<div>Curently no Items to be diplayed</div>
				)}
			</div>
		</div>
	)
}

export default AuctionPage
