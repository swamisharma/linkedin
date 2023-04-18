import "../styles/Home.css";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";
import { auth } from "../firebase";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
    const [currUser, setCurrUser] = useState({displayName:"", uid:""})
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setCurrUser(user);
        }
    });
    return (
        <div className="home-container">
            <div className="home-layout">
                <Leftside name={currUser.displayName}/>
                <Main currUser={currUser}/>
                <Rightside />
            </div>
        </div>
    );
};

export default Home;