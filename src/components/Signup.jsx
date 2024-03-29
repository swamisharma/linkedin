import "../styles/Signup.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { db } from '../firebase'
import { doc, setDoc } from "firebase/firestore"; 
import { toast } from "react-toastify";

export default function Signin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    if (!values.fname || !values.lname || !values.email || !values.password) {
      setError("Please fill all fields");
      return;
    }
    setError("");
    setLoading(true);

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(async (res) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: `${values.fname.charAt(0).toUpperCase() + values.fname.slice(1)} ${values.lname.charAt(0).toUpperCase() + values.lname.slice(1)}`,
        });
        
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          likes: [],
          following: ['5cHH7lNxnUctePGYk2LFf8B188u2']
        });
        
        toast.success("Account created successfully! Please login.");
        setLoading(false);
      })
      .then(() => {
        auth.signOut().then(() => {
          // Sign-out successful.
          navigate("/");
        })
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
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
          <input type="text" onChange={(e) => { setValues((prev) => ({ ...prev, fname: e.target.value })) }} placeholder="Please add your real name" />
          <label>Last name</label>
          <input type="text" onChange={(e) => { setValues((prev) => ({ ...prev, lname: e.target.value })) }} placeholder="Please add your real name" />
          <label>Email</label>
          <input type="email" onChange={(e) => { setValues((prev) => ({ ...prev, email: e.target.value })) }} />
          <label>Password</label>
          <input type="password" onChange={(e) => { setValues((prev) => ({ ...prev, password: e.target.value })) }} />
          <span>By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</span>
          {!loading && <button onClick={handleSubmission}>Sign In</button>}
          {loading && <img src="/images/loading.gif" />}
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