
function Search({input, setinput}) {
    return (
        <div id="community-search">
            <h1 id="welcome-message">Welcome to the community page</h1>
            <p id="welcome-addition">A place to find the answer for your question</p>

            <input type="text" id='community-search-box' onChange={(e) => {setinput(e.target.value)}} placeholder='Search'></input>
            <button id="community-search-button">Search</button>
            <button id="make-post">Make a post</button>
        </div>
    );
}

export default Search;