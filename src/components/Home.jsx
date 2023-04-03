import "../styles/Home.css";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";

const Home = (props) => {
    return (
        <div className="home-container">
            <div className="home-layout">
                <Leftside name={props.name}/>
                <Main name={props.name}/>
                <Rightside />
            </div>
        </div>
    );
};

export default Home;