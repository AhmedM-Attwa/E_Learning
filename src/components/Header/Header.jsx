// import { useEffect, useState } from "react";
// import customFetch from "../../hooks/API";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import "./Header.css";
// import { useSelector } from "react-redux";
// //Icons
// import { IoMdArrowDropright } from "react-icons/io";
// import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
// import store from "../../store";
// import { logoutUser } from "../../utils/userReducer";
// import { userGlobalContext } from "../../pages/Sign/UserContext";
// const Header = () => {
//   const [categories, setCategories] = useState([]);
//   const [userDropDown, setUserDropDown] = useState(false);
//   const { user } = useSelector((state) => state.user);
//   const { isMember, setIsMember } = userGlobalContext();
//   const navigate = useNavigate();
//   const Fetching = async () => {
//     try {
//       const {
//         data: { categories },
//       } = await customFetch("/course/structure/category");
//       // const {
//       //   data: { subcategories },
//       // } = await customFetch("/course/structure/subcategory");
//       // const {
//       //   data: { tags },
//       // } = await customFetch("/course/structure/tag");
//       if (categories) {
//         setCategories(categories);
//       }
//     } catch (error) {
//       console.log(error?.response?.data?.msg);
//     }
//   };
//   useEffect(() => {
//     Fetching();
//   }, []);
//   const handleUserDropDown = () => {
//     setUserDropDown(!userDropDown);
//   };
//   const Links = [
//     {
//       path: "/",
//       link: "Home",
//     },
//     {
//       path: "/category",
//       link: "Courses",
//       categories: [...categories],
//     },
//     {
//       path: "/business",
//       link: "Business",
//     },
//     {
//       path: "/newin",
//       link: "New In",
//     },
//   ];
//   return (
//     <header className="flex items-center">
//       <div className="container flex justify-between items-center">
//         <div className="logo">
//           <NavLink to="/" className="text-2xl font-semibold">
//             <span className="font-bold text-3xl text-Secondary_Color">E-</span>
//             Learning
//           </NavLink>
//         </div>
//         <nav className="md:grid hidden gap-4 py-4 relative">
//           <Navbar links={Links} />
//         </nav>
//         <div className="controls md:flex hidden items-center gap-4">
//           {user ? (
//             <div className="user relative">
//               <button
//                 onClick={handleUserDropDown}
//                 className="flex items-center gap-2"
//               >
//                 <div className="userImage w-10">
//                   <img
//                     src={user?.profilePicture}
//                     alt="profilePicture"
//                     className="rounded-full"
//                   />
//                 </div>
//                 <div className="username capitalize font-semibold">
//                   {user?.name}
//                 </div>
//                 <IoMdArrowDropright
//                   className={`${
//                     userDropDown && "rotate-90"
//                   } transition-all duration-150`}
//                 />
//               </button>

import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import customFetch from "../../hooks/API";
import { RiArrowDropDownFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Header.css";
import store from "../../store";
import { logoutUser } from "../../utils/userReducer";
//               {userDropDown && (
//                 <ul className="dropDown absolute top-full mt-5 w-64 bg-BG_Color p-4 rounded-lg gap-2 grid">
//                   {user?.role === "instructor" ||
//                     (user?.role === "student" && (
//                       <li className="p-2 hover:bg-Border_Color grid font-semibold text-sm">
//                         <NavLink to="/profile">Profile</NavLink>
//                       </li>
//                     ))}
//                   {user.role === "instructor" ? (
//                     <li className="p-2 hover:bg-Border_Color grid font-semibold text-sm">
//                       <NavLink to="/instDashboard">Dashboard</NavLink>
//                     </li>
//                   ) : user.role === "admin" ? (
//                     <li className="p-2 hover:bg-Border_Color grid font-semibold text-sm">
//                       <NavLink to="/dashboard">Dashboard</NavLink>
//                     </li>
//                   ) : (
//                     <></>
//                   )}
//                   <li className="p-2 grid">
//                     <button
//                       onClick={() => store.dispatch(logoutUser())}
//                       className="block  px-4 py-2 bg-Secondary_Color font-semibold text-White_Color"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </div>
//           ) : (
//             <>
//               <div className="user"></div>
//               <button
//                 onClick={() => {
//                   setIsMember(true);
//                   navigate("/sign");
//                 }}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => {
//                   setIsMember(false);
//                   navigate("/sign");
//                 }}
//               >
//                 Register
//               </button>
//             </>
//           )}
//           <div className="wishlist">
//             <FaRegHeart className="hover:fill-red-400" />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// const Navbar = ({ links }) => {
//   return (
//     <>
//       <div className="search grid">
//         <div className="input_container relative">
//           <input
//             type="text"
//             placeholder="Search"
//             className="w-full px-4 py-2 outline-none border-Black_Clr border rounded-3xl"
//           />
//           <button className="absolute top-1/2 -translate-y-1/2 right-0 text-White_Color px-4 py-3 bg-Secondary_Color rounded-full">
//             <FaSearch />
//           </button>
//         </div>
//       </div>
//       <div>
//         <Links links={links} />
//       </div>
//     </>
//   );
// };
// const Sidebar = () => {
//   return <></>;
// };
// const Links = ({ links }) => {
//   const location = useLocation();
//   const { pathname, path } = location;
//   useEffect(() => {
//     const acitveLink = links?.findIndex(
//       (link, index) => link.path === pathname
//     );
//   }, [pathname, path]);
//   return (
//     <ul className="flex gap-2">
//       {links?.map((links, index) => {
//         const { path, link, categories } = links;
//         return (
//           <li key={index} className="mainLink relative">
//             <NavLink
//               to={path}
//               className={({ isActive }) =>
//                 `${
//                   isActive && "bg-Secondary_Color text-White_Color"
//                 } text-Black_Clr font-semibold h-[45px] w-[100px] hover:bg-Secondary_Color hover:text-White_Color flex justify-center items-center`
//               }
//             >
//               {link}
//             </NavLink>
//             <ul className="first_dropdown top-full absolute bg-BG_Color">
//               {categories &&
//                 categories?.map((li, i) => {
//                   const { _id: id, name, subcategories } = li;
//                   return (
//                     <li
//                       key={id}
//                       className="relative px-4 py-2 text-nowrap hover:bg-Secondary_Color hover:text-White_Color"
//                     >
//                       <NavLink to={`/category/${id}`} className="text-nowrap">
//                         {name}
//                       </NavLink>
//                       <ul className="second_dropdown bg-BG_Color left-full top-0">
//                         {subcategories &&
//                           subcategories?.map((li, i) => {
//                             const { _id: id, name, tags } = li;

//                             return (
//                               <li
//                                 key={id}
//                                 className="relative px-4 py-2 text-nowrap hover:bg-Secondary_Color hover:text-White_Color text-Black_Clr"
//                               >
//                                 <NavLink to={`/category/${id}`}>{name}</NavLink>
//                                 <ul className="third_dropdown bg-BG_Color left-full top-0">
//                                   {tags &&
//                                     tags?.map((li, i) => {
//                                       const { _id: id, name } = li;

//                                       return (
//                                         <li
//                                           key={id}
//                                           className="px-4 py-2 hover:bg-Secondary_Color hover:text-White_Color text-Black_Clr"
//                                         >
//                                           <NavLink to={`/category/${id}`}>
//                                             {name}
//                                           </NavLink>
//                                         </li>
//                                       );
//                                     })}
//                                 </ul>
//                               </li>
//                             );
//                           })}
//                       </ul>
//                     </li>
//                   );
//                 })}
//             </ul>
//           </li>
//         );
//       })}
//     </ul>
//   );
// };
// export default Header;

const Header = () => {
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => state.user);
  const getCategories = async () => {
    const {
      data: { categories },
    } = await customFetch("/course/structure/category");
    setCategories(categories);
  };
  useEffect(() => {
    getCategories();
  }, []);
  const Links = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/category",
      name: "Courses",
      icon: <RiArrowDropDownFill />,
      categories: [...categories],
    },
  ];
  return (
    <header>
      <Navbar user={user} links={Links} />
      <Sidebar user={user} links={Links} />
    </header>
  );
};
const Navbar = ({ user, links }) => {
  const [userDropDown, setUserDropDown] = useState(false);
  const [linksDropDown, setLinksDropDown] = useState(false);

  return (
    <div className=" py-2 grid gap-2">
      <nav className="hidden md:flex ">
        <div className="container flex justify-between items-center">
          <div className="logo">
            <NavLink to="/" className={"text-2xl font-semibold"}>
              <span className="font-bold text-3xl text-Secondary_Color">
                E-
              </span>
              Learning
            </NavLink>
          </div>
          <div className="searchBar max-w-4xl w-full">
            <div className="inputField w-full relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 outline-none border-Border_Color border shadow-lg rounded-lg focus:border-Primary_Color"
              />
              <button className="bg-Secondary_Color text-White_Color py-3 px-6 rounded-r-lg absolute right-0 top-1/2 -translate-y-1/2">
                <FaSearch />
              </button>
            </div>
          </div>
          {user && (
            <div className="userProfile relative">
              <button onClick={() => setUserDropDown(!userDropDown)}>
                <div className="user flex items-center gap-2">
                  <div className="image w-10 h-10">
                    <img
                      src={user?.profilePicture}
                      alt={user?.name}
                      className=" rounded-full"
                    />
                  </div>
                  <div className="username">
                    <p className="capitalize font-semibold">{user?.name}</p>
                  </div>
                  <RiArrowDropDownFill />
                </div>
              </button>
              {userDropDown && (
                <div
                  className={`dropDown absolute top-full bg-BG_Color overflow-hidden transition-all duration-150 max-h-0 ${
                    userDropDown && "max-h-[100vh] p-4 z-10"
                  } `}
                >
                  <ul className="grid gap-2">
                    {user?.role === "instructor" ||
                      (user?.role === "student" && (
                        <li className="hover:text-White_Color hover:bg-Secondary_Color px-4 py-2">
                          <NavLink to="/profile">Profile</NavLink>
                        </li>
                      ))}
                    {user?.role === "admin" || user?.role === "instructor" ? (
                      <li className="hover:bg-Secondary_Color hover:text-White_Color px-4 py-2">
                        <NavLink
                          to={
                            user?.role === "admin"
                              ? "/dashboard"
                              : "/instDashboard"
                          }
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    ) : null}
                    <li className="grid">
                      <button
                        onClick={() => {
                          store.dispatch(logoutUser());
                        }}
                        className="text-White_Color bg-Secondary_Color px-4 py-2"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
      <nav className="flex justify-center ">
        <div className="container flex justify-center">
          <div className="linksList relative flex-1 flex  justify-center">
            <ul className=" flex mainList">
              {links?.map((link, index) => {
                const { path, name, categories, icon } = link;
                return (
                  <li key={index} className="mainLi ">
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        `h-[42px] flex items-center justify-center w-[100px] hover:bg-Secondary_Color font-semibold text-[16px] hover:text-White_Color ${
                          isActive && `bg-Secondary_Color text-White_Color`
                        }`
                      }
                    >
                      {name}
                      {icon}
                    </NavLink>
                    {/* {categories && (
                      <ul className="absolute left-0 top-full w-full secondList bg-BG_Color">
                        {categories.map((li, i) => {
                          const { _id: id, name, subcategories } = li;
                          return (
                            <li key={i} className="secondLi relative p-4 whitespace-nowrap w-[30%] ">
                              <NavLink to={`/category/${id}`}>{name}</NavLink>
                              {subcategories && (
                                <ul className="thirdList bg-BG_Color w-full">
                                  {subcategories.map((li, i) => {
                                    const { _id: id, name, tags } = li;
                                    return (
                                      <li key={i} className="thirdLi relative p-4 whitespace-nowrap w-[50%]">
                                        <NavLink to={`/category/${id}`}>
                                          {name}
                                        </NavLink>
                                        {tags && (
                                          <ul className="fourthList bg-BG_Color">
                                            {tags.map((li, i) => {
                                              const { _id: id, name } = li;
                                              return (
                                                <li
                                                  key={i}
                                                  className="fourthLi p-4 whitespace-nowrap"
                                                >
                                                  <NavLink
                                                    to={`/category/${id}`}
                                                  >
                                                    {name}
                                                  </NavLink>
                                                </li>
                                              );
                                            })}
                                          </ul>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )} */}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
const Sidebar = ({ links }) => {
  return (
    <nav className="md:hidden flex">
      <div className="container">
        <h1>Sidebar</h1>
      </div>
    </nav>
  );
};
export default Header;
