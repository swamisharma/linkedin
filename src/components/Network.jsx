import "../styles/Network.css";
import Leftside from "./Leftside";
import Profile from "./Profile"
import { db } from "../firebase.js";
import { getDocs, collection } from "firebase/firestore";
import { AuthContext } from "../context/MyProvider";
import { useContext, useEffect, useState } from "react";

const Network = () => {
    const { currUser } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [connect, setConnect] = useState(false);

    async function getUsers() {
        const newArr = [];
        const DOCS = await getDocs(collection(db, "users"));

        DOCS.forEach(d => {
            if (currUser.uid === d.id) {
                setFollowing(d.data().following);
            }
            else {
                newArr.push({id: d.id, name: d.data().name});
            }
        })
        setUsers(newArr);
    }

    useEffect(() => {
        getUsers();
    }, [connect])

    return (
        <div className="network-container">
            <div className="network-layout">
                <Leftside name={currUser.displayName} />
                <div className="network-profiles">
                    <div className="network-following">
                        <h3>Your Connections</h3>
                        <div className="network-follow-list">
                            {users.filter(user => following.includes(user.id)).map(user => {
                                return <Profile key={user.id} uid={user.id} following={following} name={user.name.length > 15 ? `${user.name.substring(0, 15)}...` : user.name} connected={true} setConnect={setConnect} currUid={currUser.uid} />
                            })}
                        </div>
                        <h3>People you might know</h3>
                        <div className="network-follow-list">
                            {users.filter(user => !following.includes(user.id)).map(user => {
                                return <Profile key={user.id} uid={user.id} following={following} name={user.name.length > 15 ? `${user.name.substring(0, 15)}...` : user.name} connected={false} setConnect={setConnect} currUid={currUser.uid} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Network;