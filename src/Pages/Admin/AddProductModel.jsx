import React, { useState } from "react";
import "./addProductModel.scss";
import toast, { Toaster } from "react-hot-toast";
import { Api, ApiPost } from "../../services/helpers/API/ApiData";

function AddProductModel(props) {
  const [images, setImages] = useState([]);
  const [formDataImages, setFormDataImages] = useState([]);
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(props.edit);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormDataImages(Array.from(files));
      const filesArray = Array.from(files);
      const promises = filesArray.map((file) => {
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
          setData((prevData) => ({
            ...prevData,
            ProductImage: base64Images,
          }));
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const errorCreate = () => {
    let newErrors = {};
    if (!data.ProductTitle) {
      newErrors.ProductTitle = "Product Name is Required !";
    }
    if (!data.Description) {
      newErrors.Description = "Description Required !";
    }
    if (!data.Price) {
      newErrors.Price = "Price Required !";
    }
    if (!data.SellingPrice) {
      newErrors.SellingPrice = "Selling Price Required !";
    }
    if (!data.ProductImage || data.ProductImage.length === 0) {
      newErrors.ProductImage = "At least one image Required !";
    }
    if (!data.manufacturerName) {
      newErrors.manufacturerName = "Manufacturer Name Required !";
    }
    if (!data.manufacturerAddress) {
      newErrors.manufacturerAddress = "Manufacturer Address Required !";
    }
    if (!data.manufacturerNumber) {
      newErrors.manufacturerNumber = "Manufacturer Number Required !";
    }
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = errorCreate();

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append("name", data.ProductTitle);
      formData.append("description", data.Description);
      formData.append("price", data.Price);
      formData.append("sellerPrice", data.SellingPrice);

      formData.append("image", formDataImages[0]);
      formData.append("manufacturername", data.manufacturerName);
      formData.append("manufacturernumber", data.manufacturerNumber);
      formData.append("manufactureraddress", data.manufacturerAddress);

      ApiPost("products/create", formData)
        .then((res) => {
          console.log("RES", res);
          toast.success("Product Added Successfully !");
          props.modalShowHandal();
          props.getProductData();
        })
        .catch((err) => {
          console.log("ERR", err);
          toast.error("Error adding product!");
        });
    }
  };

  const handleEdit = () => {
    const validationErrors = errorCreate();

    if (Object.keys(validationErrors).length === 0) {
      // Add API call logic here if needed
      toast.success("Product Edited Successfully !");
      console.log(data);
      props.modalShowHandal();
    }
  };

  return (
    <>
      <div className="popup-overlay">
        <Toaster position="top-center" reverseOrder={true} />
        <div className="popup">
          <button className="close-btn" onClick={props.modalShowHandal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h2>Product List</h2>

          <form className="form">
            <div className="inputfield">
              <input
                type="text"
                name="ProductTitle"
                onChange={handleChange}
                placeholder="Enter Product title"
              />
              <p>{errors.ProductTitle}</p>
              <input
                type="text"
                name="Description"
                onChange={handleChange}
                placeholder="Enter Description"
              />
              <p>{errors.Description}</p>
              <input
                type="number"
                name="Price"
                onChange={handleChange}
                placeholder="Enter Price"
              />
              <p>{errors.Price}</p>
              <input
                type="number"
                name="SellingPrice"
                onChange={handleChange}
                placeholder="Enter Selling Price"
              />
              <p>{errors.SellingPrice}</p>
              <label htmlFor="ProductImage">
                <span>Upload Product Image</span>
                <i className="fas fa-images"></i>
              </label>
              <p>{errors.ProductImage}</p>
              <input
                type="file"
                id="ProductImage"
                hidden
                onChange={handleChange}
                accept="image/png, image/gif, image/jpeg"
                multiple
                name="ProductImage"
              />
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
              <h5>Manufacturer Details</h5>
              <input
                type="text"
                name="manufacturerName"
                onChange={handleChange}
                placeholder="Enter Name"
              />
              <p>{errors.manufacturerName}</p>
              <input
                type="text"
                name="manufacturerAddress"
                onChange={handleChange}
                placeholder="Enter Address"
              />
              <p>{errors.manufacturerAddress}</p>
              <input
                type="number"
                name="manufacturerNumber"
                onChange={handleChange}
                placeholder="Enter Contact Number"
              />
              <p>{errors.manufacturerNumber}</p>
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
