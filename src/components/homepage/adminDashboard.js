import React, { useState, useEffect } from 'react';
import GearsForm from '../rent/gearsForm';
import Rentals from '../rent/rentals';
import Bookings from '../booking/bookings';
import './adminDashboard.scss';
import Nav from '../nav/nav';

const AdminTabsInterface = () => {
  const [activeTab, setActiveTab] = useState('insight');
  const [insight, setInsight] = useState({
    totalRentals: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = 'http://localhost:5000/api/v1'; // Adjust to match your backend URL

  const fetchInsightData = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

      const rentalsRes = await fetch(`${BASE_URL}/rentals`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!rentalsRes.ok) throw new Error('Failed to fetch rentals data');
      const rentalsData = await rentalsRes.json();

      const bookingsRes = await fetch(`${BASE_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!bookingsRes.ok) throw new Error('Failed to fetch bookings data');
      const bookingsData = await bookingsRes.json();

      setInsight({
        totalRentals: rentalsData.length,
        totalBookings: bookingsData.length,
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching insights:', err.message);
      setError('Failed to load insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Insight Data on Component Mount
  useEffect(() => {
    fetchInsightData();
  }, []);

  return (
    <div className="admin-tabs-container">
      <Nav />
      {/* Tab Buttons */}
      <div className="tabs">
        <button
          type="button"
          className={activeTab === 'insight' ? 'active' : ''}
          onClick={() => setActiveTab('insight')}
        >
          Insight
        </button>
        <button
          type="button"
          className={activeTab === 'gears' ? 'active' : ''}
          onClick={() => setActiveTab('gears')}
        >
          Gear Management
        </button>
        <button
          type="button"
          className={activeTab === 'rentals' ? 'active' : ''}
          onClick={() => setActiveTab('rentals')}
        >
          Rentals
        </button>
        <button
          type="button"
          className={activeTab === 'bookings' ? 'active' : ''}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'insight' && (
          <div className="insight-tab">
            <h2>Data Insight</h2>
            {loading && <p>Loading insights...</p>}
            {!loading && error && <p className="error-message">{error}</p>}
            {!loading && !error && (
            <>
              <p>
                <strong>Total Rentals:</strong>
                {' '}
                {insight.totalRentals}
              </p>
              <p>
                <strong>Total Bookings:</strong>
                {' '}
                {insight.totalBookings}
              </p>
            </>
            )}

          </div>
        )}

        {activeTab === 'gears' && <GearsForm />}

        {activeTab === 'rentals' && <Rentals />}

        {activeTab === 'bookings' && <Bookings />}
      </div>
    </div>
  );
};

export default AdminTabsInterface;
