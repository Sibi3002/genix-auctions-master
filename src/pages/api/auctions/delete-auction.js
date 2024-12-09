import { connect } from '@/dbconfig/dbconfig'
import AuctionItem from '@/models/AuctionItemModel'

export default async function handler(req, res) {
	const { method } = req
	const { id } = req.query

	await connect()

	switch (method) {
		case 'DELETE':
			try {
				const auctionItem = await AuctionItem.findByIdAndDelete(id)

				if (!auctionItem) {
					return res
						.status(404)
						.json({ success: false, message: 'Auction item not found' })
				}

				res.status(200).json({ success: true, data: {} })
			} catch (error) {
				res.status(400).json({ success: false, error: error.message })
			}
			break

		default:
			res.status(405).json({ success: false, message: 'Method not allowed' })
			break
	}
}
