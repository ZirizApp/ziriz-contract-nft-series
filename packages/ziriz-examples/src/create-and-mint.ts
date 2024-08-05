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
		const createSeries = await client.instance?.create_series({
			admin: client.publicKey,
			creator: client.publicKey,
			metadata_url:
				'https://link.storjshare.io/s/jvwh64b6milx7jmwv26r75xk6vka/ziriz-test/1722505143175&3280d5442e76fcf584dd8dd4873c6c5dd2ff163f2cae58e2846e1c1e7325f8b3.json?wrap=0',
		})

		const seriesId = await createSeries?.signAndSend()

		const mint = await client.instance?.mint({
			admin: client.publicKey,
			to: client.publicKey,
			series_id: seriesId?.result || BigInt(1),
		})

		await mint?.signAndSend()

		console.log('Series ID:', seriesId?.result)
	} catch (e) {
		console.log(e)
		const error = e as AxiosError
		if (error.response?.data) {
			console.log(JSON.stringify(error.response?.data))
		}
	}
}

initContract()
