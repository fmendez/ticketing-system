import { Connection, Commitment } from "@solana/web3.js";
import { Provider } from "@project-serum/anchor";
import { NodeWallet } from "@project-serum/anchor/dist/cjs/provider";

const opts = {
  preflightCommitment: "processed" as Commitment,
};

export const getConnection = () => {
  const network = "http://127.0.0.1:8899";
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
  let events = [];
  let min = Math.ceil(100000);
  let max = Math.floor(900000);
  for (let index = 0; index < noTickets; index++) {
    const eventId = Math.floor(Math.random() * (max - min) + min);
    events.push(eventId);
  }
  return events;
};
