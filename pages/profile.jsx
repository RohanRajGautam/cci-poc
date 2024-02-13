import Layout from '../components/layout'
import { getCookie } from 'cookies-next'
import Link from 'next/link'
import clientPromise from '../lib/mongodb'

export default function ProfilePage({ email, created }) {
	function extractNameFromEmail(email) {
		// Use regex to split the email at the "@" symbol
		const [name] = email.split(/@/)
		return name
	}

	return (
		<Layout pageTitle='Profile'>
			<div className='w-full h-screen flex items-center justify-center text-white bg-indigo-700 flex-col tracking-widest uppercase'>
				<h2 className='text-4xl font-extrabold mb-4'>
					{extractNameFromEmail(email)}'s Profile
				</h2>

				<br />
				<Link href='/profile'>
					Account created at <b>{created}</b>
				</Link>
				<br />
				<div>
					<Link
						href='/'
						className='mr-4 bg-transparent hover:bg-white border-2 border-white hover:bg-transparent transition-all hover:text-indigo-700 text-white font-semibold text-lg  px-4 py-2 rounded duration-700'
					>
						Home
					</Link>
					<Link
						href='/api/logout'
						className='bg-white border-2 border-white hover:bg-transparent transition-all text-indigo-700 hover:text-white font-semibold text-lg  px-4 py-2 rounded duration-700 '
					>
						Logout
					</Link>
				</div>
			</div>
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const req = context.req
	const res = context.res
	var email = getCookie('email', { req, res })
	if (email == undefined) {
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
		}
	}
	const client = await clientPromise
	const db = client.db('Users')
	const users = await db.collection('Profiles').find({ email: email }).toArray()
	const userdoc = users[0]
	const created = userdoc['Created']
	return {
		props: { email: email, created: created },
	}
}
