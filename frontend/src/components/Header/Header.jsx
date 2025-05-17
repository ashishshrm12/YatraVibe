// import React, { useRef, useEffect, useContext } from "react";
// import "./header.css";
// import { Container, Row, Button } from "reactstrap";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// // import logo from "../../assets/images/logo.png";
// import logo3 from "../../assets/images/logo3.png";

// import { AuthContext } from "./../../context/AuthContext";

// const nav_Link = [
//   {
//     path: "/home",
//     display: "Home",
//   },
//   {
//     path: "/about",
//     display: "About",
//   },
//   {
//     path: "/tours",
//     display: "Tours",
//   },
// ];
// const Header = () => {
//   const headerRef = useRef(null);
//   const navigate = useNavigate();
//   const { user, dispatch } = useContext(AuthContext);

//   const logout = () => {
//     dispatch({ type: "LOGOUT" });
//     navigate("/");
//   };

//   const stickyHeaderFunc = () => {
//     if (
//       document.body.scrollTop > 80 ||
//       document.documentElement.scrollTop > 80
//     ) {
//       headerRef.current.classList.add("sticky__header");
//     } else {
//       headerRef.current.classList.remove("sticky__header");
//     }
//   };

//   useEffect(() => {
//     stickyHeaderFunc();
//     window.addEventListener("scroll", stickyHeaderFunc);
//     return () => window.removeEventListener("scroll", stickyHeaderFunc);
//   });

//   return (
//     <div className="header" ref={headerRef}>
//       <Container>
//         <Row>
//           <div className="nav_wrapper d-flex align-items-center justify-content-between">
//             {/*======logo======*/}
//             <div className="logo">
//               <img src={logo3} alt="" />
//             </div>
//             {/*=====logoEnd======*/}
//             {/*======menu start======*/}
//             <div className="navigation">
//               <ul className="menu d-flex align-items-center gap-5">
//                 {nav_Link.map((item, index) => (
//                   <li className="nav_item" key={index}>
//                     <NavLink
//                       to={item.path}
//                       className={(navClass) =>
//                         navClass.isActive ? "active__link" : ""
//                       }
//                     >
//                       {item.display}
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             {/*======menu end======*/}
//             <div className="nav_right d-flex align-items-center gap-4">
//               <div className="nav_btns d-flex align-items-center gap-4">
//                 {user ? (
//                   <>
//                     <h5 className="mb-0">{user.username}</h5>
//                     <Button className="btn btn-dark" onClick={logout}>
//                       Logout
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Button className="btn secondary_btn">
//                       <Link to="/login">Login</Link>
//                     </Button>
//                     <Button className="btn register_btn">
//                       <Link to="/register">Register</Link>
//                     </Button>
//                   </>
//                 )}
//               </div>
//               <span className="mobile_menu">
//                 <i class="ri-menu-line"></i>
//               </span>
//             </div>
//           </div>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Header;

import React, { useRef, useEffect, useContext } from "react";
import "./header.css";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo3 from "../../assets/images/logo3.png";

import { AuthContext } from "./../../context/AuthContext";

const nav_Link = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/tours",
    display: "Tours",
  },
  {
    path: "/direction",
    display: "Direction",
  },
  {
    path: "/weather",
    display: "Weather",
  },
  {
    path: "/mybooking",
    display: "My Booking",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyHeaderFunc);
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  return (
    <div className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/*======logo======*/}
            <div className="logo">
              <img src={logo3} alt="logo" />
            </div>

            {/*======menu start======*/}
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav_Link.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "active__link" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/*======menu end======*/}

            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {user ? (
                  <>
                    <h5 className="mb-0">{user?.username}</h5>
                    <Button className="btn btn-dark" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn secondary_btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn register_btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              <span className="mobile_menu">
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
