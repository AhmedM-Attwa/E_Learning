import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AddCategory,
  AddSubCategory,
  AddTag,
  AllOrders,
  Cancel,
  Courses,
  Dashboard,
  Error,
  Home,
  HomeLayout,
  InstDashboard,
  Profile,
  Sign,
  Statistics,
  Success,
  User,
  Users,
  ViewCourseReviews,
} from "./pages";
import {
  UpdateUserInfo,
  UpdateUserPassword,
  UserInformation,
  UserOrders,
  UserViewOrder,
  AllCourses,
  ViewCourseInfo,
  CoursesCategory,
  CoursesSubCategory,
  UpdateCourse,
  CreateCourse,
  ViewUserProfile,
} from "./components";
import ProtectedRoute from "./hooks/ProtectedRoute";

//Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//Loaders
import { loader as SignLoader } from "./pages/Sign/Sign";
import { loader as HomeLoader } from "./pages/Home/Home";
import { loader as GetAllUsers } from "./pages/Dashboard/Users";
import { loader as GetUserLoader } from "./pages/Dashboard/User";
import { loader as GetAllCourses } from "./components/Courses/AllCourses";
import { loader as CreateCourseLoader } from "./components/Courses/CreateCourse";
// Actions

//Store
import store from "./store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,

      refetchOnWindowFocus: false,
    },
  },
});
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
        loader: HomeLoader(queryClient), // Ensure queryClient is passed correctly
      },
      {
        path: "category",
        element: <AllCourses />,
      },
      {
        path: "category/:categoryId",
        element: <CoursesCategory />,
      },
      {
        path: "category/:categoryId/subcategory",
        element: <CoursesSubCategory />,
      },
      {
        path: "category/:categoryId/subcategory/:courseId",
        element: <ViewCourseInfo />,
      },
    ],
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
  },

  {
    path: "/sign",
    element: <Sign />,
    errorElement: <Error />,
    loader: SignLoader(store),
  },
  // {
  //   path: "/dashboard",
  //   element: (
  //     <ProtectedRoute role={"admin"}>
  //       <Dashboard />
  //     </ProtectedRoute>
  //   ),
  //   errorElement: <Error />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Statistics />,
  //       errorElement: <Error />,
  //     },
  //     {
  //       path: "orders",
  //       element: <AllOrders />,
  //     },
  //     {
  //       path: "courses",
  //       element: <Courses />,
  //       errorElement: <Error />,
  //       children: [
  //         {
  //           index: true,
  //           element: <AllCourses />,
  //         },
  //         {
  //           path: "allCourses/:courseId",
  //           element: <ViewCourseInfo />,
  //           errorElement: <Error />,
  //         },
  //         {
  //           path: "create",
  //           element: <CreateCourse />,
  //           errorElement: <Error />,
  //         },
  //       ],
  //     },
  //     {
  //       path: "users",
  //       element: <Users />,
  //       errorElement: <Error />,
  //       children: [
  //         {
  //           path: ":userId",
  //           element: <User />,
  //           errorElement: <Error />,
  //         },
  //         {
  //           path: ":userId/orders",
  //           element: <UserOrders />,
  //           errorElement: <Error />,
  //         },
  //         {
  //           path: ":userId/orders/:orderId",
  //           element: <UserViewOrder />,
  //           errorElement: <Error />,
  //         },
  //         {
  //           path: ":userId/role",
  //           element: <UpdateUserRole />,
  //           errorElement: <Error />,
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute role={"admin"}>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "orders",
        element: <AllOrders />,
      },
      {
        path: "users",
        element: <Users />,
        errorElement: <Error />,
        loader: GetAllUsers(queryClient),
      },
      {
        path: ":userId",
        element: <User />,
        errorElement: <Error />,
        loader: GetUserLoader(queryClient),
      },
      {
        path: ":userId/orders",
        element: <UserOrders />,
      },
      {
        path: ":userId/orders/:orderId",
        element: <UserViewOrder />,
      },
      // {
      //   path: "courses",
      //   element: <Courses />,
      //   errorElement: <Error />,
      //   children: [],
      // },
      {
        path: "allCourses",
        element: <AllCourses />,
        errorElement: <Error />,
        loader: GetAllCourses(queryClient),
      },
      {
        path: "allCourses/:courseId",
        element: <ViewCourseInfo />,
        errorElement: <Error />,
      },
      {
        path: "addCourse",
        element: <CreateCourse />,
        errorElement: <Error />,
        loader: CreateCourseLoader(queryClient),
      },
      {
        path: "addCategory",
        element: <AddCategory />,
      },
      {
        path: "addSubCategory",
        element: <AddSubCategory />,
      },
      {
        path: "addTag",
        element: <AddTag />,
      },
      {
        path: "updateCourse/:courseId",
        element: <UpdateCourse />,
      },
    ],
  },
  {
    path: "/:userId/viewProfile",
    element: <ViewUserProfile />,
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <UserInformation />,
      },
      {
        path: "updateUserInfo",
        element: <UpdateUserInfo />,
      },
      {
        path: "updateUserPassword",
        element: <UpdateUserPassword />,
      },
      {
        path: ":userId/orders",
        element: <UserOrders />,
        errorElement: <Error />,
      },
      {
        path: ":userId/orders/:orderId",
        element: <UserViewOrder />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/instDashboard",
    element: (
      <ProtectedRoute role={"instructor"}>
        <InstDashboard />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <UserInformation />,
      },
      {
        path: "updateUserInfo",
        element: <UpdateUserInfo />,
      },
      {
        path: "updateUserPassword",
        element: <UpdateUserPassword />,
      },
      {
        path: ":userId/orders",
        element: <UserOrders />,
        errorElement: <Error />,
      },
      {
        path: ":userId/orders/:orderId",
        element: <UserViewOrder />,
        errorElement: <Error />,
      },
      {
        path: "courses",
        element: <Courses />,
        children: [
          {
            index: true,
            element: <AllCourses />,
          },
          {
            path: ":courseId",
            element: <ViewCourseInfo />,
          },
          {
            path: ":courseId/reviews",
            element: <ViewCourseReviews />,
          },
          {
            path: "createCourse",
            element: <CreateCourse />,
            errorElement: <Error />,
            loader: CreateCourseLoader(queryClient),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
