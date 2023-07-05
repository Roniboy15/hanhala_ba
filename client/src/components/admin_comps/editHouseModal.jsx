import React, { useState } from 'react';

const EditHouseModal = ({ onSave, onClose, app }) => {

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
    setHouse({ ...house, [name]: value });
  };

  const handleMachane = (machaneOption) => {
    if (house.machane.includes(machaneOption)) {
      setHouse({
        ...house,
        machane: house.machane.filter(machane => machane !== machaneOption),
      });
    } else {
      setHouse({
        ...house,
        machane: [...house.machane, machaneOption],
      });
    }
  };

  const handleSave = () => {
    const newErrors = {};

    if (!house.name) {
      newErrors.name = 'Name is required';
    }

    if (!house.phone && !house.email) {
      newErrors.contact = 'At least one contact method is required';
    }

    if (Object.keys(newErrors).length === 0) {
      onSave(house);
      onClose();
    } else {
      setErrors(newErrors);
    }
  }

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
        <label className='w-100' htmlFor="phone">Phone</label>
        <input
          className='rounded-2'
          type="text"
          name="phone"
          id="phone"
          value={house.phone}
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
          value={house.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className='w-100' htmlFor="url">Website</label>
        <input
          className='rounded-2'
          type="url"
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

      <div>
        <label className='w-100' htmlFor="machane">Machanot</label>
        <button
          className={house.machane.includes('suma') ? 'btn btn-success me-3' : 'btn btn-outline-success me-3'}
          onClick={() => handleMachane('suma')}
        >
          Suma
        </button>
        <button
          className={house.machane.includes('wima') ? 'btn btn-success' : 'btn btn-outline-success'}
          onClick={() => handleMachane('wima')}
        >
          Wima
        </button>
      </div>

      <div className='p-2'>
        <button className='btn btn-success m-2' onClick={handleSave}>Save</button>
        <button className='btn btn-dark m-2' onClick={onClose}>Close</button>
      </div>
      {errors.contact && <div className='text-danger'>{errors.contact}</div>}
    </div>
  );
}

export default EditHouseModal;
