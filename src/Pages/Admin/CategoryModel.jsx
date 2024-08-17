import React, { useState, useEffect } from "react";
import "./addProductModel.scss";
import toast, { Toaster } from "react-hot-toast";
import { ApiPost, ApiPut } from "../../services/helpers/API/ApiData";

function CategoryModel({
    edit,
    modalShowHandal,
    getCategoryData,
    initialData,
}) {
    const [data, setData] = useState(initialData || {});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (edit && initialData) {
            setData(initialData);
        }
    }, [edit, initialData]);

    const handleChange = (e) => {
        data[e.target.name]=e.target.value;
        setData({...data})
    };
    


    const validate = () => {
        let newErrors = {};
        if (!data.name) newErrors.name = "Category is Required!";

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
        const apiCall = edit ? ApiPut : ApiPost;
        const apiEndpoint = edit ? `categories/update/${data.id}` : "categories/create";
        apiCall(apiEndpoint,data)
            .then((res) => {
                toast.success(
                    edit ? "Category Edited Successfully!" : "Category Added Successfully!"
                );
                modalShowHandal();
                getCategoryData();
            })
            .catch((err) => {
                toast.error("Error saving Category !");
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
                    <h2>{edit ? "Edit Category" : "Add Category"}</h2>
                    <form className="form">
                        <div className="inputfield">
                            <input
                                type="text"
                                name="name"
                                value={data.name || ""}
                                onChange={handleChange}
                                placeholder="Enter Category title"
                            />
                            <p>{errors.name}</p>
                        </div>
                        <div className="add-button">
                            <button type="button" onClick={handleSubmit}>
                                {edit ? "Edit Category" : "Add Category"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CategoryModel;
