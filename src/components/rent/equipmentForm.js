import './equipmentForm.scss';
import React, { useState } from 'react';
import { createEquipment } from '../../services/equipmentAPI';

const EquipmentForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // New state for image URL
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      // Assuming imageUrl is set elsewhere, e.g., from an input field or another API call
      const formData = {
        equipment: {
          name,
          type,
          description,
          price_per_day: pricePerDay,
          image_url: imageUrl,
        },
      };

      await createEquipment(formData);
      setSuccessMessage('Equipment created successfully!');
    } catch (error) {
      setError('Failed to create Equipment.');
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
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      >
        <option value="">Select Equipment Type</option>
        <option value="Camera">Camera</option>
        <option value="Lighting">Lighting</option>
        <option value="Sound">Sound</option>
        <option value="Accessory">Accessory</option>
      </select>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price per day"
        value={pricePerDay}
        onChange={(e) => setPricePerDay(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>Create Equipment</button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  );
};

export default EquipmentForm;
