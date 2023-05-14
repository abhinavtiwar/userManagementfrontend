import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import app_config from "../../config";
import dayjs from "dayjs";

function UserSignup() {
  const [dob, setDob] = useState(dayjs(new Date()).$d);
  // console.log(dob);

  const navigate = useNavigate();
  const api_url = app_config.api_url;
  const handleFormSubmit = (formdata) => {
    console.log("Form submitted!!");
    console.log(dob);
    formdata.age = dob;
    console.log(formdata);
    // return;

    fetch(`${api_url}/startup/add`, {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success 😀👌",
          text: "signup Successful",
        });
        navigate("/main/UserLogin");
      } else if (res.status === 300) {
        Swal.fire({
          icon: "error",
          title: "Oops!!",
          text: "Invalid Credentials",
        });
      }
    });
  };
  const signSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Too Short!")
      .max(20, "Too Long!")
      .required("Name is required"),
    password: Yup.string()
      .min(6, "Password should be at least 6 characters")
      .max(100, "Too Long! password")
      .required("Password is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number format")
      .required("Phone number is required"),

    email: Yup.string().email().required("Email is required"),
  });

  const [selectedDate, setselectedDate] = useState(null);

  return (
    <div className="mains">
      <div classNameName="sub-mains">
        <div>
          <div className="imgs"></div>
          <div>
            <Formik
              initialValues={{
                phone: "",
                name: "",
                email: "",
                password: "",
                age: "",
                teamInfo: Object,
                details: Array,
                createdAt: new Date(),
              }} //specifying initial value for form
              validationSchema={signSchema}
              onSubmit={handleFormSubmit} // function to handle form submission
            >
              {({ values, handleChange, handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <section
                    className="h-100"
                    style={{ backgroundColor: "#C7DDCC" }}
                  >
                    <div className="container py-5 h-100">
                      <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                          <div className="card card-registration my-4">
                            <div className="row g-0">
                              <div className="col-xl-6 d-none d-xl-block">
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                  alt="Sample photo"
                                  className="img-fluid"
                                  style={{
                                    borderTopLeftRadius: ".25rem",
                                    borderBottomLeftRadius: ".25rem",
                                  }}
                                />
                              </div>
                              <div className="col-xl-6">
                                <div className="card-body p-md-5 text-black">
                                  <h3 className="mb-5 fw-bold text-uppercase text-center">
                                    User Registration Form
                                  </h3>
                                  <div className="row">
                                    <div className="mb-4">
                                      <TextField
                                        fullWidth
                                        sx={{
                                          mt: 2,
                                          "& .MuiInputBase-root": {
                                            height: 80,
                                          },
                                        }}
                                        label="Name"
                                        focused
                                        id="name"
                                        name="name"
                                        color="secondary"
                                        value={values.name}
                                        onChange={handleChange}
                                        helperText={
                                          errors.name ? touched.name : ""
                                        }
                                        error={
                                          Boolean(errors.name) && touched.name
                                        }
                                        
                                      />
                                      <ErrorMessage name="name"  />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="mb-4">
                                      <TextField
                                        fullWidth
                                        sx={{
                                          mt: 2,
                                          "& .MuiInputBase-root": {
                                            height: 80,
                                          },
                                        }}
                                        type="email"
                                        label="Email Address"
                                        focused
                                        id="email"
                                        name="email"
                                        color="secondary"
                                        value={values.email}
                                        onChange={handleChange}
                                        helperText={errors.email}
                                        error={Boolean(errors.email)}
                                      />
                                       <ErrorMessage name="email"  />
                                    </div>
                                    <div className="mb-4">
                                      <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        name="password"
                                        sx={{
                                          mt: 2,
                                          "& .MuiInputBase-root": {
                                            height: 80,
                                          },
                                        }}
                                        focused
                                        id="password"
                                        color="secondary"
                                        value={values.password}
                                        onChange={handleChange}
                                        helperText={
                                          errors.password
                                            ? touched.password
                                            : ""
                                        }
                                        error={
                                          Boolean(errors.password) &&
                                          touched.password
                                        }
                                      />
                                       <ErrorMessage name="password"  />
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="mb-4">
                                      <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                      >
                                        <DatePicker
                                          label="Select DOB"
                                          className="w-100"
                                          color="secondary"
                                          sx={{
                                            mt: 2,
                                            "& .MuiInputBase-root": {
                                              height: 80,
                                            },
                                          }}
                                          focused
                                          // id="age"
                                          value={dayjs(dob)}
                                          onChange={({ $d }) => setDob($d)}
                                        />
                                      </LocalizationProvider>
                                    </div>
                                    <div className="mb-4">
                                      <TextField
                                        fullWidth
                                        label="Phone Number"
                                        sx={{
                                          mt: 2,
                                          "& .MuiInputBase-root": {
                                            height: 80,
                                          },
                                        }}
                                        focused
                                        id="phone"
                                        color="secondary"
                                       
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        helperText={
                                          errors.phone ? touched.phone : ""
                                        }
                                        error={
                                          Boolean(errors.phone) && touched.phone
                                        }
                                      />
                                       <ErrorMessage name="phone"  />
                                    </div>
                                  </div>

                                  <Button
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    type="submit"
                                    sx={{
                                      mt: 4,
                                      "& .MuiInputBase-root": {
                                        height: 80,
                                      },
                                    }}
                                    color="success"
                                  >
                                    Register
                                  </Button>
                                  <h5 className="text-center mt-4">
                                    Already have an account?{" "}
                                    <Link to="/main/UserLogin">Login Here</Link>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
