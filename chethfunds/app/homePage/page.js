'use client';

import AppBar from '../../components/AppBar'
import Carousel from '../../components/Carousel'


const HomePage = () => {
    const carouselImages = [
        'https://public.bnbstatic.com/static/academy/uploads-original/2e28489244874f818b2c0d1b065b17c8.png',
        'https://mypaisaa.com/blog/wp-content/uploads/2021/11/chit-vs-FD_Banner.png',
        'https://www.thefinancepoint.com/wp-content/uploads/2021/11/What-is-Chit-Fund-1024x684.jpeg',
      ];
    return (
      <div>
        <AppBar pageName="Home" />
        <Carousel images={carouselImages} />
        <br></br><br></br><br></br><br></br><br></br>
        <center>
        <h1>Welcome To chETHFunds</h1><br></br>
        </center>

        <div className="action-buttons">
          <div className="action-container">
            <h2>Create a Room</h2><br></br>
            <p>Start a new chit fund room and invite participants</p><br></br>
            <button>Create Room</button>
          </div>

          <div className="action-container">
            <h2>Join a Room</h2><br></br>
            <p>Join an existing chit fund room by entering the room code</p><br></br>
            <button>Join Room</button>
          </div>
        </div>
        <style jsx>{`

        
        

        .action-buttons {
          display: flex;
          justify-content: space-around;
          margin-top: 20px;
        }

        .action-container {
          text-align: center;
          padding: 20px;
        //   border: 1px solid #ddd;
          border-radius: 8px;
          width: 45%;
          background-color: #353935;
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