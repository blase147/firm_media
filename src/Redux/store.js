import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Reducers/authSlice';
import gearsReducer from './Reducers/gearSlice';
import rentalsReducer from './Reducers/rentalSlice';
import signUpReducer from './Reducers/regSlice';
import createGearReducer from './Reducers/createGearSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    register: signUpReducer,
    gears: gearsReducer,
    rentals: rentalsReducer,
    addGear: createGearReducer,
  },
});

export default store;
