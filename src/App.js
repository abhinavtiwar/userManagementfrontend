
import "./App.css";
import { BrowserRouter, Route, Link, Routes, Navigate } from "react-router-dom";
import Main from "./components/main";
import UserLogin from "./components/main/UserLogin";
import UserSignup from "./components/main/UserSignup";
import Home from "./components/main/Home";
import UserProfile from "./components/users/UserProfile";
import UserAuthorisor from "./userAuth";
import Users from "./components/users";
import { useState } from "react";
import { UserProvider } from "./context/userContext";
function App() {
  const [currentStartup, setCurrentStartup] = useState(
    JSON.parse(sessionStorage.getItem("startup"))
  );
  

  const [currentInvestor, setCurrentInvestor] = useState(
    JSON.parse(sessionStorage.getItem("investor"))
  );

  return (
    <div>
      <UserProvider startupUser={currentStartup} investorUser={currentInvestor}>
        <BrowserRouter>
          <Routes>
            <Route element={<Navigate to="/main/home" />} path="/" />
            <Route element={<Main />} path="main">
              <Route path="UserLogin" element={<UserLogin />} />
              <Route path="UserSignup" element={<UserSignup />} />
              <Route path="home" element={<Home />} />
            
            </Route>

            <Route
              element={
                <UserAuthorisor>
                  <Users />
                </UserAuthorisor>
              }
              path="users"
            >
              <Route path="UserProfile" element={<UserProfile />} />
          </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
