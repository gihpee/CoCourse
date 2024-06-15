import React from "react";
import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';


function Wallet() {
    const userFriendlyAddress = useTonAddress();
    const [tonConnectUI, setOptions] = useTonConnectUI();
    setOptions({ language: 'ru' });

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
            <TonConnectButton style={{width: `calc(100% - 16px)`}}/>

        </div>
    );
}

export default Wallet;