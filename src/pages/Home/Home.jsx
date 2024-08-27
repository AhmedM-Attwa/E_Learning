import { useLoaderData } from "react-router-dom";
import customFetch from "../../hooks/API";

const allCoursesQuery = {
  queryKey: ["allCourses"],
  queryFn: () => customFetch("/course/management/courses"),
};

export const loader = (queryClient) => async () => {
  try {
    const {
      data: { course },
    } = await queryClient.ensureQueryData(allCoursesQuery);
    return { course };
  } catch (error) {
    return { error: error?.response?.data?.msg };
  }
};

const Home = () => {
  const { course } = useLoaderData();
  const sorting = course?.sort((a, b) => b.averageRating - a.averageRating);
  sorting?.length > 4 ? (sorting.length = 4) : sorting?.length;
  return (
    <section className="h-screen">
      <div className="container w-full h-full">
        <div className="courseContainer relative w-full h-full">
          {sorting?.map((item, index) => {
            const {
              averageRating,
              _id: id,
              category,
              description: dec,
              image,
              instructor,
              isPaid,
              numOfReviews,
              title,
              price,
              requirements,
              sections,
              students,
            } = item;
            return (
              <div
                className={`course absolute translate-x-[${index * 100}%]`}
                key={id}
              >
                <div className="image">
                  <img src={image} alt="course" />
                </div>
                <div className="courseInfo">
                  <h3 className="courseTitle">{title}</h3>
                  <p className="courseDescription">{dec}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
