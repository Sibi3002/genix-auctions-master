import { connect } from '@/dbconfig/dbconfig'
import AuctionItem from '@/models/AuctionItemModel'

export default async function handler(req, res) {
	const { method } = req

	await connect()
	console.log(method)

	switch (method) {
		case 'GET':
			try {
				const done = await AuctionItem.find({})
				res.status(201).json({ success: true, data: done })
			} catch (error) {
				console.log(error)
				res.status(403).json({ success: false, error: error.message })
			}
			break
		default:
			res.status(400).json({ success: false, error: 'Invalid request method' })
			break
	}
}
