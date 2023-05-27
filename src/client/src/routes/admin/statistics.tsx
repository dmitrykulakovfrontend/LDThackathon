import { useAuth } from "@/contexts/useAuth";
import React from "react";
import { useNavigate } from "react-router-dom";

function Statistics() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user?.role.includes("ROLE_ADMIN")) {
    navigate("/auth/signin");
  }
  return <div>Statistics</div>;
}

export default Statistics;
