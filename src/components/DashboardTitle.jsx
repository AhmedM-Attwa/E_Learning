import React from "react";

const DashboardTitle = ({ title }) => {
  return (
    <div>
      <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold text-Black_Clr">
        {title}
      </h1>
    </div>
  );
};

export default DashboardTitle;
