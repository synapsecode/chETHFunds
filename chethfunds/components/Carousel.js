// components/Carousel.js
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container">
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`slide-${index + 1}`} />
        </div>
      ))}
    </Slider>
     <style jsx>{`
     .carousel-container {
       width: 600px; /* Set your desired width */
       height: 300px; /* Set your desired height */
       margin: 0 auto; /* Center the carousel */
     }

     .carousel-slide {
       width: 100%; /* Ensure images take up 100% of the container width */
       height: 100%; /* Ensure images take up 100% of the container height */
     }

     img {
       width: 100%;
       height: 100%;
       object-fit: cover; /* Maintain aspect ratio and cover the entire container */
     }
   `}</style>
   </div>
  );
};

export default Carousel;
