"use client";

import bytecode from '@/blockchain/contract/bytecode';
import { ViemUtils, ViemContract } from '../../blockchain/viem';
import { useState, useEffect } from 'react'
const chitFundABI = require('../../blockchain/contract/ChitFund.json');
import { decodeEventLog, parseAbi, parseEther } from 'viem'

let chitFundContract = null;

const Playground = () => {

    const [loading, setLoading] = useState(false);
    const [userAddr, setUserAddr] = useState(null);
    const [funds, setFunds] = useState(0);
    const [chitAmount, setChitAmount] = useState(0);
    const [textBoxValue, setTextBoxValue] = useState('');

    const initialize = async () => {
        //Regiuster Viemutils
        ViemUtils.registerWalletClient(window);
        const address = await ViemUtils.getConnectedAddress();
        console.log(`Connected Address: ${address}`);
        setUserAddr(address);
        const contract = new ViemContract({
            name: 'ChitFund',
            abi: chitFundABI.abi,
            address: '0xD10EbFEFDFEB8975366EF577c644e1B95850563e',
        });
        chitFundContract = contract;
        getBalance();
        getChitAmount();
    }

    const deploy = async () => {
        setLoading(true);
        const contract = await ViemUtils.deployContract({
            name: 'ChitFund',
            abi: chitFundABI.abi,
            bytecode: bytecode,
            args: [2, parseEther('0.003'), 2],

        });
        console.log(`Deployed Contract => ${contract}`)
        chitFundContract = contract;
        getBalance();
        getChitAmount();
        setLoading(false);
    }

    const getBalance = async () => {
        if (chitFundContract === null) return console.error('NULLCONTRACT');
        // setLoading(true);
        const res = await chitFundContract.read({
            functionName: 'getBalance'
        });
        setFunds(Number(res) / 10 ** 18);
        // setLoading(false);
        // alert(`Balance: ${Number(res) / 10 ** 18} ETH`);
    }

    const getChitAmount = async () => {
        if (chitFundContract === null) return console.error('NULLCONTRACT');
        const res = await chitFundContract.read({
            functionName: 'chitAmount'
        });
        setChitAmount(Number(res) / 10 ** 18);
    }

    const deposit = async () => {
        if (chitFundContract === null) return console.error('NULLCONTRACT');
        setLoading(true);
        const res = await chitFundContract.write({
            functionName: 'depositChit',
            value: parseEther('0.005'),
        });
        setLoading(false);
        console.log(res);
        window.location.href = '/playground';
    }


    const withdraw = async () => {
        if (chitFundContract === null) return console.error('NULLCONTRACT');
        setLoading(true);
        const res = await chitFundContract.write({
            functionName: 'withdraw',
            args: [userAddr, parseEther(textBoxValue)]
        });
        console.log(res);
        setLoading(false);
        window.location.href = '/playground';
    }


    useEffect(() => {
        console.log('Loaded');
        initialize();
    }, []);


    if (loading) {
        return <h1 className="text-lg">Loading</h1>
    }

    return (
        <div className='text-sky-400 p-5'>
            <p className='text-4xl'>ChETHFunds</p>
            <p className='text-2xl text-sky-blue'>User: {userAddr}</p>
            <p className='text-sm text-amber-500'>Contract: {chitFundContract?.contractAddress} </p>

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

            <button onClick={deploy} className="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Test Deploy </button><br />
            {/* <button onClick={getBalance} className="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Get ChitFund Balance </button><br /> */}
            <button onClick={deposit} className="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Deposit Funds </button><br />


            <br />
            <div className="flex">
                <input
                    type="text"
                    placeholder='Enter Final Bid'
                    className='ml-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    value={textBoxValue}
                    onChange={(x) => setTextBoxValue(x.target.value)}
                />
                <button onClick={withdraw} className="ml-5 center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Withdraw Funds </button><br />
            </div>


            {/* <button onClick={load} className="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Load </button><br />

            <button onClick={store} className="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Store </button><br />

            <button onClick={listen} className="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Listen </button><br />

            <button onClick={pay} className="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Test Deposit </button><br />

            <button onClick={checkBalance} className="ml-5 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> Check Balance </button><br /> */}

        </div>
    );
}

export default Playground;