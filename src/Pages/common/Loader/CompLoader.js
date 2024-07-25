import React from "react";
import LoaderImage from "../../../assets/img/loader-img.png";

const ComponentBoundLoader = (props) => {
  const { loading } = props;
  return (
    <>
      {loading && (
        <div className="component-loader-design">
          <img src={LoaderImage} alt="LoaderImage" />
        </div>
      )}
    </>
  );
};

export default ComponentBoundLoader;
