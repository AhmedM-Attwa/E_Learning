import { Form, Link, useLoaderData } from "react-router-dom";
import DashboardTitle from "../DashboardTitle";
import { useState } from "react";
import customFetch from "../../hooks/API";

const getAllCategories = {
  queryKey: ["allCategories"],
  queryFn: async () => {
    const {
      data: { categories },
    } = await customFetch("/course/structure/category");
    return categories;
  },
};

export const loader = (queryClient) => async () => {
  const categories = await queryClient.ensureQueryData(getAllCategories);
  return { categories: categories }; // Ensure categories is always an array
};

const CreateCourse = () => {
  const { categories } = useLoaderData(); // Ensure categories is always an array
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: [],
    isPaid: false,
    featured: false,
    category: [],
    price: 1,
    image: null,
  });
  const [requirements, setRequirements] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await customFetch.post("/course/management/courses", formData);

    // Reset formData after submission
    setFormData({
      title: "",
      description: "",
      requirements: [],
      isPaid: false,
      featured: false,
      category: [],
      price: 1,
      image: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddRequirements = () => {
    if (requirements.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, requirements.trim()],
      }));
      setRequirements(""); // Clear the input after adding
    }
  };

  const handleAddCategory = () => {
    if (category.trim() && !formData.category.includes(category)) {
      setFormData((previousData) => ({
        ...previousData,
        category: [...previousData.category, category],
      }));
      setCategory(""); // Clear the input after adding
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (file) {
        setFormData((previousData) => ({
          ...previousData,
          image: file,
        }));
      }
    };

    reader.readAsDataURL(file);
  };
  return (
    <section className="min-h-screen px-10 py-6">
      <DashboardTitle title="Create Course" />
      <div className="cumber mt-10">
        <Link to={"/dashboard"} className="hover:underline">
          Dashboard
        </Link>
        <span>{" / "}</span>
        <Link to={`/dashboard/allCourses`} className="hover:underline">
          Courses
        </Link>
      </div>
      <Form
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="grid gap-8 mt-10"
      >
        <FormInput
          type="text"
          name="title"
          placeholder="Title"
          handleChange={handleChange}
          value={formData.title}
        />
        <FormInput
          type="text"
          name="description"
          placeholder="Description"
          handleChange={handleChange}
          value={formData.description}
        />
        <div className="input_Container">
          <input
            type="text"
            name="requirements"
            placeholder="Requirements"
            onChange={(e) => setRequirements(e.target.value)}
            value={requirements}
            className="w-full p-4 text-dark-gray border border-border-color rounded-md focus:outline-none focus:border-primary"
          />
          <button
            type="button"
            className=" mt-4 px-4 py-2 ml-2 outline-none border-2 border-bg_clr rounded"
            onClick={handleAddRequirements}
          >
            Add
          </button>
        </div>
        <FormCheckbox
          type="checkbox"
          name="isPaid"
          handleChange={handleChange}
          checked={formData.isPaid} // Use checked for checkbox
          label="Paid"
        />
        <FormCheckbox
          type="checkbox"
          name="featured"
          handleChange={handleChange}
          checked={formData.featured} // Use checked for checkbox
          label="Featured"
        />
        <div className="input_Container">
          <select
            name="category"
            id="category"
            className="px-4 py-2 outline-none border-2 border-bg_clr rounded"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">Select a category</option>
            {categories.map((option, index) => (
              <option key={index} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className=" mt-4 px-4 py-2 ml-2 outline-none border-2 border-bg_clr rounded"
            onClick={handleAddCategory}
          >
            Add
          </button>
        </div>
        <FormInput
          type="number"
          name="price"
          placeholder="Price"
          handleChange={handleChange}
          value={formData.price}
        />
        <FormFile
          name="image"
          handleChange={handleChangeImage}
          accept="image/*"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-Primary_Color text-white rounded-md"
        >
          Submit
        </button>
      </Form>
    </section>
  );
};

const FormInput = ({ type, name, placeholder, handleChange, value }) => {
  return (
    <div className="input_Container">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className="w-full p-4 text-dark-gray border border-border-color rounded-md focus:outline-none focus:border-primary"
      />
    </div>
  );
};

const FormCheckbox = ({ type, name, handleChange, checked, label }) => {
  return (
    <div className="input_Container">
      <input
        type={type}
        name={name}
        id={name}
        onChange={handleChange}
        checked={checked}
        className="form-checkbox text-primary"
      />
      <label className="ml-2" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

const FormFile = ({ name, handleChange, accept }) => {
  return (
    <div className="input_Container">
      <input
        type="file"
        name={name}
        id={name}
        onChange={handleChange}
        accept={accept}
        className="w-full p-4 text-dark-gray border border-border-color rounded-md focus:outline-none focus:border-primary"
      />
    </div>
  );
};

export default CreateCourse;
