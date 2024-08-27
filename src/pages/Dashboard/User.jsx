import { Link, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../../hooks/API";
import DashboardTitle from "../../components/DashboardTitle";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const getSingleUser = (id) => {
  return {
    queryKey: ["singleUser", id],
    queryFn: async () => {
      const {
        data: { user },
      } = await customFetch(`/users/${id}`);
      return user;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params: { userId } }) => {
    try {
      const user = await queryClient.ensureQueryData(getSingleUser(userId));
      return { user };
    } catch (error) {
      return { error: error?.response?.data?.msg };
    }
  };

const User = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const { user } = useLoaderData();
  const {
    name,
    email,
    profilePicture: photo,
    role,
    _id: id,
    bio,
    updatedAt,
    purchasedCourses: pCourses,
    uploadedCourses: uCourses,
  } = user;

  const [value, setValue] = useState(role); // Initialize with the current role
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: editRole } = useMutation({
    mutationFn: async ({ userId, role }) => {
      setIsLoading(true);
      return await customFetch.post(`/users/${userId}/roles`, {
        role,
      });
    },
    onSuccess: () => {
      // Directly update the UI with the new role
      queryClient.invalidateQueries(["singleUser", id]); // Update specific user's data
      queryClient.invalidateQueries(["allUsers"]);
      setIsLoading(false);
      setIsEdit(false); // Exit edit mode
      setValue(role);
      navigate(`/dashboard/users`);
    },
  });

  const handleSave = () => {
    editRole({ userId: id, role: value });
  };

  return (
    <section className="min-h-screen md:px-10 px-2 py-6">
      <DashboardTitle title="User" />
      <div className="cumber mt-10">
        <Link to={"/dashboard"} className="hover:underline">
          Dashboard
        </Link>
        <span>{" / "}</span>
        <Link to={`/dashboard/users`} className="hover:underline">
          Users
        </Link>
      </div>
      <div className="flex flex-col md:flex-row mt-20 bg-BG_Color p-4 rounded-lg gap-8">
        <div className="image flex justify-center mb-6 md:mb-0">
          <img
            src={photo}
            alt={name}
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
        <div className="details space-y-4">
          <UserDetails title={"Name"} name={name} />
          <UserDetails title={"Email"} name={email} />
          <div className="flex items-center gap-4">
            <p>Role</p>
            <select
              name="role"
              id="role"
              value={value}
              disabled={!isEdit}
              onChange={(e) => setValue(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
            <button
              className="bg-Secondary_Color px-4 py-2 rounded-lg text-White_Color font-semibold"
              onClick={() => setIsEdit(!isEdit)}
            >
              Edit
            </button>
            {isEdit && (
              <button
                className="bg-Primary_Color px-4 py-2 rounded-lg text-White_Color font-semibold"
                onClick={handleSave}
                disabled={isLoading} // Disable button while loading
              >
                Save
              </button>
            )}
          </div>
          {isLoading && <p>Updating role...</p>}
          <UserDetails title={"Bio"} name={bio} />
          <UserDetails title={"Date"} name={updatedAt} />
          <UserDetails title={"Purchased Courses"} name={pCourses.length} />
          <UserDetails title={"Uploaded Courses"} name={uCourses.length} />
        </div>
      </div>
    </section>
  );
};

const UserDetails = ({ title, name }) => {
  return (
    <div className="bio flex flex-col md:flex-row gap-2 md:gap-4 items-center">
      <span className="font-semibold md:text-lg text-sm whitespace-nowrap">
        {title} :
      </span>
      <h1 className="text-md md:text-3xl font-bold text-Dark_Gray">{name}</h1>
    </div>
  );
};

export default User;
