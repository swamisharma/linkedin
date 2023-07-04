import "../styles/Home.css";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";
import { AuthContext } from "../context/MyProvider";
import { useContext } from "react";

const Home = () => {
    const {currUser} = useContext(AuthContext);
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