import { connect } from '@/dbconfig/dbconfig'
import AuctionItem from '@/models/AuctionItemModel'

connect()

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { id, bidder, amount } = req.body

		try {
			const item = await AuctionItem.findById(id)

			if (!item) {
				return res.status(404).json({ error: 'Item not found' })
			}

			if (amount <= item.currentBid) {
				return res
					.status(400)
					.json({ error: 'Bid must be higher than current bid' })
			}

			item.bidHistory.push({ bidder, amount, date: new Date() })
			item.currentBid = amount

			await item.save()

			res.status(200).json({ message: 'Bid submitted successfully', item })
		} catch (error) {
			console.log(error)
			res.status(500).json({ error: 'Server error' })
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' })
	}
}
