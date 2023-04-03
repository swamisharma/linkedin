import "../styles/Signup.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function Signin() {
  const navigate = useNavigate();
  const [values, setValues] = useState(
    {
      fname: "",
      lname: "",
      email: "",
      password: ""
    }
  );
  const [error, setError] = useState("");

  const handleSubmission = () => {
    if ( !values.fname || !values.lname || !values.email || !values.password){
      setError("Please fill all fields");
      return;
    }
    setError("");

    createUserWithEmailAndPassword( auth, values.email, values.password)
      .then( async (res) => {
        const user = res.user;
        await updateProfile( user, {
          displayName: `${values.fname} ${values.lname}`,
        });
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      })
  }

  return (
    <div className="su-main">
      <nav className="su-nav">
        <Link to="/"><img src="/images/login-logo.svg" alt="" /></Link>
      </nav>
      <section>
        <div className="su-title">
          <h1>Make the most of your professional life</h1>
        </div>
        <div className="su-sign-in">
          <label>First name</label>
          <input type="text" onChange={(e) => {setValues((prev) => ({...prev, fname: e.target.value}))}}/>
          <label>Last name</label>
          <input type="text" onChange={(e) => {setValues((prev) => ({...prev, lname: e.target.value}))}}/>
          <label>Email</label>
          <input type="email" onChange={(e) => {setValues((prev) => ({...prev, email: e.target.value}))}}/>
          <label>Password</label>
          <input type="password" onChange={(e) => {setValues((prev) => ({...prev, password: e.target.value}))}}/>
          <span>By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</span>
          <button onClick={handleSubmission}>Agree & Join</button>
        </div>
        <span className="su-back-to-login">Already have an account <Link to="/">Login here</Link></span>
        <span className="su-error-msg">{error}</span>
      </section>
      <footer>
        <img src="/images/login-logo.svg" alt="" />	&#169; 2023
      </footer>
    </div>
  )
}