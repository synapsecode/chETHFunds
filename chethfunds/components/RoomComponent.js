'use client';
import { useState, useEffect } from "react";



const RoomComponent = () => {

    const [roomIDs, setRoomIDs] = useState([]);

    useEffect(() => {
        const data = Object.keys({ ...window.localStorage }).filter((x) => x.startsWith('fund'));
        setRoomIDs(data)
    }, [])


    return (
        <div className=" border w-1/2 p-5 overflow-auto h-auto">
            <h1 className="text-5xl mb-5 text-gray-700 mt-5">My Rooms</h1>

            {
                roomIDs.map((item, index) => (
                    <RoomDisplay id={item} key={index} />
                ))
            }

        </div>
    )
}

const RoomDisplay = ({ id }) => {
    return <div className=" bg-pink-900 m-4 p-4 w-1/4 rounded border white">
        <a href={`/rooms/${id}`} > Room {id}</a>
        <br />
    </div>
}


export default RoomComponent;