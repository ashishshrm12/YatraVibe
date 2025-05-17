import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap';
import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
    {
        imgUrl: weatherImg,
        title: "Weather Forecast",
        desc: "Get up-to-date weather information for your travel destination.",
    },
    {
        imgUrl: guideImg,
        title: "Travel Guide",
        desc: "Access expert travel guides to help you navigate your journey.",
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "Tailor your travel experience to suit your preferences and needs.",
    },
]


const ServiceList = () => {
  return (
    <>
        {servicesData.map((item, index) => (
            <Col lg="3" key={index}>
            <ServiceCard item={item} />
            </Col>
        ))}
      
    </>
  )
}

export default ServiceList
