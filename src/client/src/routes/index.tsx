import { Link, useNavigate } from "react-router-dom";
import indexImgSrc from "@/assets/index.webp";
import { API_URL } from "@/constants";

function Index() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const res = await fetch(`${API_URL}/auth/logout`);
      if (res.ok) {
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      window.location.reload();
    }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-12 sm:px-6 lg:px-8 max-sm:py-2">
      <img
        src={indexImgSrc}
        alt=""
        className="absolute left-0 w-screen top-28 max-sm:hidden max-md:top-10"
      />
      <div className="absolute z-10 max-w-3xl text-white max-sm:static top-60 left-32 max-xl:top-32 max-xl:left-16 max-md:max-w-sm max-sm:mt-8 max-md:top-16">
        <h2 className="text-6xl font-bold max-md:text-3xl max-sm:text-black max-sm:text-center">
          С нами инвестировать всегда выгодно
        </h2>
        <div className="flex gap-5 mt-8 max-sm:mt-2 max-sm:justify-center">
          <Link
            to={"calculator/new"}
            className="flex items-center justify-center px-8 py-3 text-white border-[3px] border-blue-500 bg-blue-500 h-fit rounded-xl max-sm:py-2 max-sm:px-4 "
          >
            Калькулятор
          </Link>
          <Link
            to={"auth/signup"}
            className="px-8 flex max-sm:text-black  max-sm:border-black items-center justify-center py-3 h-fit text-white border-[3px] border-white rounded-xl max-sm:py-2 max-sm:px-4 "
          >
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
