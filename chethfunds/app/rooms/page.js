'use client';
import Footer from "../../components/Footer";
import AppBar from "../../components/AppBar";
import { useState, useEffect } from 'react'
import { ViemUtils } from "@/blockchain/viem";
import { parseEther } from 'viem'
const chitFundABI = require('@/blockchain/contract/ChitFund.json');
import bytecode from '@/blockchain/contract/bytecode';
import RoomComponent from "@/components/RoomComponent";

// import App from "next/app";

export default function RoomHome() {

    const [loading, setLoading] = useState(false);
    const [roomid, setRoomID] = useState('');
    const [memberCount, setMemberCount] = useState('');
    const [monthCount, setMonthCount] = useState('');
    const [chitAmount, setChitAmount] = useState('');

    const joinRoom = () => {
        if (window.localStorage.getItem(roomid) !== null) {
            window.location.href = `/rooms/${roomid}`;
        } else {
            alert('Invalid RoomID');
        }
    }

    const createRoom = async () => {
        ViemUtils.registerWalletClient(window);
        setLoading(true);
        const contract = await ViemUtils.deployContract({
            name: 'ChitFund',
            abi: chitFundABI.abi,
            bytecode: bytecode,
            args: [parseInt(memberCount), parseEther(chitAmount), parseInt(monthCount)],
        });
        console.log(`Deployed New Contract => ${contract}`)
        setLoading(false);

        const nid = parseInt(Math.random(1, 1000) * 100)
        const newRoomId = `fund${nid}`;
        window.localStorage.setItem(newRoomId, contract.contractAddress);
        console.log(`Mapped Address: ${newRoomId} => ${window.localStorage.getItem(newRoomId)}`);
        window.location.href = `/rooms/${newRoomId}`
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
        <div>
            <AppBar pageName={"Rooms"} />
            <br /><br /><br /><br /><br />

            <center>
                <div className="flex space-x-8 content-end justify-center">

                    <div>

                        <div className="border-2 border-white rounded-lg max-w-max p-5 m-2 ml-8 text-black">
                            <p className="text-white">Create New Room:</p>  <br />

                            <input type="number" placeholder="Enter no of members" className="m-1 px-4 py-2 rounded "
                                value={memberCount}
                                onChange={(x) => setMemberCount(x.target.value)}
                            /> <br />
                            <input type="number" placeholder="Enter no of months" className="m-1 px-4 py-2 rounded"
                                value={monthCount}
                                onChange={(x) => setMonthCount(x.target.value)} /> <br></br>
                            <input type="number" placeholder="Enter the chit amount" className="m-1 px-4 py-2 rounded"
                                value={chitAmount}
                                onChange={(x) => setChitAmount(x.target.value)}
                            /> <br />
                            <input type="button" value="Create Room" className="border-2 border-white max-w-max px-5 py-2 mt-4 text-white rounded hover:bg-purple-500"
                                onClick={createRoom}
                            />

                        </div>
                        <br />
                        <div className="border-2 border-white rounded-lg max-w-max p-5 m-2 ml-8">
                            Join Room: <br /><br />

                            <input
                                type="text" placeholder="Enter Room ID" name="roomID" className="m-1 text-black px-4 py-2 rounded"
                                value={roomid}
                                onChange={(x) => setRoomID(x.target.value)}
                            /> <br />
                            <input type="button"
                                value="Join Room"
                                className="border-2 border-white max-w-max px-5 py-2 mt-4 text-white rounded hover:bg-purple-500"
                                onClick={joinRoom}
                            >

                            </input>

                        </div>

                    </div>


                    {/* <RoomComponent /> */}

                </div>
            </center>







            <br /><br /><br /><br />
            <Footer />
        </div>

    )

}
