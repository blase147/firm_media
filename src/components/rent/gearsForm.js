import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGear } from '../../Redux/Reducers/createGearSlice';
import GearsList from './gearList';
import './gearsForm.scss';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';

const GearsForm = () => {
  const [name, setName] = useState('');
  const [gearType, setGearType] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.addGear);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAuthenticated = useSelector((state) => state.auth.loggedIn);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name,
      gearType,
      description,
      pricePerHour,
      imageUrl,
    };

    dispatch(createGear(formData));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  return (
    <div id="gearsFormContainer">
      <p>
        Good
        {' '}
        {getGreeting()}
        {' '}
        my creator
        {' '}
        {currentUser?.full_name}
        .
        {' '}
        It&apos;s good to see you here again.
      </p>
      <h1>Add some gears here...</h1>
      <div>
        <form onSubmit={handleSubmit} className="gears_form">
          <div>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="type">
              Type
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
                <option value="microphone">Microphone</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="pricePerHour">
              Price per hour
              <input
                type="number"
                id="pricePerHour"
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="imageUrl">
              Image URL
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
          </div>
          <div className="gear_submit_btn">
            <button className="submit-btn" type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
          {error && <p>{error}</p>}
        </form>
        <div id="equipment_card_container">
          <GearsList />
        </div>
      </div>
    </div>
  );
};

export default GearsForm;
