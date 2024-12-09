import { getServerSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { userService } from './services/userService'

export const authOptions = {
	session: {
		strategy: 'jwt', //(1) the default is jwt when no adapter defined, we redefined here to make it obvious what strategy that we use
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, account, profile, user }) {
			//(2)
			console.log('------------ JWT ------------')
			console.log({ token }, { account }, { profile }, { user })
			if (account && account.type === 'credentials') {
				token.userId = account.providerAccountId // this is Id that coming from authorize() callback
			}
			return token
		},
		async session({ session, token, user }) {
			//(3)
			console.log('------------ SESSION ------------')
			console.log({ session }, { token }, { user })
			if (session.user) session.user.email = token.email
			return session
		},
	},
	pages: {
		signIn: '/login', //(4) custom signin page path
	},
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'username' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const { username, password } = credentials
				const res = await userService.authenticate(username, password)
				console.log(res)
				return res //(5)
			},
		}),
	],
}

export const getServerAuthSession = () => getServerSession(authOptions) //(6)
