import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Formik } from "formik";
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

  return (
    <div className="container">
      <div className="contact-box">
        <div className="contact-left">
          <marquee>
            <h3>Update Your Profile</h3>
          </marquee>
          <Formik initialValues={currentUser} onSubmit={handleFormSubmit}>
            {({ values, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label=" Name"
                  sx={{ mt: 4 }}
                  id="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  sx={{ mt: 4 }}
                  id="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="Password"
                  sx={{ mt: 4 }}
                  id="password"
                  type="text"
                  value={values.password}
                  onChange={handleChange}
                />
                <TextField
                  className="bg"
                  fullWidth
                  label="Phone No"
                  sx={{ mt: 4 }}
                  id="phone"
                  type="text"
                  value={values.phone}
                  onChange={handleChange}
                />
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
