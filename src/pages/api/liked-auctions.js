import AuctionItem from '@/models/AuctionItemModel'
import User from '@/models/UserModel'

export default async function handler(req, res) {
	const { method } = req
	const { email } = req.query

	if (method === 'GET') {
		try {
			const user = await User.findOne({ email })

			if (!user) {
				return res
					.status(404)
					.json({ success: false, message: 'User not found' })
			}

			const likedAuctionIds = user.liked
			const likedAuctions = await AuctionItem.find({
				_id: { $in: likedAuctionIds },
			})

			res.status(200).json({ success: true, data: likedAuctions })
		} catch (error) {
			console.log(error)
			res.status(400).json({ success: false, error })
		}
	} else {
		res.status(400).json({ success: false, message: 'Invalid method' })
	}
}
