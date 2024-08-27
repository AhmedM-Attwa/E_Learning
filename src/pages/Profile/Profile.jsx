import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};
const Sidebar = () => {
  return <h1>SideBar</h1>;
};
export default Profile;
