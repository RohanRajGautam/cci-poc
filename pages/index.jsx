import Layout from '../components/layout'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage({ email }) {
	function extractNameFromEmail(email) {
		// Use regex to split the email at the "@" symbol
		const [name] = email.split(/@/)
		return name
	}

	return (
		<Layout pageTitle='Home'>
			{email ? (
				<>
					<div className='w-full h-[400px] flex items-center justify-center text-white bg-indigo-700 flex-col tracking-widest uppercase'>
						<h2 className='text-4xl font-extrabold mb-4'>
							Hi {extractNameFromEmail(email)}
						</h2>
						<Link href='/profile'>Profile</Link>
						<br />
						<Link
							href='/api/logout'
							className='bg-white border-2 border-white hover:bg-transparent transition-all text-indigo-700 hover:text-white font-semibold text-lg  px-4 py-2 rounded duration-700 '
						>
							Logout
						</Link>
					</div>

					<div>
						<Image src='/cci-sample.jpeg' width={1297} height={1000} />
					</div>
				</>
			) : (
				<>
					<div className='w-full h-screen flex items-center justify-center text-white bg-indigo-700 flex-col tracking-widest uppercase'>
						<h2 className='text-4xl font-extrabold mb-4'>
							Welcome to CCI Construction
						</h2>
						<br />
						<Link href='/login'>Login</Link>
						<br />
						<Link
							href='/signup'
							className='bg-white border-2 border-white hover:bg-transparent transition-all text-indigo-700 hover:text-white font-semibold text-lg  px-4 py-2 rounded duration-700 '
						>
							Signup
						</Link>
					</div>
				</>
			)}
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const req = context.req
	const res = context.res
	var email = getCookie('email', { req, res })
	if (email == undefined) {
		email = false
	}
	return { props: { email } }
}
