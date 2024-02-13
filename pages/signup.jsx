import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import { ToastContainer, toast } from 'react-toastify'

import Layout from '../components/layout'

import 'react-toastify/dist/ReactToastify.css'

export default function SignupPage({ email }) {
	const router = useRouter()
	const { msg } = router.query

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log(formData)
		const res = await register_user(formData)
		if (res.success) {
			toast.success(res.message)
		} else {
			toast.error(res.message)
		}
	}

	useEffect(() => {
		if (msg) {
			toast.error(msg)
		}
	}, [msg])

	return (
		<Layout pageTitle='Signup'>
			<>
				<section className='w-full h-screen flex items-center justify-center bg-indigo-700 text-center'>
					<div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 min-w-[350px]'>
						<div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-indigo-800 dark:border-indigo-700'>
							<div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
								<h1 className='text-xl font-bold leading-tight tracking-tight text-indigo-700 md:text-2xl dark:text-white'>
									Create an Account
								</h1>
								<form
									action='/api/signup'
									method='POST'
									className=' space-y-4 md:space-y-6'
								>
									<div className='text-left'>
										<label
											htmlFor='email'
											className='block mb-2 text-sm font-medium text-indigo-700 dark:text-white'
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
											className='bg-indigo-50 border border-indigo-300 text-indigo-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											placeholder='name@company.com'
											required=''
										/>
									</div>
									<div className='text-left'>
										<label
											htmlFor='password'
											className='block mb-2 text-sm font-medium text-indigo-700 dark:text-white'
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
											className='bg-indigo-50 border border-indigo-300 text-indigo-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											required=''
										/>
									</div>
									<div className='text-left'>
										<label
											htmlFor='passwordagain'
											className='block mb-2 text-sm font-medium text-indigo-700 dark:text-white'
										>
											Password Again
										</label>
										<input
											onChange={(e) =>
												setFormData({ ...formData, password: e.target.value })
											}
											type='password'
											name='passwordagain'
											id='passwordagain'
											placeholder='••••••••'
											className='bg-indigo-50 border border-indigo-300 text-indigo-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
											required=''
										/>
									</div>

									<button
										type='submit'
										className='w-full text-white bg-indigo-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
									>
										Sign Up
									</button>
									<p className='text-sm font-light text-indigo-500 dark:text-indigo-400'>
										Already have an account{' '}
										<Link
											href='/login'
											className='font-medium text-white hover:underline dark:text-primary-500'
										>
											Sign In
										</Link>
									</p>
								</form>
							</div>
						</div>
					</div>
				</section>

				<ToastContainer />
			</>
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
