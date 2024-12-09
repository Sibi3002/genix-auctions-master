import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import AuctionCard from '../components/AuctionCard'

const Biddings = () => {
	const { data, status } = useSession()
	const [biddings, setBiddings] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (status === 'authenticated') {
			const fetchBiddings = async () => {
				try {
					const response = await fetch(
						`/api/bidding-history?userId=${data.user.name}`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						}
					)
					const json = await response.json()
					console.log(json)
					setBiddings(json.data)
					setLoading(false)
				} catch (error) {
					console.error('Error fetching bidding history:', error)
					setLoading(false)
				}
			}

			fetchBiddings()
		}
	}, [status, data])

	if (loading) {
		return <div>Loading...</div>
	}

	if (!data) {
		return <div>You need to be logged in to see your biddings.</div>
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-4">Your Biddings</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{biddings.length > 0 ? (
					biddings.map((auction) => (
						<AuctionCard key={auction._id} props={auction} />
					))
				) : (
					<p>You have not placed any bids yet.</p>
				)}
			</div>
		</div>
	)
}

export default Biddings
