import { useState, useEffect } from 'react';
import { Mirage } from 'ldrs/react';
import 'ldrs/react/Mirage.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'aos/dist/aos.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'aos/dist/aos.css';

import Home from './component/home';
import Booking from './component/home/booking';
import FeedbackForm from './component/FeedbackForm';
import Footer from './component/home/footer';
import Form from './component/home/form';
import Header from './component/home/header';
import Layout from './component/layout';
import Navbar from './component/home/navbar';
import Offers from './component/Offers';
import ProfilePage from './component/home/ProfilePage';
import Service from './component/home/service';
import SignIn from './component/home/signin';
import SignUp from './component/home/signup';
import UserLogin from './component/home/subscribe';
import Testimony from './component/home/testimony';
import HotelList from './component/HotelList.jsx';
import PrivateRoute from './component/PrivateRoute.jsx';
import AdminDashboard from './component/AdminDashboard.jsx';
import Unauthorized from './pages/Unauthorized';
import AdminRoute from './component/AdminRoute';

import DeluxeRoomsPage from './pages/DeluxeRoomsPage.jsx';
import FamilyRoomsPage from './pages/FamilyRoomsPage.jsx';
import RoomFeaturesPage from './pages/RoomFeaturesPage.jsx';
import RestaurantsPage from './pages/RestaurantsPage.jsx';
import BreakfastPage from './pages/BreakfastPage.jsx';
import RoomServicePage from './pages/RoomServicePage.jsx';
import MenusPage from './pages/MenusPage.jsx';
import SpecialEventsPage from './pages/SpecialEventsPage.jsx';
import SwimmingPoolPage from './pages/SwimmingPoolPage.jsx';
import SpaWellnessPage from './pages/SpaWellnessPage.jsx';
import FitnessCenterPage from './pages/FitnessCenterPage.jsx';
import MeetingRoomsPage from './pages/MeetingRoomsPage.jsx';
import ConciergeServicesPage from './pages/ConciergeServicesPage.jsx';


function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // for storing backend response if needed

  useEffect(() => {
    // Simulated fetch call to backend
    fetch('http://localhost:5000/', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setUser(data.user); // optional, if you're tracking user globally
        setLoading(false);
      })
      .catch(err => {
        console.error('Backend check failed', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#000' }}>
        <Mirage size={64} speed={2.5} color="white" />
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/feedback" element={<PrivateRoute><FeedbackForm /></PrivateRoute>} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/form" element={<Form />} />
            <Route path="/header" element={<Header />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/service" element={<Service />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/userlogin" element={<UserLogin />} />
            <Route path="/testimony" element={<Testimony />} />
            <Route path="/hotels" element={<PrivateRoute><HotelList /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}/>
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/rooms/deluxe" element={<DeluxeRoomsPage />} />
            <Route path="/rooms/family" element={<FamilyRoomsPage />} />
            <Route path="/rooms/features" element={<RoomFeaturesPage />} />
            <Route path="/dining/restaurants" element={<RestaurantsPage />} />
            <Route path="/dining/breakfast" element={<BreakfastPage />} />
            <Route path="/dining/room-service" element={<RoomServicePage />} />
            <Route path="/dining/menus" element={<MenusPage />} />
            <Route path="/dining/events" element={<SpecialEventsPage />} />
            <Route path="/amenities/pool" element={<SwimmingPoolPage />} />
            <Route path="/amenities/spa" element={<SpaWellnessPage />} />
            <Route path="/amenities/fitness" element={<FitnessCenterPage />} />
            <Route path="/amenities/meeting" element={<MeetingRoomsPage />} />
            <Route path="/amenities/concierge" element={<ConciergeServicesPage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
