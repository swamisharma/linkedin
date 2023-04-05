import { useEffect, useState } from "react"
import "../styles/Post.css"
import Comment from "./Comment"

export default function Post(props) {
    const [noOfComments, setNoOfComments] = useState(0);
    const cmmtTillNow = JSON.parse(localStorage.getItem("allPosts"))[props.index].comments;
    const comments = cmmtTillNow.map((comment, index) => {
        return <Comment key={index} index={index} name={props.name} content={comment.content} />
    })
    const [likesTillNow, setLikesTillNow] = useState(JSON.parse(localStorage.getItem("likes")));
    const [likeClass, setLikeClass] = useState("like-button")

    useEffect(() => {

        if (likesTillNow[props.index])
            setLikeClass("like-button post-like")
        else
            setLikeClass("like-button")

    }, [likesTillNow])

    let likeBtn = (
        <button className={likeClass} onClick={handleLike}>
            <img src="/images/like.svg" alt="like" />
            <span>Like</span>
        </button>
    );

    function handleComment() {
        const postsTillNow = JSON.parse(localStorage.getItem("allPosts"));
        postsTillNow[props.index].comments.unshift({ name: props.name, content: document.querySelectorAll(".comment-input-bar input")[props.index].value });
        localStorage.setItem("allPosts", JSON.stringify(postsTillNow));
        document.querySelectorAll(".comment-input-bar input")[props.index].value = "";
        setNoOfComments((prev) => prev + 1);
    }

    function handleLike() {
        const likesTillNow = JSON.parse(localStorage.getItem("likes"));
        if (!likesTillNow[props.index]) {
            likesTillNow[props.index] = 1;
        }
        else {
            likesTillNow[props.index] = 0;
        }
        localStorage.setItem("likes", JSON.stringify(likesTillNow));
        setLikesTillNow(likesTillNow)
        // document.querySelector(".like-button").classList.toggle("post-like");
    }

    return (
        <div className="post-container">
            <div className="post-header">
                <div className="post-header-profile-details">
                    <div className="post-profile-img">
                        <img src="/images/user.svg" alt="Profile" />
                    </div>
                    <div className="post-profile-details">
                        <span className="user-name">{props.name}</span>
                        <span className="user-details">LinkedIn User</span>
                        <span className="post-description">
                            <span>5d • </span>
                            <img src="/images/globe.svg" />
                        </span>
                    </div>
                </div>
                <div className="three-dots">
                    <img src="/images/three-dots.svg" alt="" />
                </div>
            </div>
            <div className="post-content">
                <span>{props.content}</span>
            </div>
            <div className="post-reaction-buttons">
                {likeBtn}
                <button>
                    <img src="/images/comments.svg" alt="comment" />
                    <span>Comment</span>
                </button>
                <button>
                    <img src="/images/share.svg" alt="comment" />
                    <span>Send</span>
                </button>
            </div>
            <div className="comment-input-bar">
                <img src="/images/user.svg" alt="" />
                <input type="text" placeholder="Add a comment..." />
                <button onClick={handleComment}>Comment</button>
            </div>
            {comments}
        </div>
    )
}