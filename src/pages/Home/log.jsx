
function Log({title, content}) {
    return (
        <div className="log-simple">
            <h2>{title}</h2>
            <hr/>
            <p>{content}</p>
        </div>
    )
};

export default Log;