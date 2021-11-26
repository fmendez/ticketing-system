import "./index.css";
import Tickets from "./components/Tickets";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

require("@solana/wallet-adapter-react-ui/styles.css");

function App() {
  const wallet = useWallet();

  if (!wallet.connected) {
    return (
      <div className="main-container p-4">
        <div className="flex flex-col lg:w-1/4 sm:w-full md:w-1/2">
          <WalletMultiButton />
        </div>

      </div>
    );
  } else {
    return (
      <div className="main-container">
        <div className="border-b-4 border-brand-border self-stretch">
          <h1 className="font-bold text-4xl text-center p-4 text-brand-border">Ticket Sales</h1>
        </div>
        <Tickets />
      </div>
    );
  }
}

export default App;
