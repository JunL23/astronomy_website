
function Thread_component({title, content}) {
    return (
        <div className="tc_container">
            <h2 className="tc_title">{title}</h2>
            <p className="tc_content">{content}</p>
        </div>
    )
}

export default Thread_component;