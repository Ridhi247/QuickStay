import React, { useState } from 'react';
import axios from 'axios';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';

const AddRoom = ({ userToken }) => { // pass JWT token from context or props
  const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null });
  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free Wifi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amenitiesArray = Object.keys(inputs.amenities).filter(key => inputs.amenities[key]);

    // FormData to include images
    const formData = new FormData();
    formData.append('roomType', inputs.roomType);
    formData.append('pricePerNight', inputs.pricePerNight);
    amenitiesArray.forEach((a, i) => formData.append(`amenities[${i}]`, a));
    Object.values(images).forEach((img) => {
      if (img) formData.append('images', img);
    });

    try {
      const res = await axios.post('http://localhost:3000/api/rooms/', formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Room added successfully!');
      console.log(res.data);
    } catch (err) {
      console.error('Network Error:', err);
      alert('Network Error: Unable to register room');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title align='left' font='outfit' title='Add Room' subTitle='Fill in details carefully...' />
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key}>
            <img
              className='max-h-13 cursor-pointer opacity-80'
              src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea}
              alt=''
            />
            <input
              type='file'
              accept='image/*'
              id={`roomImage${key}`}
              hidden
              onChange={(e) => setImages({ ...images, [key]: e.target.files[0] })}
            />
          </label>
        ))}
      </div>
      {/* Room type, price, amenities */}
      {/* ... keep the rest of the form as before ... */}
      <button type='submit' className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer'>
        Add Room
      </button>
    </form>
  );
};

export default AddRoom;
