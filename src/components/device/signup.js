import React, { useEffect, useState } from 'react';
import { FaUser, FaRegUser } from 'react-icons/fa';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../Redux/Reducers/regSlice';

/* eslint-disable camelcase */
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const { status, error } = useSelector((state) => state.Signup) || {};
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({
      email,
      full_name,
      password,
      password_confirmation,
    }));
    setIsSignedUp(true);
  };

  const renderMessage = () => {
    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (status === 'failed') {
      return (
        <p>
          There was an error:
          {error}
        </p>
      );
    }

    if (status === 'succeeded') {
      return <p>Sign up successful!</p>;
    }
    return null;
  };

  useEffect(() => {
    if (isSignedUp) {
      setTimeout(() => {
        navigate('/login');
        setIsSignedUp(false);
      }, 100);
    }
  }, [isSignedUp, navigate]);

  return (
    <section className="login-Signup">
      <div className="loginIcon"><FaUser /></div>
      <h2>Welcome</h2>
      <form onSubmit={handleSubmit}>
        <h4>Signup</h4>
        <div className="form-group">
          <span className="icon"><HiOutlineMailOpen /></span>
          <input
            type="email"
            className="form-control"
            id="Email1"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <span className="icon"><FaRegUser /></span>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter full name"
            onChange={(e) => setFullName(e.target.value)}
            value={full_name}
          />
        </div>
        <div className="form-group">
          <span className="icon"><RiLockPasswordLine /></span>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="form-group">
          <span className="icon"><RiLockPasswordLine /></span>
          <input
            type="password"
            className="form-control"
            id="password_confirmation"
            placeholder="Confirm password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={password_confirmation}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account?
        {' '}
        <Link to="/login" style={{ textDecoration: 'none' }}>
          Login
        </Link>
      </p>
      {renderMessage()}
    </section>
  );
};

export default Signup;
