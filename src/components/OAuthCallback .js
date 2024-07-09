import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      axios.post('/oauth2callback', { code })
        .then(() => {
          // Handle successful response
          navigate('/'); // Redirect to booking form or another page
        })
        .catch((error) => {
          // Handle error response
          console.error('Authorization failed:', error);
          navigate('/booking_form'); // Redirect to home or another page
        });
    } else {
      // Handle case where code is not present
      console.error('Authorization code not provided');
      navigate('/booking_form'); // Redirect to home or another page
    }
  }, [location, navigate]);

  return (
    <div>
      Processing OAuth callback...
    </div>
  );
};

export default OAuthCallback;
