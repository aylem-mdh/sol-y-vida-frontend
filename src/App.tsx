import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import Admin from "./pages/Admin";
import Clients from "./pages/Clients";
import Workers from "./pages/Workers";
import Visits from "./pages/Visits";
import Services from "./pages/Services";
import FamilyMembers from "./pages/FamilyMembers";

import Family from "./pages/Family";
import Worker from "./pages/Worker";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Dashboard */}
        <Route path="/admin" element={<Admin />} />

        {/* CRUDs */}
        <Route path="/clients" element={<Clients />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/services" element={<Services />} />
        <Route path="/visits" element={<Visits />} />
        <Route path="/family-members" element={<FamilyMembers />} />

        {/* Otras páginas */}
        <Route path="/family" element={<Family />} />
        <Route path="/worker" element={<Worker />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;