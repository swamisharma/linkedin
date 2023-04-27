import { useEffect, useState } from "react"
import "../styles/Post.css"
import Comment from "./Comment"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function Post(props) {
    const [isLiked, setIsLiked] = useState(props.like);
    const [likeCount, setLikeCount] = useState(props.likeCount); 
    const [commentInput, setCommentInput] = useState("");
    const [commentsTillNow, setCommentsTillNow] = useState(props.comments)
    const [toggleComment, setToggleComment] = useState(false);
    const comments = commentsTillNow.map((comment, index) => {
        return <Comment key={index} index={index} name={comment.name} content={comment.content} />
    })

    let classListLike = isLiked ? "like-button post-like" : "like-button";
    let classListComment = toggleComment ? "like-button post-like" : "like-button";

    async function handleComment() {
        if (!commentInput) {
            alert("Comment cannot be empty");
            return
        }
        const postRef = doc(db, "posts", props.index)
        await updateDoc(postRef, {
            comments: [{name: auth.currentUser.displayName, content: commentInput}, ...props.comments]
        })
        setCommentsTillNow(prev => {
            return [{name: auth.currentUser.displayName, content: commentInput}, ...prev]
        })
        setCommentInput("")
    }

    async function handleLike() {
        setIsLiked(prev => !prev);
        if (isLiked) {
            setLikeCount(prev => prev-1);
            await updateDoc(doc(db, "posts", props.index), {
                likes: arrayRemove(auth.currentUser.uid)
            })
        }
        else {
            setLikeCount(prev => prev+1);
            await updateDoc(doc(db, "posts", props.index), {
                likes: arrayUnion(auth.currentUser.uid)
            })
        }
    }

    const currTime = new Date().valueOf();
    const postTime = parseInt(props.index);
    const diff = (currTime-postTime)/1000;
    let time;
    if (diff < 3600) {
        time = "1h";
    } 
    else if (diff < 86400) {
        time = "1d";
    }
    else if (diff < 604800) {
        time = "1w"
    }
    else if (diff < 18144000) {
        time = "1m"
    }
    else if (diff < 217728000) {
        time = "1y"
    }
    else {
        time = "1y+"
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
                            <span>{`${time}`} • </span>
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
                <button className={classListLike} onClick={handleLike} >
                    <img src="/images/like.svg" alt="like" />
                    <span>{likeCount > 0 ? likeCount : "Like"}</span>
                </button>
                <button className={classListComment} onClick={() => setToggleComment(prev => !prev)}>
                    <img src="/images/comments.svg" alt="comment" />
                    <span>Comment</span>
                </button>
                <button>
                    <img src="/images/share.svg" alt="comment" />
                    <span>Send</span>
                </button>
            </div>
            {toggleComment && <>
                <div className="comment-input-bar">
                    <img src="/images/user.svg" alt="" />
                    <input type="text" placeholder="Add a comment..." value={commentInput} onChange={(e) => {
                        setCommentInput(e.target.value)
                    }} />
                    <button onClick={handleComment}>Comment</button>
                </div>
                {comments}
            </>}
        </div>
    )
}