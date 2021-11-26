import { useWallet } from "@solana/wallet-adapter-react";
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

    <div className="flex flex-col">

      <div className="ticket">
        <div className="flex items-center border-2 rounded-md border-black p-1.5 ">
          <div className="transform -rotate-90 self-center self-start">{ticket.id}</div>
          {!ticket.available && <div className="bg-brand-sold transform -rotate-90">SOLD</div>}

          <div className="flex flex-col p-1 items-center">
            <h2>ADMIT ONE</h2>
            <h3>($1 SOL)</h3>
          </div>
          <div className="transform -rotate-90 self-center self-end">{ticket.id}</div>
        </div>
      </div>
      <button
        className={`rounded-xl font-bold text-xl m-4 p-2  ${!ticket.available === true ? "bg-brand-sold hover:cursor-default" : "bg-brand-btn hover:bg-brand-btn-active"}`}
        disabled={!ticket.available}
        onClick={() => purchase(ticket)}
      >
        Buy
      </button>
    </div>
  );
}
export default Ticket;
