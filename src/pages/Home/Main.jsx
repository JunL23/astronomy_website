import { useState } from 'react';
import './Home.css'
import Log from './log';

function Main_component({ username }) {
    const [loglist, setLog] = useState([
        {
            title: "sample1",
            content: "sample content"
        },
        {
            title: "sample1",
            content: "sample content"
        },
        {
            title: "sample1",
            content: "sample content"
        },
        {
            title: "sample1",
            content: "sample content"
        }
    ]);

    return (
        <div id='main-container'>
            <h1>Hello {username}</h1>
            <div id='search'>
                <input type="text" id='object-input' placeholder='Sky object you want to observe'></input>
                <button id='object-submit'>+</button>
            </div>

            <div id='log-container'>
                <p>Past observation logs</p>
                <hr></hr>
                <div id='log-display'>
                    {loglist.map((logs, index) => {
                        return (
                            <Log title={logs.title} content={logs.content} key={index}></Log>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Main_component;