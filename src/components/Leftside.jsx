import { Link } from "react-router-dom";
import "../styles/Leftside.css";

const Leftside = (props) => {
    return (
        <div className="ls-container">
            <div className="ls-art-card">
                <div className="ls-user-info">
                    <div className="ls-card-background" />
                    <a>
                        <div className="ls-photo" />
                        <div className="ls-link">Welcome, {props.name.split(" ")[0]}!</div>
                    </a>
                    <a>
                        <div className="ls-add-photo-text">Add a photo</div>
                    </a>
                </div>
                <div className="ls-widget">
                    <Link to="/network">
                        <div>
                            <span>Connections</span>
                            <span>Grow your network</span>
                        </div>
                        <img src="/images/widget-icon.svg" alt="" />
                    </Link>
                </div>
                <a className="ls-item">
                    <span>
                        <img src="/images/item-icon.svg" alt="" />
                        My Items
                    </span>
                </a>
            </div>

            <div className="ls-art-card ls-community-card">
                <a>
                    <span>Groups</span>
                </a>
                <a>
                    <span>
                        Events
                        <img src="/images/plus-icon.svg" alt="" />
                    </span>
                </a>
                <a>
                    <span>Follow Hashtags</span>
                </a>
                <a>
                    <span>Discover more</span>
                </a>
            </div>
        </div>
    );
};


export default Leftside;