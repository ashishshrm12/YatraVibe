import React from 'react'
import "./newsletter.css"
import { Container, Row, Col } from 'reactstrap'
import maleTourist from "../assets/images/male-tourist.png";


const Newsletter = () => {
  return (
    <section className="newsletter">
      
      <Container>
        <Row>
          <Col lg="6"  >
            <div className="newsletter__content"> 
                <h2>Subscribe to our newsletter and stay updated on the latest travel tips.</h2>
                <div className="newsletter__input">
                    <input type="email" placeholder="Enter your email" />
                    <button className="btn newsletter__btn">Subscribe</button>
                </div>
                <p>We respect your privacy. Join our community and explore exclusive offers. Follow us on social media for more updates!</p>
            </div>
          </Col>
          <Col lg="6" className="text-end">
            <div className="newsletter__img">
                <img src={maleTourist} alt=""  />
            </div>
          </Col> 
        </Row>
      </Container>
    </section>
  )
}

export default Newsletter
