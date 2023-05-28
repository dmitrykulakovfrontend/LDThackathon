import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Root from "./root";
/**
 * Страница ошибки, отображается в случае не найденного маршрута или ошибкой во времени запроса
 */
function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    return (
      <Root>
        <div className="flex min-h-[calc(100vh-101px)] items-center justify-center">
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-2xl font-bold">
              {error.status} {error.statusText}
            </h1>
            {error.data?.message && (
              <p className="font-bold">{error.data.message}</p>
            )}
          </div>
        </div>
      </Root>
    );
  } else {
    return (
      <Root>
        <div className="flex min-h-[calc(100vh-101px)] items-center justify-center">
          <div className="flex flex-col items-center justify-center flex-1">
            <h1 className="text-2xl font-bold">
              Произошла непредвиденная ошибка
            </h1>
          </div>
        </div>
      </Root>
    );
  }
}

export default ErrorPage;
