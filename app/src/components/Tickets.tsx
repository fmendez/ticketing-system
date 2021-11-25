import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { generateTickets, getProvider } from "../Utils";
import Ticket from "./Ticket";
import { Idl, Program, web3 } from "@project-serum/anchor";
import idl from "../idl.json";
import { NodeWallet } from "@project-serum/anchor/dist/cjs/provider";
import { TicketInfo } from '../types';

const { SystemProgram, Keypair, PublicKey } = web3;

const ticketingSystem = Keypair.generate();
const programID = new PublicKey(idl.metadata.address);

function Tickets() {
  const wallet = useWallet();

  const [tickets, setTickets] = useState<TicketInfo[]>([]);
  const initializeTicketingSystem = async () => {
    const provider = await getProvider((wallet as any) as NodeWallet);
    const program = new Program((idl as any) as Idl, programID, provider);

    try {
      await program.rpc.initialize(generateTickets(3), {
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
      setTickets(account.tickets);
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  };

  return (
    <div>
      {tickets.length === 0 && (
        <button className="btn" onClick={initializeTicketingSystem}>
          Generate Tickets
        </button>
      )}
      {tickets.map((ticket) => (
        <Ticket
          key={ticket.id}
          ticket={ticket}
          ticketingSystem={ticketingSystem}
          setTickets={setTickets}
        />
      ))}
    </div>
  );
}

export default Tickets;
