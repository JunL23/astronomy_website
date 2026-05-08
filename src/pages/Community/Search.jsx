import './community.css'

function Search({input, setinput, setForm, setsearchpost}) {
    const fetchpost = async () => {
        const response = await fetch('http://localhost:8000/find_post.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                search: input
            })
        });
        const json_data = await response.json();

        if (json_data.success && Array.isArray(json_data.post)) {
            setsearchpost(json_data.post);
        } else {
            alert('Failed to fetch post.');
        }
    }

    function reset() {
        setsearchpost([]);
        setinput('');
    }

    return (
        <div id="community-search">
            <h1 id="welcome-message">Welcome to the community page</h1>
            <p id="welcome-addition">A place to find the answer for your question</p>

            <div>
                <input type="text" id='community-search-box' onChange={(e) => {setinput(e.target.value)}} placeholder='Search'></input>
                <button id="community-search-button" onClick={fetchpost}>Search</button>
            </div>
            <button id="reset" onClick={reset} style={{marginTop: "20px"}}>Reset</button>
            <br/>
            <button id="make-post" onClick={() => setForm(true)}>Make a post</button>
        </div>
    );
}

export default Search;