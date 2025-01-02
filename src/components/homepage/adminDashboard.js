import React, { useState, useEffect } from 'react';
import GearsForm from '../rent/gearsForm';
import Rentals from '../rent/rentals';
import Bookings from '../booking/bookings';
import './adminDashboard.scss';
import Nav from '../nav/nav';
import FooterBody from '../footer body/footer_body';

const AdminTabsInterface = () => {
  const [activeTab, setActiveTab] = useState('insight');
  const [insight, setInsight] = useState({
    totalRentals: 0,
    totalBookings: 0,
  });
  const [rentalsData, setRentalsData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [loadingRentals, setLoadingRentals] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = 'http://localhost:5000/api/v1'; // Adjust to match your backend URL

  // Fetch Rentals Data
  const fetchRentalsData = async () => {
    setLoadingRentals(true);
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
      setRentalsData(rentalsData); // Update state with rentals data
      setInsight((prevState) => ({
        ...prevState,
        totalRentals: Array.isArray(rentalsData) ? rentalsData.length : 0,
      }));
      setError(null);
    } catch (err) {
      console.error('Error fetching rentals:', err.message);
      setError('Failed to load rentals. Please try again.');
    } finally {
      setLoadingRentals(false);
    }
  };

  // Fetch Bookings Data
  const fetchBookingsData = async () => {
    setLoadingBookings(true);
    try {
      const token = localStorage.getItem('token');
      const bookingsRes = await fetch(`${BASE_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!bookingsRes.ok) {
        throw new Error(`Failed to fetch bookings: ${bookingsRes.statusText}`);
      }
      const bookingsData = await bookingsRes.json();
      console.log('Bookings Data:', bookingsData); // Inspect the data

      setBookingsData(bookingsData.data || []); // Set bookings data
      setInsight({
        totalBookings: Array.isArray(bookingsData.data) ? bookingsData.data.length : 0,
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching bookings:', err.message);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setLoadingBookings(false);
    }
  };

  // Fetch Data on Component Mount
  useEffect(() => {
    fetchRentalsData();
    fetchBookingsData();
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
            {(loadingRentals || loadingBookings) && <p>Loading insights...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loadingRentals && !loadingBookings && !error && (
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
        {activeTab === 'rentals' && <Rentals rentalsData={rentalsData} />}
        {activeTab === 'bookings' && <Bookings bookingsData={bookingsData} />}
      </div>
      <FooterBody />
    </div>
  );
};

export default AdminTabsInterface;
