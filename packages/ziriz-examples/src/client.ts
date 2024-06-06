import { ClientOptions } from '@stellar/stellar-sdk/contract'
import ZirizCMDWallet from './wallet.js'
import { networks, Client } from 'contract-client'

interface NetworkConfig {
	contractId: string
	networkPassphrase: string
}

export class ZirizClient {
	private contract: Client | null = null
	private _publicKey: string = ''
	constructor() {}

	async init(network: String, wallet: ZirizCMDWallet) {
		const networkConfig: NetworkConfig =
			'mainnet' in networks && network == 'mainnet'
				? (networks.mainnet as NetworkConfig)
				: (networks.testnet as NetworkConfig)
		const account = await wallet.getAccount()

		const config: ClientOptions =
			network == 'testnet' || 'mainnet' in networks
				? {
						...networkConfig,
						rpcUrl: 'https://soroban-testnet.stellar.org',
						publicKey: account.publicKey,
					}
				: {
						...networkConfig,
						rpcUrl: 'https://soroban.stellar.org',
						publicKey: account.publicKey,
					}
		config.networkPassphrase = networkConfig.networkPassphrase
		config.contractId = networkConfig.contractId
		config.signAuthEntry = wallet.signAuth.bind(wallet)
		config.signTransaction = wallet.signTransaction.bind(wallet)

		this.contract = new Client(config)
		this._publicKey = account.publicKey
	}

	get instance() {
		return this.contract
	}

	get publicKey() {
		return this._publicKey
	}
}
