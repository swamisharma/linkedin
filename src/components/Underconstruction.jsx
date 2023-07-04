import "../styles/Underconstruction.css"
import Leftside from "./Leftside";
import { AuthContext } from "../context/MyProvider";
import { useContext, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const Underconstruction = () => {
    const { currUser } = useContext(AuthContext); 
    return (<>
        <div className="home-container">
            <div className="home-layout">
                <Leftside name={currUser.displayName} />
                <div className="uc-main">
                    <div className="uc-imgdiv">
                        <img src="/images/5578703.png"/>
                    </div>
                    <div className="uc-sidediv">
                        <h3>Sorry for inconvenience</h3>
                        <p>We are currently working on this side. Stay tuned.</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Underconstruction;