// import React from "react";
// import { Card, CardBody } from "reactstrap";
// import { Link } from "react-router-dom";
// import "./tourCard.css";
// import  AvgRating from "../utils/AvgRating";

// const TourCard = ({ tour }) => {
//   const { id, title, city, photo, price, featured, reviews } = tour;
//   const { avgRating, totalRating } = AvgRating(reviews);
  

//   return (
//     <div className="tour__card">
//       <Card>
//         <div className="tour__img">
//           <img src={photo} alt="Tour-img" />
//           {featured &&<span>Featured</span>}
//         </div>
//         <CardBody>
//         <div className="card__top d-flex align-items-center justify-content-between">
//           <span className="tour__location d-flex align-items-center gap-1">
//             <i className="ri-map-pin-line"></i>
//             {city}
//           </span>
//           <span className="tour__rating d-flex align-items-center gap-1">
//             <i
//               className="ri-star-fill"
//               style={{ color: "var(--secondary-color)" }}
//             ></i>
//             {avgRating===0 ? null :avgRating} 
//             {totalRating===0 ? ('Not Rated') : (<span>({reviews.length})</span>)}
//           </span>
//         </div>
//           <h5 className="tour__title">
//             <Link to={`/tours/${id}`}>{title}</Link>
//           </h5>

//           <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
//             <h5>
//             ₹{price} <span>/per person</span>
//             </h5>
//             <button className="btn booking__btn">
//               <Link to={`/tours/${id}`}>Book Now</Link>
//             </button>
//           </div>
//       </CardBody>
//       </Card>

      
//     </div>
//   );
// };

// export default TourCard;

import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tourCard.css";
import AvgRating from "../utils/AvgRating";

const TourCard = ({ tour }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;
  const { avgRating, totalRating } = AvgRating(reviews);

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
        <img src={photo} alt="Tour-img" />
          {featured && <span>Featured</span>}
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i className="ri-map-pin-line"></i> {city}
            </span>

            <span className="tour__rating d-flex align-items-center gap-1">
              <i
                className="ri-star-fill"
                style={{ color: "var(--secondary-color)" }}
              ></i>
              {totalRating === 0 ? (
                "Not rated"
              ) : (
                <>
                  {avgRating} <span>({reviews.length})</span>
                </>
              )}
            </span>
          </div>

          <h5 className="tour__title">
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ₹{price} <span>/per person</span>
            </h5>
            <Link to={`/tours/${_id}`} className="btn booking__btn">
              Book Now
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;

