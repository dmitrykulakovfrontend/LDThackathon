import Root from "./root";
function ErrorPage() {
  return (
    <Root>
      <div className="flex min-h-[calc(100vh-101px)] items-center justify-center">
        <div className="flex flex-col items-center justify-center flex-1">
          <h1 className="text-2xl font-bold">404 Страница не найдена</h1>
        </div>
      </div>
    </Root>
  );
}

export default ErrorPage;
