import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useDispatch, useSelector } from 'react-redux';
import { updateGear } from '../../Redux/Reducers/gearSlice';
import './gearEditForm.scss';

const GearEditForm = ({ gearId, closeModal }) => {
  const dispatch = useDispatch();
  const gear = useSelector((state) => state.gears.gears.find((gear) => gear.id === gearId));

  // Local state for form data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [gearType, setGearType] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Populate form fields when gear data is available
  useEffect(() => {
    if (gear) {
      setName(gear.name || '');
      setDescription(gear.description || '');
      setPricePerHour(gear.pricePerHour || '');
      setGearType(gear.gearType || '');
      setImageUrl(gear.imageUrl || '');
    }
  }, [gear]);

  // Update Gear logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gearId) {
      console.error('Error: gearId is undefined');
      return;
    }

    const updatedGear = {
      id: gearId,
      name,
      description,
      pricePerHour: parseFloat(pricePerHour),
      gearType,
      imageUrl,
    };

    try {
      await dispatch(updateGear({ gearId, gearData: updatedGear }));
      closeModal();
      alert('Gear updated successfully');
    } catch (error) {
      console.error('Error updating gear:', error);
      alert('Failed to update gear');
    }
  };

  return (
    <div className="gear-edit-form">
      <h2>Edit Gear</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            Name
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="pricePerHour">
            Price Per Hour
            <input
              id="pricePerHour"
              type="number"
              value={pricePerHour}
              onChange={(e) => setPricePerHour(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="type">
            Gear Type
            <select
              id="type"
              value={gearType}
              onChange={(e) => setGearType(e.target.value)}
            >
              <option value="">Choose Gear</option>
              <option value="camera">Camera</option>
              <option value="lens">Lens</option>
              <option value="drone">Drone</option>
              <option value="light">Light</option>
              <option value="tripod">Tripod</option>
              <option value="Microphone">Microphone</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">
            Image URL
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-btn">Update</button>
          <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

// Props validation
GearEditForm.propTypes = {
  gearId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default GearEditForm;
