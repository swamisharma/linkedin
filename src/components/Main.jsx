import "../styles/Main.css"
import { useEffect, useState } from "react";
import Post from "./Post"
import Share from "./Share"
import { db } from "../firebase.js";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";

const Main = ({ currUser }) => {
    const [postsTillNow, setPostsTillNow] = useState([]);
    const [addNewPost, setAddNewPost] = useState(false);
    const [following, setFollowing] = useState([]);

    async function getUsers(){
        const docRef = doc(db, "users", currUser.uid);
        const docFollowList = await getDoc(docRef);
        setFollowing(docFollowList.data().following);
    }

    useEffect(() => {
        const dataArr = []
        getDocs(collection(db, "posts"))
            .then((res) => {
                res.forEach((doc) => {
                    dataArr.unshift({ id: doc.id, ...doc.data() });
                })
                setPostsTillNow(dataArr);
            });
    }, [addNewPost])

    useEffect(() => {
        if (currUser.uid) getUsers()
    }, [currUser])

    const posts = postsTillNow.filter(post => following.includes(post.uid)).map((post) => {
        return <Post key={post.id} index={post.id} name={post.name} content={post.content} comments={post.comments} like={post.likes.includes(currUser.uid)} likeCount={post.likes.length} />
    });

    return (
        <div className="main-container">
            <Share name={currUser.displayName} setPosts={setAddNewPost} />
            {posts}
        </div>
    );
};

export default Main;