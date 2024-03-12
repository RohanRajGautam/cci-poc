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

					<div className='w-full flex flex-col items-center justify-center mt-8'>
						<div className='w-full h-full text-center mb-3'>
							<a
								href='https://cciwi-my.sharepoint.com/:x:/p/mike_foss/EfynUbpvRbZCr-pl55_jzIMBxfAHYSm37IPON9X0n-APSg?e=whbBHw'
								target='_blank'
								class='text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-1 focus:ring-indigo-300 font-medium rounded-xl text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800'
							>
								CCI CapEx Report
							</a>
						</div>

						<Image src='/cci-sample.jpeg' width={1297} height={1000} />
					</div>
				</>
			) : (
				<>
					<div className='w-full h-screen flex items-center justify-center text-white bg-indigo-700 flex-col tracking-widest uppercase'>
						<h2 className='text-4xl font-extrabold mb-4 text-center'>
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
