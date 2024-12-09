import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ChevronRight, Heart } from 'tabler-icons-react'

const AuctionCard = ({ props, editable }) => {
	const {
		imageUrl,
		title,
		minimumBid,
		currentBid,
		endDate,
		_id,
		live,
		likedBy,
	} = props
	const [liked, setLiked] = useState(false)
	const [timeRemaining, setTimeRemaining] = useState('')
	const router = useRouter()
	const session = useSession()
	const [user, setUser] = useState()

	useEffect(() => {
		if (session.data) {
			setUser(session.data.user)
			if (likedBy.includes(session.data.user.email)) setLiked(true)
		}
	}, [session])
	const handleDelete = async () => {
		const res = await fetch(`/api/auctions/delete-auction?id=${_id}`, {
			method: 'DELETE',
		})
		console.log(res)
		if (res.ok) {
			alert('Deleted Successfully')
			router.reload()
		}
	}

	const like = async () => {
		if (user) {
			const res = await fetch(
				`/api/auctions/like-auction?id=${_id}&email=${user.email}`
			)
			if (res.ok) {
				setLiked(true)
			}
		} else {
			setLiked(true)
		}
	}
	const removeLike = async () => {
		if (user) {
			const res = await fetch(
				`/api/auctions/dislike-auction?id=${_id}&email=${user.email}`
			)
			if (res.ok) {
				setLiked(false)
			}
		} else {
			setLiked(false)
		}
	}

	useEffect(() => {
		const calculateTimeRemaining = async () => {
			const end = new Date(endDate)
			const now = new Date()
			const difference = end - now

			if (difference <= 0) {
				setTimeRemaining('Auction ended')
				await fetch(`/api/auctions/close-auction?id=${_id}`)
				return
			}

			const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365))
			const months = Math.floor(
				(difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
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
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
			const seconds = Math.floor((difference % (1000 * 60)) / 1000)

			let remainingTimeStr = ''

			if (years > 0) remainingTimeStr += `${years}y `
			if (months > 0) remainingTimeStr += `${months}m `
			if (weeks > 0) remainingTimeStr += `${weeks}w `
			if (days > 0) remainingTimeStr += `${days}d `
			remainingTimeStr += `${hours}h ${minutes}m ${seconds}s`

			setTimeRemaining(remainingTimeStr.trim())
		}

		if (live) {
			calculateTimeRemaining()
			const intervalId = setInterval(calculateTimeRemaining, 1000)

			return () => clearInterval(intervalId)
		}
	}, [endDate, live])

	return (
		<div className="bg-white w-[18em]  h-[32em] rounded-lg shadow-gray-500 hover:border-2 border-blue-600 shadow-md p-4">
			<div className="relative">
				<Image
					src={imageUrl}
					alt={title}
					width={200}
					height={200}
					className="w-[16em] shadow-md  h-[14em] rounded-t-lg"
				/>
				{liked ? (
					<button
						onClick={() => removeLike()}
						className="absolute top-2 right-2 border-2 rounded-full  text-red-500 hover:text-red-700">
						<Heart fill="#ff0000" />
					</button>
				) : (
					<button
						onClick={() => like()}
						className="absolute border-2  rounded-full  text-black top-2 right-2 ">
						<Heart />
					</button>
				)}
			</div>
			{live ? (
				<div className="text-sm mt-2 text-white bg-green-600 p-1 rounded-sm w-fit">
					Live Auction
				</div>
			) : (
				<div className="text-sm mt-2 text-white bg-red-600 p-1 rounded-sm w-fit">
					Auction Ended
				</div>
			)}
			<h3 className="text-xl font-bold">{title}</h3>
			<p className="text-gray-600">Minimum Bid: ${minimumBid}</p>
			<p className="text-gray-600">Current Bid: ${currentBid}</p>
			{live && <p className="text-gray-600">Ends in: {timeRemaining}</p>}
			{!editable ? (
				live ? (
					<button className="mt-4 w-full flex align-middle items-center justify-center bg-gradient-to-r from-red-500 to-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
						<Link
							className="w-full flex align-middle items-center justify-center"
							href={`/auctions/${_id}`}>
							{' '}
							Bid now <ChevronRight />
						</Link>
					</button>
				) : (
					<button className="mt-4 w-full flex align-middle items-center justify-center bg-gradient-to-r from-red-500 to-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
						<Link
							className="w-full flex align-middle items-center justify-center"
							href={`/auctions/${_id}`}>
							{' '}
							View Bid <ChevronRight />
						</Link>
					</button>
				)
			) : (
				<>
					<button className="mt-4 w-full flex align-middle items-center justify-center bg-gradient-to-r from-red-500 to-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
						<Link
							className="w-full flex align-middle items-center justify-center"
							href={`/auctions/edit/${_id}`}>
							Edit Auction <ChevronRight />
						</Link>
					</button>
					<button
						onClick={() => handleDelete()}
						className="mt-4 w-full flex align-middle items-center justify-center bg-gradient-to-r from-red-500 to-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
						Delete Auction <ChevronRight />
					</button>
				</>
			)}
		</div>
	)
}

export default AuctionCard
