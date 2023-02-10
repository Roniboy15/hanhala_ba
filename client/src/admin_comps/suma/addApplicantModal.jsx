import React, { useState } from 'react';

const AddApplicantModal = ({ onSave, onClose }) => {
  const [applicant, setApplicant] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    priority: 1,
  });

  const handleChange = (event) => {
    setApplicant({
      ...applicant,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    onSave(applicant);
    console.log(applicant);
    onClose();
  };

  return (
    <div>
      <h2>Add Applicant</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={applicant.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          name="age"
          id="age"
          value={applicant.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={applicant.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={applicant.email}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddApplicantModal;
