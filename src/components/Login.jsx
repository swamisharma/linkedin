import "../styles/Login.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("loggedIn") === "true"){
            navigate("/home");
        }
        else {
            localStorage.setItem("loggedIn", "false");
        }
    })
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleSubmission = () => {
        if (!values.email || !values.password) {
            setError("Fill all fields");
            return;
        }
        setError("");
        setLoading(true);

        signInWithEmailAndPassword(auth, values.email, values.password).then(async (res) => {
            localStorage.setItem("loggedIn", "true");
            navigate("/home");
        }).catch((err) => {
            setLoading(false)
            setError("Incorrect Email or Password");
        });
    };

    return (
        <div className="li-container">
            <nav className="li-nav">
                <Link href="/">
                    <img src="/images/login-logo.svg" alt="" />
                </Link>
                <div>
                    <Link to="/signup" className="li-join">Join Now</Link>
                    <Link className="li-sign-in">Sign In</Link>
                </div>
            </nav>
            <section className="li-section">
                <div className="li-hero">
                    <h1>Welcome to your professional community</h1>
                    <div className="li-login-by-email">
                        <label>Email</label>
                        <input type="email" onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))} />
                        <label>Password</label>
                        <input type="password" onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))} />
                        {!loading && <button onClick={handleSubmission}>Sign In</button>}
                        {loading && <img src="/images/loading.gif"/>}
                        <span className="error-alert">{error}</span>
                    </div>
                </div>
                <div className="li-side-image">
                    <img src="/images/login-cover.svg" alt="" />
                </div>
            </section>
        </div>
    );
};

export default Login;