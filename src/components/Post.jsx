import { useEffect, useState } from "react"
import "../styles/Post.css"
import Comment from "./Comment"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function Post(props) {
    const [isLiked, setIsLiked] = useState(props.like);
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
            await updateDoc(doc(db, "posts", props.index), {
                likes: arrayRemove(auth.currentUser.uid)
            })
        }
        else {
            await updateDoc(doc(db, "posts", props.index), {
                likes: arrayUnion(auth.currentUser.uid)
            })
        }
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
                            <span>1m • </span>
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
                    <span>Like</span>
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