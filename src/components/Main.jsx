import { useState } from "react";
import "../styles/Main.css"
import Post from "./Post"
import Share from "./Share"

const Main = (props) => {
    const [noOfPosts, setNoOfPosts] = useState(0)
    if (!localStorage.getItem("allPosts")){
        localStorage.setItem("allPosts", "[]")
        localStorage.setItem("likes", "[]")
    }
    const allPost = JSON.parse(localStorage.getItem("allPosts"));
    const allPostLiked = JSON.parse(localStorage.getItem("likes"));
    const posts = allPost.map((post, index) => {
        return <Post key={index} index={index} name={post.user} content={post.content} liked={allPostLiked[index]}/>
    });
    return (
        <div className="main-container">
            <Share name={props.name} setNoOfPosts={setNoOfPosts}/>
            {posts}
        </div>
    );
};

export default Main;