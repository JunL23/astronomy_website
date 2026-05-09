import Thread_component from "./thread_component";
import "./community.css";
import { useEffect, useState } from "react";

function Thread({form, searchpost}) {
    const [post, setpost] = useState([]);

    useEffect(() => {
        const fetchpost = async () => {
            try {
                const response = await fetch("https://junrongliu.rhody.dev/astronomy_website/backend/get_post.php");
                const data = await response.json();
                if (data.success && Array.isArray(data.post)) {
                    setpost(data.post); // Ensure data.post is an array
                } else {
                    alert('Failed to fetch post.');
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchpost();
    }, [form]);

    const display = searchpost.length > 0 ? searchpost : post;

    return(
        <div id="tc_main_container">
            {display.map((data, index) => {
                return <Thread_component key={index} title={data.title} content={data.content}/>
            })}
        </div>
    );
}

export default Thread;