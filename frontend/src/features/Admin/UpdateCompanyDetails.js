import { useState } from "react";
import Heading from "../../components/Heading";
import Select from "react-select";
import Badge from "react-bootstrap/Badge";

const mockBatches = [
  {
    _id: "batch1",
    name: "2025",
  },
  {
    _id: "batch2",
    name: "2024",
  },
];

const mockDepartments = [
  {
    _id: "dept1",
    name: "CSE",
  },
  {
    _id: "dept2",
    name: "Mechanical",
  },
  {
    _id: "dept3",
    name: "ECE",
  },
  {
    _id: "dept4",
    name: "Electrical",
  },
];

const restrictionOptions = [
  "Must have a CGPA above 7.0",
  "No active backlogs",
  "No previous offer",
  "Final year only",
];

function UpdateCompanyDetailsFields({
  type,
  fieldName,
  fieldDescription,
  options,
  onChange,
}) {
  if (type === "text") {
    return (
      <div className="row align-items-center ps-4 pe-2 py-2">
        <h5 className="col-5 m-0">{fieldName}</h5>
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

  if (type === "badge") {
    return (
      <div className="row align-items-center ps-4 pe-2 py-2">
        <h5 className="col-5 m-0">{fieldName}</h5>
        <div className="col-7">
          <Select
            isMulti
            options={options.map((opt) => ({ value: opt._id, label: opt.name }))}
            value={fieldDescription.map((id) => {
              const selectedOption = options.find((opt) => opt._id === id);
              return selectedOption
                ? { value: selectedOption._id, label: selectedOption.name }
                : null;
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

  if (type === "checkbox") {
    return (
      <div className="row align-items-center ps-4 pe-2 py-2">
        <h5 className="col-5 m-0">{fieldName}</h5>
        <div className="col-7">
          {options.map((label, idx) => (
            <div className="form-check" key={idx}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`restriction-${idx}`}
                checked={fieldDescription.includes(label)}
                onChange={() => {
                  const updated = fieldDescription.includes(label)
                    ? fieldDescription.filter((item) => item !== label)
                    : [...fieldDescription, label];
                  onChange(updated);
                }}
              />
              <label className="form-check-label" htmlFor={`restriction-${idx}`}>
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function UpdateCompanyDetails() {
  const [companyDetails, setCompanyDetails] = useState({
    id: "company1",
    name: "CTS",
    description: "Leading IT services company offering a wide range of solutions.",
    skills: ["JavaScript", "HTML", "CSS", "Node.js"],
    lastRegisterationDate: "2025-08-27",
    Restrictions: ["Must have a CGPA above 7.0"],
    appliedStudents: ["user1"],
    departments: ["dept1", "dept3"],
    batch: ["batch1"],
  });

  const handleChange = (field, value) => {
    setCompanyDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    window.location.reload();
  };

  const handleSave = () => {
    console.log("Saving company details:", companyDetails);
  };

  return (
    <div className="container-fluid p-2 vh-100">
      <Heading back={true} link={""} heading={`Edit: ${companyDetails.name}`} />

      <UpdateCompanyDetailsFields
        type="text"
        fieldName="Description"
        fieldDescription={companyDetails.description}
        onChange={(value) => handleChange("description", value)}
      />

      <UpdateCompanyDetailsFields
        type="text"
        fieldName="Skills (comma separated)"
        fieldDescription={companyDetails.skills.join(", ")}
        onChange={(value) =>
          handleChange("skills", value.split(",").map((s) => s.trim()))
        }
      />

      <UpdateCompanyDetailsFields
        type="text"
        fieldName="Last Registration Date"
        fieldDescription={companyDetails.lastRegisterationDate}
        onChange={(value) => handleChange("lastRegisterationDate", value)}
      />

      <UpdateCompanyDetailsFields
        type="badge"
        fieldName="Departments"
        fieldDescription={companyDetails.departments}
        options={mockDepartments}
        onChange={(value) => handleChange("departments", value)}
      />

      <UpdateCompanyDetailsFields
        type="badge"
        fieldName="Batches"
        fieldDescription={companyDetails.batch}
        options={mockBatches}
        onChange={(value) => handleChange("batch", value)}
      />

      <UpdateCompanyDetailsFields
        type="checkbox"
        fieldName="Restrictions"
        fieldDescription={companyDetails.Restrictions}
        options={restrictionOptions}
        onChange={(value) => handleChange("Restrictions", value)}
      />

      <div className="container-fluid d-flex gap-2 justify-content-center mt-4">
        <button type="button" className="btn btn-primary px-4" onClick={handleSave}>
          Save
        </button>
        <button type="button" className="btn btn-outline-danger px-4" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default UpdateCompanyDetails;
