
function News({title, content}) {
    return (
        <div className="news-blocks">
            <h3 style={{color: "white"}}>{title}</h3>
            <p style={{color: "white"}}>{content}</p>
        </div>
    )
};

export default News;