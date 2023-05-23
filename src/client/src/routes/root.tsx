import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="min-h-screen bg-white ">
      <Outlet />
    </div>
  );
}

export default Root;
