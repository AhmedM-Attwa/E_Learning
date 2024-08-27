// import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RiLogoutBoxFill } from "react-icons/ri";
// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaBookOpen,
//   FaPlus,
//   FaShoppingCart,
//   FaUser,
// } from "react-icons/fa";
// import { IoSettingsSharp } from "react-icons/io5";

import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import {
  CiGrid42,
  CiSettings,
  CiShoppingCart,
  CiUser,
  CiYoutube,
} from "react-icons/ci";
import { FaBars, FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import store from "../../store";
import { logoutUser } from "../../utils/userReducer";
import { userGlobalContext } from "../Sign/UserContext";
import { LuBookPlus } from "react-icons/lu";
import { TbCategoryPlus } from "react-icons/tb";
import { Loader } from "../../components";

// import { IoMdArrowDropdown } from "react-icons/io";
// import { SiStatista } from "react-icons/si";
// import store from "../../store";
// import { logoutUser } from "../../utils/userReducer";
// import { useState } from "react";

// const Dashboard = () => {
//   const { user } = useSelector((state) => state.user);
//   return (
//     <>
//       <SideBar user={user} />
//       <section className="h-screen ml-24">
//         <Outlet />
//       </section>
//     </>
//   );
// };
// const SideBar = ({ user }) => {
//   const [dropDown, setDropDown] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   if (isSidebarOpen) {
//     document.body.style.overflow = "hidden";
//   }else {
//     document.body.style.overflow = "auto";
//   }
//   const Links = [
//     {
//       linkIcon: <SiStatista />,
//       path: "/dashboard",
//       name: "Statistics",
//     },
//     {
//       linkIcon: <FaUser />,
//       path: "/dashboard/users",
//       name: "Users",
//     },
//     {
//       linkIcon: <FaShoppingCart />,
//       path: "/dashboard/orders",
//       name: "Orders",
//     },
//     {
//       linkIcon: <FaBookOpen />,
//       path: "/dashboard/courses",
//       name: "Courses",
//     },
//     {
//       linkIcon: <IoSettingsSharp />,
//       name: "Options",
//       icon: <IoMdArrowDropdown />,
//       links: [
//         {
//           linkIcon: <FaPlus />,
//           path: "/dashboard/addCourse",
//           name: "Add Course",
//         },
//       ],
//     },
//   ];

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     store.dispatch(logoutUser());
//     setTimeout(() => {
//       navigate("/");
//     }, 3000);
//   };

//   return (
//     <aside
//       className={`${
//         isSidebarOpen ? "w-64" : "w-20"
//       } flex flex-col justify-between items-center fixed h-full top-0 bg-Dark_Gray left-0 p-4 transition-all duration-150`}
//     >
//       <div className="upperPart flex gap-4 items-center justify-between w-full">
//         <div className="flex items-center gap-4">
//           {isSidebarOpen && (
//             <>
//               <div className="image w-10 h-10 ">
//                 <img
//                   src={user?.profilePicture}
//                   alt="user"
//                   className="rounded-full"
//                 />
//               </div>
//               <div className="title flex-1">
//                 <h1 className="capitalize text-White_Color font-bold">
//                   {user?.name}
//                 </h1>
//               </div>
//             </>
//           )}
//         </div>
//         <div className="arrow text-White_Color">
//           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//             {isSidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
//           </button>
//         </div>
//       </div>

//       <div className="middlePart flex-1 flex items-center justify-center w-full">
//         <div className="list w-full">
//           <ul className="grid gap-4">
//             {Links?.map((link, index) => {
//               const { path, name, links, icon: ArrowIcon, linkIcon } = link;
//               if (name === "Options") {
//                 return (
//                   <li
//                     key={index}
//                     className="p-2 text-White_Color font-semibold"
//                   >
//                     <div
//                       className="flex items-center gap-2 cursor-pointer"
//                       onClick={() => setDropDown(!dropDown)}
//                     >
//                       <span>{linkIcon}</span>
//                       {isSidebarOpen && (
//                         <>
//                           <span>{name}</span>
//                         </>
//                       )}
//                       <span>{ArrowIcon}</span>
//                     </div>
//                     {links && (
//                       <ul
//                         className={`grid gap-4 max-h-0 overflow-hidden transition-all duration-150 ${
//                           dropDown && "max-h-[100vh] mt-4"
//                         }`}
//                       >
//                         {links?.map((li, i) => {
//                           const { path, name, linkIcon: liIcon } = li;

//                           return (
//                             <li key={i} className={`grid`}>
//                               <NavLink
//                                 to={path}
//                                 className={({ isActive }) =>
//                                   `${
//                                     isActive
//                                       ? "bg-Accent_Color text-Black_Clr"
//                                       : "text-White_Color"
//                                   } font-semibold flex items-center gap-2 p-2`
//                                 }
//                               >
//                                 <span>{liIcon}</span>
//                                 {isSidebarOpen && <span>{name}</span>}
//                               </NavLink>
//                             </li>
//                           );
//                         })}
//                       </ul>
//                     )}
//                   </li>
//                 );
//               }
//               return (
//                 <li key={index} className="flex">
//                   <NavLink
//                     to={path}
//                     className={({ isActive }) =>
//                       `${
//                         isActive
//                           ? "bg-Accent_Color text-Black_Clr"
//                           : "text-White_Color"
//                       } font-semibold w-full p-2 flex items-center gap-2`
//                     }
//                   >
//                     <span>{linkIcon}</span>
//                     {isSidebarOpen && <span>{name}</span>}
//                   </NavLink>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>

//       <div className="lowerPart">
//         <div className="logoutButton">
//           <button
//             className="flex items-center group gap-2 px-4 py-2 bg-Accent_Color rounded-lg font-semibold justify-center"
//             onClick={handleLogout}
//           >
//             <div className="icon">
//               <RiLogoutBoxFill size={24} />
//             </div>
//             <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-500">
//               Logout
//             </span>
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// };
// export default Dashboard;

const Dashboard = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <section className="min-h-screen bg-Border_Color p-4 flex">
      <AsideBar />
      <main className="main bg-White_Color p-4 flex-1 rounded-2xl">
        {
          isLoading ? <Loader /> : <Outlet />
        }
      </main>
    </section>
  );
};
const AsideBar = () => {
  const [settingDropDown, setSettingDropDown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { setIsMember } = userGlobalContext();

  const Links = [
    {
      path: "/dashboard",
      icon: <CiGrid42 size={24} />,
      name: "Dashboard",
    },
    {
      path: "/dashboard/allCourses",
      icon: <CiYoutube size={24} />,
      name: "Courses",
    },
    {
      path: "/dashboard/users",
      icon: <CiUser size={24} />,
      name: "Community",
    },
    {
      path: "/dashboard/orders",
      icon: <CiShoppingCart size={24} />,
      name: "Orders",
    },
    {
      icon: <CiSettings size={24} />,
      name: "Settings",
      links: [
        {
          path: "/dashboard/addCourse",
          name: "Add Course",
          linkIcon: <LuBookPlus size={16} />,
        },
        {
          path: "/dashboard/addCategory",
          name: "Add Category",
          linkIcon: <TbCategoryPlus size={16} />,
        },
        {
          path: "/dashboard/addSubCategory",
          name: "Add SubCategory",
          linkIcon: <FaPlusCircle size={16} />,
        },
        {
          path: "/dashboard/addTag",
          name: "Add Tag",
          linkIcon: <FaPlusCircle size={16} />,
        },
      ],
    },
  ];
  const handleLogout = () => {
    store.dispatch(logoutUser());
    setTimeout(() => {
      navigate("/sign");
      setIsMember(true);
    }, 3000);
  };
  const { pathname } = useLocation();
  return (
    <aside
      className={` relative ${
        isSidebarOpen ? "w-64" : "w-14"
      } flex flex-col justify-between items-center transition-all duration-150`}
    >
      <div className="openTheBar flex justify-start w-full px-4 py-2">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="openSidebarBtn"
        >
          <FaBars size={24} />
        </button>
      </div>
      <div className="logo flex w-full px-4 py-2">
        <NavLink to={"/dashboard"} className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBook} size="2x" color="#007BFF" />
          {isSidebarOpen && <h3 className="font-bold text-xl">Education</h3>}
        </NavLink>
      </div>
      <div className="Links flex-1 mt-10 w-full">
        <ul className="grid gap-4">
          {Links?.map((link, index) => {
            const { name, path, icon, links } = link;
            if (name === "Settings") {
              return (
                <li key={index} className="grid font-semibold text-md">
                  <button
                    onClick={() => setSettingDropDown(!settingDropDown)}
                    className="flex gap-4 items-center hover:bg-White_Color hover:text-Black_Clr rounded-tl-lg  rounded-bl-lg py-2 px-4 text-sm"
                  >
                    <span className="icon">{icon}</span>
                    {isSidebarOpen && <span className="name">{name}</span>}
                  </button>
                  <ul
                    className={`mt-5 max-h-0 overflow-hidden ${
                      settingDropDown && "max-h-[100vh]"
                    } transition-all duration-150`}
                  >
                    {links?.map((link, index) => {
                      const { name, path, linkIcon } = link;
                      return (
                        <li key={index} className="grid ">
                          <NavLink
                            to={path}
                            className={`${
                              pathname === path &&
                              "bg-White_Color text-Black_Clr"
                            } flex gap-4 items-center px-4 py-2 rounded-tl-lg  rounded-bl-lg font-semibold text-xs`}
                          >
                            <span className="icon">{linkIcon}</span>
                            {isSidebarOpen && (
                              <span className="name">{name}</span>
                            )}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            }
            return (
              <li key={index} className="grid font-semibold text-md">
                <NavLink
                  to={path}
                  className={`${
                    pathname === path && "bg-White_Color text-Black_Clr"
                  } flex gap-4 items-center px-4 py-2 rounded-tl-lg  rounded-bl-lg font-semibold text-sm`}
                >
                  <span className="icon">{icon}</span>
                  {isSidebarOpen && <span className="name">{name}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="logout grid w-full px-4 py-2 ">
        <button className="flex items-center gap-4" onClick={handleLogout}>
          <div className="icon">
            <IoIosLogOut size={24} />
          </div>
          {isSidebarOpen && (
            <span className="font-semibold text-md">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};
export default Dashboard;
