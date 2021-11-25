"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const Tickets_1 = __importDefault(require("./components/Tickets"));
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
require("@solana/wallet-adapter-react-ui/styles.css");
function App() {
    const wallet = (0, wallet_adapter_react_1.useWallet)();
    if (!wallet.connected) {
        return (<div className="mainContainer">
        <wallet_adapter_react_ui_1.WalletMultiButton />
      </div>);
    }
    else {
        return (<div className="mainContainer">
        <div className="header">
          <h1>Ticket Sales</h1>
        </div>
        <Tickets_1.default />
      </div>);
    }
}
exports.default = App;
