import React, { useState } from 'react';
import axios from 'axios';
import './JewellerProfile.css'
import Header from '../components/Header';

const JewellerProfile = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/jeweler-profile', {
        name,
        description,
        location,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <Header />
        <div className='jeweler-profile'>
            <h1>Edit Your JewelleryDetails</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

      <label htmlFor="description">Description</label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

      <label htmlFor="location">Location</label>
      <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />

      <button type="submit">Submit</button>
    </form>
    </div>
    </div>
  );
};

export default JewellerProfile;
