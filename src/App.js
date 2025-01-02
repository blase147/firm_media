import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import { useSelector, Provider } from 'react-redux'; import './App.css';
import store from './Redux/store';
import Homepage from './components/homepage/homepage';
import AboutDetails from './components/about/aboutDetails';
import OurServicesDetails from './components/our services/ourServicesDetails';
import Contact from './components/contact/contact';
import MyPortfolio from './components/gallery/myPortfolio';
import Blog from './components/blog/blog';
import Pricing from './components/booking/pricing';
import BookingForm from './components/booking/booking_form';
import OAuthCallback from './components/OAuthCallback '; // Ensure this import is correct
import EquipmentList from './components/rent/equipmentList';
import EquipmentForm from './components/rent/equipmentForm';
import GearsForm from './components/rent/gearsForm';
import GearsList from './components/rent/gearList';
import Rentals from './components/rent/rentals';
import Bookings from './components/booking/bookings';
import Login from './components/device/login';
import SignUp from './components/device/signup';
import RentalEditForm from './components/rent/rentalEditForm';
import BookingEditForm from './components/booking/bokingEditForm';
import Receipt from './components/booking/receipt';
import ReceiptModal from './components/rent/ReceiptModal';
import AdminDashboard from './components/homepage/adminDashboard';

const BookingFormRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <BookingForm /> : <Navigate to="/login" />;
};

// Routes
  <Route path="/booking_form" element={<BookingFormRoute />} />;

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/aboutDetails" element={<AboutDetails />} />
        <Route path="/ourServicesDetails" element={<OurServicesDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<MyPortfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/booking_form" element={<BookingForm />} />
        <Route path="/equipmentList" element={<EquipmentList />} />
        <Route path="/equipmentForm" element={<EquipmentForm />} />
        <Route path="/gearsForm" element={<GearsForm />} />
        <Route path="/gearList" element={<GearsList />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rentalEditForm" element={<RentalEditForm />} />
        <Route path="/bookingEditForm" element={<BookingEditForm />} />
        <Route path="/receipt/:bookingId" element={<Receipt />} />
        <Route path="/receiptModal/:rentalId" element={<ReceiptModal />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/oauth2callback" element={<OAuthCallback />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  </Provider>
);

export default App;
