import React from "react";
import { TonConnectButton, useTonAddress, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';


function Wallet() {
    const userFriendlyAddress = useTonAddress();
    const wallet = useTonWallet();
    const tonConnectUI = useTonConnectUI();

    const myTransaction = {
        validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
        messages: [
            {
                address: "EQBBJBB3HagsujBqVfqeDUPJ0kXjgTPLWPFFffuNXNiJL0aA",
                amount: "20000000",
                // stateInit: "base64bocblahblahblah==" // just for instance. Replace with your transaction initState or remove
            },
            {
                address: "EQDmnxDMhId6v1Ofg_h5KR5coWlFG6e86Ro3pc7Tq4CA0-Jn",
                amount: "60000000",
                // payload: "base64bocblahblahblah==" // just for instance. Replace with your transaction payload or remove
            }
        ]
    }
    

    return (
        <div className="column" style={{minHeight: '100vh'}}>
            <TonConnectButton />
            <span>User-friendly address: {userFriendlyAddress}</span>
            <span>Connected wallet: {wallet.name}</span>
            <span>Device: {wallet.device.appName}</span>

            <button onClick={() => tonConnectUI.sendTransaction(myTransaction)}>
                Send transaction
            </button>
        </div>
    );
}

export default Wallet;