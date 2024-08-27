import { Link, useLoaderData } from "react-router-dom";
import customFetch from "../../hooks/API";
import DashboardTitle from "../../components/DashboardTitle";
const getAllUsers = {
  queryKey: ["allUsers"],
  queryFn: async () => {
    const {
      data: { users },
    } = await customFetch("/users");
    return users;
  },
};
export const loader = (queryClient) => async () => {
  try {
    const users = await queryClient.ensureQueryData(getAllUsers);
    return { users };
  } catch (error) {
    return { error: error?.response?.data?.msg };
  }
};

const Users = () => {
  const { users } = useLoaderData();

  return (
    <section className="min-h-screen px-10 py-6">
      <DashboardTitle title="Users" />
      <div className="mb-4">
        <p className="text-lg font-semibold">{users?.length} Users</p>
      </div>
      <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {users?.map((user) => {
          const { name, email, profilePicture: photo, role, _id: id } = user;
          return (
            <Link
              to={`/dashboard/${id}`}
              key={id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-4">
                  <img
                    src={photo}
                    alt={name}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-1">{name}</h3>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Email:</span>{" "}
                    {email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Role:</span>{" "}
                    {role}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default Users;
