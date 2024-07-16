import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Reducers/authSlice'; // Assuming authSlice for handling login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ email, password })); // Dispatch login action with email and password
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
      <button type="button" onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;
