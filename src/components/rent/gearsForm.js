import './gearsForm.scss';
import React, { useState } from 'react';
import createGear from '../../services/gearsAPI';

const GearsForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('gear[name]', name);
    formData.append('gear[type]', type);
    formData.append('gear[description]', description);
    formData.append('gear[price_per_day]', pricePerDay);
    formData.append('gear[image]', image);

    try {
      await createGear(formData);
      setSuccessMessage('Gear created successfully!');
    } catch (error) {
      setError('Failed to create gear.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Select Gear Type</option>
        <option value="Camera">Camera</option>
        <option value="Lighting">Lighting</option>
        <option value="Sound">Sound</option>
        <option value="Accessory">Accessory</option>
      </select>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price per day"
        value={pricePerDay}
        onChange={(e) => setPricePerDay(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit" disabled={loading}>Create Gear</button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  );
};

export default GearsForm;
