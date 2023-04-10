import "../styles/Home.css";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";
import { auth } from "../firebase";

const Home = () => {
    const user = auth.currentUser;
    return (
        <div className="home-container">
            <div className="home-layout">
                <Leftside name={user.displayName}/>
                <Main name={user.displayName}/>
                <Rightside />
            </div>
        </div>
    );
};

export default Home;