import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { userCurrentToken } from "../../redux/fetures/auth/authSlice";
import { useApppSelector } from "../../redux/middlwere/hooks";

type Props = {
  children: ReactNode;
};


const ProtectedRoute = ({ children }: Props) => {
  
     const token=useApppSelector(userCurrentToken)


  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
    

}

export default ProtectedRoute