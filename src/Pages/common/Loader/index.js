import React from "react";
import LoaderImage from "../../../assets/img/loader-img.png";
import "./Loader.scss";
const LoaderComponent = (props) => {
  const { loading } = props;
  return (
    <>
      {loading && (
        <div className="loader-design">
          <img src={LoaderImage} alt="LoaderImage" />
        </div>
      )}
    </>
  );
};

export default LoaderComponent;
