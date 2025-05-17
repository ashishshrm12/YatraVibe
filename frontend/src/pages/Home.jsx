import React from "react";
import "../Styles/home.css";
import { Container, Row, Col } from "reactstrap";
import heroImg01 from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/hero-video.mp4";
import SubTitle from "./../shared/SubTitle";
import worldImg from "../assets/images/world.png";
import SearchBar from "../shared/SearchBar";
import FeaturedTourList from "../components/featured-tour/FeaturedTourList";
import ServiceList from "../services/ServiceList";
import experienceImg from "../assets/images/experience.png";
import MasonryImageGallery from "../components/image-gallery/MasonryImageGallery";
import Testimonials from "../components/Testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";


const Home = () => {
  return (
    <>
      {/* ===Hero section start=== */}
      <section >
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <SubTitle subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Traveling opens the doors to creating{" "}
                  <span className="highlight">memories</span>
                </h1>
                <p>
                  Traveling is an adventure that opens the doors to creating
                  unforgettable memories...
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box ">
                <img src={heroImg01} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                <video src={heroVideo} alt="" autoPlay loop muted playsInline />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {/* ===Hero section end=== */}

      {/* ===Service section start=== */}
      <section >
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="service__subtitle">what we serve</h5>
              <h2 className="service__title">We Offer Our Best Services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>
      {/* ===Service section end=== */}

      {/* ===Featured Tour section start=== */}
      <section >
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <SubTitle subtitle={"Explore"} />
              <h2 className="featured__tour-title">Our Featured Tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* ===Featured Tour section end=== */}

      {/* ===Experience Section=== */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <SubTitle subtitle={"Experience"} />
                <h2 className="experience__title">With Our All Experience <br/> We Will Serve You </h2>
                <p>
                  Discover the adventures that await you in our unique
                  experiences. From breathtaking landscapes to cultural
                  immersions, we offer a range of tours that cater to every
                  traveler's desires.
                </p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful trips</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span> 
                  <h6>Regular clients</h6>
                  </div>
                <div className="counter__box">
                  <span>15+</span>
                  <h6>Years experience</h6>
                  </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* ===Experience Section end=== */}

      {/* ===Gallery section start=== */}
      <section className="gallery__section">
        <Container>
          <Row>
            <Col lg="12">
              <SubTitle subtitle={"Gallery"} />
              <h2 className="gallery__title">Visit Our customers tours Gallery</h2>
            </Col>
            <Col lg="12">
              <MasonryImageGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ===Gallery section end=== */}

      {/* ===Testionial section start=== */}
      <section >
        <Container>
          <Row>
            <Col lg="12">
              <SubTitle subtitle={"Fans Love"} />
              <h2 className="testimonial__title">What our fans say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      {/* ===Testionial section end=== */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
            
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />

    </>
  );
};

export default Home;
