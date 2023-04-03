import "../styles/Rightside.css"

const Rightside = (props) => {
    return (
        <div className="rs-container">
            <div className="rs-follow-card">
                <div className="rs-title">
                    <span>LinkedIn News</span>
                    <img src="/images/feed-icon.svg" alt="" />
                </div>

                <ul className="rs-news-feed" >
                    <li className="news-module-storyline">
                        <div className="news-module-headline">
                            Top newsletters to follow
                        </div>
                        <span className="news-module-subtext">
                            Top news • 2,094 readers
                        </span>
                    </li>
                    <li className="news-module-storyline">
                        <div className="news-module-headline">
                            Brands on a collaboration spree
                        </div>
                        <span className="news-module-subtext">
                            1d ago • 3,094 readers
                        </span>
                    </li>
                    <li className="news-module-storyline">
                        <div className="news-module-headline">
                            Shorter wait for US visas
                        </div>
                        <span className="news-module-subtext">
                            3d ago • 2,094 readers
                        </span>
                    </li>
                    <li className="news-module-storyline">
                        <div className="news-module-headline">
                            Startups upbeat about hiring
                        </div>
                        <span className="news-module-subtext">
                            3d ago • 1,094 readers
                        </span>
                    </li>
                    <li className="news-module-storyline">
                        <div className="news-module-headline">
                            Alibaba to split ready spinoffs
                        </div>
                        <span className="news-module-subtext">
                            3d ago • 5,023 readers
                        </span>
                    </li>
                </ul>

                <span className="rs-recommendation">
                    Show more
                    <img src="/images/right-icon.svg" alt="" />
                </span>
            </div>
            <div className="rs-follow-card rs-banner-card">
                <img
                    src="https://about.linkedin.com/etc.clientlibs/settings/wcm/designs/gandalf/clientlibs/resources/images/og-social-share-image.jpg"
                    alt=""
                />
            </div>
        </div>
    );
};

export default Rightside;