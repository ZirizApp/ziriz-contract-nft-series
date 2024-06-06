use crate::soroban_sdk::{self, contracttype, Address};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Admin,
    Name,
    Symbol,
    Supply,
    Series,
    Metadata(u128),
    SeriesToken(u128),
    TokenOwner(u128, u128),
}

#[derive(Clone)]
#[contracttype]
pub enum UserDataKey {
    Balance(Address),
    OwnedToken(Address),
}
