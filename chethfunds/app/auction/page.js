'use client';
import AppBar from "../../components/AppBar";
import { useState, useEffect } from "react";
// import Router from "next/router"

// let bidAmount = 2000;
let time;
let timeRemaining=120;
setInterval(()=>{
    time=new Date().toLocaleTimeString();   
},1000)

export default function Auction() {
    const [bidAmount, seta] = useState(2000);
    const [seconds, setSeconds] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(20);

    useEffect(() => {
        const intervalId = setInterval(() => {
          // Increment the seconds every second
          setSeconds((prevSeconds) => prevSeconds + 1);
          setTimeRemaining(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
          if (timeRemaining==0) {
            <h1>TIME UP</h1>
          }
        }, 1000);
        return () => clearInterval(intervalId);
  }, []);

    const handleIncrement = (a) => {
        seta((a * 100) + bidAmount);
        // bidAmount=bidAmount+(a*100);
    };


    return (
        <>
            <AppBar pageName={"LIVE Auction"} />
            <div>
                <p className="font-bold text-2xl center">Bid details:</p>
                <div className="details inline-block min-w-min p-11">
                    <p>Base Bid:2000</p>
                    <p>Current Bid:{bidAmount}</p>
                </div>
                <div className="time inline-block min-w-min p-11">
                    <p>Current Time: {time}</p>
                    <div>Time left for next Bid:{timeRemaining}s</div>
                </div>
                <div className="amount inline-block min-w-min p-11">
                    <p>Bid Amount:<br />{bidAmount}</p> <br />
                    <div>Enter your bid amount: <br />
                        <ul>
                            <li className="border-2 p-2 cursor-pointer" onClick={() => handleIncrement(5)}>+500</li>
                            <li className="border-2 p-2 cursor-pointer" onClick={() => handleIncrement(10)}>+1000</li>
                            <li className="border-2 p-2 cursor-pointer" onClick={() => handleIncrement(15)}>+1500</li>
                            <li className="border-2 p-2 cursor-pointer" onClick={() => handleIncrement(20)}>+2000</li>
                        </ul>
                        {/* <button className="border-2 rounded-sm border-white p-3">BID</button> */}
                    </div>
                </div>
            </div>
        </>
    )
}