import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AuctionCard from '@/components/AuctionCard'

const Profile = () => {
	const { data: session, status } = useSession()
	const router = useRouter()
	const [auctions, setAuctions] = useState([])
	const [biddings, setBiddings] = useState([])
	const [reviews, setReviews] = useState([])
	const [liked, setLiked] = useState([])

	useEffect(() => {
		if (!session) {
			router.push('/login')
		} else {
		}
	}, [session])

	useEffect(() => {
		if (status === 'authenticated') {
			const fetchAuction = async () => {
				try {
					const response = await fetch(
						`/api/my-auction?userId=${session.user.email}`,
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
				} catch (error) {
					console.error('Error fetching bidding history:', error)
				}
			}

			fetchAuction()
		}
	}, [status, session])

	useEffect(() => {
		if (status === 'authenticated') {
			const fetchLiked = async () => {
				try {
					const response = await fetch(
						`/api/liked-auctions?email=${session.user.email}`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						}
					)
					const json = await response.json()
					console.log(json)
					setLiked(json.data)
				} catch (error) {
					console.error('Error fetching bidding history:', error)
				}
			}

			fetchLiked()
		}
	}, [status, session])

	useEffect(() => {
		if (status === 'authenticated') {
			const fetchBiddings = async () => {
				try {
					const response = await fetch(
						`/api/bidding-history?userId=${session.user.name}`,
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
				} catch (error) {
					console.error('Error fetching bidding history:', error)
				}
			}

			fetchBiddings()
		}
	}, [status, session])

	useEffect(() => {
		if (status === 'authenticated') {
			const fetchBiddings = async () => {
				try {
					const response = await fetch(
						`/api/get-reviews?userId=${session.user.name}`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						}
					)
					const json = await response.json()
					console.log(json)
					setReviews(json.data)
				} catch (error) {
					console.error('Error fetching bidding history:', error)
				}
			}

			fetchBiddings()
		}
	}, [status, session])

	useEffect(() => {
		console.log(reviews)
	}, [reviews])

	if (!session) return <div>Please log in to view your profile</div>

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-4">Profile</h1>

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">User Details</h2>

				<div>
					<p>
						<strong>Name:</strong> {session.user.name}
					</p>
					<p>
						<strong>Email:</strong> {session.user.email}
					</p>
				</div>
			</div>

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">Liked Auctions</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{liked.length > 0 ? (
						liked.map((auction) => (
							<AuctionCard key={auction._id} props={auction} />
						))
					) : (
						<p>You have not liked any auction yet.</p>
					)}
				</div>
			</div>

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">My Auctions</h2>
				<Link
					className="mt-4 w-[20em] flex align-middle items-center justify-center bg-gradient-to-r from-red-500 to-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
					href="/profile/create-auction">
					Create Auction
				</Link>
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

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">My Bids</h2>
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

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">My Reviews</h2>
				<ul>
					{reviews.map((review) => (
						<li key={review.review._id} className="mb-4 border p-4 rounded">
							<Link href={`/auctions/${review._id}`}>
								<p className="text-blue-500 text-xl font-bold">
									{review.title}
								</p>
							</Link>
							<div className="text-yellow-500">
								{'★'.repeat(review.review.rating)}
								{'☆'.repeat(5 - review.review.rating)}
							</div>
							<p>
								<strong>Review:</strong> {review.review.reviewText}
							</p>
							<p className="text-gray-500">
								<strong>Date:</strong>{' '}
								{new Date(review.review.date).toLocaleString()}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default Profile
