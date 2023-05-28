import { Link, useNavigate } from "react-router-dom";
import indexImgSrc from "@/assets/index.webp";
import { API_URL } from "@/constants";

/**
 * Главная странина, ничего сложного, картинка и 2 кнопки
 */
function Index() {
  return (
    <div className={`flex flex-col flex-1 items-center justify-center gap-4`}>
      <img src={indexImgSrc} alt="" className="flex-1" />
      <div className="absolute z-10 max-w-3xl text-white top-60 left-32 max-xl:top-40 max-xl:left-16 max-md:max-w-sm max-sm:mt-8 max-md:top-28 max-sm:left-3 max-sm:top-14">
        <h2 className="text-6xl font-bold max-md:text-3xl ">
          Инвестиции в Москву - вклад в будущее России
        </h2>
        <div className="flex gap-5 mt-8 max-sm:mt-2 ">
          <Link
            to={"calculator/new"}
            className="flex items-center justify-center px-8 py-3 text-white border-[3px] border-blue-500 bg-blue-500 h-fit rounded-xl max-sm:py-2 max-sm:px-4 "
          >
            Калькулятор
          </Link>
          <Link
            to={"auth/signup"}
            className="px-8 flex items-center justify-center py-3 h-fit text-white border-[3px] border-white rounded-xl max-sm:py-2 max-sm:px-4 "
          >
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Index;
