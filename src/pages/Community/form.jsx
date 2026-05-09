import { useState } from "react";

function Form({setForm}) {
    const [title, settitle] = useState("");
    const [content, setcontent] = useState("");

    const post = async (title, content) => {
        const time = Date.now();
        const response = await fetch('https://junrongliu.rhody.dev/astronomy_website/backend/post.php', {
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                content: content,
                time: time
            })
        });
        const json_data = await response.json();
        console.log(json_data);

        if(!json_data['Success']) {
            return;
        }
    }

    const submit_post = (e) => {
        e.preventDefault();
        post(title, content);
        setForm(false);
    }

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h1>Make a new post</h1>

            <form onSubmit={submit_post}>
                <div style={{display: "grid", gridTemplateColumns: "200px 1fr", gap: "20px"}}>
                    <label><b>Title: </b></label>
                    <input id="post-input" type="text" placeholder="Please type in the title of your post" onChange={(e) => {settitle(e.target.value)}}></input>
                    
                    <label><b>Content: </b></label>
                    <textarea id="post-content" placeholder="Please type in the content of your post" onChange={(e) => {setcontent(e.target.value)}}></textarea>

                <div style={{style: "flex", justifyContent: "center", gap: "20px", gridColumn: "1 / -1"}}>
                    <button id="cancel" onClick={() => setForm(false)} style={{marginTop: "30px", width: "200px", backgroundColor: "red"}}>Cancel</button>
                    <br/>
                    <button id="post-submit" style={{marginTop: "30px", width: "200px", backgroundColor: "lightgreen"}}>Post</button>
                </div>
                </div>
            </form>
        </div>
    );
}

export default Form;