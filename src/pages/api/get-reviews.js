import AuctionItem from '@/models/AuctionItemModel'

export default async (req, res) => {
	const { userId } = req.query

	if (!userId) {
		return res.status(400).json({ error: 'User ID is required' })
	}
	try {
		const auctions = await AuctionItem.find({ 'reviews.username': userId })
		const userReviews = auctions.flatMap((auction) =>
			auction.reviews
				.filter((review) => review.username === userId)
				.map((review) => ({
					_id: auction._id,
					title: auction.title,
					review,
				}))
		)
		console.log(userReviews)
		res.status(200).json({ success: true, data: userReviews })
	} catch (error) {
		res.status(500).json({ success: false, error: 'Server Error' })
	}
}
