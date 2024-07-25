import React, { useState } from "react";
import "./addProductModel.scss";

function AddProductModel(props) {
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(props.edit);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const files = Array.from(e.target.files);
      const promises = files.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
      Promise.all(promises)
        .then((base64Images) => {
          setImages(base64Images);
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    } else {
      data[e.target.name] = e.target.value;
      setData({ ...data });
    }
  };
  const handleSubmit = () => {
    data.Images = [...images];
    console.log(data);
    props.modalShowHandal();
  };

  const handleEdit= () => {
    data.Images = [...images];
    console.log(data);
    props.modalShowHandal();
  };
  return (
    <>
      <div className="popup-overlay">
        <div className="popup">
          <button className="close-btn" onClick={props.modalShowHandal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h2>Product List</h2>

          <form className="form">
            <div className="inputfield">
              <input
                type="text"
                name="Product-title"
                onChange={handleChange}
                placeholder="Enter Product title"
              />
              <input
                type="text"
                name="Description"
                onChange={handleChange}
                placeholder="Enter Description"
              />
              <label htmlFor="Product-Image">
                <span>Uplode Product Image</span> <i className="fas fa-images"></i>{" "}
              </label>
              <input
                type="file"
                id="Product-Image"
                hidden
                onChange={handleChange}
                accept="image/png, image/gif, image/jpeg"
                multiple
                name="Product-Image"
              />
            </div>
            <div>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index}`}
                  style={{ width: "100px", height: "100px", margin: "10px" }}
                />
              ))}
            </div>
            <div className="add-button">
              {edit ? (
                <button type="button" onClick={handleEdit}>
                  Edit
                </button>
              ) : (
                <button type="button" onClick={handleSubmit}>
                  Add Product
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProductModel;
