'use client';

import Footer from '../../components/Footer';
import AppBar from '../../components/AppBar'
import Carousel from '../../components/Carousel'
import RoomComponent from "../../components/RoomComponent";


const HomePage = () => {
  const carouselImages = [
    'https://public.bnbstatic.com/static/academy/uploads-original/2e28489244874f818b2c0d1b065b17c8.png',
    'https://mypaisaa.com/blog/wp-content/uploads/2021/11/chit-vs-FD_Banner.png',
    'https://www.thefinancepoint.com/wp-content/uploads/2021/11/What-is-Chit-Fund-1024x684.jpeg',
  ];
  return (
    <div>
      <AppBar pageName="Home" />
      <br /><br /><br />
      <Carousel images={carouselImages} />
      <br></br><br></br><br></br><br></br><br></br>
      <center>
        <h1 className='text-8xl text-purple-400 w-1/2'>Welcome To chETHFunds</h1><br></br>
      </center>

      <div className="action-buttons">
        <div className="action-container">
          <h2 className='text-4xl'>Create a Room</h2>
          <p className='text-sm text-gray-600 mt-2'>Start a new chit fund room and invite participants</p><br></br>
          <button><a href='/rooms'>Create Room</a></button>
        </div>

        <div className="action-container">
          <h2 className='text-4xl'>Join a Room</h2>
          <p className='text-sm text-gray-600 mt-2'>Join an existing chit fund room by entering the room code</p><br></br>
          <button><a href='/rooms'>Join Room</a></button>
        </div>
      </div> <br></br><br></br>
      <center>

        <br></br>

        <RoomComponent />
        <br /><br />
      </center>
      <Footer />
      <style jsx>{`

        .welcomeTag {
            font-weight: 700;
            font-size: 30;
        }
        

        .action-buttons {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
        }

        .action-container {
          text-align: center;
          padding: 30px 40px;
        //   border: 1px solid #ddd;
          border-radius: 8px;
          width: 45%;
          background-color: #161616;
        }

        button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
      `}</style>


      {/* <a href="/homePage">HomePage</a> */}



    </div>
  );
};

export default HomePage;