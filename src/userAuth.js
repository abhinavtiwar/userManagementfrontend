import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const StartupAuthorisor = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem("startup"))
      );
      console.log(currentUser);

      if (currentUser === null) {
        Swal.fire({ 
          icon: "info",
          title: "OOops!!",
          text: "You need to be logged in",
        });
        return <Navigate to="/main/UserLogin" />;
      }

      return children;
}

export default StartupAuthorisor;