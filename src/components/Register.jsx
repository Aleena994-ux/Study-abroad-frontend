import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import { registerUser } from "../api.js";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");


  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    try {

      await registerUser({
        name,
        email,
        password,
      });

      alert(
        "Registration successful. Please login."
      );

      navigate("/login");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Registration failed"
      );

    }

  }


  return (

    <section className="form-section auth-page">


      {/* HOME ICON */}

      <button
        className="home-icon"
        type="button"
        onClick={() => navigate("/")}
        aria-label="Go to home"
        title="Home"
      >

        <FaHome />

      </button>


      <div className="container">

        <div className="form-wrap">


          <div>

            <div className="eyebrow">
              Create Account
            </div>


            <h2>
              Start your journey
            </h2>


            <p>
              Create your student account and
              stay connected with Horizon Overseas
              Education.
            </p>

          </div>


          <form
            className="form-card"
            onSubmit={handleSubmit}
          >


            <div className="field">

              <label>
                Full Name
              </label>


              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                required
              />

            </div>


            <div className="field">

              <label>
                Email
              </label>


              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />

            </div>


            <div className="field">

              <label>
                Password
              </label>


              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />

            </div>


            <button
              className="btn btn-primary"
              type="submit"
            >
              Register
            </button>


            {error && (

              <div className="form-msg err">
                {error}
              </div>

            )}


            <p className="auth-switch">

              Already have an account?{" "}

              <Link
                className="text-link"
                to="/login"
              >
                Login
              </Link>

            </p>


          </form>

        </div>

      </div>

    </section>

  );

}