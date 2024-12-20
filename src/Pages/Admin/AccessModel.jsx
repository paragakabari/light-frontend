import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiGet, ApiPost } from "../../services/helpers/API/ApiData";
import "./userModel.scss";

function AccessModel({ userData, modalAccessShowHandal }) {

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  
  const getCategory = useCallback(() => {
    ApiGet(`categories/addAccess?userId=` + userData.id)
      .then((res) => {
        const categoriesWithAccess = res.data.map((category) => ({
          ...category,
          hasAccess: category.hasAccess || false, // Default to false if no 'hasAccess' value
        }));
        setCategories(categoriesWithAccess);

        const selected = categoriesWithAccess
          .filter((category) => category.hasAccess)
          .map((category) => category._id);
        setSelectedCategories(selected);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [userData.id]);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  // Handle checkbox change
  const handleCheckboxChange = (categoryId, isChecked) => {
    // Update the selectedCategories state
    setSelectedCategories((prevSelected) => {
      if (isChecked) {
        // Add category to selected list if checked
        return [...prevSelected, categoryId];
      } else {
        // Remove category from selected list if unchecked
        return prevSelected.filter((id) => id !== categoryId);
      }
    });
  };

  // Submit function to send selected categories
  const handleSubmit = async () => {
    const payload = {
      userId: userData.id, // Assuming userId is passed as a prop
      categoryId: selectedCategories, // Send the selected category IDs
    };

    console.log(payload, "payload");

    ApiPost("access/access", payload)
      .then((res) => {
        toast.success("Access updated successfully!");
        modalAccessShowHandal();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={modalAccessShowHandal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2>Category</h2>
        <div className="main-content">
          <div>
            {categories &&
              categories.map((category) => (
                <div key={category._id} className="access-card">
                  <h3>{category.name}</h3>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category._id)} // Check if the category is selected
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
