import dotenv from 'dotenv'
dotenv.config()

import { ZirizClient } from './client.js'
import ZirizCMDWallet from './wallet.js'
import { AxiosError } from 'axios'

const initContract = async () => {
	let secret = process.env.ADMIN_SECRET || ''
	const cmdWallet = new ZirizCMDWallet({ network: 'testnet', secret: secret })
	let client = new ZirizClient()

	await client.init('testnet', cmdWallet)

	try {
		const tx = await client.instance?.init({
			admin: process.env.ADMIN || '',
			name: 'Ziriz',
			symbol: 'ZNFT',
		})

		tx?.signAndSend()
	} catch (e) {
		console.log(e)
		const error = e as AxiosError
		if (error.response?.data) {
			console.log(JSON.stringify(error.response?.data))
		}
	}
}

initContract()
