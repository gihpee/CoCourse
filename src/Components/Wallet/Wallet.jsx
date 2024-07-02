import React, { useEffect } from "react";
import { TonConnectButton } from '@tonconnect/ui-react';
//import { useTonConnectUI } from '@tonconnect/ui-react';
//import { useTonAddress } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
//import { beginCell, toNano, Address } from '@ton/ton'
import TonWeb from "tonweb";
import { mnemonicToSeed } from 'tonweb-mnemonic';
import "./Wallet.css";


function Wallet() {
    const navigate = useNavigate();
    const { id } = window.Telegram.WebApp.initDataUnsafe.user;
    //const id = 478969308;
    const [coursesPaid, setCoursesPaid] = useState([]);
    const [coursesSelled, setCoursesSelled] = useState([]);
    const [coursesData, setCoursesData] = useState([]);

    const init = async () => {
        const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {apiKey: 'e23336de32c099c638e61fd08702fb31aa00c8e5a9bd83483bac536b26654367'}));

        const words = ['arrange', 'deal', 'lava', 'man', 'detail', 'lend', 'describe', 'shoulder', 'mule', 'chuckle', 'route', 'dress', 'lift', 'leg', 'pull', 'ski', 'syrup', 'asset', 'jazz', 'actual', 'state', 'issue', 'shuffle', 'power'];

        const seed = await mnemonicToSeed(words);
        const keyPair = TonWeb.utils.nacl.sign.keyPair.fromSeed(seed);
    
        const WALLET2_ADDRESS = 'EQAAmEyJL-l9AzBJbXXT7-JvuOpoKld9sG7WB7cCwNFX2mZT';

        const WalletClass = tonweb.wallet.all['v3R1'];
        const wallet = new WalletClass(tonweb.provider, {
            publicKey: keyPair.publicKey,
            wc: 0
        });

        const walletAddress = await wallet.getAddress();
        console.log('wallet address=', walletAddress.toString(true, true, true));
    

        const JETTON_WALLET_ADDRESS = 'EQB203byGIbZ2VHJEpgfS4uiCe5omB4OsDz9_qnntIUOHdxZ';
        // const JETTON_WALLET_ADDRESS = 'EQAG6NvUCTxgQfcuUJVypQxN4rCm6krVH6T-mngXhSQwY0Ae';
        console.log('jettonWalletAddress=', JETTON_WALLET_ADDRESS);

        const {JettonMinter, JettonWallet} = TonWeb.token.jetton;

        console.log(JettonMinter);

        const jettonWallet = new JettonWallet(tonweb.provider, {
            address: JETTON_WALLET_ADDRESS
        });

        const transfer = async () => {
            const seqno = (await wallet.methods.seqno().call()) || 0;
            console.log({seqno})
            // first four zero bytes are tag of text comment
            const comment = new Uint8Array([...new Uint8Array(4), ...new TextEncoder().encode('gift')]);
            console.log(
                await wallet.methods.transfer({
                    secretKey: keyPair.secretKey,
                    toAddress: JETTON_WALLET_ADDRESS,
                    amount: TonWeb.utils.toNano('0.05'),
                    seqno: seqno,
                    payload: await jettonWallet.createTransferBody({
                        jettonAmount: TonWeb.utils.toNano('500'),
                        toAddress: new TonWeb.utils.Address(WALLET2_ADDRESS),
                        forwardAmount: TonWeb.utils.toNano('0.01'),
                        forwardPayload: comment,
                        responseAddress: walletAddress
                    }),
                    sendMode: 3,
                }).send()
            );
        }

        await transfer();
    }
    


    //const userFriendlyAddress = useTonAddress();


    //const [tonConnectUI, setOptions] = useTonConnectUI();
    //setOptions({ language: 'ru' });

    /*const body = beginCell()
        .storeUint(0xf8a7ea5, 32)                 // jetton transfer op code
        .storeUint(0, 64)                         // query_id:uint64
        .storeCoins(1000000)                      // amount:(VarUInteger 16) -  Jetton amount for transfer (decimals = 6 - jUSDT, 9 - default)
        .storeAddress(Address.parse(userFriendlyAddress))  // destination:MsgAddress
        .storeUint(0, 1)                          // custom_payload:(Maybe ^Cell)
        .storeCoins(toNano(0.05))                 // forward_ton_amount:(VarUInteger 16) - if >0, will send notification message
        .storeUint(0,1)                           // forward_payload:(Either Cell ^Cell)
        .endCell();

    const jettonTransaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360,
        messages: [
            {
                address: 'EQAD1XhjxhZNWcNj8hixogIyCjZ5d-tmzjw1pGOulFp5KEM0', // sender jetton wallet
                amount: toNano(0.05).toString(), // for commission fees, excess will be returned
                payload: body.toBoc().toString("base64") // payload with jetton transfer body
            }
        ]
    }*/

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response_paid = await fetch(`https://commoncourse.io/user-paid-courses-full?id=${id}`)
            const result_paid = await response_paid.json();

            const response_selled = await fetch(`https://commoncourse.io/user-selled-courses-full?id=${id}`)
            const result_selled = await response_selled.json();
            
            setCoursesPaid(result_paid);
            setCoursesSelled(result_selled);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, [id]);

    const getAllCourseIds = () => {
        const courseIdsPaid = coursesPaid.map(course => course.course_id);
        const courseIdsSelled = coursesSelled.map(course => course.course_id);
        const allCourseIds = [...courseIdsPaid, ...courseIdsSelled];
    
        return allCourseIds;
    };

    function formatDate(dateString) {
        const parts = dateString.split('-');
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2].slice(2);
        return `${day}.${month}.${year}`;
    }
    
    const ids = getAllCourseIds();
    const allTransactions = [...coursesPaid, ...coursesSelled]

    useEffect(() => {
        if (!coursesPaid) {
            const fetchCourses = async () => {
            try {
                const response = await fetch('https://commoncourse.io/get-courses-by-ids', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids }),
                });
        
                const result = await response.json();
                setCoursesData(result);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            };
        
            fetchCourses();
        }
    }, [ids, coursesPaid]);

    const transactions = coursesData.map((item, index) => {
        var t_type = '';

        if (coursesPaid.some(course => course.course_id === item.id)) {
            t_type = 'Покупка';
        } else {
            t_type = 'Продажа';
        }

        return (
          <div className="transaction_card">
            <div className="points" style={{backgroundColor: 'black', borderRadius: '8px', paddingBottom: '8px'}}>
                <div className="point_t" style={{fontFamily: 'NeueMachina', fontSize: '16px', lineHeight: '20px'}}><b>{item.name}</b></div>
                <div className="point_t" style={{color: '#AAAAAA', fontSize: '14px'}}>{item.university}</div>
                <div className="point_t"style={{color: '#AAAAAA', marginTop: '4px', fontSize: '14px'}}>{formatDate(item.date)}</div>
            </div>
            <div className="points" style={{marginTop: '0px'}}>
                <div className="point" style={{fontFamily: 'NeueMachina', fontSize: '16px', lineHeight: '20px', marginLeft: '0px'}}><b>{t_type}</b></div>
                <div className="point" style={{color: '#AAAAAA', fontSize: '14px', marginLeft: '0px'}}>TON Wallet</div>
                <div className="point"style={{color: '#AAAAAA', marginTop: '4px', fontSize: '14px', marginLeft: '0px'}}>{formatDate(allTransactions.find(course => course.course_id === item.id).date)}</div>
            </div>
            
            <div className="t_price_status" style={{marginBottom: '8px'}}>
                <div className="t_price">{item.price} RUB</div>
                <div className="course_status">Успешно</div>
            </div>
            
          </div>
        )
      })

    return (
        <>
        <div className="back_btn" onClick={() => navigate(`/`)}></div>
        <div className="column" style={{minHeight: '100vh'}}>
            <span style={{marginTop: '20px'}}>Кошелек</span>
            <TonConnectButton style={{marginBottom: '8px'}}/>

            <div className="pricecourse_container" style={{height: 'auto', paddingTop: '8px', paddingBottom: '8px', marginBottom: '8px'}}>
                <div className="course_price">0<span style={{color: 'white', fontFamily: 'NeueMachina', fontSize: '14px', margin: 'auto'}}> COMN</span></div>
                <span style={{margin: '0px', width: '100%', textTransform: 'none'}}>Токены COMN начисляются за продажи и покупки курсов через нашу платформу.</span>
            </div>

            <span>История транзакций</span>
            {transactions}

            <button onClick={() => init()}>
                Send Jetton
            </button>

        </div>
        </>
    );
}

export default Wallet;