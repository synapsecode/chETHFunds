'use client';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';

const Auction = ({ user, callback }) => {
    const [bidAmount, setBidAmount] = useState(0.0005);
    const [myBid, setMyBid] = useState(0);
    const [seconds, setSeconds] = useState(20);
    const [auctionStarted, setAuctionStarted] = useState(false);
    const [winner, setWinner] = useState(null);

    let timerId;

    const startTimer = () => {
        clearInterval(timerId); // Clear any existing timers
        setSeconds(20);
        timerId = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds < 1) {
                    clearInterval(timerId);
                    return prevSeconds;
                }
                return prevSeconds - 1;
            });
        }, 1000);
    };

    const resetTimer = () => {
        clearInterval(timerId); // Clear the current timer
        setSeconds(20);
    };

    useEffect(() => {
        const auctionRef = collection(firestore, 'auction');
        const auctionDoc = doc(auctionRef, 'currentAuction');

        const unsubscribe = onSnapshot(auctionDoc, (snapshot) => {
            const data = snapshot.data();
            if (data) {
                console.log(data);
                setBidAmount(data.bidAmount);
                setSeconds(data.timeRemaining);
                setWinner(data.user);
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        if (seconds === 0) {
            clearInterval(timerId);
            handleFinishAuction();
        }
        return () => {
            clearInterval(timerId); // Cleanup on component unmount
        };
    }, [seconds]);


    const handleAmount = (amount) => {
        setBidAmount((prevBidAmount) => prevBidAmount + amount);
        resetTimer();
        // Update the bid amount and time remaining in Firestore
        const auctionRef = doc(firestore, 'auction', 'currentAuction');
        setDoc(auctionRef, { bidAmount: bidAmount + amount, timeRemaining: 20, user: user });
    };

    const handleIncrement = (a) => {
        setMyBid((a) + myBid);
    };

    const handleFinishAuction = async () => {
        // I stored final bid here
        const finalBid = bidAmount;
        setBidAmount(0.0005);
        // This is for deleting the document
        const auctionRef = doc(firestore, 'auction', 'currentAuction');
        await deleteDoc(auctionRef);
        console.log('Auction finished. Final Bid:', finalBid);
        setAuctionStarted(false);

        console.log(`Winner: ${winner}`);
        callback(finalBid, winner)
    };

    const handleStartAuction = () => {
        setAuctionStarted(true);
        startTimer();
    }


    if (auctionStarted === false) {
        return <center><button onClick={handleStartAuction} className='border-1 rounded-2xl mr-4 ml-2 p-4'>Start Auction</button></center>
    }
    return (
        <div className='border w-1/4 p-5 rounded-2xl'>
            <div className="flex flex-col justify-center items-center text-teal-500">
                <p>Current Bid: {bidAmount}ETH</p> <br />
                <p>Time Remaining: {seconds}s</p> <br />
                <p>My Bid: {myBid}ETH</p><br />
                <div>
                    <button className="border-2 border-teal-200 p-3 rounded-xl m-1 inline-block font-bold" onClick={() => handleAmount(myBid)}>Place Bid</button>
                    {/* <button className="border-2 border-teal-200 p-3 rounded-xl m-1 inline-block font-bold" onClick={() => { setMyBid(2000); resetTimer(); }}>RESET</button> */}
                </div><br />
                <button onClick={() => handleIncrement(0.0005)}>Increase</button>
                <button onClick={() => handleIncrement(-0.0005)}>Decrease</button> <br />
            </div>
        </div>
    );
};
export default Auction;