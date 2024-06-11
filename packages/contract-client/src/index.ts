import { Buffer } from 'buffer'
import { Address } from '@stellar/stellar-sdk'
import {
	AssembledTransaction,
	Client as ContractClient,
	ClientOptions as ContractClientOptions,
	Result,
	Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract'
import type {
	u32,
	i32,
	u64,
	i64,
	u128,
	i128,
	u256,
	i256,
	Option,
	Typepoint,
	Duration,
} from '@stellar/stellar-sdk/contract'
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
	//@ts-ignore Buffer exists
	window.Buffer = window.Buffer || Buffer
}

export const networks = {
	testnet: {
		networkPassphrase: 'Test SDF Network ; September 2015',
		contractId: 'CAHFMJVFXBOK7B2ZNCYKQRNLB43S54MKY4NGSDR2BCFBL23TWK63MM4X',
	},
} as const

export interface Metadata {
	creator: string
	metadata_url: string
}

export interface Series {
	metadata: Metadata
	series_id: u128
}

export interface TokenDetail {
	owner: string
	series: Series
	token_id: u128
}

export type DataKey =
	| { tag: 'Admin'; values: void }
	| { tag: 'Name'; values: void }
	| { tag: 'Symbol'; values: void }
	| { tag: 'Supply'; values: void }
	| { tag: 'Series'; values: void }
	| { tag: 'Metadata'; values: readonly [u128] }
	| { tag: 'SeriesToken'; values: readonly [u128] }
	| { tag: 'TokenOwner'; values: readonly [u128, u128] }

export type UserDataKey =
	| { tag: 'Balance'; values: readonly [string] }
	| { tag: 'OwnedToken'; values: readonly [string] }

export const Errors = {}

export interface Client {
	/**
	 * Construct and simulate a init transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.   *
	 * Does comment show up?
	 */
	init: (
		{ admin, name, symbol }: { admin: string; name: string; symbol: string },
		options?: {
			/**
			 * The fee to pay for the transaction. Default: BASE_FEE
			 */
			fee?: number

			/**
			 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
			 */
			timeoutInSeconds?: number

			/**
			 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
			 */
			simulate?: boolean
		},
	) => Promise<AssembledTransaction<null>>

	/**
	 * Construct and simulate a admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	admin: (options?: {
		/**
		 * The fee to pay for the transaction. Default: BASE_FEE
		 */
		fee?: number

		/**
		 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
		 */
		timeoutInSeconds?: number

		/**
		 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
		 */
		simulate?: boolean
	}) => Promise<AssembledTransaction<string>>

	/**
	 * Construct and simulate a name transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	name: (options?: {
		/**
		 * The fee to pay for the transaction. Default: BASE_FEE
		 */
		fee?: number

		/**
		 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
		 */
		timeoutInSeconds?: number

		/**
		 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
		 */
		simulate?: boolean
	}) => Promise<AssembledTransaction<string>>

	/**
	 * Construct and simulate a symbol transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	symbol: (options?: {
		/**
		 * The fee to pay for the transaction. Default: BASE_FEE
		 */
		fee?: number

		/**
		 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
		 */
		timeoutInSeconds?: number

		/**
		 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
		 */
		simulate?: boolean
	}) => Promise<AssembledTransaction<string>>

	/**
	 * Construct and simulate a decimals transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	decimals: (options?: {
		/**
		 * The fee to pay for the transaction. Default: BASE_FEE
		 */
		fee?: number

		/**
		 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
		 */
		timeoutInSeconds?: number

		/**
		 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
		 */
		simulate?: boolean
	}) => Promise<AssembledTransaction<u128>>

	/**
	 * Construct and simulate a supply transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	supply: (options?: {
		/**
		 * The fee to pay for the transaction. Default: BASE_FEE
		 */
		fee?: number

		/**
		 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
		 */
		timeoutInSeconds?: number

		/**
		 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
		 */
		simulate?: boolean
	}) => Promise<AssembledTransaction<u128>>

	/**
	 * Construct and simulate a mint transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	mint: (
		{ admin, to, series_id }: { admin: string; to: string; series_id: u128 },
		options?: {
			/**
			 * The fee to pay for the transaction. Default: BASE_FEE
			 */
			fee?: number

			/**
			 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
			 */
			timeoutInSeconds?: number

			/**
			 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
			 */
			simulate?: boolean
		},
	) => Promise<AssembledTransaction<readonly [u128, u128]>>

	/**
	 * Construct and simulate a balance transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	balance: (
		{ account }: { account: string },
		options?: {
			/**
			 * The fee to pay for the transaction. Default: BASE_FEE
			 */
			fee?: number

			/**
			 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
			 */
			timeoutInSeconds?: number

			/**
			 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
			 */
			simulate?: boolean
		},
	) => Promise<AssembledTransaction<i128>>

	/**
	 * Construct and simulate a transfer transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	transfer: (
		{ from, to, id }: { from: string; to: string; id: u128 },
		options?: {
			/**
			 * The fee to pay for the transaction. Default: BASE_FEE
			 */
			fee?: number

			/**
			 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
			 */
			timeoutInSeconds?: number

			/**
			 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
			 */
			simulate?: boolean
		},
	) => Promise<AssembledTransaction<null>>

	/**
	 * Construct and simulate a transfer_from transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	transfer_from: (
		{ from, to, id }: { from: string; to: string; id: u128 },
		options?: {
			/**
			 * The fee to pay for the transaction. Default: BASE_FEE
			 */
			fee?: number

			/**
			 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
			 */
			timeoutInSeconds?: number

			/**
			 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
			 */
			simulate?: boolean
		},
	) => Promise<AssembledTransaction<null>>

	/**
	 * Construct and simulate a create_series transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	create_series: (
		{ admin, creator, metadata_url }: { admin: string; creator: string; metadata_url: string },
		options?: {
			/**
			 * The fee to pay for the transaction. Default: BASE_FEE
			 */
			fee?: number

			/**
			 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
			 */
			timeoutInSeconds?: number

			/**
			 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
			 */
			simulate?: boolean
		},
	) => Promise<AssembledTransaction<u128>>

	/**
	 * Construct and simulate a metadata transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	metadata: (
		{ token_id, series_id }: { token_id: u128; series_id: u128 },
		options?: {
			/**
			 * The fee to pay for the transaction. Default: BASE_FEE
			 */
			fee?: number

			/**
			 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
			 */
			timeoutInSeconds?: number

			/**
			 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
			 */
			simulate?: boolean
		},
	) => Promise<AssembledTransaction<TokenDetail>>

	/**
	 * Construct and simulate a series_metadata transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	series_metadata: (
		{ series_id }: { series_id: u128 },
		options?: {
			/**
			 * The fee to pay for the transaction. Default: BASE_FEE
			 */
			fee?: number

			/**
			 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
			 */
			timeoutInSeconds?: number

			/**
			 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
			 */
			simulate?: boolean
		},
	) => Promise<AssembledTransaction<Series>>

	/**
	 * Construct and simulate a owned_tokens transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	owned_tokens: (
		{ owner, skip, limit }: { owner: string; skip: u128; limit: u128 },
		options?: {
			/**
			 * The fee to pay for the transaction. Default: BASE_FEE
			 */
			fee?: number

			/**
			 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
			 */
			timeoutInSeconds?: number

			/**
			 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
			 */
			simulate?: boolean
		},
	) => Promise<AssembledTransaction<Array<string>>>

	/**
	 * Construct and simulate a upgrade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
	 */
	upgrade: (
		{ new_wasm_hash }: { new_wasm_hash: Buffer },
		options?: {
			/**
			 * The fee to pay for the transaction. Default: BASE_FEE
			 */
			fee?: number

			/**
			 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
			 */
			timeoutInSeconds?: number

			/**
			 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
			 */
			simulate?: boolean
		},
	) => Promise<AssembledTransaction<null>>

	/**
	 * Construct and simulate a owner_get transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.   *
	 * Returns the owner of the contract
	 */
	owner_get: (options?: {
		/**
		 * The fee to pay for the transaction. Default: BASE_FEE
		 */
		fee?: number

		/**
		 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
		 */
		timeoutInSeconds?: number

		/**
		 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
		 */
		simulate?: boolean
	}) => Promise<AssembledTransaction<Option<string>>>

	/**
	 * Construct and simulate a owner_set transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.   *
	 * Sets the owner of the contract. If one already set it transfers it to the new owner, if signed by owner.
	 */
	owner_set: (
		{ new_owner }: { new_owner: string },
		options?: {
			/**
			 * The fee to pay for the transaction. Default: BASE_FEE
			 */
			fee?: number

			/**
			 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
			 */
			timeoutInSeconds?: number

			/**
			 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
			 */
			simulate?: boolean
		},
	) => Promise<AssembledTransaction<null>>

	/**
	 * Construct and simulate a redeploy transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.   *
	 * Redeploy the contract to a Wasm hash
	 */
	redeploy: (
		{ wasm_hash }: { wasm_hash: Buffer },
		options?: {
			/**
			 * The fee to pay for the transaction. Default: BASE_FEE
			 */
			fee?: number

			/**
			 * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
			 */
			timeoutInSeconds?: number

			/**
			 * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
			 */
			simulate?: boolean
		},
	) => Promise<AssembledTransaction<null>>
}
export class Client extends ContractClient {
	constructor(public readonly options: ContractClientOptions) {
		super(
			new ContractSpec([
				'AAAAAQAAAAAAAAAAAAAACE1ldGFkYXRhAAAAAgAAAAAAAAAHY3JlYXRvcgAAAAATAAAAAAAAAAxtZXRhZGF0YV91cmwAAAAQ',
				'AAAAAQAAAAAAAAAAAAAABlNlcmllcwAAAAAAAgAAAAAAAAAIbWV0YWRhdGEAAAfQAAAACE1ldGFkYXRhAAAAAAAAAAlzZXJpZXNfaWQAAAAAAAAK',
				'AAAAAQAAAAAAAAAAAAAAC1Rva2VuRGV0YWlsAAAAAAMAAAAAAAAABW93bmVyAAAAAAAAEwAAAAAAAAAGc2VyaWVzAAAAAAfQAAAABlNlcmllcwAAAAAAAAAAAAh0b2tlbl9pZAAAAAo=',
				'AAAAAAAAABVEb2VzIGNvbW1lbnQgc2hvdyB1cD8AAAAAAAAEaW5pdAAAAAMAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAAEbmFtZQAAABAAAAAAAAAABnN5bWJvbAAAAAAAEAAAAAA=',
				'AAAAAAAAAAAAAAAFYWRtaW4AAAAAAAAAAAAAAQAAABM=',
				'AAAAAAAAAAAAAAAEbmFtZQAAAAAAAAABAAAAEA==',
				'AAAAAAAAAAAAAAAGc3ltYm9sAAAAAAAAAAAAAQAAABA=',
				'AAAAAAAAAAAAAAAIZGVjaW1hbHMAAAAAAAAAAQAAAAo=',
				'AAAAAAAAAAAAAAAGc3VwcGx5AAAAAAAAAAAAAQAAAAo=',
				'AAAAAAAAAAAAAAAEbWludAAAAAMAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAACdG8AAAAAABMAAAAAAAAACXNlcmllc19pZAAAAAAAAAoAAAABAAAD7QAAAAIAAAAKAAAACg==',
				'AAAAAAAAAAAAAAAHYmFsYW5jZQAAAAABAAAAAAAAAAdhY2NvdW50AAAAABMAAAABAAAACw==',
				'AAAAAAAAAAAAAAAIdHJhbnNmZXIAAAADAAAAAAAAAARmcm9tAAAAEwAAAAAAAAACdG8AAAAAABMAAAAAAAAAAmlkAAAAAAAKAAAAAA==',
				'AAAAAAAAAAAAAAANdHJhbnNmZXJfZnJvbQAAAAAAAAMAAAAAAAAABGZyb20AAAATAAAAAAAAAAJ0bwAAAAAAEwAAAAAAAAACaWQAAAAAAAoAAAAA',
				'AAAAAAAAAAAAAAANY3JlYXRlX3NlcmllcwAAAAAAAAMAAAAAAAAABWFkbWluAAAAAAAAEwAAAAAAAAAHY3JlYXRvcgAAAAATAAAAAAAAAAxtZXRhZGF0YV91cmwAAAAQAAAAAQAAAAo=',
				'AAAAAAAAAAAAAAAIbWV0YWRhdGEAAAACAAAAAAAAAAh0b2tlbl9pZAAAAAoAAAAAAAAACXNlcmllc19pZAAAAAAAAAoAAAABAAAH0AAAAAtUb2tlbkRldGFpbAA=',
				'AAAAAAAAAAAAAAAPc2VyaWVzX21ldGFkYXRhAAAAAAEAAAAAAAAACXNlcmllc19pZAAAAAAAAAoAAAABAAAH0AAAAAZTZXJpZXMAAA==',
				'AAAAAAAAAAAAAAAMb3duZWRfdG9rZW5zAAAAAwAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAARza2lwAAAACgAAAAAAAAAFbGltaXQAAAAAAAAKAAAAAQAAA+oAAAAQ',
				'AAAAAAAAAAAAAAAHdXBncmFkZQAAAAABAAAAAAAAAA1uZXdfd2FzbV9oYXNoAAAAAAAD7gAAACAAAAAA',
				'AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAACAAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAAETmFtZQAAAAAAAAAAAAAABlN5bWJvbAAAAAAAAAAAAAAAAAAGU3VwcGx5AAAAAAAAAAAAAAAAAAZTZXJpZXMAAAAAAAEAAAAAAAAACE1ldGFkYXRhAAAAAQAAAAoAAAABAAAAAAAAAAtTZXJpZXNUb2tlbgAAAAABAAAACgAAAAEAAAAAAAAAClRva2VuT3duZXIAAAAAAAIAAAAKAAAACg==',
				'AAAAAgAAAAAAAAAAAAAAC1VzZXJEYXRhS2V5AAAAAAIAAAABAAAAAAAAAAdCYWxhbmNlAAAAAAEAAAATAAAAAQAAAAAAAAAKT3duZWRUb2tlbgAAAAAAAQAAABM=',
				'AAAAAAAAACFSZXR1cm5zIHRoZSBvd25lciBvZiB0aGUgY29udHJhY3QAAAAAAAAJb3duZXJfZ2V0AAAAAAAAAAAAAAEAAAPoAAAAEw==',
				'AAAAAAAAAGhTZXRzIHRoZSBvd25lciBvZiB0aGUgY29udHJhY3QuIElmIG9uZSBhbHJlYWR5IHNldCBpdCB0cmFuc2ZlcnMgaXQgdG8gdGhlIG5ldyBvd25lciwgaWYgc2lnbmVkIGJ5IG93bmVyLgAAAAlvd25lcl9zZXQAAAAAAAABAAAAAAAAAAluZXdfb3duZXIAAAAAAAATAAAAAA==',
				'AAAAAAAAACRSZWRlcGxveSB0aGUgY29udHJhY3QgdG8gYSBXYXNtIGhhc2gAAAAIcmVkZXBsb3kAAAABAAAAAAAAAAl3YXNtX2hhc2gAAAAAAAPuAAAAIAAAAAA=',
			]),
			options,
		)
	}
	public readonly fromJSON = {
		init: this.txFromJSON<null>,
		admin: this.txFromJSON<string>,
		name: this.txFromJSON<string>,
		symbol: this.txFromJSON<string>,
		decimals: this.txFromJSON<u128>,
		supply: this.txFromJSON<u128>,
		mint: this.txFromJSON<readonly [u128, u128]>,
		balance: this.txFromJSON<i128>,
		transfer: this.txFromJSON<null>,
		transfer_from: this.txFromJSON<null>,
		create_series: this.txFromJSON<u128>,
		metadata: this.txFromJSON<TokenDetail>,
		series_metadata: this.txFromJSON<Series>,
		owned_tokens: this.txFromJSON<Array<string>>,
		upgrade: this.txFromJSON<null>,
		owner_get: this.txFromJSON<Option<string>>,
		owner_set: this.txFromJSON<null>,
		redeploy: this.txFromJSON<null>,
	}
}
