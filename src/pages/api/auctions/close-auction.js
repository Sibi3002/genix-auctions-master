import { connect } from '@/dbconfig/dbconfig'
import AuctionItem from '@/models/AuctionItemModel'

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method Not Allowed' })
	}

	const { id } = req.query

	await connect()

	try {
		const item = await AuctionItem.findById(id)
		const bids = item.bidHistory
		// console.log(bids)
		const latestBid = bids.reduce((latest, current) => {
			return new Date(current.date) > new Date(latest.date) ? current : latest
		}, bids[0])

		console.log(latestBid)
		const auctionItem = await AuctionItem.findByIdAndUpdate(
			id,
			{ ...req.body, live: false, winner: latestBid },
			{
				new: true,
			}
		)
		if (!auctionItem) {
			return res.status(404).json({ message: 'Auction item not found' })
		}

		return res.status(200).json(auctionItem)
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}
