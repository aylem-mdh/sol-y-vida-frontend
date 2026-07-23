import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/auth/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const Clients = lazy(() => import("./pages/Clients"));
const Workers = lazy(() => import("./pages/Workers"));
const Visits = lazy(() => import("./pages/Visits"));
const Services = lazy(() => import("./pages/Services"));
const FamilyMembers = lazy(() => import("./pages/FamilyMembers"));
const Family = lazy(() => import("./pages/Family"));
const Worker = lazy(() => import("./pages/Worker"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Incidents = lazy(() => import("./pages/Incidents"));
const Documentation = lazy(() => import("./pages/Documentation"));
const Reports = lazy(() => import("./pages/Reports"));
const Settings = lazy(() => import("./pages/Settings"));
const ActivateAccount = lazy(() => import("./pages/ActivateAccount"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Budgets = lazy(() => import("./pages/Budgets"));
const Maintenance = lazy(() => import("./pages/Maintenance"));
const Complaints = lazy(() => import("./pages/Complaints"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[linear-gradient(180deg,#F2FBFA_0%,#F7FCFB_40%,#FFFFFF_100%)]" />}>
        <Routes>

          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate-account" element={<ActivateAccount />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Dashboard */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Admin /></ProtectedRoute>} />

          {/* CRUDs */}
          <Route path="/clients" element={<ProtectedRoute allowedRoles={["admin", "worker"]}><Clients /></ProtectedRoute>} />
          <Route path="/workers" element={<ProtectedRoute allowedRoles={["admin"]}><Workers /></ProtectedRoute>} />
          <Route path="/services" element={<ProtectedRoute allowedRoles={["admin", "worker"]}><Services /></ProtectedRoute>} />
          <Route path="/visits" element={<ProtectedRoute allowedRoles={["admin", "worker"]}><Visits /></ProtectedRoute>} />
          <Route path="/family-members" element={<ProtectedRoute allowedRoles={["admin"]}><FamilyMembers /></ProtectedRoute>} />
          <Route path="/incidents" element={<ProtectedRoute allowedRoles={["admin", "worker"]}><Incidents /></ProtectedRoute>} />
          <Route path="/documentation" element={<ProtectedRoute allowedRoles={["admin", "worker", "family"]}><Documentation /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute allowedRoles={["admin", "worker", "family"]}><Reports /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute allowedRoles={["admin", "worker", "family"]}><Settings /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute allowedRoles={["admin", "worker", "family"]}><Notifications /></ProtectedRoute>} />
          <Route path="/budgets" element={<ProtectedRoute allowedRoles={["admin", "family"]}><Budgets /></ProtectedRoute>} />
          <Route path="/maintenance" element={<ProtectedRoute allowedRoles={["admin", "worker"]}><Maintenance /></ProtectedRoute>} />
          <Route path="/complaints" element={<ProtectedRoute allowedRoles={["admin", "worker", "family"]}><Complaints /></ProtectedRoute>} />

          {/* Otras páginas */}
          <Route path="/family" element={<ProtectedRoute allowedRoles={["family"]}><Family /></ProtectedRoute>} />
          <Route path="/worker" element={<ProtectedRoute allowedRoles={["worker"]}><Worker /></ProtectedRoute>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;