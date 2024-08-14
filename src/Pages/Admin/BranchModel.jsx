import React, { useState, useEffect } from "react";
import "./addProductModel.scss";
import toast, { Toaster } from "react-hot-toast";
import { ApiPost, ApiPut } from "../../services/helpers/API/ApiData";

function BranchModel({
    edit,
    modalShowHandal,
    getBranchData,
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
        data[e.target.name] = e.target.value;
        setData({ ...data })
    };
    
    const validate = () => {
        let newErrors = {};
        if (!data.name) newErrors.name = "Branch Name is Required!";
        if (!data.email) newErrors.email = "Branch Email is Required!";
        if (!data.phone) newErrors.phone = "Branch Contect Number is Required!";
        if (!data.address) newErrors.address = "Branch Address is Required!";

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
        const apiEndpoint = edit ? `branches/update/${data.id}` : "branches/create";
        apiCall(apiEndpoint, data)
            .then((res) => {
                toast.success(
                    edit ? "Branch Edited Successfully!" : "Branch Created Successfully!"
                );
                modalShowHandal();
                getBranchData();
            })
            .catch((err) => {
                toast.error("Error saving Branch Details !");
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
                    <h2>{edit ? "Edit Branch" : "Add Branch"}</h2>
                    <form className="form">
                        <div className="inputfield">
                            <input
                                type="text"
                                name="name"
                                value={data.name || ""}
                                onChange={handleChange}
                                placeholder="Enter Branch Name"
                            />
                            <p>{errors.name}</p>
                            <input
                                type="email"
                                name="email"
                                value={data.email || ""}
                                onChange={handleChange}
                                placeholder="Enter Email"
                            />
                            <p>{errors.email}</p>
                            <input
                                type="number"
                                name="phone"
                                value={data.phone || ""}
                                onChange={handleChange}
                                placeholder="Enter Contect Number"
                            />
                            <p>{errors.phone}</p>
                            <input
                                type="text"
                                name="address"
                                value={data.address || ""}
                                onChange={handleChange}
                                placeholder="Enter Branch Address"
                            />
                            <p>{errors.address}</p>
                        </div>
                        <div className="add-button">
                            <button type="button" onClick={handleSubmit}>
                                {edit ? "Edit Branch" : "Add Branch"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default BranchModel;
