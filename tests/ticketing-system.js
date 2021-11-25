const anchor = require("@project-serum/anchor");
const assert = require("assert");
const { SystemProgram } = anchor.web3;

describe("ticketing-system", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.TicketingSystem;
  const _baseAccount = anchor.web3.Keypair.generate();

  it("Is initializes the account", async () => {
    const baseAccount = _baseAccount;
    await program.rpc.initialize("Event 1", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    console.log("Data: ", account.events[0]);
    assert.ok(account.events[0] === "Event 1");
  });

  it("Adds an event to the account", async () => {
    const baseAccount = _baseAccount;
    await program.rpc.update("Another Event", {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    console.log("Updated data: ", account.events[1]);
    console.log("All account data: ", account);
    console.log("All events: ", account.events);
    assert.ok(account.events.length === 2);
  });
});
