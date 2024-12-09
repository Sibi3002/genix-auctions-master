import Image from 'next/image'
import BGImage from '@/assets/index.png'
import AuctionCard from '@/components/AuctionCard'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Home() {
	const session = useSession()

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
	useEffect(() => {
		console.log(session)
	}, [session])
	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24 `}>
			{!session.data && (
				<div className="inline lg:flex  lg:w-[80%]">
					<div className="w-[50%]">
						<h1 className="text-4xl lg:text-5xl xl:text-6xl">
							Your Gateway to Extrodinary Finds
						</h1>
						<p>
							Unlock deals, bid smart, and seize the moment with our online
							bidding bonanza!
						</p>
					</div>
					<div className="w-[100%] lg:w-[75%] -z-10">
						<Image src={BGImage} alt="home" />
					</div>
				</div>
			)}
			<div className="w-full">
				{session.data ? (
					<div className="flex justify-start w-full mb-4">
						<h1 className=" font-bold text-2xl lg:text-3xl">
							Welcome{' '}
							<span className="text-blue-600">{session.data.user.name}!</span>
						</h1>
					</div>
				) : (
					<div className="flex justify-start w-full mb-4">
						<h1 className=" font-bold text-2xl lg:text-3xl">
							Explore <span className="text-blue-600">Auctions</span>
						</h1>
					</div>
				)}
				<div className=" w-full items-center gap-3 flex-wrap justify-center font-mono text-sm flex">
					{!loading && <div>Loading...</div>}
					{data && data.length ? (
						data.map((item, index) => <AuctionCard key={index} props={item} />)
					) : (
						<div>Curently no Items to be diplayed</div>
					)}
				</div>
			</div>
		</main>
	)
}
