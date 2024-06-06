use crate::{
    data_type::{Series, TokenDetail},
    soroban_sdk::{Address, BytesN, Env, String, Vec},
};

pub trait NonFungibleTokenTrait {
    fn init(env: Env, admin: Address, name: String, symbol: String);
    fn admin(env: Env) -> Address;

    fn name(env: Env) -> String;

    fn symbol(env: Env) -> String;

    fn decimals(env: Env) -> u128;

    fn supply(env: Env) -> u128;

    fn balance(env: Env, account: Address) -> i128;

    fn transfer(env: Env, from: Address, to: Address, token_id: u128);

    fn transfer_from(env: Env, from: Address, to: Address, token_id: u128);

    fn mint(env: Env, admin: Address, to: Address, series_id: u128) -> (u128, u128);

    fn create_series(env: Env, admin: Address, creator: Address, metadata_url: String) -> u128;

    fn metadata(env: Env, token_id: u128, series_id: u128) -> TokenDetail;

    fn series_metadata(env: Env, series_id: u128) -> Series;

    fn owned_tokens(env: Env, owner: Address, skip: u128, limit: u128) -> Vec<String>;

    fn upgrade(env: Env, new_wasm_hash: BytesN<32>);
}
