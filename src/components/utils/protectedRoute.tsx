// import { Navigate } from "react-router-dom";
// import type { ReactNode } from "react";
// import {  logout, userCurrentToken, userCurrentUser } from "../../redux/fetures/auth/authSlice";
// import { useAppDispatch, useApppSelector } from "../../redux/middlwere/hooks";
// import { verify } from "crypto";

// type Props = {
//   children: ReactNode;
// };


// const ProtectedRoute = ({ children, role }: Props & { role: string }, ) => {

//   const User=useApppSelector(userCurrentUser)
//   const dispatch=useAppDispatch()
  
//      const token=useApppSelector(userCurrentToken)

//      if(token){

//      const user= verify(token)

//       console.log(user)
//      }



//      if(role !== undefined && role !== User?.role){
//       dispatch(logout())
//         return <Navigate to="/login" replace />;
//      }


//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
    

// }

// export default ProtectedRoute


import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

import { userCurrentToken } from "../../redux/fetures/auth/authSlice";
import { useApppSelector } from "../../redux/middlwere/hooks";

type TRole = "admin" | "faculty" | "student";

type TUser = {
  userId: string;
  userRole: TRole;
  iat?: number;
  exp?: number;
};

type Props = {
  children: ReactNode;
  role?: TRole;
};

const ProtectedRoute = ({ children, role }: Props) => {

  // ✅ Redux Token
  const reduxToken = useApppSelector(userCurrentToken);

  // ✅ Redux না থাকলে localStorage
  const token = reduxToken || localStorage.getItem("token");

  // ❌ Token নাই
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user: TUser;

  try {
    // ✅ Decode JWT
    user = jwtDecode<TUser>(token);

    console.log("Decoded User:", user);

  } catch (error) {
    console.log(error);

    return <Navigate to="/login" replace />;
  }

  // ❌ Role Match না
  if (role && user.userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Access
  return <>{children}</>;
};

export default ProtectedRoute;