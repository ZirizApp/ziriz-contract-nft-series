#![cfg(test)]
use crate::soroban_sdk::{testutils::Address as _, Address, Env, String};
use crate::{nft_contract::NonFungibleToken, nft_contract::NonFungibleTokenClient};

fn create_nft_token<'a>(env: &Env, admin: &Address) -> NonFungibleTokenClient<'a> {
    let contract =
        NonFungibleTokenClient::new(env, &env.register_contract(None, NonFungibleToken {}));
    contract.init(
        admin,
        &String::from_str(env, "Ziris"),
        &String::from_str(env, "ZS"),
    );
    contract
}

#[test]
fn test_mint() {
    let env = Env::default();
    env.mock_all_auths();
    let admin = Address::generate(&env);
    let user1 = Address::generate(&env);
    let contract = create_nft_token(&env, &admin);

    let series_id =
        contract.create_series(&admin, &admin, &String::from_str(&env, "https://dummy"));

    let token_id = contract.mint(&admin, &user1, &series_id);

    assert!(contract.balance(&user1) == 1);
    assert!((2, 1) == token_id);
    assert!(contract.supply() == 2);
}

#[test]
fn test_metadata() {
    let env = Env::default();
    env.mock_all_auths();
    let admin = Address::generate(&env);
    let user1 = Address::generate(&env);
    let contract = create_nft_token(&env, &admin);

    let series_id =
        contract.create_series(&admin, &admin, &String::from_str(&env, "https://dummy"));
    let mint_result = contract.mint(&admin, &user1, &series_id);

    contract.metadata(&mint_result.0, &mint_result.1);
}

#[test]
#[should_panic]
fn test_admin_guard() {
    let env = Env::default();
    env.mock_all_auths();
    let admin = Address::generate(&env);
    let user1 = Address::generate(&env);
    let contract = create_nft_token(&env, &admin);

    contract.create_series(&user1, &user1, &String::from_str(&env, "https://dummy"));

    contract.mint(&user1, &user1, &1);

    assert!(contract.balance(&user1) == 1);
}

#[test]
#[should_panic]
fn test_not_found_series_and_token() {
    let env = Env::default();
    env.mock_all_auths();
    let admin = Address::generate(&env);
    let user1 = Address::generate(&env);
    let contract = create_nft_token(&env, &admin);

    contract.create_series(&user1, &user1, &String::from_str(&env, "https://dummy"));

    contract.mint(&user1, &user1, &2);
}

#[test]
#[should_panic]
fn test_non_transferable() {
    let env = Env::default();
    env.mock_all_auths();
    let admin = Address::generate(&env);
    let user1 = Address::generate(&env);
    let user2 = Address::generate(&env);
    let contract = create_nft_token(&env, &admin);

    contract.create_series(&admin, &admin, &String::from_str(&env, "https://dummy"));
    contract.mint(&admin, &user1, &1);

    assert!(contract.balance(&user1) == 1);
    contract.transfer(&user1, &user2, &1);
}
