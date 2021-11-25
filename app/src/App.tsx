import "./App.css";
import Tickets from "./components/Tickets";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  const wallet = useWallet();

  if (!wallet.connected) {
    return (
      <div className="mainContainer">
        <WalletMultiButton />
      </div>
    );
  } else {
    return (
      <div className="mainContainer">
        <div className="header">
          <h1>Ticket Sales</h1>
        </div>
        <Tickets />
      </div>
    );
  }
}

export default App;
