import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import { loginUser } from "../api.js";


export default function Login({
  onLogin,
}) {

  const navigate = useNavigate();


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

      const res =
        await loginUser({
          email,
          password,
        });


      localStorage.setItem(
        "token",
        res.data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );


      onLogin(
        res.data.user
      );


      // ADMIN
      if (
        res.data.user.role === "admin"
      ) {

        navigate("/admin");

      } else {

        // NORMAL USER
        navigate("/");

      }


    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Invalid email or password"
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
              Login
            </div>


            <h2>
              Welcome back
            </h2>


            <p>
              Login to continue.
            </p>

          </div>


          <form
            className="form-card"
            onSubmit={handleSubmit}
          >


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
              Login
            </button>


            {error && (

              <div className="form-msg err">
                {error}
              </div>

            )}


            <p className="auth-switch">

              Don't have an account?{" "}

              <Link
                className="text-link"
                to="/register"
              >
                Register
              </Link>

            </p>


          </form>

        </div>

      </div>

    </section>

  );

}