import React, { useState } from 'react';

const EditHouseModal = ({ onSave, onClose, app }) => {

  const MACHANE_OPTIONS = ["suma", "wima"];

  const [house, setHouse] = useState({
    name: app.name,
    place: app.place,
    phone: app.phone,
    email: app.email,
    machane: app.machane,
    url: app.url,
    info: app.info
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newHouse = { ...house, [name]: value };
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
    } else if (name === 'email') {
      if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = 'Email is invalid';
      }
    }
  }

  setHouse(newHouse);
  setErrors(newErrors);
};

const handleSave = () => {
  const newErrors = {};

  if (!house.name) {
    newErrors.name = 'Name is required';
  }
  if (!/^\d+$/.test(house.phone)) {
    newErrors.phone = 'Phone must be a number';
  }
  if (!house.machane.length) {
    newErrors.machane = 'Machane required';
  } else {
    for (let i = 0; i < house.machane.length; i++) {
      const machane = house.machane[i];
      if (machane !== "suma" && machane !== "wima") {
        newErrors.machane = 'Machane must be suma or wima';
      }
    }
  }



  if (Object.keys(newErrors).length === 0) {
    onSave(house);
    onClose();
  } else {
    setErrors(newErrors);
  }
};

return (
  <div className='mt-3 p-3'>
    <h3>Edit House</h3>
    <div>
      <label className='w-100' htmlFor='name'>
        Name
      </label>
      <input
        className='rounded-2'
        type='text'
        name='name'
        id='name'
        value={house.name}
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
        value={house.age}
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
        value={house.phone}
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
        value={house.email}
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
        value={house.machane}
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

export default EditHouseModal;
