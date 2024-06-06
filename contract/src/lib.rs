#![no_std]

pub(crate) use loam_sdk::soroban_sdk;
extern crate alloc;

mod admin_storage;
mod bump;
mod contract;
mod data_type;
mod metadata_storage;
mod nft_contract;
mod series_storage;
mod storage_types;
mod test;
mod token_storage;

pub use crate::nft_contract::NonFungibleToken;

smartdeploy_sdk::core_riff!();
