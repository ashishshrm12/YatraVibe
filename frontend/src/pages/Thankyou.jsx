import React from 'react'
import {Container,Row,Col,Button} from "reactstrap"
import { Link } from 'react-router-dom'
import "../Styles/thank-you.css"

const Thankyou = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg='12' className='pt-5 text-center'>
            <div className="thank__you">
              <span><i className="ri-checkbox-circle-line"></i></span>
              <h1 className='mb-3 fw-semibold'>Thank You!</h1>
              <h3 className='mb-4'>Your booking has been confirmed.</h3>
              <Button color="btn primary__btn" ><Link to="/mybooking">Go to My Bookings</Link></Button>

            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Thankyou
