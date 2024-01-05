// const { response } = require("express");
const authentication = localStorage.getItem("authenticate")
if(authentication != "allowed")
{
  window.location.href = '/'
}
var completeUsername
// var favPokemonList
const userID = document.querySelector("#userID")
const pokemonGrid = document.querySelector("#pokemonGrid");
fetch('/user')
    .then(response => response.json())
    .then(data => {
      // Access the username from the response and update the frontend
      completeUsername = data.userDeatils
      console.log(completeUsername)
      const name = data.userDeatils.replace(/@.*/, '')
      username.innerHTML = name
      getFavPokemon(completeUsername)
    })
    .catch(error => console.error('Error:', error));
  
function showPreview(event){
    if(event.target.files.length > 0){
        console.log(event.target.files[0].name)
      var src = URL.createObjectURL(event.target.files[0]);
      console.log(src)
      var preview = document.getElementById("file-ip-1-preview");
      preview.src = scr;
      preview.style.display = "block";
    }
  }

  async function getFavPokemon(completeUsername){

  try{
    const response = await fetch(`/user/${completeUsername}`);
    if(response.ok){
      const pokemonData = await response.json();
      favPokemonList = pokemonData
      createFavPokemon(pokemonData)
        console.log('Favorite Pokémon:', pokemonData);
    }
    else{
      console.log('Error:', response.status);
    }
  }
  catch(error){
    console.log(error)
  }
  }

 function createFavPokemon(pokemonData)
 {
    const row = document.createElement("div");
    row.className = "eachRow row";

    pokemonData.forEach((item)=>{
    const col = document.createElement("div");
    col.className = "pokemonCard m-1 my-2";
    const remove = document.createElement("img")
    remove.classList = "remove"
    remove.src= "../img/delete-button.png"
    const pokNameNum = document.createElement("div");
    pokNameNum.classList = "pokNameNum col-12 d-flex";
    const pokemonNames = document.createElement("div");
    pokemonNames.className = "pokemonName col-10";
    pokemonNames.innerText = item.name;
    const pokemonNumber = document.createElement("div");
    pokemonNumber.classList = "pokemonNum col-2";
    pokemonNumber.innerHTML = "#" + item.number;
    pokNameNum.append(pokemonNames, pokemonNumber);
    const heightWeigth = document.createElement("div");
    heightWeigth.className = "heightWeigthCol col-12 d-flex";

    const pokemonHeight = document.createElement("div");
    pokemonHeight.className = "pokeHeight col-6";
    pokemonHeight.innerHTML = "H : " + item.height + "m";

    const pokemonWeight = document.createElement("div");
    pokemonWeight.className = "pokeWeigth col-6";
    pokemonWeight.innerHTML = "W : " + item.weight + "kg";
    heightWeigth.append(pokemonHeight, pokemonWeight);

    const typeImage = document.createElement("div");
    typeImage.className = "typeImageCol col-12 d-flex";

    const pokemonType = document.createElement("div");
    pokemonType.className = "typeOfPokemon col-6 d-flex justify-content-start";
    const pokeType = document.createElement("div");
    pokeType.className = "pokeType";
    item.type.forEach((types) => {
      const eachType = document.createElement("div");
      eachType.className = "eachType col-10 m-3 p-1";
      styleForType(eachType, types);
      eachType.innerText = types;
      pokeType.append(eachType);
    });
    pokemonType.append(pokeType);
    const pokemonImage = document.createElement("img");
    pokemonImage.className = "imageDiv col-6";
    pokemonImage.src = item.ThumbnailImage;
    typeImage.append(pokemonType, pokemonImage);
    remove.addEventListener("click",async function(){
        const username = completeUsername
        const pokemonData = item.id
        console.log(completeUsername)
        console.log(item.id)
        try{
            const response = await fetch(`/user/${username}/removepokemon/${pokemonData}`, {
            method: "DELETE",
          });
          if (response.ok) {
            // Remove the corresponding HTML elements from the DOM if deletion is successful
            row.removeChild(col); // Remove the entire col element containing the deleted Pokémon
          } else {
            console.error("Error:", response);
          }
         }
         catch (error){
          console.error("Error:", error);
         }
        
    })
    col.append(remove,pokNameNum, heightWeigth, typeImage);
    row.append(col);
    })
    pokemonGrid.append(row);
 }
 function styleForType(div, val) {
    const blue = ["ice", "water", "poison", "flying"];
    const green = ["grass", "normal", "ground"];
    const red = ["fire", "bug", "dragon"];
    const yellow = ["electric", "psychic", "fighting", "fairy"];
    const grey = ["dark", "steel", "rock", "ghost"];
    if (blue.includes(val)) {
      div.classList.add("blue");
    } else if (green.includes(val)) {
      div.classList.add("green");
    } else if (red.includes(val)) {
      div.classList.add("red");
    } else if (yellow.includes(val)) {
      div.classList.add("yellow");
    } else if (grey.includes(val)) {
      div.classList.add("grey");
    }
  }
 async function myfriends(){
    const request = {
        method: "POST",
        body: JSON.stringify({username}),
        headers: {
            "Content-Type": "application/json"
        }
    };
  try{
    const response = await fetch("/createuser", request);
    const data = await response.json();
    if (data.error) {
        console.log("couldnt add")
    } 
    else {
       console.log("added friend")
    }

  }
  catch(error){
    console.error("Error:", error);
  }
  }