import { Connection, Commitment } from "@solana/web3.js";
import { Provider } from "@project-serum/anchor";
import { NodeWallet } from "@project-serum/anchor/dist/cjs/provider";

const opts = {
  preflightCommitment: "processed" as Commitment,
};

export const network = "https://api.testnet.solana.com";
// export const network = "http://127.0.0.1:8899";
export const getConnection = () => {
  const connection = new Connection(network, opts.preflightCommitment);
  return connection;
};

export const getProvider = async (wallet: NodeWallet) => {
  const provider = new Provider(
    getConnection(),
    wallet,
    opts
  );
  return provider;
};

export const generateTickets = (noTickets: number) => {
  let tickets = [];
  let min = Math.ceil(100000);
  let max = Math.floor(900000);
  for (let index = 0; index < noTickets; index++) {
    const ticketId = Math.floor(Math.random() * (max - min) + min);
    tickets.push(ticketId);
  }
  return tickets;
};
