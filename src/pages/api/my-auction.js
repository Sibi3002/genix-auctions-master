import { connect } from '@/dbconfig/dbconfig'
import AuctionItem from '@/models/AuctionItemModel'

connect()

export default async (req, res) => {
	const { userId } = req.query

	if (!userId) {
		return res.status(400).json({ error: 'User ID is required' })
	}
	try {
		const auctions = await AuctionItem.find({ postedBy: userId })
		res.status(200).json({ success: true, data: auctions })
	} catch (error) {
		res.status(500).json({ success: false, error: 'Server Error' })
	}
}
