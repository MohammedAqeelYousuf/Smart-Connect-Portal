import { useState } from "react";
import Heading from "../../components/Heading";
import Select from "react-select";

function AddCompanyDetailsFields({ type, fieldName, fieldDescription, options = [], onChange }) {
  if (type === "text") {
    return (
      <div className="row d-flex align-items-center ps-4 pe-2 pt-2 pb-2">
        <h4 className="col-5 h4 m-0">{fieldName}</h4>
        <div className="col-7">
          <input
            className="form-control"
            type="text"
            value={fieldDescription}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    );
  }

  if (type === "select-multiple") {
    return (
      <div className="row d-flex align-items-center ps-4 pe-2 pt-2 pb-2">
        <h4 className="col-5 h4 m-0">{fieldName}</h4>
        <div className="col-7">
          <Select
            isMulti
            options={options.map((opt) => ({ value: opt._id, label: opt.name }))}
            value={fieldDescription.map((id) => {
              const selectedOption = options.find((opt) => opt._id === id);
              return selectedOption ? { value: selectedOption._id, label: selectedOption.name } : null;
            })}
            onChange={(selected) => {
              onChange(selected ? selected.map((s) => s.value) : []);
            }}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>
    );
  }

  return null;
}

function AddCompanyDetails() {
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    description: "",
    skills: [],
    lastRegisterationDate: "",
    restrictions: [],
    appliedStudents: [],
    departments: [],
    batches: [],
  });

  const batches = [
    { _id: "batch1", name: "2025" },
    { _id: "batch2", name: "2024" },
  ];

  const departments = [
    { _id: "dept1", name: "CSE" },
    { _id: "dept2", name: "Mechanical" },
    { _id: "dept3", name: "ECE" },
    { _id: "dept4", name: "Electrical" },
  ];

  const handleChange = (field, value) => {
    setCompanyDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Company Details: ", companyDetails);
  };

  return (
    <div className="container-fluid p-2 vh-100">
      <Heading back={true} link={""} heading="Add New Company" />
      <AddCompanyDetailsFields
        type="text"
        fieldName="Company Name"
        fieldDescription={companyDetails.name}
        onChange={(value) => handleChange("name", value)}
      />
      <AddCompanyDetailsFields
        type="text"
        fieldName="Description"
        fieldDescription={companyDetails.description}
        onChange={(value) => handleChange("description", value)}
      />
      <AddCompanyDetailsFields
        type="text"
        fieldName="Skills (comma separated)"
        fieldDescription={companyDetails.skills.join(", ")}
        onChange={(value) =>
          handleChange("skills", value.split(",").map((s) => s.trim()))
        }
      />
      <AddCompanyDetailsFields
        type="text"
        fieldName="Last Registration Date"
        fieldDescription={companyDetails.lastRegisterationDate}
        onChange={(value) => handleChange("lastRegisterationDate", value)}
      />
      <AddCompanyDetailsFields
        type="select-multiple"
        fieldName="Departments"
        fieldDescription={companyDetails.departments}
        options={departments}
        onChange={(value) => handleChange("departments", value)}
      />
      <AddCompanyDetailsFields
        type="select-multiple"
        fieldName="Batches"
        fieldDescription={companyDetails.batches}
        options={batches}
        onChange={(value) => handleChange("batches", value)}
      />
      <div className="container-fluid d-flex gap-2 justify-content-center align-items-center mt-4">
        <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>
          Save
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() =>
            setCompanyDetails({
              name: "",
              description: "",
              skills: [],
              lastRegisterationDate: "",
              restrictions: [],
              appliedStudents: [],
              departments: [],
              batches: [],
            })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default AddCompanyDetails;
