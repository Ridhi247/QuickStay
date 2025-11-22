import React, { useState } from 'react';
import axios from 'axios';
import Title from '../../components/Title';
import { useAuth } from '@clerk/clerk-react'; // For getting Clerk JWT token

const AddHotel = () => {
  const [inputs, setInputs] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth(); // Hook from Clerk

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate inputs
    if (!inputs.name || !inputs.location || !inputs.price || !inputs.description) {
      alert('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      // Get Clerk token (default session token is fine)
      const token = await getToken(); // no template needed

      const res = await axios.post(
        'http://localhost:3000/api/hotels/register',
        {
          name: inputs.name,
          location: inputs.location,
          price: parseFloat(inputs.price),
          description: inputs.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // send token for server auth
          },
        }
      );

      alert('Hotel registered successfully!');
      console.log(res.data);
      setInputs({ name: '', location: '', price: '', description: '' }); // reset form
    } catch (err) {
      console.error('Network or Auth Error:', err);
      alert(err.response?.data?.message || 'Network Error: Unable to register hotel');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <Title
        align="left"
        font="outfit"
        title="Register Hotel"
        subTitle="Add your hotel details carefully to register it in the system."
      />

      <label className="block mt-4 text-gray-700">Hotel Name</label>
      <input
        type="text"
        name="name"
        value={inputs.name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded p-2 mt-1"
      />

      <label className="block mt-4 text-gray-700">Location</label>
      <input
        type="text"
        name="location"
        value={inputs.location}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded p-2 mt-1"
      />

      <label className="block mt-4 text-gray-700">Price per Night</label>
      <input
        type="number"
        name="price"
        value={inputs.price}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded p-2 mt-1"
      />

      <label className="block mt-4 text-gray-700">Description</label>
      <textarea
        name="description"
        value={inputs.description}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded p-2 mt-1"
      />

      <button
        type="submit"
        className="bg-primary text-white px-8 py-2 rounded mt-6 cursor-pointer disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register Hotel'}
      </button>
    </form>
  );
};

export default AddHotel;
