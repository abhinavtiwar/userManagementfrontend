import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button } from "@mui/material";
import app_config from "../../config";
import dayjs from 'dayjs';

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("startup"))
  );

  const api_url = app_config.api_url;
  const [file, setFile] = useState(api_url + "/" + currentUser.thumbnail);
  const [selFile, setSelFile] = useState("");

  const [dob, setDob] = useState(dayjs(currentUser.age));

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];
    setSelFile(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch("http://localhost:5000/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("uploaded");
      }
    });
  }

  // console.log(currentUser);
  const handleFormSubmit = (formdata) => {
    formdata.age = dob.$d;
    formdata.thumbnail = selFile;
    fetch(`${api_url}/startup/update/${currentUser._id}`, {
      method: "PUT",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      console.log(res.status);
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        Swal.fire({
          icon: "success",
          title: "Success 😀👌",
          text: "update successful",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops",
          text: " error occured",
        });
      }
    });
  };

  const profileSchema = Yup.object().shape({
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

  return (
    <div className="container">
      <div className="contact-box">
        <div className="contact-left">
          <marquee>
            <h3>Update Your Profile</h3>
          </marquee>
          <Formik initialValues={currentUser} 
            validationSchema={profileSchema}
          onSubmit={handleFormSubmit}>
            {({ values, handleChange, handleSubmit , errors, touched}) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label=" Name"
                  sx={{ mt: 4 }}
                  id="name"
                  name="name"
                  type="text"
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
                <TextField
                  fullWidth
                  label="Email Address"
                  sx={{ mt: 4 }}
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  helperText={
                    errors.email ? touched.email : ""
                  }
                  error={
                    Boolean(errors.email) && touched.email
                  }
                />
                 <ErrorMessage name="email"  />

                <TextField
                  fullWidth
                  label="Password"
                  sx={{ mt: 4 }}
                  id="password"
             
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  helperText={
                    errors.password ? touched.password : ""
                  }
                  error={
                    Boolean(errors.password) && touched.password
                  }
                />
                 <ErrorMessage name="password"  />
                <TextField
                  className="bg"
                  fullWidth
                  label="Phone No"
                  sx={{ mt: 4 }}
                  id="phone"
               
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Select DOB"
                      className="w-100"
                      sx={{
                        mt: 2,
                        "& .MuiInputBase-root": {
                          height: 80,
                        },
                      }}
                      focused
                      id="age"
                      value={dayjs(values.age)}
                      onChange={({$d}) => setDob({$d})}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5 }}
                >
                  UPDATE PROFILE
                </Button>
              </form>
            )}
          </Formik>
        </div>

        <div className="contact-right">
          <div className="d-flex justify-content-center">
            <img style={{ height: "200px", width: "500px" }} src={file} />
          </div>
          <div className="d-flex justify-content-center">
            <input type="file" onChange={handleChange} />
          </div>
          <hr></hr>
          <h3>User Profile</h3>
          <table>
            <tr>
              <td>
                <h2>Name :</h2>
              </td>
              <td className="star">{currentUser.name}</td>
            </tr>

            <tr>
              <td>
                <h2>Email :</h2>
              </td>
              <td className="star">{currentUser.email}</td>
            </tr>
            <tr>
              <td>
                <h2>DOB :</h2>
              </td>
              <td className="star">{new Date(currentUser.age).toLocaleDateString()}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
