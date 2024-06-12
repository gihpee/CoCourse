import React from "react";
import { TonConnectButton } from '@tonconnect/ui-react';


function Wallet() {
    return (
        <div className="column" style={{minHeight: '100vh'}}>
            <TonConnectButton />
        </div>
    );
}

export default Wallet;