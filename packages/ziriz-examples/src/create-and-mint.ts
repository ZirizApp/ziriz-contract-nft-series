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
				'https://link.storjshare.io/s/jwzwr227mcqhf6uemcqwl5xsp5bq/ziriz/1706056092982&blur.json?wrap=0',
		})

		const seriesId = await createSeries?.signAndSend()

		const mint = await client.instance?.mint({
			admin: client.publicKey,
			to: client.publicKey,
			series_id: seriesId?.result || BigInt(1),
		})

		await mint?.signAndSend()
	} catch (e) {
		console.log(e)
		const error = e as AxiosError
		if (error.response?.data) {
			console.log(JSON.stringify(error.response?.data))
		}
	}
}

initContract()
