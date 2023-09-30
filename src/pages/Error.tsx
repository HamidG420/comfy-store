import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    console.log(error);
    if (error.status === 404) {
      return (
        <main className="min-h-screen grid place-items-center px-8">
          <div className="text-center">
            <p className="text-9xl font-semibold text-primary">404</p>
            <h1 className="text-3xl font-bold mt-4 tracking-tight sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg leading-7">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <div className="mt-10">
              <Link to="/" className="btn btn-secondary">
                Go back home
              </Link>
            </div>
          </div>
        </main>
      );
    }
  }
  return (
    <main className="min-h-screen grid place-items-center px-8">
      <h4 className="font-bold text-4xl text-center ">There was an error</h4>
    </main>
  );
};
export default Error;
