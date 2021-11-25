"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const react_1 = require("react");
const Utils_1 = require("../Utils");
const Ticket_1 = __importDefault(require("./Ticket"));
const anchor_1 = require("@project-serum/anchor");
const idl_json_1 = __importDefault(require("../idl.json"));
const { SystemProgram, Keypair, PublicKey } = anchor_1.web3;
const ticketingSystem = Keypair.generate();
const programID = new PublicKey(idl_json_1.default.metadata.address);
function Tickets() {
    const wallet = (0, wallet_adapter_react_1.useWallet)();
    const [tickets, setTickets] = (0, react_1.useState)([]);
    const initializeTicketingSystem = () => __awaiter(this, void 0, void 0, function* () {
        const provider = yield (0, Utils_1.getProvider)(wallet);
        const program = new anchor_1.Program(idl_json_1.default, programID, provider);
        try {
            yield program.rpc.initialize((0, Utils_1.generateTickets)(3), {
                accounts: {
                    ticketingSystem: ticketingSystem.publicKey,
                    user: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                },
                signers: [ticketingSystem],
            });
            const account = yield program.account.ticketingSystem.fetch(ticketingSystem.publicKey);
            setTickets(account.tickets);
        }
        catch (err) {
            console.log("Transaction error: ", err);
        }
    });
    return (<div>
      {tickets.length === 0 && (<button className="btn" onClick={initializeTicketingSystem}>
          Generate Tickets
        </button>)}
      {tickets.map((ticket) => (<Ticket_1.default key={ticket.id} ticket={ticket} ticketingSystem={ticketingSystem} setTickets={setTickets}/>))}
    </div>);
}
exports.default = Tickets;
