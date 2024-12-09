import AuctionItem from '@/models/AuctionItemModel'
import User from '@/models/UserModel'

export default async function handler(req, res) {
	const { method } = req
	const { id, email } = req.query

	if (method === 'GET') {
		try {
			const auction = await AuctionItem.updateMany(
				{ _id: id },
				{
					$pull: {
						likedBy: email,
					},
				}
			)
			const user = await User.updateMany(
				{ email },
				{
					$pull: {
						liked: id,
					},
				}
			)

			res.status(200).json({ success: true, message: 'Auction disliked' })
		} catch (error) {
			res.status(400).json({ success: false, error })
		}
	} else {
		res.status(400).json({ success: false, message: 'Invalid method' })
	}
}
