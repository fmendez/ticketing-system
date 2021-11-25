import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { getProvider } from "../Utils";
import { Idl, Program, web3 } from "@project-serum/anchor";
import idl from "../idl.json";
import { TicketInfo } from "../types";
import { NodeWallet } from "@project-serum/anchor/dist/cjs/provider";

const { PublicKey } = web3;

const programID = new PublicKey(idl.metadata.address);
type Props = {
  ticket: TicketInfo,
  ticketingSystem: web3.Keypair,
  setTickets: any
}

function Ticket({ ticket, ticketingSystem, setTickets }: Props) {
  const wallet = useWallet();

  const purchase = async (ticket: TicketInfo) => {
    const provider = await getProvider((wallet as any) as NodeWallet);
    const program = new Program((idl as any) as Idl, programID, provider);
    try {
      await program.rpc.purchase(ticket.id, ticket.idx, {
        accounts: {
          ticketingSystem: ticketingSystem.publicKey,
          user: provider.wallet.publicKey,
        },
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
    <div className="ticketContainer">
      <div className="ticket">
        <div className="ticketInnerContainer">
          <div className="rotate90">{ticket.id}</div>
          {!ticket.available && <div className="sold rotate90">SOLD</div>}
          <div className="ticketAdmitOne">
            <h2>ADMIT ONE</h2>
            <h3>($1 SOL)</h3>
          </div>
          <div className="rotate90">{ticket.id}</div>
        </div>
      </div>
      <button
        className={`btn ${!ticket.available === true ? "sold" : ""}`}
        disabled={!ticket.available}
        onClick={() => purchase(ticket)}
      >
        Buy
      </button>
    </div>
  );
}
export default Ticket;
