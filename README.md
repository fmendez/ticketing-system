## Dummy Ticket POS on the Solana block chain using Anchor

This is project is an exploration of how to develop a simple on-chain point of sales (POS) on the Solana blockchain network.

If you want to run the project locally (pointing to the Solana `testnet`):
1 - Clone the project.
2 - Go to the `/app` folder.
3- Run `yarn install`
4 - Then `yarn run`

You should be able to see the app running at: `[http://localhost:3000/]`

_Note:_ You need the phantom wallet installed and pointing to the `testnet` network (Cog wheel -> Change Network -> Select Testnet ). You'll have to airdrop some SOL into your account. You can do that with: `solana airdrop 1 <YOURADDRESS>` . For the airdrop, you'll need to have the Solana cli installed, configured and pointing to the `testnet` network (`solana config set --url testnet`)

If you want to play around with the code and modify and test locally pointing to the `solana-test-validator` then you'll have to install and configure both Solana and Anchor.

Solana: [https://docs.solana.com/cli/install-solana-cli-tools]
Anchor: [https://project-serum.github.io/anchor/getting-started/installation.html#install-rust]
