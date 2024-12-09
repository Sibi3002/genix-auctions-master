import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import AuctionCard from '@/components/AuctionCard'

const Auctions = () => {
	const { data, status } = useSession()
	const [auctions, setAuctions] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (status === 'authenticated') {
			const fetchAuction = async () => {
				try {
					const response = await fetch(
						`/api/my-auction?userId=${data.user.email}`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						}
					)
					const json = await response.json()
					console.log(json)
					setAuctions(json.data)
					setLoading(false)
				} catch (error) {
					console.error('Error fetching bidding history:', error)
					setLoading(false)
				}
			}

			fetchAuction()
		}
	}, [status, data])

	if (loading) {
		return <div>Loading...</div>
	}

	if (!data) {
		return <div>You need to be logged in to see your auctions.</div>
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-4">Your Auctions</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{auctions.length > 0 ? (
					auctions.map((auction) => (
						<AuctionCard key={auction._id} props={auction} editable={true} />
					))
				) : (
					<p>You have not auctioned anything yet.</p>
				)}
			</div>
		</div>
	)
}

export default Auctions
