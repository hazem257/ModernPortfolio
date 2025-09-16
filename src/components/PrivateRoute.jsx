import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // لو مش لوج إن → ميعرضش أي حاجة (ممكن تعمل Loading هنا لو حابب)
  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default PrivateRoute;
