import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connect } from '@/dbconfig/dbconfig'
import User from '@/models/UserModel'

connect()

export default async function POST(request, res) {
	try {
		const reqBody = request.body
		const { email, password } = reqBody

		const user = await User.findOne({ email })
		if (!user) {
			res.status(400).json({ error: 'User does not exist' })
		}

		const validPassword = await bcryptjs.compare(password, user.password)
		if (!validPassword) {
			res.status(400).json({ error: 'Invalid password' })
		}

		const tokenData = {
			id: user._id,
			username: user.username,
			email: user.email,
		}

		const token = await jwt.sign(tokenData, 'secret', { expiresIn: '1d' })

		const response = res
			.cookie('token', token, {
				maxAge: 60 * 60 * 24,
				httpOnly: true,
			})
			.status(200)
			.json({
				message: 'Login successful',
				success: true,
			})

		return response
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: error.message })
	}
}
