import "../styles/Comment.css"

export default function Comment(props) {
    return (
        <div className="comment">
            <div className="comment-image">
                <img src="/images/user.svg" alt="" />
            </div>
            <div className="comment-content">
                <span className="comment-user-name">{props.name}</span>
                <span className="user-comment">{props.content}</span>
            </div>
        </div>
    )
}