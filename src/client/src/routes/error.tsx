function ErrorPage() {
  return (
    <div className={` font-exo2 text-black bg-gray-100 min-h-screen`}>
      <div className="flex">
        <div className="flex flex-col items-center justify-center flex-1 min-h-screen">
          <h1 className="text-2xl font-bold">404 not found or error</h1>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
