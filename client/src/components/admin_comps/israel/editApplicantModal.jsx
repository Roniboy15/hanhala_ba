import React, { useState } from 'react';

const EditApplicantModal = ({ onSave, onClose, app }) => {

  const MACHANE_OPTIONS = ["suma", "wima", "israel", "sayarim"];


  const [applicant, setApplicant] = useState({
    name: app.name,
    age: app.age,
    phone: app.phone,
    email: app.email,
    machane: app.machane
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    let newApplicant = { ...applicant, [name]: value };
  
    if (name === "machane") {
      newApplicant.machane = value.split(",").map((s) => s.trim());
      let newErrors = {};
      if (!newApplicant.machane.every((s) => MACHANE_OPTIONS.includes(s))) {
        newErrors.machane = "Please enter valid machane options";
      }
      setErrors(newErrors);
    }
    let newErrors = {};

    if (name === 'name') {
      if (!value) {
        newErrors.name = 'Name is required';
      }
    } else if (name === 'age') {
      if (!value) {
        newErrors.age = 'Age is required';
      } else if (isNaN(value)) {
        newErrors.age = 'Age must be a number';
      }
    } else if (name === 'phone') {
      if (!value) {
        newErrors.phone = 'Phone is required';
      } else if (!/^\d+$/.test(value)) {
        newErrors.phone = 'Phone must be a number';
      }
    } else if (name === 'email') {
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = 'Email is invalid';
      }
    }
  
    setApplicant(newApplicant);
    setErrors(newErrors);
  };
  
  const handleSave = () => {
    const newErrors = {};

    if (!applicant.name) {
      newErrors.name = 'Name is required';
    }
    if (!applicant.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(applicant.age)) {
      newErrors.age = 'Age must be a number';
    }
    if (!applicant.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d+$/.test(applicant.phone)) {
      newErrors.phone = 'Phone must be a number';
    }
    if (!applicant.machane.length) {
      newErrors.machane = 'Machane required';
    } else {
      for (let i = 0; i < applicant.machane.length; i++) {
        const machane = applicant.machane[i];
        if (machane !== "suma" && machane !== "wima" && machane !== "israel" && machane !== "sayarim") {
          newErrors.machane = 'Machane must be suma, wima, sayarim, israel';
        }
      }
    }

    if (Object.keys(newErrors).length === 0) {
      onSave(applicant);
      onClose();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className='mt-3 p-3'>
      <h3>Edit Applicant</h3>
      <div>
        <label className='w-100' htmlFor='name'>
          Name
        </label>
        <input
          className='rounded-2'
          type='text'
          name='name'
          id='name'
          value={applicant.name}
          onChange={handleChange}
        />
        {errors.name && <div className='text-danger'>{errors.name}</div>}
      </div>
      <div>
        <label className='w-100' htmlFor='age'>
          Age
        </label>
        <input
          className='rounded-2'
          type='number'
          name='age'
          id="age"
          value={applicant.age}
          onChange={handleChange}
        />
        {errors.age && <div className='text-danger'>{errors.age}</div>}

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
        {errors.phone && <div className='text-danger'>{errors.phone}</div>}

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
        {errors.email && <div className='text-danger'>{errors.email}</div>}

      </div>
      <div>
        <label className='w-100' htmlFor="machane">Machane</label>
        <input
          className='rounded-2'
          type="text"
          name="machane"
          id="machane"
          value={applicant.machane}
          onChange={handleChange}
        />
        {errors.machane && <div className='text-danger'>{errors.machane}</div>}

      </div>

      <div className='p-2'>
        <button className='btn btn-success m-2' onClick={handleSave}>Save</button>
        <button className='btn btn-dark m-2' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditApplicantModal;
