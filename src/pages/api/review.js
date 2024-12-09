import { connect } from '@/dbconfig/dbconfig'
import AuctionItem from '@/models/AuctionItemModel'

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method Not Allowed' })
	}

	const { auctionId, rating, reviewText, reviewer } = req.body
	if (!auctionId || !rating || !reviewText) {
		return res.status(400).json({ message: 'Bad Request' })
	}

	await connect()

	const auctionItem = await AuctionItem.findById(auctionId)
	if (!auctionItem) {
		return res.status(404).json({ message: 'Auction item not found' })
	}

	const review = {
		username: reviewer,
		reviewText,
		rating: parseInt(rating, 10),
		date: new Date(),
	}

	auctionItem.reviews.push(review)
	await auctionItem.save()

	return res
		.status(201)
		.json({ message: 'Review submitted successfully', review })
}
