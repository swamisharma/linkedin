import "../styles/Loader.css";

export default function Loader() {
    return (
        <div className="loader-container">
            <img src="/images/home-logo.svg" alt="" />
            <div className="loader-line">
                <div className="loader-inner"></div>
            </div>
        </div>
    )
}