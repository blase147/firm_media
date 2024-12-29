import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGear } from '../../Redux/Reducers/gearSlice';
import './gearEditForm.scss';

interface GearEditFormProps {
  gearId: string;
  closeModal: () => void;
}

const GearEditForm: React.FC<GearEditFormProps> = ({ gearId, closeModal }) => {
  const dispatch = useDispatch();
  const gear = useSelector((state: any) => state.gears.gears.find((gear: any) => gear.id === gearId));

  // Local state for form data
  const [name, setName] = useState(gear?.name || '');
  const [description, setDescription] = useState(gear?.description || '');
  const [pricePerHour, setPricePerHour] = useState(gear?.pricePerHour || '');
  const [gearType, setGearType] = useState(gear?.gearType || '');
  const [imageUrl, setImageUrl] = useState(gear?.imageUrl || '');

  // Update Gear logic
  const handleSubmit = (e: React.FormEvent) => {
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
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pricePerHour">Price Per Hour</label>
          <input
            id="pricePerHour"
            type="number"
            value={pricePerHour}
            onChange={(e) => setPricePerHour(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gearType">Gear Type</label>
          <input
            id="gearType"
            type="text"
            value={gearType}
            onChange={(e) => setGearType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-btn">Save Changes</button>
          <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default GearEditForm;
