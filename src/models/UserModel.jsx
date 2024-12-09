import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide a username'],
		unique: true,
	},
	lastname: {
		type: String,
		required: [true, 'Please provide a lastname'],
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
	},

	isAdmin: {
		type: Boolean,
		default: false,
	},
	liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AuctionItem' }],
	forgotpasswordtoken: String,
	forgotpasswordtokenexpiry: Date,
	verifiedtokien: String,
	verifiedtokienexpiry: Date,
})

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User
