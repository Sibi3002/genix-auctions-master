import { connect } from '@/dbconfig/dbconfig'
import AuctionItem from '@/models/AuctionItemModel'

export default async function handler(req, res) {
	if (req.method !== 'PUT') {
		return res.status(405).json({ message: 'Method Not Allowed' })
	}

	const { id } = req.query

	await connect()

	try {
		const auctionItem = await AuctionItem.findByIdAndUpdate(id, req.body, {
			new: true,
		})
		if (!auctionItem) {
			return res.status(404).json({ message: 'Auction item not found' })
		}

		return res.status(200).json(auctionItem)
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error' })
	}
}
