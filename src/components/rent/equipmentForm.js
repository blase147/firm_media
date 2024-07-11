import './equipmentForm.scss';
import React, { useState } from 'react';
import { createEquipment } from '../../services/equipmentAPI';

const EquipmentForm = () => {
  const [name, setName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
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
    formData.append('equipment[name]', name);
    formData.append('equipment[equipment_type]', equipmentType);
    formData.append('equipment[description]', description);
    formData.append('equipment[price_per_hour]', pricePerHour);
    formData.append('equipment[image]', image);

    try {
      await createEquipment(formData);
      setSuccessMessage('Equipment created successfully!');
    } catch (error) {
      setError('Failed to create equipment.');
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
        value={equipmentType}
        onChange={(e) => setEquipmentType(e.target.value)}
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
      />
      <input
        type="number"
        placeholder="Price per hour"
        value={pricePerHour}
        onChange={(e) => setPricePerHour(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit" disabled={loading}>Create Equipment</button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  );
};

export default EquipmentForm;
