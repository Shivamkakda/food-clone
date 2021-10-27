function navbar(){
    return `
    <div id="main">
    <div id ="left">
    <a href="./index.html">Home</a>
    </div>
        <span>
            <input type="text" id="keyword" placeholder="Enter keyword to search" >
            <button id="searchButton">Search</button>
            <hr>
        </span>
        <div id ="right">
        <a href="./receipeRandom.html">Receipe of The Day</a>
        <a href="./latest.html">Latest Receipe</a>
        </div>
        </div>`
}

function htmlDetails(){
    return `<div id="navCont">
    </div>
    <div id="search">
    </div>
    <div id="heading"><h2 id='headSeaction'> Popular Choices </h2>
    </div>
    <div id="popular">
    </div>`
}

export {htmlDetails, navbar};


