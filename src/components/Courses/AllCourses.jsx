import { Link, useLoaderData } from "react-router-dom";
import customFetch from "../../hooks/API";
import DashboardTitle from "../DashboardTitle";
import { useEffect, useState } from "react";
const getAllCourses = {
  queryKey: ["allCourses"],
  queryFn: async () => {
    const {
      data: { course },
    } = await customFetch("/course/management/courses");
    return course;
  },
};
export const loader = (queryClient) => async () => {
  const course = await queryClient.ensureQueryData(getAllCourses);
  if (course) return { course };
  return null;
};
const AllCourses = () => {
  const [isInstructor, setIsInstructor] = useState("");
  const { course } = useLoaderData();
  useEffect(() => {
    const getInstructor = async () => {
      const inst = course?.map(async (c) => {
        try {
          const {
            data: { user },
          } = await customFetch(`/users/${c.instructor}`);
          setIsInstructor(user);
        } catch (error) {
          console.log(error);
        }
      });
    };
    getInstructor();
  }, []);

  // const getInstructor = (course) => {
  //   const instructor = course?.forEach((course) => {
  //     const instructor = course.instructor;
  //     const getInst = customFetch(`/users/${instructor}`);
  //     setIsInstructor(getInst);
  //     console.log(getInst);
  //     return getInst;
  //   });
  //   return instructor;
  // };
  // getInstructor(course);
  // console.log(isInstructor);

  return (
    <section className="min-h-screen px-10 py-6">
      <DashboardTitle title="Courses" />
      <div className="coursesContainer grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {course?.map((course) => {
          const {
            averageRating,
            category: { name, _id: catId },
            createdAt,
            description,
            featured,
            image,
            instructor,
            isPaid,
            numOfReviews,
            price,
            sections,
            students,
            title,
            _id: id,
            requirements,
            updatedAt,
          } = course;
          return (
            <Link to={`/${instructor}/viewProfile`} key={id}>
              <div className="course">
                <div className="course_Image">
                  <img src={image} alt={title} />
                </div>
                <div className="details">
                  <h3>{title}</h3>
                  <p>{isInstructor.name}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default AllCourses;
