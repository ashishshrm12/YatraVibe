import React, { useEffect, useRef, useState, useContext } from "react";
import "../Styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import AvgRating from "../utils/AvgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import NewsLetter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);


  const {
    data: tour,
    loading,
    error,
    refetch,
  } = useFetch(`${BASE_URL}/tours/${id}`);

  const {
    photo,
    title,
    desc,
    city,
    address,
    price,
    distance,
    maxGroupSize,
    reviews = [],
  } = tour || {};

  const { totalRating, avgRating } = AvgRating(reviews);
  const options = { year: "numeric", month: "long", day: "numeric" };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user || !user.token) {
      alert("Please sign in to submit a review.");
      return;
    }

    if (!tourRating) {
      alert("Please select a rating.");
      return;
    }

    setIsSubmitting(true);

    const reviewObj = {
      username: user.username,
      reviewText,
      rating: tourRating,
    };

    try {
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to submit review");
      }

      // Clear the form
      reviewMsgRef.current.value = "";
      setTourRating(null);

      // Refetch updated tour data from backend
      await refetch();

      alert("Review submitted successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading.....</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt={title} />
                  <div className="tour__info">
                    <h2>{title}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews.length})</span>
                        )}
                      </span>

                      <span className="tour__location d-flex align-items-center gap-1">
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>

                    <div className="tour__extra-details mt-4">
                      <span>
                        <i className="ri-map-pin-2-line"></i> {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i> ₹{price}{" "}
                        /person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i> {distance} km
                      </span>
                      <span>
                        <i className="ri-group-line"></i> {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/* ======= Review Section ======= */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews.length} reviews)</h4>
                    <Form onSubmit={handleSubmit}>
                      {/* <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <span
                            key={rating}
                            onClick={() => setTourRating(rating)}
                            className={tourRating >= rating ? "active" : ""}
                          >
                            {rating} <i className="ri-star-fill"></i>
                          </span>
                        ))}
                      </div> */}
                      <div
                        className="d-flex align-items-center gap-3 mb-4 rating__group"
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <span
                            key={rating}
                            onClick={() => setTourRating(rating)}
                            onMouseEnter={() => setHoverRating(rating)}
                            className={
                              hoverRating >= rating ||
                              (!hoverRating && tourRating >= rating)
                                ? "active"
                                : ""
                            }
                          >
                            {rating} <i className="ri-star-fill"></i>
                          </span>
                        ))}
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Write your review"
                          required
                        />
                        <button
                          className="btn primary__btn"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews.map((review) => (
                        <div className="review__item" key={review._id}>
                          <img src={avatar} alt={review.username} />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="user__info d-flex align-items-center gap-3">
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("en-US", options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating} <i className="ri-star-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <NewsLetter />
    </>
  );
};

export default TourDetails;
