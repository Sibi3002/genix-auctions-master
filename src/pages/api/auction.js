import { connect } from '@/dbconfig/dbconfig'
import AuctionItem from '@/models/AuctionItemModel'
import { useSession } from 'next-auth/react'

export default async function handler(req, res) {
	const { method } = req

	await connect()
	console.log(method)

	switch (method) {
		case 'POST':
			try {
				const body = req.body
				console.log(body)

				const done = await AuctionItem.insertMany({
					...req.body,
				})
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
