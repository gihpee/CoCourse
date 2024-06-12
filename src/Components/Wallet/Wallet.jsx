import React from "react";
import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react';


function Wallet() {
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);
    const wallet = useTonWallet();
    

    return (
        <div className="column" style={{minHeight: '100vh'}}>
            <TonConnectButton />
            <span>User-friendly address: {userFriendlyAddress}</span>
            <span>Connected wallet: {wallet.name}</span>
            <span>Device: {wallet.device.appName}</span>
        </div>
    );
}

export default Wallet;