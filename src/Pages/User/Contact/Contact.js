import { useState } from "react";
import "./contact.scss";
import toast from "react-hot-toast";
import { ApiPost } from "../../../services/helpers/API/ApiData";

export default function Contact() {
  const [userData, setUserData] = useState({});
  const [blank, setBlank] = useState({});
  const [error, setError] = useState({});

  const changeHandle = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    setBlank((prevBlank) => ({ ...prevBlank, [name]: "" }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const submitHandle = () => {
    let hasError = false;
    let newError = {};

    if (!userData.name) {
      newError.name = "Please Enter First Name!";
      hasError = true;
    }
    if (!userData.subject) {
      newError.subject = "Please Enter Subject!";
      hasError = true;
    }
    if (!userData.email) {
      newError.email = "Please Enter Email!";
      hasError = true;
    } else if (!userData.email.includes("@gmail")) {
      newError.email = "Email must include '@gmail' symbol!";
      hasError = true;
    }
    if (!userData.message) {
      newError.message = "Please Enter Message!";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
    } else {
      ApiPost("contact/create", userData)
        .then((res) => {
          toast.success("Message  Send Successfully !");
          setUserData({ blank });
          
        })
        .catch((err) => {
          toast.error("Error !");
        });
    }
  };

  return (
    <div className="contact-page-alignment">
      <div className="container">
        <div className="grid">
          <div className="grid-items">
            <h2>
              Let Us Create <br /> Your Succes
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className="grid-items">
            <div className="two-col-grid">
              <div className="input">
                <label>First Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={userData.name || ""}
                  onChange={changeHandle}
                />
                <span>{error.name}</span>
              </div>
              <div className="input">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName || ""}
                  onChange={changeHandle}
                />
              </div>
            </div>
            <div className="input spacer">
              <label>Email Id</label>
              <input
                type="email"
                name="email"
                value={userData.email || ""}
                required
                onChange={changeHandle}
              />
              <span>{error.email}</span>
            </div>
            <div className="input spacer">
              <label>Phone Number</label>
              <input
                type="number"
                value={userData.phone || ""}
                name="phone"
                onChange={changeHandle}
                />
            </div>
            <div className="input spacer">
              <label>Subject</label>
              <input
                type="text"
                required
                name="subject"
                value={userData.subject || ""}
                onChange={changeHandle}
                />
                <span>{error.subject}</span>
            </div>
            <div className="input spacer">
              <label>Message</label>
              <textarea
                required
                value={userData.message || ""}
                name="message"
                onChange={changeHandle}
              ></textarea>
              <span>{error.message}</span>
            </div>
            <div className="button">
              <button type="button" onClick={submitHandle}>
                Submit Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
