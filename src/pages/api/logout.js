import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const request = await NextResponse.json({
			massage: 'logout successfully',
			sucsee: true,
		})

		request.cookies.set('token', '', { httpOnly: true, expires: new Date(0) })

		return request
	} catch (error) {
		return NextResponse.json({ massage: 'your requast is not complete' })
	}
}
