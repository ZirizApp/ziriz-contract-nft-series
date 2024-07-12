# ZIRIZ Client & Contract

## Overview
this repo contains soroban contract and client Ziriz Series on stellar

## Setup
you need to install rust and npm/yarm to run this project. 

if you already install,  run the following command.
```
yarn setup // or npm run setup
```


[Setup Soroban Dev Env](https://developers.stellar.org/docs/build/smart-contracts/getting-started/setup)

## Build Wasm Contract
To build wasm for uploading contract youn can use this command.
```
yarn contract:build
```

the out put should be on target/loam


## Deploy Wasm to Testnet
To upload to testnet you can run.
```
yarn contract:deploy-testnet
```

## Upgrade Smart Contract
The is 2 way to upgrade smart contract.
- Using smartdeploy
- Using soroban contract install and invoke upgrade


## Generate Latest client
To generate client on package/contract-client use by Front End. Use this command
```
yarn contract:link
```

## Others Command
- yarn contract:test => doing unit test
- soroban:show-xlm => show current XLM address on soroban