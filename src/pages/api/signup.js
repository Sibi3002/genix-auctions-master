import User from '@/models/UserModel'
import bcryptjs from 'bcryptjs'
import { connect } from '@/dbconfig/dbconfig'

export default async function POST(request, res) {
	try {
		connect()
		console.log(request.body)
		const reqBody = await request.body
		const { username, lastname, email, password } = reqBody

		const existingUser = await User.findOne({ email })
		if (existingUser) {
			res.status(400).json({ error: 'User already exists' })
		}

		const salt = await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)

		const newUser = new User({
			username,
			email,
			password: hashedPassword,
			lastname,
		})

		const savedUser = await newUser.save()

		res.status(201).json({
			message: 'User created successfully.',
			success: true,
			savedUser,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: error.message })
	}
}
