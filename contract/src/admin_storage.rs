use crate::soroban_sdk::{Address, Env};
use crate::storage_types::DataKey;

pub fn has_admin(e: &Env) -> bool {
    let key = DataKey::Admin;
    e.storage().persistent().has(&key)
}

pub fn read_admin(e: &Env) -> Address {
    let key = DataKey::Admin;
    e.storage().persistent().get(&key).unwrap()
}

pub fn write_admin(e: &Env, id: &Address) {
    let key = DataKey::Admin;
    e.storage().persistent().set(&key, id);
}
