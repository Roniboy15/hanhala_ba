import React, { useState } from 'react';

const AddApplicantModal = ({ onSave, onClose }) => {
  const [applicant, setApplicant] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    machane: 'suma'
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
    <div className='mt-3  p-3'>
      <h3>Add Applicant</h3>
      <div>
        <label className='w-100' htmlFor="name">Name</label>
        <input
          className='rounded-2'
          type="text"
          name="name"
          id="name"
          value={applicant.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className='w-100' htmlFor="age">Age</label>
        <input
          className='rounded-2'
          type="number"
          name="age"
          id="age"
          value={applicant.age}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className='w-100' htmlFor="phone">Phone</label>
        <input
          className='rounded-2'
          type="text"
          name="phone"
          id="phone"
          value={applicant.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className='w-100' htmlFor="email">Email</label>
        <input
          className='rounded-2'
          type="email"
          name="email"
          id="email"
          value={applicant.email}
          onChange={handleChange}
        />
      </div>
      
      <div className='p-2'>
        <button className='btn btn-success m-2' onClick={handleSave}>Save</button>
        <button className='btn btn-dark m-2' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddApplicantModal;
