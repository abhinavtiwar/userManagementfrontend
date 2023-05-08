import React from "react";
import { Link, NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div id="preview" className="preview">
        <div style={{ display: "none" }} />
        <div>
          <div
            data-draggable="true"
            className=""
            style={{ position: "relative" }}
          >
           
            <section
              draggable="false"
              className="overflow-hidden pt-0"
              data-v-271253ee=""
            >
              <section className="mb-10">
                {/* Background image */}
                <div
                  className="p-5 text-center bg-image"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw5NjI0M3wxfDF8c2VhcmNofDh8fG1vZGVybnxlbnwwfHx8fDE2NjI3NzIyMDU&ixlib=rb-1.2.1&q=80&w=1080")',
                    height: 600,
                    backgroundSize: "cover",
                    backgroundPosition: "100% 100%",
                  }}
                  aria-controls="#picker-editor"
                >
                  <div
                    className="mask"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                  >
                    <div className="container h-100">
                      <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-10">
                          <div className="text-white pb-md-5">
                            <h1 className="my-md-5 mb-4 px-4 px-md-5 display-3 fw-bold ls-tight">
                              <span>Welcome To</span>{" "}
                              <br />{" "}
                              <span className="">User Management System.</span>
                            </h1>{" "}
                            <a
                              className="btn  btn-outline-primary btn-lg py-3 px-5 me-2"
                              href="#!"
                              role="button"
                              aria-controls="#picker-editor"
                            >
                               <NavLink className="nav-link" to="/main/UserSignup">
                             Get Start
                              </NavLink>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                {/* Background image */}
              </section>
            </section>
            {/**/}
          </div>
          </div>
          </div>
     
      
    </>
  );
};

export default Home;
