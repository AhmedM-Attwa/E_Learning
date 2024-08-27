import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <section className="h-screen flex flex-col justify-center items-center gap-16 bg-Black_Clr">
      {/* Gradient Text Effect */}
      <div className="bg-gradient-to-r from-Black_Clr via-Border_Color to-Black_Clr bg-clip-text">
        <h1 className="lg:text-[20rem] md:text-[16rem] text-7xl font-bold text-transparent">
          Oops!
        </h1>
      </div>

      {/* Error Code Display */}
      <p className="text-center font-bold lg:text-[10rem] md:text-[8rem] text-5xl text-Border_Color opacity-75">
        Error {error.status || "404"}
      </p>

      {/* Error Message */}
      <p className="text-center font-semibold text-Border_Color opacity-75 lg:text-[7rem] md:text-[5rem] text-3xl">
        {error.statusText || "Page Not Found"}
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="bg-gradient-to-r from-Border_Color text-Black_Clr to-Border_Color px-8 py-4 rounded-lg font-semibold  hover:bg-gradient-to-l hover:from-Black_Clr hover:via-Border_Color hover:to-Black_Clr hover:text-White_Color transition-all duration-300"
      >
        Back To Home
      </Link>
    </section>
  );
};

export default Error;
