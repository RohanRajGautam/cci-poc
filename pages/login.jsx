import { getCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import Layout from '../components/layout'

import 'react-toastify/dist/ReactToastify.css'

export default function LoginPage({ email }) {
	const router = useRouter()
	const { msg } = router.query

	const [formData, setFormData] = useState({ email: '', password: '' })

	useEffect(() => {
		if (msg) {
			toast.error(msg)
		}
	}, [msg])

	return (
		<Layout pageTitle='Login'>
			<section className='w-full h-screen flex items-center justify-center bg-indigo-700 text-center text-indigo-600'>
				<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 min-w-[350px]'>
					<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-indigo-800 dark:border-indigo-700'>
						<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
							<h1 className='text-xl font-bold leading-tight tracking-tight text-indigo-600 md:text-2xl dark:text-white'>
								Sign in to your account
							</h1>
							<form
								action='/api/login'
								method='POST'
								className=' space-y-4 md:space-y-6'
							>
								<div className='text-left'>
									<label
										htmlFor='email'
										className='block mb-2 text-sm font-medium text-indigo-900 dark:text-white'
									>
										Your email
									</label>
									<input
										onChange={(e) =>
											setFormData({ ...formData, email: e.target.value })
										}
										type='email'
										name='email'
										id='email'
										className='bg-indigo-50 border border-indigo-300 text-indigo-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										placeholder='name@company.com'
										required=''
									/>
								</div>
								<div className='text-left'>
									<label
										htmlFor='password'
										className='block mb-2 text-sm font-medium text-indigo-900 dark:text-white'
									>
										Password
									</label>
									<input
										onChange={(e) =>
											setFormData({ ...formData, password: e.target.value })
										}
										type='password'
										name='password'
										id='password'
										placeholder='••••••••'
										className='bg-indigo-50 border border-indigo-300 text-indigo-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
										required=''
									/>
								</div>
								<div className='flex items-center justify-between'>
									<div className='flex items-start'>
										<div className='flex items-center h-5'>
											<input
												id='remember'
												aria-describedby='remember'
												type='checkbox'
												className='w-4 h-4 border border-indigo-300 rounded bg-indigo-50 focus:ring-3 focus:ring-primary-300 dark:bg-indigo-700 dark:border-indigo-600 dark:focus:ring-primary-600 dark:ring-offset-indigo-800'
												required=''
											/>
										</div>
										<div className='ml-3 text-sm'>
											<label
												htmlFor='remember'
												className='text-indigo-500 dark:text-indigo-300'
											>
												Remember me
											</label>
										</div>
									</div>
									<a
										href='#'
										className='text-sm font-medium text-white hover:underline dark:text-primary-500'
									>
										Forgot password?
									</a>
								</div>
								<button
									type='submit'
									className='w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
								>
									Sign in
								</button>
								<p className='text-sm font-light text-indigo-500 dark:text-indigo-400'>
									Don’t have an account yet?{' '}
									<Link
										href='/signup'
										className='font-medium text-white hover:underline dark:text-primary-500'
									>
										Sign up
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
			<ToastContainer />
		</Layout>
	)
}

export async function getServerSideProps(context) {
	const req = context.req
	const res = context.res
	var email = getCookie('email', { req, res })
	if (email != undefined) {
		return {
			redirect: {
				permanent: false,
				destination: '/',
			},
		}
	}
	return { props: { email: false } }
}
