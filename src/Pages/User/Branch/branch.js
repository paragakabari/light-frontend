import "./branch.scss";
import { useEffect, useState } from "react";
import { ApiGet } from "../../../services/helpers/API/ApiData";

export default function Branch() {
  const [branchList, setBranchList] = useState([]);

  useEffect(() => {
    getBranch();
  }, []);

  const getBranch = () => {
    ApiGet("branches/getAll")
      .then((res) => {
        console.log("res", res);
        setBranchList(res.data);
      })
      .catch((err) => {
        console.error("Error fetching branches!", err);
        // toast.error("Error fetching branches!");
      });
  };

  return (
    <div className="container">
      <h2>Branch List</h2>
      <div className="branch-list">
        {branchList.length > 0 ? (
          branchList.map((branch, index) => (
            <div className="branch-card" key={index}>
              <i className="fa-solid fa-store"></i>
              <div className="card-body">
                <ul>
                  <li>
                    <h3>Name: {branch.name}</h3>
                  </li>
                  <li>
                    <p>
                      <strong>Email:</strong> {branch.email}
                    </p>
                  </li>
                  <li>
                    <p><strong>Phone:</strong> {branch.phone}</p>
                  </li>
                  <li>
                    <p><strong>Address:</strong> {branch.address}</p>
                  </li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No branches available.</p>
        )}
      </div>
    </div>
  );
}
