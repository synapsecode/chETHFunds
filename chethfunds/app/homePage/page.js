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
        <h1>Welcome To chETHFunds</h1>
        </center>
  
          {/* <a href="/homePage">HomePage</a> */}
        
  
        
      </div>
    );
  };
  
  export default HomePage;