# Tokenmania!

![Tokenmania](https://icp.ninja/examples/_attachments/tokenmania.jpg)

Tokenmania is a simplified token minting application. When the application is ran, you will be prompted to sign in with Internet Identity. Once signed in, select the 'Mint' function. It will mint tokens based on the backend smart contract's hardcoded configuration values for things such as token name, token symbol, and total supply. The owner principal of the token will be your Internet Identity principal.

> [!CAUTION]
> This example is for demonstration purposes. It does not reflect a best practices workflow for creating and minting tokens on ICP.
> Actual production tokens deployed on ICP use a dedicated ledger smart contract and an index smart contract. For this example's demonstration, this functionality has been simplified and the ledger functionality is included in the backend smart contract.
> Tokens deployed using this example are only available for 20 minutes and will be deleted afterwards. They should be treated as "testnet" assets and should not be given real value.
> For more information on creating tokens using a recommended production workflow, view the [create a token documentation](https://internetcomputer.org/docs/current/developer-docs/defi/tokens/create).

This example application is written in [Motoko](https://internetcomputer.org/docs/current/motoko/main/getting-started/motoko-introduction), a programming language designed specifically for developing canisters on ICP.

### Project structure

The `/backend` folder contains the Motoko canister, `app.mo`. The `/frontend` folder contains web assets for the application's user interface. The user interface is written using the React framework. Edit the `mops.toml` file to add [Motoko dependencies](https://mops.one/) to the project.

## Continue building locally

To migrate your ICP Ninja project off of the web browser and develop it locally, follow these steps.

### 1. Download your project from ICP Ninja using the 'Download files' button.

### 2. Open the `BUILD.md` file for further instructions.
