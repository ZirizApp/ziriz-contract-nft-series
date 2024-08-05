use crate::bump::extend_persistent;
use crate::data_type::Metadata;
use crate::soroban_sdk::Env;
use crate::storage_types::DataKey;

pub fn increment_series(env: &Env) -> u128 {
    let key = DataKey::Series;
    let current = read_series(env) + 1;
    env.storage().persistent().set(&key, &current);
    current
}

pub fn read_series(env: &Env) -> u128 {
    let key = DataKey::Series;
    env.storage().persistent().get(&key).unwrap_or(0)
}

pub fn write_series_metadata(env: &Env, series_id: u128, metadata: &Metadata) {
    let key = DataKey::Metadata(series_id);
    env.storage().persistent().set(&key, metadata);
}

pub fn read_series_metadata(env: &Env, series_id: u128) -> Option<Metadata> {
    let key = DataKey::Metadata(series_id);
    env.storage().persistent().get(&key)
}

pub fn increment_series_token(e: &Env, series_id: u128) -> u128 {
    let key = DataKey::SeriesToken(series_id);
    let next_count = read_series_token(e, series_id) + 1;
    e.storage().persistent().set(&key, &next_count);
    next_count
}

pub fn read_series_token(e: &Env, series_id: u128) -> u128 {
    let key = DataKey::SeriesToken(series_id);
    e.storage()
        .persistent()
        .get::<DataKey, u128>(&key)
        .unwrap_or(0)
}

pub fn extend_series_metadata_ttl(env: &Env, series_id: u128) {
    let key = DataKey::Metadata(series_id);
    extend_persistent(env, &key);
}

pub fn extend_series_supply_ttl(env: &Env, series_id: u128) {
    let key = DataKey::SeriesToken(series_id);
    extend_persistent(env, &key);
}

pub fn extend_series_ttl(env: &Env, series_id: u128) {
    extend_series_metadata_ttl(env, series_id);
    extend_series_supply_ttl(env, series_id);
}
