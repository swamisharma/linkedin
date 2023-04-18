import "../styles/Main.css"
import { useEffect, useState } from "react";
import Post from "./Post"
import Share from "./Share"
import { auth, db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

const Main = ({ currUser }) => {
    const [postsTillNow, setPostsTillNow] = useState([]);
    const [addNewPost, setAddNewPost] = useState(false);

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

    const posts = postsTillNow.map((post) => {
        return <Post key={post.id} index={post.id} name={post.name} content={post.content} comments={post.comments} like={post.likes.includes(auth.currentUser.uid)} />
    });

    return (
        <div className="main-container">
            <Share name={currUser.displayName} setPosts={setAddNewPost} />
            {posts}
        </div>
    );
};

export default Main;