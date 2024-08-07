use crate::soroban_sdk::{Env, String};
use crate::storage_types::DataKey;

pub fn read_name(e: &Env) -> String {
    let key = DataKey::Name;
    e.storage().persistent().get(&key).unwrap()
}

pub fn write_name(e: &Env, name: &String) {
    let key = DataKey::Name;
    e.storage().persistent().set(&key, name);
}

pub fn read_symbol(e: &Env) -> String {
    let key = DataKey::Symbol;
    e.storage().persistent().get(&key).unwrap()
}

pub fn write_symbol(e: &Env, symbol: &String) {
    let key = DataKey::Symbol;
    e.storage().persistent().set(&key, symbol);
}
