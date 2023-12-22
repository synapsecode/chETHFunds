'use client';
import Footer from "../../components/Footer";
import AppBar from "../../components/AppBar";

// import App from "next/app";

export default function ManasHome() {
    return (
        <div>
        <AppBar pageName={"Rooms"}/>
            
            <div className="border-2 border-white rounded-lg max-w-max p-2 m-2">
                Create New Room: <br />
                <form name="createRoom">
                <input type="number" placeholder="Enter no of people" name="totalPeople" className="m-1"></input> <br></br>
                <input type="number" placeholder="Enter no of months" name="months" className="m-1"></input> <br></br>
                <input type="number" placeholder="Enter the total amount" name="totalAmount" className="m-1"></input> <br/>
                <input type="submit" value="Submit" className="border-2 border-white max-w-max p-1"></input>
                </form>
            </div>
            <div className="border-2 border-white rounded-lg max-w-max p-2 m-2">
                Join Room: <br />
                <form name="joinRoom">
                <input type="text" placeholder="Enter Room ID" name="roomID" className="m-1 text-black"></input> <br/>
                <input type="submit" value="Submit" className="border-2 border-white max-w-max p-1"></input>
                </form>
            </div>
            <Footer/>
        </div>
        
    )

}
