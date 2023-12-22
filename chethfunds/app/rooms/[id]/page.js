'use client';
let date=22;
const currentDate=new Date();
const day = currentDate.getDate();
// const depobid = () => {
//     if(date===day){
//         <button>Deposit</button>
        
//     }
// }

const DynamicPage = ({ params: { id } }) => {
    return (
        <div>
            <h1 className="font-bold text-2xl">Chitfund Room Page</h1>
            <p>ID: {id}</p>
            <br />
            <p>Starting Date of this room: {date} </p>
            {/* <p>{`Deposit/Bid on ${date} of every month`}</p> */}
            {
                date===day ? 
                <>
                <button>Deposit</button> <br/> <br/>
                <button>Bid</button>
                </>
                : 
                <button>{`Come back on ${date} for depositing or bidding`}</button>
            }
        </div>
    );
};

export default DynamicPage;