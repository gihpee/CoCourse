import React from "react";
import { TonConnectButton } from '@tonconnect/ui-react';


function Wallet() {

    return (
        <div className="column" style={{minHeight: '100vh'}}>
            <TonConnectButton style={{width: `calc(100% - 16px)`}}/>

        </div>
    );
}

export default Wallet;