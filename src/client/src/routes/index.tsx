import { Link } from "react-router-dom";

function Index() {
  return (
    <div className="min-h-screen flex items-center gap-4 flex-col justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Link
        to={"/auth/signin"}
        className="text-blue-600 hover:text-blue-700 py-2 px-4 border shadow-inner rounded-xl"
      >
        Login
      </Link>
      <Link
        to={"/auth/signup"}
        className="text-blue-600 hover:text-blue-700 py-2 px-4 border shadow-inner rounded-xl"
      >
        Sign Up
      </Link>
    </div>
  );
}

export default Index;
