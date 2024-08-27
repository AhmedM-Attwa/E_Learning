import { Outlet, useNavigation } from "react-router-dom";
import { Footer, Header, Loader } from "../components";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      {isLoading ? <Loader /> : <Outlet />}
      <Footer />
    </>
  );
};

export default HomeLayout;
