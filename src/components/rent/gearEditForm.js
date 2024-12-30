import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useDispatch, useSelector } from 'react-redux';
import { updateGear } from '../../Redux/Reducers/gearSlice';
import './gearEditForm.scss';

const GearEditForm = ({ gearId, closeModal }) => {
  const dispatch = useDispatch();
  const gear = useSelector((state) => state.gears.gears.find((gear) => gear.id === gearId));

  // Local state for form data
  const [name, setName] = useState(gear?.name || '');
  const [description, setDescription] = useState(gear?.description || '');
  const [pricePerHour, setPricePerHour] = useState(gear?.pricePerHour || '');
  const [gearType, setGearType] = useState(gear?.gearType || '');
  const [imageUrl, setImageUrl] = useState(gear?.imageUrl || '');

  // Update Gear logic
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedGear = {
      id: gearId,
      name,
      description,
      pricePerHour: parseFloat(pricePerHour),
      gearType,
      imageUrl,
    };

    dispatch(updateGear(updatedGear))
      .then(() => {
        closeModal();
        alert('Gear updated successfully');
      })
      .catch((error) => {
        console.error('Error updating gear:', error);
        alert('Failed to update gear');
      });
  };

  useEffect(() => {
    // Ensure the form is populated with the latest gear details
    if (gear) {
      setName(gear.name);
      setDescription(gear.description);
      setPricePerHour(gear.pricePerHour);
      setGearType(gear.gearType);
      setImageUrl(gear.imageUrl);
    }
  }, [gear]);

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
          <label htmlFor="gearType">
            Gear Type
            <input
              id="gearType"
              type="text"
              value={gearType}
              onChange={(e) => setGearType(e.target.value)}
              required
            />
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
          <button type="submit" className="submit-btn">Save Changes</button>
          <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

// Props validation
GearEditForm.propTypes = {
  gearId: PropTypes.string.isRequired, // Ensure gearId is a string and required
  closeModal: PropTypes.func.isRequired, // Ensure closeModal is a function and required
};

export default GearEditForm;
