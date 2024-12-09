import bcryptjs from 'bcryptjs'
import { connect } from '@/dbconfig/dbconfig'
import User from '@/models/UserModel'

export const userService = {
	authenticate,
}

async function authenticate(username, password) {
	await connect()
	const user = await User.findOne({ email: username })
	if (!user) {
		return null
	}

	const validPassword = await bcryptjs.compare(password, user.password)
	if (!validPassword) return null

	// Remove password before returning user
	const { password: pwd, ...userWithoutPassword } = user.toObject()
	console.log(userWithoutPassword)

	return { name: user.username, email: user.email }
}
