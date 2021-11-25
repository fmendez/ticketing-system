describe("ticketing-system", () => {
  const anchor = require("@project-serum/anchor");
  const assert = require("assert");

  const { SystemProgram } = anchor.web3;
  // Configure the client to use the local cluster.
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.TicketingSystem;
  const _ticketingSystem = anchor.web3.Keypair.generate();
  const tickets = [1111, 2222, 3333];

  it("Is initializes the ticketing system", async () => {
    const ticketingSystem = _ticketingSystem;
    await program.rpc.initialize(tickets, {
      accounts: {
        ticketingSystem: ticketingSystem.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [ticketingSystem],
    });

    const account = await program.account.ticketingSystem.fetch(
      ticketingSystem.publicKey
    );

    assert.ok(account.tickets.length === 3);
    assert.ok(
      account.tickets[0].owner.toBase58() ==
      ticketingSystem.publicKey.toBase58()
    );
  });

  it("Is purchases a ticket", async () => {
    const ticketingSystem = _ticketingSystem;
    await program.rpc.purchase(tickets[0], 0, {
      accounts: {
        ticketingSystem: ticketingSystem.publicKey,
        user: provider.wallet.publicKey,
      },
    });

    const account = await program.account.ticketingSystem.fetch(
      ticketingSystem.publicKey
    );

    assert.ok(account.tickets.length === 3);

    // Ticket not owned by the account anymore
    assert.ok(
      account.tickets[0].owner.toBase58() !=
      ticketingSystem.publicKey.toBase58()
    );

    // Ticket now owned by the user
    assert.ok(
      account.tickets[0].owner.toBase58() ==
      provider.wallet.publicKey.toBase58()
    );
  });
});
