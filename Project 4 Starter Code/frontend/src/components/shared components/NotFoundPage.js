import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <Link to={"/dashboard"}> Back To Home Page </Link>
      <img
        style={{ width: "50%" }}
        src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
      />
    </div>
  );
};

export default NotFoundPage;
