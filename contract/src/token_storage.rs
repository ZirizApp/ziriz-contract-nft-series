use crate::soroban_sdk::{Address, Env, Vec};
use crate::{
    bump::{extend_persistent, extend_user_persistent},
    storage_types::{DataKey, UserDataKey},
};

pub fn read_supply(e: &Env) -> u128 {
    let key = DataKey::Supply;
    e.storage()
        .persistent()
        .get(&key)
        .unwrap_or(0)
}

pub fn increment_supply(e: &Env) -> u128 {
    let key = DataKey::Supply;
    let next_supply = read_supply(e) + 1;
    e.storage().persistent().set(&key, &next_supply);
    next_supply
}

pub fn read_balance(e: &Env, id: &Address) -> u128 {
    let key = UserDataKey::Balance(id.clone());
    e.storage()
        .persistent()
        .get::<UserDataKey, u128>(&key)
        .unwrap_or(0)
}

pub fn increment_balance(e: &Env, id: &Address) {
    let key = UserDataKey::Balance(id.clone());
    e.storage()
        .persistent()
        .set(&key, &(read_balance(e, id) + 1));
}

pub fn write_token_owner(e: &Env, token_id: u128, series_id: u128, owner: &Address) {
    let key = DataKey::TokenOwner(token_id, series_id);
    e.storage().persistent().set(&key, owner);
}

pub fn read_token_owner(e: &Env, token_id: u128, series_id: u128) -> Option<Address> {
    let key = DataKey::TokenOwner(token_id, series_id);
    e.storage().persistent().get(&key)
}

pub fn add_owned_token(env: &Env, address: &Address, token_id: u128, series_id: u128) {
    let key = UserDataKey::OwnedToken(address.clone());
    let mut tokens = read_owned_tokens(env, address);
    tokens.push_back((token_id, series_id));
    env.storage().persistent().set(&key, &tokens);
}

pub fn read_owned_tokens(env: &Env, address: &Address) -> Vec<(u128, u128)> {
    let key = UserDataKey::OwnedToken(address.clone());
    match env.storage().persistent().get(&key) {
        Some(tokens) => tokens,
        None => Vec::new(env),
    }
}

pub fn extend_balance_ttl(env: &Env, id: &Address) {
    let key = UserDataKey::Balance(id.clone());
    extend_user_persistent(env, &key);
}

pub fn extend_token_owner_ttl(env: &Env, token_id: u128, series_id: u128) {
    let key = DataKey::TokenOwner(token_id, series_id);
    extend_persistent(env, &key);
}

pub fn extend_owned_tokens_ttl(env: &Env, address: &Address) {
    let key = UserDataKey::OwnedToken(address.clone());
    extend_user_persistent(env, &key);
}
