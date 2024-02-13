import Cookies from 'cookies'
import clientPromise from '../../lib/mongodb'
const { createHash } = require('node:crypto')

export default async function handler(req, res) {
	if (req.method == 'POST') {
		const email = req.body['email']
		const guess = req.body['password']
		const client = await clientPromise
		const db = client.db('Users')
		const users = await db
			.collection('Profiles')
			.find({ email: email })
			.toArray()
		if (users.length == 0) {
			res.redirect('/login?msg=Incorrect email or password')
			return
		}
		const user = users[0]
		const guess_hash = createHash('sha256').update(guess).digest('hex')
		if (guess_hash == user.Password) {
			const cookies = new Cookies(req, res)
			cookies.set('email', email)
			res.redirect('/')
		} else {
			res.redirect('/login?msg=Incorrect email or password')
		}
	} else {
		res.redirect('/')
	}
}
