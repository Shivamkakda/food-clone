
//API KEY--- 11bbd8bdbcf44021a985342494f5e79d
// API ADD-----https://api.spoonacular.com/recipes/random?number=5&apiKey=11bbd8bdbcf44021a985342494f5e79d

async function makeAPIRequest(url){
    let res = await fetch(url); 
    let data = await res.json();
    console.log(data);
    if(data.recipes !== undefined){
        return data.recipes;
    }
    // if(data.recipes === undefined){
    //     console.log(data.results);
    //     return data.results;
    // }
    if(data.meals !== undefined){
        return data.meals;
    }
    if(data.results !== undefined){
        return data.results;
    }
}

function onPageLoad(parrent, url, flag){
    let data = makeAPIRequest(url);

    data.then((res) => {
        let parrent = document.getElementById('popular');
        appendData(res, parrent, flag);
    })
    .catch((error) => {
        console.log(error);
    })
}

function appendData(data, parrent, flag){

    data.forEach(({image, title, dishTypes, pricePerServing, healthScore, instructions, readyInMinutes, vegetarian, cuisines, summary}, el) => {
        let div = document.createElement('div');
        div.setAttribute('class', 'onLoadResutl');
        if(flag === undefined){
            div.onclick = () =>{
                console.log(data[el]);
                if(localStorage.getItem("foodId") === null){
                    localStorage.setItem("foodId", JSON.stringify(data[el]));
                }else{
                    localStorage.setItem("foodId", JSON.stringify(data[el]));
                }
                window.location.href = "./recipesDetails.html";
            }
        }
        
        let img = document.createElement('img');
        img.src = image;

        let titleName = document.createElement('h2');
        titleName.textContent = title;

        let typeDish = document.createElement('p');
        typeDish.innerHTML = "<span>Dish Type: </span>" + dishTypes;

        let price = document.createElement('p');
        price.setAttribute("class","prices")
        price.innerHTML = "<span>Price: </span>" + pricePerServing + " INR";

        div.append(img, titleName, typeDish, price);

        parrent.append(div);

        if(flag){
            let div2 = document.createElement('div');
            div2.setAttribute('class', 'onLoadResutl');
            let summaryRecipes = document.createElement('p');
            summaryRecipes.innerHTML = "<span>Summery: </span>" + summary;
            let area =  document.createElement('p');
            area.innerHTML = "<span>Origin: </span>" + cuisines;
            let vege = document.createElement('p');
            vege.innerHTML = "<span>vegetarian: </span>" + vegetarian;
            let health = document.createElement('p');
            health.innerHTML = "<span>Health Score: </span>" + healthScore;
            let time = document.createElement('p');
            time.innerHTML = "<span>Ready In Minutes: </span>" + readyInMinutes
            let instruct = document.createElement('p');
            instruct.innerHTML = "<span>Instructions: </span>" + instructions;

            div2.append(summaryRecipes, area, vege, health, time, instruct);

            parrent.append(div2);
        }

    });
}

let timeOut = false;
function searchKeyword(d){
    let keyword = document.getElementById("keyword").value;
    let search = document.getElementById("search");

    if(timeOut){
        clearTimeout(timeOut);
    }
    if(keyword.length < 1){
        search.style.display = 'none';
        return false;
    }
    timeOut = setTimeout( () =>{
        makeAPIRequest(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
        .then( (res) => {
            console.log(res);
            showSearchResult(search, res);
        })
        .catch( (error) => {
            console.log(error);
        })
    },1000)
}

function showSearchResult(search, data){
    let parrent = document.getElementById("popular");
    search.innerHTML = null;
    search.style.display = 'flex';

    data.forEach(({strMeal, strMealThumb}, el) => {
        let div = document.createElement('div');
        div.setAttribute('class', 'searchBox');
        div.onclick = () => {
            appendResultIntoBodySingle(data[el], parrent, search);
        }
        
        let img = document.createElement('img');
        img.src = strMealThumb;

        let titleName = document.createElement('h4');
        titleName.textContent = strMeal;

        div.append(img, titleName);

        search.append(div);
    });
}

function appendResultIntoBody(data, parrent, search){
    search.style.display = 'none';
    parrent.innerHTML = null;
    parrent.style.display = 'flex';

    data.forEach(({id, strMealThumb, strMeal, strArea, strCategory, strInstructions, strYoutube}) => {
        let div = document.createElement('div');
        div.setAttribute('class', 'appendSearchBox');

        let a = document.createElement('a');
        a.href = strYoutube;
        
        let img = document.createElement('img');
        img.src = strMealThumb;

        let titleName = document.createElement('h3');
        titleName.textContent = strMeal;

        let area = document.createElement('h4');
        area.textContent = 'Food Origin: ' + strArea;

        let cate = document.createElement('h4');
        cate.textContent = 'Food Category: ' + strCategory;

        let disc = document.createElement('p');
        disc.textContent = strInstructions;

        a.append(img, titleName, area, cate, disc);

        div.append(a);

        parrent.append(div);
    })
}

function appendResultIntoBodySingle(data, parrent, search){
    search.style.display = 'none';
    parrent.innerHTML = null;
    parrent.style.display = 'flex';
    document.getElementById("headSeaction").textContent = "Searched Results";

        let div = document.createElement('div');
        div.setAttribute('class', 'singleBox');

        let a = document.createElement('a');
        a.href = data.strYoutube;
        
        let img = document.createElement('img');
        img.src = data.strMealThumb;

        let titleName = document.createElement('h3');
        titleName.textContent = data.strMeal;

        let area = document.createElement('h4');
        area.textContent = 'Food Origin: ' + data.strArea;

        let cate = document.createElement('h4');
        cate.textContent = 'Food Category: ' + data.strCategory;

        let disc = document.createElement('p');
        disc.textContent = data.strInstructions;
        a.append(img, titleName, area, cate, disc);

        div.append(a);

        parrent.append(div);
}
function clickButton(){
    let keyword = document.getElementById("keyword").value;
    if(keyword.length < 1){
        return false;
    }
    document.getElementById("headSeaction").textContent = "Searched Results";
    let search = document.getElementById("search");
    let parrent = document.getElementById("popular");
    makeAPIRequest(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
    .then( (res) => {
        document.getElementById("keyword").value = "";
        appendResultIntoBody(res, parrent, search);
    })
    .catch( (error) => {
        console.log(error);
    })
}

export {onPageLoad, searchKeyword, clickButton, appendData};