import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

function Carousel() {
  return (
    <div
      style={{
        background: "white",
        display: "flex",
        alignItems: "center",
        
      }}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="../images/card3.png" alt="Slide 3" style={{width: "100%",height:'530px'}} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../images/card4.png" alt="Slide 4" style={{width: "100%",height:'530px'}} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../images/card.jpg" alt="Slide 1" style={{width: "100%",height:'530px'}} />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../images/card2.png" alt="Slide 2" style={{width: "100%",height:'530px'}} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
export default Carousel;
