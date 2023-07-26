import React, { useState } from 'react';

const AddHouseModal = ({ onSave, onClose }) => {
  const MACHANE_OPTIONS = ["suma", "wima"];

  const [house, setHouse] = useState({
    name: '',
    place: '',
    phone: '',
    email: '',
    machane: ['wima'],
    url: '',
    info: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {

    const { name, value } = event.target;
    const newHouse = { ...house, [name]: value };
    if (name === "machane") {
      newHouse.machane = value.split(",").map((s) => s.trim());
      let newErrors = {};
      if (!newHouse.machane.every((s) => MACHANE_OPTIONS.includes(s))) {
        newErrors.machane = "Please enter valid machane options";
      }
      setErrors(newErrors);
    }

    let newErrors = {};

    if (name === 'name') {
      if (!value) {
        newErrors.name = 'Name is required';
      }

    } else if (name === 'email') {

      if (!value) {
        newErrors.phone = 'Phone cannot be empty';
    }
    
    }
    else if (name === 'email') {
      if (!value) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = 'Email is invalid';
      }
    } else if (name === "machane") {
      if (!newHouse.machane.every((s) => MACHANE_OPTIONS.includes(s))) {
        newErrors.machane = "Please enter valid machane options";
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
      <h3>Add House</h3>
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
        <label className='w-100' htmlFor="place">Place</label>
        <input
          className='rounded-2'
          type="text"
          name="place"
          id="place"
          value={house.place}
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
          value={house.machane.join(", ")}
          onChange={handleChange}
        />
        {errors.machane && <div className='text-danger'>{errors.machane}</div>}
      </div>

      <div>
        <label className='w-100' htmlFor="url">URL</label>
        <input
          className='rounded-2'
          type="text"
          name="url"
          id="url"
          value={house.url}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className='w-100' htmlFor="info">Info</label>
        <textarea
          className='rounded-2'
          name="info"
          id="info"
          value={house.info}
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

export default AddHouseModal;
