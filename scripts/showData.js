
//API KEY--- 11bbd8bdbcf44021a985342494f5e79d
// API ADD-----https://api.spoonacular.com/recipes/random?number=5&apiKey=11bbd8bdbcf44021a985342494f5e79d

async function makeAPIRequest(url){
    let res = await fetch(url); 
    let data = await res.json();
    console.log(data);
    if(data.recipes !== undefined){
        return data.recipes;
    }
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
        div.setAttribute('class', 'detailsBox');
        if(flag === undefined){
            div.onclick = () =>{
                console.log(data[el]);

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
        price.innerHTML = "<span>Price: </span>" + pricePerServing + " INR";

        div.append(img, titleName, typeDish, price);

        parrent.append(div);
    

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
            showdata(search, res);
        })
        .catch( (error) => {
            console.log(error);
        })
    },1000)
}

function showdata(search, data){
    let parrent = document.getElementById("popular");
    search.innerHTML = null;
    search.style.display = 'flex';

    data.forEach(({strMeal, strMealThumb}, el) => {
        let div = document.createElement('div');
        div.setAttribute('class', 'searchBox');
        div.onclick = () => {
            bodysingle(data[el], parrent, search);
        }
        
        let img = document.createElement('img');
        img.src = strMealThumb;

        let name = document.createElement('h4');
        name.textContent = strMeal;

        div.append(img, name);

        search.append(div);
    });
}

function appendResult(data, parrent, search){
    search.style.display = 'none';
    parrent.innerHTML = null;
    parrent.style.display = 'flex';

    data.forEach(({id, strMealThumb, strMeal, strArea, strCategory, strInstructions, strYoutube}) => {
        let div = document.createElement('div');
        div.setAttribute('class', 'box');

        
        let img = document.createElement('img');
        img.src = strMealThumb;

        let name = document.createElement('h3');
        name.textContent = strMeal;

        let area = document.createElement('h4');
        area.textContent = 'Food Origin: ' + strArea;

        let category = document.createElement('h4');
        category.textContent = 'Food Category: ' + strCategory;

        let des = document.createElement('p');
        des.textContent = strInstructions;

        div.append(img, name, area, category, des);

        parrent.append(div);
    })
}

function bodysingle(data, parrent, search){
    search.style.display = 'none';
    parrent.innerHTML = null;
    parrent.style.display = 'flex';
    document.getElementById("headSeaction").textContent = "Searched Results";

        let div = document.createElement('div');
        div.setAttribute('class', 'singleBox');
        let div1 = document.createElement("div")
        
        let img = document.createElement('img');
        img.src = data.strMealThumb;
        img.setAttribute("id","imgs")
        div1.append(img)
        let div2 = document.createElement("div")
        
        let name = document.createElement('h3');
        name.textContent = data.strMeal;

        let area = document.createElement('h4');
        area.textContent = 'Food Origin: ' + data.strArea;

        let category = document.createElement('h4');
        category.textContent = 'Food Category: ' + data.strCategory;

        let des = document.createElement('p');
        des.textContent = data.strInstructions;
        des.setAttribute("id","text1")
        div2.append(name, area, category, des);
        div.append(div1,div2)
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
        appendResult(res, parrent, search);
    })
    .catch( (error) => {
        console.log(error);
    })
}

export {onPageLoad, searchKeyword, clickButton, appendData};