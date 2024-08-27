import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import customFetch from "../../hooks/API";
import store from "../../store";
import { getUser } from "../../utils/userReducer";
import { userGlobalContext } from "./UserContext";
export const loader =store =>() => {
const {user} = store.getState().user;
  if (user) {
    return redirect("/")
  }
  return null
}

const Sign = () => {
  const navigate = useNavigate();
  const {isMember, setIsMember} = userGlobalContext();
  const [image, setImage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create a FormData object to hold the form data
    const formData = new FormData(e.target);

    try {
      // Check if the user is a member and decide the endpoint
      const endpoint = isMember ? "/auth/login" : "/auth/register";

      // Send a POST request to the respective endpoint with the form data
      await customFetch.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
        },
      });
      if (isMember) {
        store.dispatch(getUser());
        navigate("/");
      } else {
        setIsMember(true);
      }
      // Navigate to the home page upon successful submission
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const files = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files);
  };

  return (

    <section className="h-screen flex items-center justify-center bg-BG_Color">
      <div className="container max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="form_container">
          <Form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-bold text-center mb-6">
              {isMember ? "Login" : "Register"}
            </h1>
            <div className="form space-y-4">
              {!isMember && (
                <div className="input_Group">
                  <input
                    type="text"
                    placeholder="Username"
                    name="name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-Primary_Color"
                    required
                  />
                </div>
              )}
              <div className="input_Group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-Primary_Color"
                  required
                />
              </div>
              <div className="input_Group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-Primary_Color"
                  required
                />
              </div>
              {!isMember && (
                <>
                  <div className="input_Group">
                    <input
                      type="text"
                      name="bio"
                      placeholder="Type your bio"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-Primary_Color"
                    />
                  </div>
                  <div className="input_Group">
                    <input
                      type="file"
                      name="profilePicture"
                      className="file-input hidden"
                      id="fileInput"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer px-4 py-2 bg-Primary_Color text-White_Color rounded-lg shadow hover:bg-Hover_Color transition duration-300 inline-flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Upload Profile Picture
                    </label>
                  </div>
                  {image && (
                    <img
                      src={image}
                      alt="Profile Picture"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  )}
                </>
              )}
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-Primary_Color text-White_Color py-2 rounded-lg hover:bg-Hover_Color transition duration-300"
            >
              {isMember ? "Login" : "Register"}
            </button>
            <p className="text-center mt-4">
              {isMember ? "Not a member?" : "Already a member?"}{" "}
              <span
                onClick={() => setIsMember(!isMember)}
                className="text-Primary_Color cursor-pointer hover:underline"
              >
                {isMember ? "Register" : "Login"}
              </span>
            </p>
            <div className="return flex justify-center my-4">
              <button className=" group font-semibold">
              <Link to={"/"} className="flex items-center gap-2">
                <FaArrowLeft className="transition-all duration-150 group-hover:-translate-x-1/2"/>
                Back Home</Link>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </section>

  );
};

export default Sign;
