use crate::admin_storage::{has_admin, read_admin, write_admin};
use crate::bump::extend_instance;
use crate::contract::NonFungibleTokenTrait;
use crate::data_type::{Metadata, Series, TokenDetail};
use crate::metadata_storage::{read_name, read_symbol, write_name, write_symbol};
use crate::series_storage::{
    extend_series_ttl, increment_series, increment_series_token, read_series_metadata,
    write_series_metadata,
};
use crate::soroban_sdk::{
    self, contract, contractimpl, log, symbol_short, Address, BytesN, Env, String, Vec,
};
use crate::token_storage::{
    add_owned_token, extend_balance_ttl, extend_owned_tokens_ttl, extend_token_owner_ttl,
    increment_balance, increment_supply, read_balance, read_owned_tokens, read_supply,
    read_token_owner, write_token_owner,
};
use alloc::fmt::format;
#[contract]
pub struct NonFungibleToken;

#[contractimpl]
impl NonFungibleTokenTrait for NonFungibleToken {
    /// Does comment show up?
    fn init(env: Env, admin: Address, name: String, symbol: String) {
        assert!(!has_admin(&env), "already initialized");
        write_admin(&env, &admin);
        write_name(&env, &name);
        write_symbol(&env, &symbol);
        crate::Contract__::owner_set(env, admin);
    }

    fn admin(env: Env) -> Address {
        extend_instance(&env);
        read_admin(&env)
    }

    fn name(env: Env) -> String {
        extend_instance(&env);
        read_name(&env)
    }

    fn symbol(env: Env) -> String {
        extend_instance(&env);
        read_symbol(&env)
    }

    fn decimals(_env: Env) -> u128 {
        0
    }

    fn supply(env: Env) -> u128 {
        let supply = read_supply(&env);
        extend_instance(&env);

        supply
    }

    fn mint(env: Env, admin: Address, to: Address, series_id: u128) -> (u128, u128) {
        assert!(admin == read_admin(&env), "Only admin can mint");

        admin.require_auth();

        let series_metadata = read_series_metadata(&env, series_id);

        assert!(series_metadata.is_some(), "Series ID Not Found");

        let token_id = increment_series_token(&env, series_id);
        increment_balance(&env, &to);
        increment_supply(&env);
        write_token_owner(&env, token_id, series_id, &to);
        add_owned_token(&env, &to, token_id, series_id);

        extend_instance(&env);
        extend_series_ttl(&env, series_id);
        extend_owned_tokens_ttl(&env, &to);
        extend_balance_ttl(&env, &to);

        log!(
            &env,
            "Mint Series ID {} to {} with Token ID {}",
            series_id,
            to,
            token_id
        );

        env.events()
            .publish((symbol_short!("mint"), series_id), (token_id, series_id));

        (token_id, series_id)
    }

    #[allow(clippy::cast_possible_wrap)]
    fn balance(env: Env, account: Address) -> i128 {
        extend_instance(&env);
        extend_balance_ttl(&env, &account);

        read_balance(&env, &account).try_into().unwrap()
    }

    #[allow(unused_variables)]
    fn transfer(_env: Env, from: Address, to: Address, id: u128) {
        panic!("Can not transfer NFTs");
    }

    #[allow(unused_variables)]
    fn transfer_from(_env: Env, from: Address, to: Address, id: u128) {
        panic!("Can not transfer NFTs");
    }

    fn create_series(env: Env, admin: Address, creator: Address, metadata_url: String) -> u128 {
        assert!(admin == read_admin(&env), "Only admin can mint");

        admin.require_auth();

        let series_id = increment_series(&env);

        let metadata: Metadata = Metadata {
            creator: creator.clone(),
            metadata_url,
        };

        write_series_metadata(&env, series_id, &metadata);

        let token_id = increment_series_token(&env, series_id);
        increment_balance(&env, &creator);
        increment_supply(&env);
        write_token_owner(&env, token_id, series_id, &creator);
        add_owned_token(&env, &creator, token_id, series_id);

        extend_instance(&env);

        log!(&env, "{} create series with id {}", creator, series_id);

        env.events()
            .publish((symbol_short!("create"), series_id), metadata);

        series_id
    }

    fn metadata(env: Env, token_id: u128, series_id: u128) -> TokenDetail {
        let token_owner = read_token_owner(&env, token_id, series_id);

        assert!(token_owner.is_some(), "Token Not Found");

        let metadata = read_series_metadata(&env, series_id);

        extend_instance(&env);
        extend_series_ttl(&env, series_id);
        extend_token_owner_ttl(&env, token_id, series_id);

        TokenDetail {
            token_id,
            owner: token_owner.unwrap(),
            series: Series {
                series_id,
                metadata: metadata.unwrap(),
            },
        }
    }

    fn series_metadata(env: Env, series_id: u128) -> Series {
        extend_series_ttl(&env, series_id);
        extend_instance(&env);

        let metadata = read_series_metadata(&env, series_id);

        Series {
            series_id,
            metadata: metadata.unwrap(),
        }
    }

    fn owned_tokens(env: Env, owner: Address, skip: u128, limit: u128) -> Vec<String> {
        let owned_tokens = read_owned_tokens(&env, &owner);
        let skip_size: usize = skip.try_into().unwrap();
        let limit_size: usize = limit.try_into().unwrap();
        let mut data: Vec<String> = Vec::new(&env);

        let _ =
            owned_tokens
                .iter()
                .skip(skip_size)
                .take(limit_size)
                .map(|(token_id, series_id)| {
                    data.push_back(String::from_str(
                        &env,
                        format(format_args!("{token_id}:{series_id}")).as_str(),
                    ));
                });

        extend_instance(&env);
        extend_owned_tokens_ttl(&env, &owner);

        data
    }

    fn upgrade(env: Env, new_wasm_hash: BytesN<32>) {
        read_admin(&env).require_auth();
        env.deployer().update_current_contract_wasm(new_wasm_hash);
    }
}
