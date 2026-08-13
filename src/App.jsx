import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Destinations from "./components/Destinations.jsx";
import ContactForm from "./components/ContactForm.jsx";
import AdminList from "./components/AdminList.jsx";

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";


export default function App() {

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");

    return saved ? JSON.parse(saved) : null;
  });


  const [refreshKey, setRefreshKey] = useState(0);


  // ======================================
  // LOGIN
  // ======================================

  function handleLogin(loggedInUser) {
    setUser(loggedInUser);
  }


  // ======================================
  // LOGOUT
  // ======================================

  function handleLogout() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  }


  return (
    <Routes>

      {/* ======================================
          HOME
      ====================================== */}

      <Route
        path="/"
        element={
          <HomePage
            onSubmitted={() =>
              setRefreshKey((k) => k + 1)
            }
          />
        }
      />


      {/* ======================================
          LOGIN
      ====================================== */}

      <Route
        path="/login"
        element={
          <Login
            onLogin={handleLogin}
          />
        }
      />


      {/* ======================================
          REGISTER
      ====================================== */}

      <Route
        path="/register"
        element={
          <Register />
        }
      />


      {/* ======================================
          ADMIN
      ====================================== */}

      <Route
        path="/admin"
        element={
          user?.role === "admin" ? (
            <AdminDashboard
              user={user}
              handleLogout={handleLogout}
              refreshKey={refreshKey}
            />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />


      {/* ======================================
          UNKNOWN URL
      ====================================== */}

      <Route
        path="*"
        element={
          <Navigate to="/" replace />
        }
      />

    </Routes>
  );
}


/* ==========================================
   HOME PAGE
========================================== */

function HomePage({
  onSubmitted,
}) {

  const navigate = useNavigate();


  return (
    <div>

      {/* HOME HEADER */}

      <div className="user-header">

        <div className="container user-header-inner">

          <div className="user-welcome">

            <span className="user-welcome-small">
              Horizon Overseas Education
            </span>

            <h3>
              Your journey starts here
            </h3>

          </div>


          <button
            className="btn btn-primary logout-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

      </div>


      <Hero />

      <Stats />

      <WhyChooseUs />

      <Testimonials />

      <Destinations />


      {/* PUBLIC FORM */}

      <ContactForm
        onSubmitted={onSubmitted}
      />


      <footer>

        <div className="container">

          © {new Date().getFullYear()}
          {" "}
          Horizon Overseas Education.
          All rights reserved.

        </div>

      </footer>

    </div>
  );
}


/* ==========================================
   ADMIN DASHBOARD
========================================== */

function AdminDashboard({
  user,
  handleLogout,
  refreshKey,
}) {

  return (
    <div>

      <div className="user-header">

        <div className="container user-header-inner">

          <div className="user-welcome">

            <span className="user-welcome-small">
              Welcome back
            </span>

            <h3>
              {user.name}
            </h3>

          </div>


          <button
            className="btn btn-primary logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>


      <div className="container admin-content">

        <h2>
          Admin Dashboard
        </h2>

        <p>
          Manage your website enquiries and users from here.
        </p>

      </div>


      <AdminList
        refreshKey={refreshKey}
      />

    </div>
  );
}