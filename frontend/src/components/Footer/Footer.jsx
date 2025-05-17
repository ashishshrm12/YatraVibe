import React from 'react'
import "./footer.css"
import { Container, Row, Col, ListGroup,ListGroupItem } from "reactstrap"
import{ Link } from "react-router-dom"
import logo3 from "../../assets/images/logo3.png"

const quick__Link = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/direction",
    display: "Direction",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quick__Link2 = [
  {
    path: "/mybooking",
    display: "My Booking",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

const Footer = () => {

  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">   
     <Container>
      <Row>
        <Col lg="3">
          <div className='logo'>
            <img src={logo3} alt=''/>
            <p>Thank you for visiting our site! </p>
            <p>Follow us on social media!</p> 
            <div className="social__links d-flex align-items-center gap-4">
              <span><Link to="#"><i class="ri-facebook-fill"></i></Link></span>
              <span><Link to="#"><i class="ri-twitter-fill"></i></Link></span>
              <span><Link to="#"><i class="ri-instagram-fill"></i></Link></span>
              <span><Link to="#"><i class="ri-youtube-fill"></i></Link></span>
              </div>

          </div>
        </Col>

        <Col lg="3">
          <h5 className='footer__link-title'>Discover</h5>
          <ListGroup className='footer__quick-links'>
            {quick__Link.map((item, index) => (
              <ListGroupItem key={index} className='ps-0 border-0'>
                <Link to={item.path}>{item.display}</Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
        
        <Col lg="3">
          <h5 className='footer__link-title'>More Links</h5>
          <ListGroup className='footer__quick-links'>
            {quick__Link2.map((item, index) => (
              <ListGroupItem key={index} className='ps-0 border-0'>
                <Link to={item.path}>{item.display}</Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>

        <Col lg="3">
          <h5 className='footer__link-title'>Contact</h5>
          <ListGroup className='footer__quick-links'>
            
              <ListGroupItem  className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i className='ri-map-pin-line'></i></span>
                  Address:
                </h6>

                <p className='mb-0'>Mumbai, India</p>
              </ListGroupItem>
              <ListGroupItem  className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i className='ri-mail-line'></i></span>
                  Email:
                </h6>

                <p className='mb-0'>yatravibe@gmail.com</p>
              </ListGroupItem>
              <ListGroupItem  className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i className='ri-phone-line'></i></span>
                  Phone:
                </h6>

                <p className='mb-0'>+911234567890</p>
              </ListGroupItem>

          </ListGroup>
        </Col>

        <Col lg="12" className='text-center pt-5'>
          <p className='copyright'>Copyright {year}, website made by YatraVibe team. All rights reserved.</p>
        </Col>
        

      </Row>
    </Container>
    </footer>
  )
}

export default Footer
