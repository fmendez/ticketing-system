"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
const wallet_adapter_wallets_1 = require("@solana/wallet-adapter-wallets");
const wallets = [(0, wallet_adapter_wallets_1.getPhantomWallet)()];
react_dom_1.default.render(<react_1.default.StrictMode>
    <wallet_adapter_react_1.ConnectionProvider endpoint={"http://127.0.0.1:7777"}>
      <wallet_adapter_react_1.WalletProvider wallets={wallets} autoConnect>
        <wallet_adapter_react_ui_1.WalletModalProvider>
          <App_1.default />
        </wallet_adapter_react_ui_1.WalletModalProvider>
      </wallet_adapter_react_1.WalletProvider>
    </wallet_adapter_react_1.ConnectionProvider>
  </react_1.default.StrictMode>, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
