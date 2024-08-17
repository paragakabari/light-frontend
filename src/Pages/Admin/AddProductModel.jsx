import React, { useState, useEffect } from "react";
import "./addProductModel.scss";
import toast, { Toaster } from "react-hot-toast";
import { ApiGet, ApiPost, ApiPut } from "../../services/helpers/API/ApiData";
import { API } from "../../services/config/APP/api.config";

function AddProductModel({
  edit,
  modalShowHandal,
  getProductData,
  initialData,
}) {
  const [images, setImages] = useState([]);
  const [formDataImages, setFormDataImages] = useState([]);
  const [data, setData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const apiHost = "http://" + API.host;

  useEffect(() => {
    getCategory();
    if (edit && initialData) {
      setData(initialData);
      if (initialData.image) {
        setImages([apiHost + initialData.image]);
      }
    }
  }, [edit, initialData, apiHost]);

  const getCategory = () => {
    ApiGet("categories/getAll")
      .then((res) => {
        setCategories(res.data); 
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      handleFileChange(files);
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (files) => {
    const fileArray = Array.from(files);
    setFormDataImages((prevFormDataImages) => [
      ...prevFormDataImages,
      ...fileArray,
    ]);

    const readerArray = fileArray.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerArray)
      .then((results) => {
        setImages((prevImages) => [...prevImages, ...results]);
        setData((prevData) => ({
          ...prevData,
          images: [...prevData.images || [], ...results],
        }));
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };

  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedFormDataImages = formDataImages.filter((_, i) => i !== index);

    setImages(updatedImages);
    setFormDataImages(updatedFormDataImages);
    setData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };

  const validate = () => {
    let newErrors = {};
    if (!data.name) newErrors.name = "Product Name is Required!";
    if (!data.description) newErrors.description = "Description is Required!";
    if (!data.price) newErrors.price = "Price is Required!";
    if (!data.dealerPrice) newErrors.dealerPrice = "Selling price is Required!";
    if (images.length === 0) newErrors.images = "At least one image is Required!";
    if (!data.manufacturername)
      newErrors.manufacturername = "Manufacturer Name is Required!";
    if (!data.manufactureraddress)
      newErrors.manufactureraddress = "Manufacturer Address is Required!";
    if (!data.manufacturernumber)
      newErrors.manufacturernumber = "Manufacturer Number is Required!";
    if (!data.category || data.category === "select")
      newErrors.category = "Category is Required!"; 
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      submitForm();
    }
  };

  const submitForm = () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("dealerPrice", data.dealerPrice);
    formDataImages.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("manufacturername", data.manufacturername);
    formData.append("manufacturernumber", data.manufacturernumber);
    formData.append("manufactureraddress", data.manufactureraddress);
    formData.append("category", data.categoryId); 

    const apiCall = edit ? ApiPut : ApiPost;
    const apiEndpoint = edit ? `products/update/${data.id}` : "products/create";

    apiCall(apiEndpoint, formData)
      .then((res) => {
        toast.success(
          edit ? "Product Edited Successfully!" : "Product Added Successfully!"
        );
        modalShowHandal();
        getProductData();
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Error saving product!");
      });
  };

  return (
    <>
      <div className="popup-overlay">
        <Toaster position="top-center" reverseOrder={true} />
        <div className="popup">
          <button className="close-btn" onClick={modalShowHandal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h2>{edit ? "Edit Product" : "Add Product"}</h2>
          <form className="form">
            <div className="inputfield">
              <input
                type="text"
                name="name"
                value={data.name || ""}
                onChange={handleChange}
                placeholder="Enter Product title"
              />
              <p>{errors.name}</p>

              <input
                type="text"
                name="description"
                value={data.description || ""}
                onChange={handleChange}
                placeholder="Enter description"
              />
              <p>{errors.description}</p>

              <input
                type="number"
                name="price"
                value={data.price || ""}
                onChange={handleChange}
                placeholder="Enter price"
              />
              <p>{errors.price}</p>

              <input
                type="number"
                name="dealerPrice"
                value={data.dealerPrice || ""}
                onChange={handleChange}
                placeholder="Enter Selling price"
              />
              <p>{errors.dealerPrice}</p>

              <select
                name="categoryId"
                value={data.category || "select"}  
                onChange={handleChange}
              >
                <option value="select" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <p>{errors.categoryId}</p>
              <label htmlFor="images">
                <span>Upload Product Images</span>
                <i className="fas fa-images"></i>
              </label>
              <p>{errors.images}</p>
              <input
                type="file"
                id="images"
                hidden
                onChange={handleChange}
                accept="image/png, image/gif, image/jpeg"
                name="images"
                multiple
              />
              <div>
                {data.images?.length > 0 &&
                  data.images.map((image, index) => (
                    <img
                      key={index}
                      alt={`Product ${index}`}
                      src={image}
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleImageRemove(index)}
                    />
                  ))}
              </div>

              <h5>Manufacturer Details</h5>
              <input
                type="text"
                name="manufacturername"
                value={data.manufacturername || ""}
                onChange={handleChange}
                placeholder="Enter Name"
              />
              <p>{errors.manufacturername}</p>

              <input
                type="text"
                name="manufactureraddress"
                value={data.manufactureraddress || ""}
                onChange={handleChange}
                placeholder="Enter Address"
              />
              <p>{errors.manufactureraddress}</p>

              <input
                type="number"
                name="manufacturernumber"
                value={data.manufacturernumber || ""}
                onChange={handleChange}
                placeholder="Enter Contact Number"
              />
              <p>{errors.manufacturernumber}</p>
            </div>

            <div className="add-button">
              <button type="button" onClick={handleSubmit}>
                {edit ? "Edit Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddProductModel;
