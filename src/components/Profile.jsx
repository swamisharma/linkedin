import "../styles/Profile.css"
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Profile = ({name, connected, setConnect, uid, following, currUid}) => {
    async function updateFollowing() {
        const docRef = doc(db, "users", currUid);
        if (connected) {
            await updateDoc(docRef, {following: following.filter(f => f !== uid)})
        }
        else {
            await updateDoc(docRef, {following: [...following, uid]})
        }
        setConnect(prev => !prev);
    }

    return (
        <div className="pf-main">
            <div className="pf-art-card">
                <div className="pf-user-info">
                    <div className="pf-card-background" />
                    <div>
                        <div className="pf-photo" />
                        <div className="pf-link">{name}</div>
                    </div>
                    <div>
                        <div className="pf-add-photo-text">LinkedIn User</div>
                    </div>
                </div>
                <div className="pf-widget">
                    <button onClick={updateFollowing}>
                        <div className="pf-connect">
                            <img src="/images/widget-icon.svg" alt="" />
                            {connected ? <span>Following</span> : <span>Follow</span>}
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile;