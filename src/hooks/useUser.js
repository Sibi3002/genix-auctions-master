import { useEffect, useState } from 'react'
import { auth } from '@/services/firebase-service'

/** @returns {firebase.UserInfo | null | undefined} */
export function useUser() {
	const [user, setUser] = useState(undefined)
	useEffect(() => {
		return auth.onAuthStateChanged((user) => {
			setUser(user)
		})
	}, [])

	return user
}
