import React from "react";
import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';


function Wallet() {
    const userFriendlyAddress = useTonAddress();
    const tonConnectUI = useTonConnectUI();

    const myTransaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
        messages: [
            {
                address: "EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA",
                amount: "20000000",
                // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
            }
        ]
    }
    

    return (
        <div className="column" style={{minHeight: '100vh'}}>
            <TonConnectButton />
            <span>User-friendly address: {userFriendlyAddress}</span>

            <button onClick={() => tonConnectUI.sendTransaction(myTransaction)}>
                Send transaction
            </button>
        </div>
    );
}

export default Wallet;