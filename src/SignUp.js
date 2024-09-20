// src/SignUp.js
import React, { useState } from "react";
import { auth } from "./API/Firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  // Toggle between sign up and login forms
  const toggleForm = () => {
    setIsChecked(!isChecked);
  };

  // Handle sign-up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/Shop"); // Redirect after signup
    } catch (error) {
      // Handle specific error codes
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          title: "Error",
          text: "This email is already in use.",
          icon: "error"
        });
      } else if (error.code === 'auth/invalid-email') {
        Swal.fire({
          title: "Error",
          text: "The email address is not valid.",
          icon: "error"
        });
      } else if (error.code === 'auth/weak-password') {
        Swal.fire({
          title: "Error",
          text: "The password is too weak.",
          icon: "error"
        });
      } else {
        // General error message
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error"
        });
      }
    }
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailLogin, passwordLogin);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500
      });
      navigate("/Shop"); // Redirect after login
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error"
      });
    }
  };

  return (
    <div className="main">
      <div className={`signup ${isChecked ? "shrink" : ""}`}>
        <form onSubmit={handleSignUp}>
          <label onClick={toggleForm} aria-hidden="true">
            Sign up
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Sign up</button>
        </form>
      </div>

      <div className={`login ${isChecked ? "translate-up" : ""}`}>
        <form onSubmit={handleLogin}>
          <label onClick={toggleForm} aria-hidden="true">
            Login
          </label>
          <input
            type="email"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <style jsx>{`
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-family: 'Jost', sans-serif;
          background: linear-gradient(to bottom, #6666ff, #6666ff, #6666ff);
        }

        .main {
          width: 350px;
          height: 500px;
          background: red;
          overflow: hidden;
          background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38") no-repeat center/cover;
          border-radius: 10px;
          box-shadow: 5px 20px 50px #000;
        }

        .signup,
        .login {
          position: relative;
          width: 100%;
          height: 100%;
        }

        label {
          color: #fff;
          font-size: 2.3em;
          justify-content: center;
          display: flex;
          margin: 50px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.5s ease-in-out;
        }

        input {
          width: 60%;
          height: 10px;
          background: #e0dede;
          justify-content: center;
          display: flex;
          margin: 20px auto;
          padding: 12px;
          border: none;
          outline: none;
          border-radius: 5px;
        }

        button {
          width: 60%;
          height: 40px;
          margin: 10px auto;
          justify-content: center;
          display: block;
          color: #fff;
          background: #573b8a;
          font-size: 1em;
          font-weight: bold;
          margin-top: 30px;
          outline: none;
          border: none;
          border-radius: 5px;
          transition: 0.2s ease-in;
          cursor: pointer;
        }

        button:hover {
          background: #6d44b8;
        }

        .login {
          height: 460px;
          background: #eee;
          border-radius: 60% / 10%;
          transform: translateY(-180px);
          transition: 0.8s ease-in-out;
        }

        .login label {
          color: #573b8a;
          transform: scale(0.6);
        }

        .translate-up {
          transform: translateY(-500px);
        }

        .shrink label {
          transform: scale(0.6);
        }
      `}</style>
    </div>
  );
};

export default SignUp;
