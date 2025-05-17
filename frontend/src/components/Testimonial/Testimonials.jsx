import React from 'react'
import Slider from 'react-slick';
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";
const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToShow: 3,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        
        reponsive: [ 
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
            
        ]
    };
  return (
   <Slider {...settings}>
    <div className="testimonial py-4 px-3">
        <p className="review__text">"This was the best travel experience I've ever had! The team was professional, and everything was perfectly organized."</p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava01} alt="" className="w-25 h-25 rounded-2" />
            <div>
                <h6 className="mb-0 mt-3">John Doe</h6>
                <p className="section__description">Customer</p>
            </div>
        </div>
    </div> 
    <div className="testimonial py-4 px-3">
        <p className="review__text">"I loved every moment of the tour! The guides were knowledgeable, and the destinations were breathtaking."</p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava02} alt="" className="w-25 h-25 rounded-2" />
            <div>
                <h6 className="mb-0 mt-3">Laila</h6>
                <p className="section__description">Customer</p>
            </div>
        </div>
    </div> 
    <div className="testimonial py-4 px-3">
        <p className="review__text">"Highly recommend this service! Everything was seamless, and the customer support was excellent. Explore guy's...."</p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava03} alt="" className="w-25 h-25 rounded-2" />
            <div>
                <h6 className="mb-0 mt-3">St. Snow</h6>
                <p className="section__description">Customer</p>
            </div>
        </div>
    </div> 
    <div className="testimonial py-4 px-3">
        <p className="review__text">"This was the best travel experience I've ever had! The team was professional, and everything was perfectly organized."</p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava01} alt="" className="w-25 h-25 rounded-2" />
            <div>
                <h6 className="mb-0 mt-3">John Doe</h6>
                <p className="section__description">Customer</p>
            </div>
        </div>
    </div> 
    <div className="testimonial py-4 px-3">
        <p className="review__text">"I loved every moment of the tour! The guides were knowledgeable, and the destinations were breathtaking."</p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava02} alt="" className="w-25 h-25 rounded-2" />
            <div>
                <h6 className="mb-0 mt-3">Laila</h6>
                <p className="section__description">Customer</p>
            </div>
        </div>
    </div> 
    <div className="testimonial py-4 px-3">
        <p className="review__text">"Highly recommend this service! Everything was seamless, and the customer support was excellent. Explore guy's...."</p>
        <div className="d-flex align-items-center gap-4 mt-3">
            <img src={ava03} alt="" className="w-25 h-25 rounded-2" />
            <div>
                <h6 className="mb-0 mt-3">St. Snow</h6>
                <p className="section__description">Customer</p>
            </div>
        </div>
    </div> 
   </Slider>
  )
}

export default Testimonials
