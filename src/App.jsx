import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import Cancel from "./pages/Cancel";
import Admin from "./pages/Admin";
import Book from "./pages/Book";
import ShowBookings from "./pages/ShowBookings"; // 👈 Import this



function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/cancel" element={<Cancel />} /> */}
        <Route path="/booking" element={<Book/>}/>
        <Route path="/add-flight" element={<Admin />} />
        <Route path="/show-bookings" element={<ShowBookings />} /> {/* 👈 New route */}
    
      </Routes>
    </Router>
  );
}

export default App;
