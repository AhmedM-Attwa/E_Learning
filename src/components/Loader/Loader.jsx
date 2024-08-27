import "./Loader.css";
const Loader = () => {
  return (
    <section className="min-h-screen fixed left-0 top-0 w-full bg-Black_Clr flex justify-center items-center">
     <div className="loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default Loader;
