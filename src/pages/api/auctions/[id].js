import { connect } from '@/dbconfig/dbconfig'
import AuctionItem from '@/models/AuctionItemModel'

export default async function handler(req, res) {
	const { id } = req.query

	await connect()

	try {
		const auctionItem = await AuctionItem.findById(id)

		if (!auctionItem) {
			return res
				.status(404)
				.json({ success: false, message: 'Auction item not found' })
		}

		res.status(200).json({ success: true, data: auctionItem })
	} catch (error) {
		res.status(400).json({ success: false, message: error.message })
	}
}
