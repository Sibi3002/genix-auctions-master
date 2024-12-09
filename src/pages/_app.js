import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { SessionProvider } from 'next-auth/react'
import '@/styles/globals.css'
import Head from 'next/head'
import Seo from '@/components/Seo'

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}) {
	return (
		<SessionProvider session={session}>
			<Seo />
			<div>
				<div className="fixed  bg-pink-100  w-full m-0 top-0 left-0 z-50">
					<Header />
				</div>
				<div className="relative top-[5rem] min-h-screen">
					<Component {...pageProps} />
				</div>

				<div className="mt-24">
					<Footer />
				</div>
			</div>
		</SessionProvider>
	)
}
