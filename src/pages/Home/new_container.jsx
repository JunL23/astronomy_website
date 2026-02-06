import { useState } from "react";
import News from "./news";


function NewsContainer() {
    const [news_list, setlist] = useState([
        {
            title: "sample title",
            content: "sample content"
        },
        {
            title: "sample title",
            content: "sample content"
        },
        {
            title: "sample title",
            content: "sample content"
        },
        {
            title: "sample title",
            content: "sample content"
        },
        {
            title: "sample title",
            content: "sample content"
        }
    ])
    return (
        <div id="news-container">
            {news_list.map((news, index) => {
                return <News title={news.title} content={news.content} key={index}></News>
            })}
        </div>
    )
};


export default NewsContainer;