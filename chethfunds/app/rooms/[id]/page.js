'use client';
const DynamicPage = ({ params: { id } }) => {

    return (
        <div>
            <h1>Chitfund Room Page</h1>
            <p>ID: {id}</p>
            <br />
            <p>Starting Date:</p>
        </div>
    );
};

export default DynamicPage;