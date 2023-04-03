import "../styles/Share.css"

export default function Share(props) {
    function addTolocalStorage() {
        const postsTillNow = JSON.parse(localStorage.getItem("allPosts"));
        const likesTillNow = JSON.parse(localStorage.getItem("likes"));
        postsTillNow.unshift({user: props.name, content: document.querySelector(".share-input input").value, comments: []});
        likesTillNow.unshift(0);
        localStorage.setItem("allPosts", JSON.stringify(postsTillNow));
        localStorage.setItem("likes", JSON.stringify(likesTillNow));
        document.querySelector(".share-input input").value = "";
        props.setNoOfPosts((prev) => prev+1);
    }

    return (
        <div className="share-container">
            <div className="share-input">
                <img src="/images/user.svg" alt="" />
                <input type="text" placeholder="Start a post"/>
                <button onClick={addTolocalStorage}>Post</button>
            </div>
            <div className="share-logo">
                <div className="share-box-feed-item">
                    <li-icon className="button-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="#378fe9">
                            <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                        </svg>
                    </li-icon>

                    <span className="share-box-feed-span">
                        Photo
                    </span>
                </div>
                <div className="share-box-feed-item">
                    <li-icon className="button-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="#5f9b41">
                            <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"></path>
                        </svg>
                    </li-icon>

                    <span className="share-box-feed-span">
                        Video
                    </span>
                </div>

                <div className="share-box-feed-item">
                    <li-icon className="button-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="#c37d16">
                            <path d="M3 3v15a3 3 0 003 3h12a3 3 0 003-3V3zm13 1.75A1.25 1.25 0 1114.75 6 1.25 1.25 0 0116 4.75zm-8 0A1.25 1.25 0 116.75 6 1.25 1.25 0 018 4.75zM19 18a1 1 0 01-1 1H6a1 1 0 01-1-1V9h14zm-5.9-3a1 1 0 00-1-1H12a3.12 3.12 0 00-1 .2l-1-.2v-3h3.9v1H11v1.15a3.7 3.7 0 011.05-.15 1.89 1.89 0 012 1.78V15a1.92 1.92 0 01-1.84 2H12a1.88 1.88 0 01-2-1.75 1 1 0 010-.25h1a.89.89 0 001 1h.1a.94.94 0 001-.88z"></path>
                        </svg>
                    </li-icon>
                    <span className="share-box-feed-span">
                        Event
                    </span>
                </div>

                <div className="share-box-feed-item">
                    <li-icon className="share-button-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="#e16745">
                            <path d="M21 3v2H3V3zm-6 6h6V7h-6zm0 4h6v-2h-6zm0 4h6v-2h-6zM3 21h18v-2H3zM13 7H3v10h10z"></path>
                        </svg>
                    </li-icon>
                    <span className="share-box-feed-span">
                        Write article
                    </span>
                </div>
            </div>
        </div>
    )
}

{/* <div className="share-box-feed">
    
</div> */}