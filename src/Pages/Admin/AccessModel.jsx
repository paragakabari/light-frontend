import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiGet, ApiPost, ApiPut } from "../../services/helpers/API/ApiData";
import "./userModel.scss";

function AccessModel({ userData, modalAccessShowHandal }) {
  const [status, setStatus] = useState(userData.status);
  const [categories, setCategories] = useState([]);
  const updateStatus = (data, newStatus) => {
    ApiPut("users/update-status/" + data.id, { status: newStatus })
      .then((res) => {
        setStatus(newStatus);
        toast.success(`${data.role} ${newStatus} !`);
      })
      .catch((err) => {
        toast.error(`Error: ${err} !`);
      });
  };

  const getCategory = () => {
    ApiGet(`categories/addAccess/userId=`+userData.id)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    getCategory();
  }, []);

  const [selectedCategories, setSelectedCategories] = useState([]);

  // Handle checkbox change
  const handleCheckboxChange = (categoryId, isChecked) => {
    console.log(categoryId, isChecked);
    // Update the selectedCategories state
    if (isChecked) {
      setSelectedCategories((prevSelected) => [
        ...prevSelected,
         categoryId,
      ]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((category) => category.categoryId !== categoryId)
      );
    }
  };

  // Submit function to send selected categories
  const handleSubmit = async () => {
    const payload = {
      userId:userData.id, // Assuming userId is passed as a prop
      categoryId: selectedCategories
    };
console.log(payload, "payload")

ApiPost("access/access", payload).then((res) => {
  
  toast.success("Access updated successfully!");
  modalAccessShowHandal();
}
).catch((err) => {
  toast.error(err.message);
}
);


  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={modalAccessShowHandal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2>Category </h2>
        <div className="main-content">
          <div>
          {categories &&
          categories.map((category) => (
            <div key={category.id} className="access-card">
              <h3>{category.name}</h3>
              <input
                type="checkbox"
                onChange={(e) =>
                  handleCheckboxChange(category._id, e.target.checked)
                }
              />
            </div>
          ))}
          </div>
          <button onClick={handleSubmit}>Submit Access</button>
        </div>
      </div>
    </div>
  );
}

export default AccessModel;
