import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './HeroHeader';
import Signup from './SignUP';
import Login from './login';
import AboutUs from './AboutUs';
import Booking from './Booking';
import Process from './Process';
import Footer from "./Footer";
import UpdateHotelPage from "./UpdateHotelPage"
import AdminLandingPage from "./AdminLandingPage"
import '@fontsource/poppins'; // Default weight (400)
import '@fontsource/poppins/400.css'; // Optional, specify weights


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/process" element={<Process />} />
        <Route path="/Admin" element={<AdminLandingPage />} />
		<Route path="/Admin/update-hotel/:id" element={<UpdateHotelPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
