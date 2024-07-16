import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../Redux/Reducers/regSlice';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); // New state for password confirmation
  const dispatch = useDispatch();

  const handleSignup = () => {
    // Check if passwords match
    if (password !== passwordConfirmation) {
      alert("Passwords don't match!");
      return;
    }

    // Dispatch signup action
    dispatch(signup({ email, password }));
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        placeholder="Confirm Password" // New input for password confirmation
      />
      <button type="button" onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
