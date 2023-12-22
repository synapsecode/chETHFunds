'use client';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase';

const Auction = () => {
    const [bidAmount, setBidAmount] = useState(2000);
    const [timeRemaining, setTimeRemaining] = useState(20);
    const [myBid, setMyBid] = useState(bidAmount);

    useEffect(() => {
        const auctionRef = collection(firestore, 'auction');
        const auctionDoc = doc(auctionRef, 'currentAuction');

        const unsubscribe = onSnapshot(auctionDoc, (snapshot) => {
            const data = snapshot.data();
            if (data) {
                setBidAmount(data.bidAmount);
                setTimeRemaining(data.timeRemaining);
            }
        });
        const auctionFinishInterval = setInterval(() => {
            if (timeRemaining === 0) {
                handleFinishAuction();
                clearInterval(auctionFinishInterval);
                
            }
        }, 1000);

        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
    

        // setInterval(() => {
        //     setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        //     // if(prevTime===0){
        //     //     handleFinishAuction()
        //     // }
        // }, 1000)

        // setInterval(() => {
        //     if (timeRemaining === 0)
        //         handleFinishAuction
        // }, 10000);
       
    
        return () => {
            
            clearInterval(auctionFinishInterval);
            clearInterval(timerInterval);
            unsubscribe();
        };
    }, [timeRemaining]);


    const handleAmount = (amount) => {
        setBidAmount((prevBidAmount) => prevBidAmount + amount);
        setTimeRemaining(20);

        // Update the bid amount and time remaining in Firestore
        const auctionRef = doc(firestore, 'auction', 'currentAuction');
        setDoc(auctionRef, { bidAmount: bidAmount + amount, timeRemaining: 20 });
    };

    const handleIncrement = (a) => {
        setMyBid((a) + myBid);
        // bidAmount=bidAmount+(a*100);
    };

    const handleFinishAuction = async () => {
        // I stored final bid here
        const finalBid = bidAmount;
        setBidAmount(2000);
        // This is for deleting the document
        const auctionRef = doc(firestore, 'auction', 'currentAuction');
        await deleteDoc(auctionRef);


        console.log('Auction finished. Final Bid:', finalBid);
    };

    // if (timeRemaining===0) {
    //     handleFinishAuction;
    // }

    return (
        <div>
            <br /><br />
            <div className="flex flex-col justify-center items-center text-teal-500">
                <p>Current Bid: {bidAmount}</p> <br />
                <p>Time Remaining: {timeRemaining}s</p> <br />
                <p>Bid: {myBid}</p>
                <div>
                    <button className="border-2 border-teal-200 p-3 rounded-xl m-1 inline-block font-bold" onClick={() => handleAmount(myBid)}>BID</button>
                    <button className="border-2 border-teal-200 p-3 rounded-xl m-1 inline-block font-bold" onClick={() => { setMyBid(2000) }}>RESET</button>
                </div><br />
                <button onClick={() => handleIncrement(1000)}>Bid +1000</button> <br />
                {/* Add more buttons or UI elements as needed */} <br />
                <button onClick={handleFinishAuction} className='border-2 p-2 rounded-2xl'>Finish Auction</button>
            </div>
        </div>
    );
};
export default Auction;