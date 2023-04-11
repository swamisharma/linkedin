import "../styles/Header.css"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/MyProvider";

const Header = (props) => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (!isLoggedIn){
            navigate("/");
        }
    })
    function signOut() {
        auth.signOut().then(() => {
            // Sign-out successful.
            setIsLoggedIn(false);
            navigate("/")
        }).catch((error) => {
            // An error happened.
            alert("Couldn't singout");
        });
    }

    return (
        <div className="hd-container">
            <div className="hd-content">
                <span className="hd-logo">
                    <Link href="/home">
                        <img src="/images/home-logo.svg" alt="" />
                    </Link>
                </span>
                <div className="hd-search">
                    <div>
                        <input type="text" placeholder="Search" />
                    </div>
                    <div className="hd-search-icon">
                        <img src="/images/search-icon.svg" alt="" />
                    </div>
                </div>
                <nav className="hd-nav">
                    <ul className="hd-nav-list-wrap">
                        <li className="hd-active hd-nav-list">
                            <Link>
                                <img src="/images/nav-home.svg" alt="" />
                                <span>Home</span>
                            </Link>
                        </li>

                        <li className="hd-nav-list">
                            <Link>
                                <img src="/images/nav-network.svg" alt="" />
                                <span>My Network</span>
                            </Link>
                        </li>

                        <li className="hd-nav-list">
                            <Link>
                                <img src="/images/nav-jobs.svg" alt="" />
                                <span>Jobs</span>
                            </Link>
                        </li>

                        <li className="hd-nav-list">
                            <Link>
                                <img src="/images/nav-messaging.svg" alt="" />
                                <span>Messaging</span>
                            </Link>
                        </li>

                        <li className="hd-nav-list">
                            <Link>
                                <img src="/images/nav-notifications.svg" alt="" />
                                <span>Notifications</span>
                            </Link>
                        </li>

                        <li className="hd-user hd-nav-list">
                            <Link>
                                <img src="/images/user.svg" alt="" />
                                <span>
                                    Me
                                    <img src="/images/down-icon.svg" alt="" />
                                </span>
                            </Link>

                            <div className="hd-sign-out" onClick={signOut}>
                                <Link>Sign Out</Link>
                            </div>
                        </li>

                        <li className="hd-user hd-work hd-nav-list">
                            <Link>
                                <img src="/images/nav-work.svg" alt="" />
                                <span>
                                    Work
                                    <img src="/images/down-icon.svg" alt="" />
                                </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;