'use client';
import { useState, useEffect } from "react";
import { ViemUtils, ViemContract } from "@/blockchain/viem";
import { parseEther } from 'viem'
import Auction from "@/components/Auction";
const chitFundABI = require('@/blockchain/contract/ChitFund.json');


const DynamicPage = ({ params: { id } }) => {

    const [chitFundContract, setContract] = useState(null);
    const [userAddr, setUserAddr] = useState(null);
    const [funds, setFunds] = useState(0);
    const [chitAmount, setChitAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [finalBid, setFinalBid] = useState(null);
    const [eligibleToWithdraw, setEligibleToWithdraw] = useState(false);
    const [deposited, setDeposited] = useState(false);

    const initialize = async () => {
        //Register Viemutils
        ViemUtils.registerWalletClient(window);
        const address = await ViemUtils.getConnectedAddress();
        console.log(`ConnectedWallet Address: ${address}`);
        setUserAddr(address);
        console.log(`Loading Contract => ${window.localStorage.getItem(id)}`);
        const contract = new ViemContract({
            name: 'ChitFund',
            abi: chitFundABI.abi,
            address: window.localStorage.getItem(id),
        });
        setContract(contract);
        getBalance();
        getChitAmount();
    }

    const getBalance = async () => {
        if (chitFundContract === null) return;
        const res = await chitFundContract.read({
            functionName: 'getBalance'
        });
        const funds = Number(res) / 10 ** 18;
        console.log(funds);
        if (funds === 0) {
            window.localStorage.setItem(`deposited_${id}`, false);
            setDeposited(false);
        } else {
            const v = JSON.parse((window.localStorage.getItem(`deposited_${id}`) ?? false).toString());
            setDeposited(v);
        }
        setFunds(funds);
    }

    const getChitAmount = async () => {
        if (chitFundContract === null) return;
        const res = await chitFundContract.read({
            functionName: 'chitAmount'
        });
        setChitAmount(Number(res) / 10 ** 18);
    }


    useEffect(() => {
        console.log('Loaded');
        initialize();
    }, []);

    useEffect(() => {
        getBalance();
        getChitAmount();
    }, [chitFundContract])

    const deposit = async () => {
        if (chitFundContract === null) return console.error('NULLCONTRACT');
        setLoading(true);
        const res = await chitFundContract.write({
            functionName: 'depositChit',
            value: parseEther(chitAmount.toString()),
        });
        setLoading(false);
        console.log(res);
        window.localStorage.setItem(`deposited_${id}`, true);
        window.location.href = `/rooms/${id}`;
    }

    const handleAuctionCallback = (finalbid, winner) => {
        setFinalBid(finalbid);
        console.log(`Winner: ${winner}`);
        if (winner === userAddr) {
            console.log('Eligible to Withdraw');
            setEligibleToWithdraw(true);
        }
    }

    const withdraw = async () => {
        if (chitFundContract === null) return console.error('NULLCONTRACT');
        setLoading(true);
        const res = await chitFundContract.write({
            functionName: 'withdraw',
            args: [userAddr, parseEther(finalBid.toString())]
        });
        console.log(res);
        setLoading(false);
        window.location.href = `/rooms/${id}`;
    }


    if (loading) {
        return <center className='mt-20'>
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </center>
    }

    return (
        <div className='text-sky-400 p-5'>
            <p className='text-6xl mb-4 mt-8'>ChETHFunds</p>
            <p className='text-2xl text-sky-blue'>User: {userAddr}</p>
            <p className='text-xl text-amber-500'>Contract: {chitFundContract?.contractAddress} </p>
            <p className='text-2xl text-red-300'>RoomID: {id}</p>

            <br /><br />

            <div className="flex px-2">
                <div>
                    <p className='text-xl text-sky-blue'>Total Funds in Chit</p>
                    <p className='text-8xl'>{funds} ETH</p><br /><br />
                </div>

                <div>
                    <p className='ml-12 text-xl text-sky-blue'>Chit Amount</p>
                    <p className='ml-12 text-8xl'>{chitAmount} ETH</p><br /><br />
                </div>
            </div>
            <br />

            {
                deposited
                    ? <p className="text-sm text-gray-500">Already Deposited to Chitfund</p>
                    : <button onClick={deposit} className="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Deposit Funds </button>
            }
            <br />

            <div className="w-3/4 mt-3">
                {
                    finalBid === null
                        ? <Auction callback={handleAuctionCallback} user={userAddr} />
                        : <center>
                            <div className="p-4 bg-gray-900 border white rounded-2xl ml-5">
                                <p className="text-3xl px-3"> Winning Bid: {finalBid}ETH</p>
                                {
                                    eligibleToWithdraw
                                        ? <button onClick={withdraw} className="mt-4 ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Withdraw Funds </button>
                                        : <p className="text-sm text-gray-500">Not eligible to withdraw as you lost auction</p>
                                }

                            </div>

                        </center>
                }


            </div>



        </div>
    );
};

export default DynamicPage;