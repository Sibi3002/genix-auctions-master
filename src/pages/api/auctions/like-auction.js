import AuctionItem from '@/models/AuctionItemModel'
import User from '@/models/UserModel'

export default async function handler(req, res) {
	const { method } = req
	const { id, email } = req.query

	if (method === 'GET') {
		try {
			const auction = await AuctionItem.findById(id)
			const user = await User.findOne({ email })

			if (!auction) {
				return res
					.status(404)
					.json({ success: false, message: 'Auction not found' })
			}

			if (auction.likedBy.includes(email) || user.liked.includes(id)) {
				return res
					.status(200)
					.json({ success: false, message: 'Already liked' })
			}

			user.liked.push(id)
			auction.likedBy.push(email)
			const save = await auction.save()
			await user.save()
			res.status(200).json({ success: true, message: 'Auction liked' })
		} catch (error) {
			console.log(error)
			res.status(400).json({ success: false, error })
		}
	} else {
		res.status(400).json({ success: false, message: 'Invalid method' })
	}
}
