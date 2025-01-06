import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GearsForm from '../rent/gearsForm';
import Rentals from '../rent/rentals';
import Bookings from '../booking/bookings';
import Roles from '../Roles/roles';
import './adminDashboard.scss';
import FooterBody from '../footer body/footer_body';
import Newsletter from '../newsletter/newsletter';
import { fetchCurrentUser } from '../../Redux/Reducers/authSlice';
import Nav from '../nav/nav';

const AdminTabsInterface = () => {
  const [activeTab, setActiveTab] = useState('insight');
  const [insight, setInsight] = useState({
    totalRentals: 0,
    totalBookings: 0,
  });
  const [rentalsData, setRentalsData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [rolesData, setRolesData] = useState([]); // Added rolesData state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAuthenticated = useSelector((state) => state.auth.loggedIn);

  const BASE_URL = 'http://localhost:5000/api/v1';

  const dispatch = useDispatch();

  // Fetch Rentals Data
  const fetchRentalsData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/rentals`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch rentals data');
      const data = await res.json();
      setRentalsData(data);
      setInsight((prev) => ({ ...prev, totalRentals: data.length || 0 }));
      setError(null);
    } catch (err) {
      setError('Failed to load rentals. Please try again.');
    }
  };

  // Fetch Bookings Data
  const fetchBookingsData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch bookings data');
      const data = await res.json();
      setBookingsData(data.data || []);
      setInsight((prev) => ({ ...prev, totalBookings: data.data?.length || 0 }));
      setError(null);
    } catch (err) {
      setError('Failed to load bookings. Please try again.');
    }
  };

  // Fetch Roles Data
  const fetchRolesData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch roles data');
      const data = await res.json();
      setRolesData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load roles. Please try again.');
    }
  };

  // Fetch all data on mount
  useEffect(() => {
    (async () => {
      setLoading(true);
      await Promise.all([fetchRentalsData(), fetchBookingsData(), fetchRolesData()]);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="admin-tabs-container">
      <Nav />
      <p>
        Good
        {' '}
        {getGreeting()}
        {' '}
        {currentUser?.full_name}
        .
        {' '}
        It&apos;s good to see you here again.
      </p>

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
        <button
          type="button"
          className={activeTab === 'roles' ? 'active' : ''}
          onClick={() => setActiveTab('roles')}
        >
          Manage Roles
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'insight' && (
          <div className="insight-tab">
            <h2>Data Insight</h2>
            {loading && <p>Loading insights...</p>}
            {error && <p className="error-message">{error}</p>}
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
        {activeTab === 'rentals' && <Rentals rentalsData={rentalsData} />}
        {activeTab === 'bookings' && <Bookings bookingsData={bookingsData} />}
        {activeTab === 'roles' && <Roles rolesData={rolesData} />}
      </div>
      <Newsletter />
      <FooterBody />
    </div>
  );
};

export default AdminTabsInterface;
