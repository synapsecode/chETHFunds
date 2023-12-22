export default function ManasHome() {
    return (
        <div>
            <h1 className="text-5xl text-blue">Rooms</h1> <br/>
            <div>
                <a href="/rooms/37gybybyvff"> Room 1</a> <br/>
                <a href="/rooms/yrhgyhbf788"> Room 2</a> <br/>
                <a href="/rooms/48h48hfuh"> Room 3</a> <br/>

                <br/><br/>
            </div>
            <div className="border-2 border-white rounded-lg max-w-max p-2">
                Create New Room: <br />
                <form name="createRoom">
                <input type="number" placeholder="Enter no of people" name="totalPeople" className="m-1"></input> <br></br>
                <input type="number" placeholder="Enter no of months" name="months" className="m-1"></input> <br></br>
                <input type="number" placeholder="Enter the total amount" name="totalAmount" className="m-1"></input> <br/>
                <input type="submit" value="Submit" className="border-2 border-white max-w-max p-1"></input>
                </form>
                Join Room: <br />
                <form name="joinRoom">
                <input type="text" placeholder="Enter Room ID" name="roomID" className="m-1"></input> <br/>
                <input type="submit" value="Submit" className="border-2 border-white max-w-max p-1"></input>
                </form>
            </div>
        </div>
    )

}
