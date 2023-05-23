import { Link } from "react-router-dom";

function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
      <Link
        to={"/auth/signin"}
        className="px-4 py-2 text-blue-600 border shadow-inner hover:text-blue-700 rounded-xl"
      >
        Авторизация
      </Link>
      <Link
        to={"/auth/signup"}
        className="px-4 py-2 text-blue-600 border shadow-inner hover:text-blue-700 rounded-xl"
      >
        Регистрация
      </Link>
    </div>
  );
}

export default Index;
