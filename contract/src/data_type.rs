use crate::soroban_sdk::{self, contracttype, Address, String};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Metadata {
    pub metadata_url: String,
    pub creator: Address,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct Series {
    pub series_id: u128,
    pub metadata: Metadata,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct TokenDetail {
    pub token_id: u128,
    pub owner: Address,
    pub series: Series,
}
