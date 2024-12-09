import { useRouter } from 'next/router'
import useSWR, { SWRConfig } from 'swr'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import BidModal from '@/components/BidModal'
import SuccessModal from '@/components/SuccessModal'
import Link from 'next/link'
import ReviewModal from '@/components/ReviewModal'
import { ChevronLeft } from 'tabler-icons-react'
import WinnerModal from '@/components/WinnerModal'

const fetcher = (url) => fetch(url).then((r) => r.json())

const AuctionItem = () => {
	const router = useRouter()
	const { id } = router.query
	const session = useSession()
	const { data, error } = useSWR(`/api/auctions/${id}`, fetcher)
	const [user, setUser] = useState(null)
	const [biddable, setBiddable] = useState(true)
	const [timeRemaining, setTimeRemaining] = useState('')
	const [isBidModalOpen, setBidModalOpen] = useState(false)
	const [isReviewModalOpen, setReviewModalOpen] = useState(false)
	const [isSuccessModalOpen, setSuccessModalOpen] = useState(false)
	const [isWinnerModalOpen, setWinnerModalOpen] = useState(false)
	const [straightBid, setStraightBid] = useState('')
	const [hasReviewed, setHasReviewed] = useState(false)
	const [maximumBid, setMaximumBid] = useState('')
	useEffect(() => {
		if (session.data) {
			setUser(session.data.user)
		} else {
			router.push('/login')
		}
	}, [session, router])

	const handleBidNow = () => {
		setBidModalOpen(true)
	}

	const handleBidSubmit = async () => {
		if (straightBid > currentBid) {
			const response = await fetch('/api/bid', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id,
					bidder: user.name,
					amount: straightBid,
				}),
			})

			setBidModalOpen(false)
			setSuccessModalOpen(true)
		} else {
			alert('Bid should be higher than current bid')
		}
	}

	const handleReviewSubmit = async (review) => {
		const response = await fetch('/api/review', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				auctionId: id,
				reviewer: user.name,
				rating: review.rating,
				reviewText: review.reviewText,
			}),
		})

		setReviewModalOpen(false)
	}
	useEffect(() => {
		if (user && data) {
			if (user.email === data.data.postedBy) setBiddable(false)
			else setBiddable(true)
			const reviewed = data.data.reviews.some(
				(review) => review.username === user.name
			)
			setHasReviewed(reviewed)
			if (!data.data.live) setWinnerModalOpen(true)
		}
	}, [user, data])
	useEffect(() => {
		if (data && data.data.live) {
			const calculateTimeRemaining = async () => {
				const end = new Date(data.data.endDate)
				const now = new Date()
				const difference = end - now

				if (difference <= 0) {
					setTimeRemaining('Auction ended')
					await fetch(`/api/auctions/close-auction?id=${id}`)
					return
				}

				const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365))
				const months = Math.floor(
					(difference % (1000 * 60 * 60 * 24 * 365)) /
						(1000 * 60 * 60 * 24 * 30)
				)
				const weeks = Math.floor(
					(difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7)
				)
				const days = Math.floor(
					(difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
				)
				const hours = Math.floor(
					(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				)
				const minutes = Math.floor(
					(difference % (1000 * 60 * 60)) / (1000 * 60)
				)
				const seconds = Math.floor((difference % (1000 * 60)) / 1000)

				let remainingTimeStr = ''

				if (years > 0) remainingTimeStr += `${years}y `
				if (months > 0) remainingTimeStr += `${months}m `
				if (weeks > 0) remainingTimeStr += `${weeks}w `
				if (days > 0) remainingTimeStr += `${days}d `
				remainingTimeStr += `${hours}h ${minutes}m ${seconds}s`

				setTimeRemaining(remainingTimeStr.trim())
			}

			calculateTimeRemaining()
			const intervalId = setInterval(calculateTimeRemaining, 1000)

			return () => clearInterval(intervalId)
		}
	}, [data])

	if (error) return <div>Failed to load</div>
	if (!data) return <div>Loading...</div>

	const {
		title,
		description,
		minimumBid,
		currentBid,
		imageUrl,
		reviews,
		live,
		bidHistory,
		endDate,
		postedBy,
		winner,
	} = data.data

	return (
		<SWRConfig>
			<div className="container mx-auto px-4 py-8">
				<button
					onClick={() => {
						router.back()
					}}
					className="text-blue-500 flex">
					<ChevronLeft />
					Back to catalog
				</button>
				<div className="flex flex-col gap-x-3 md:flex-row mt-4">
					<div className="md:w-[16em]">
						<Image
							src={imageUrl}
							alt={title}
							width={500}
							height={500}
							className="rounded-lg"
						/>
						<div className="mt-4 p-4  rounded-lg">
							{live ? (
								<div className="text-sm font-bold text-white bg-green-600 p-2 rounded-sm w-fit">
									Live Auction
								</div>
							) : (
								<div className="text-sm font-bold text-white bg-red-600 p-2 rounded-sm w-fit">
									Auction Ended
								</div>
							)}
							<h2 className="text-2xl font-bold mt-2">{title}</h2>
							<p className="mt-2 text-gray-700">Minimum Bid: ${minimumBid}</p>
							<p className="mt-2 text-gray-700">Current Bid: ${currentBid}</p>
							{live && (
								<p className="mt-2 text-gray-700">Ends in: {timeRemaining}</p>
							)}
						</div>
					</div>
					<div className="lg:w-1/2 md:w-2/5">
						<div className="mt-4 md:mt-0">
							<h3 className="text-xl font-bold">Description</h3>
							<p className="mt-2 text-gray-700">{description}</p>
						</div>
						<div className="mt-8">
							<h3 className="text-xl font-bold">Reviews</h3>
							{reviews.map((review, index) => (
								<div key={index} className="mt-4 p-4 border rounded-lg">
									<div className="flex items-center">
										<div className="text-yellow-500">
											{'★'.repeat(review.rating)}
											{'☆'.repeat(5 - review.rating)}
										</div>
										<p className="ml-2 font-bold">{review.username}</p>
										<p className="ml-auto text-sm text-gray-500">
											{new Date(review.date).toLocaleDateString()}
										</p>
									</div>
									<p className="mt-2 text-gray-700">{review.reviewText}</p>
								</div>
							))}
							{!hasReviewed && (
								<button
									onClick={() => setReviewModalOpen(true)} // Open the Review Modal
									className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
									Post Review
								</button>
							)}
						</div>
					</div>
					<div className="lg:1/4 mr-4">
						<div className="mt-8">
							<h3 className="text-xl font-bold">Bid History</h3>
							<ul className="mt-2 text-gray-700">
								{bidHistory
									.slice()
									.reverse()
									.map((bid, index) => (
										<li key={index} className="mt-2">
											{bid.bidder} bids ${bid.amount} on{' '}
											{new Date(bid.date).toLocaleString()}
										</li>
									))}
							</ul>
						</div>
						{live && biddable && (
							<button
								onClick={() => handleBidNow()}
								className="mt-4 bg-blue-500 w-[16em] text-white px-4 py-2 rounded-lg">
								Bid now
							</button>
						)}
					</div>
				</div>
				<BidModal
					isOpen={isBidModalOpen}
					onSubmit={handleBidSubmit}
					onClose={() => setBidModalOpen(false)}
					title={title}
					minimumBid={minimumBid}
					currentBid={currentBid}
					setMaximumBid={setMaximumBid}
					setStraightBid={setStraightBid}
					straightBid={straightBid}
					maximumBid={maximumBid}
					endDate={endDate}
				/>
				<SuccessModal
					isOpen={isSuccessModalOpen}
					onClose={() => setSuccessModalOpen(false)}
				/>
				<ReviewModal
					isOpen={isReviewModalOpen}
					onClose={() => setReviewModalOpen(false)}
					onSubmit={handleReviewSubmit} // Handle review submission
				/>
				<WinnerModal
					isOpen={isWinnerModalOpen}
					onClose={() => setWinnerModalOpen(false)}
					winner={winner}
				/>
			</div>
		</SWRConfig>
	)
}

export default AuctionItem
