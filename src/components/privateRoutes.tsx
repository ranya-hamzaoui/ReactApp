import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

interface Props {
  children: React.ReactNode;
  roles: string[];
}

function PrivateRoute({ children, roles }: Props) {
  const navigate = useNavigate();
  const { isConnected, user } = useAppSelector((state) => state.auth) as any;
 
  const auth = isConnected;
  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
    // if (!roles.includes(user?.role)) {
    //   navigate("/no_access");
    // }
  }, [navigate]);

  return children;
}

export default PrivateRoute;