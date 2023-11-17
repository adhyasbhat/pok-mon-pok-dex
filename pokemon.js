const searchbar = document.querySelector(".searchbar");
const pokemonGrid = document.querySelector("#pokemonGrid");
const noResult = document.querySelector(".noResult");
const more = document.querySelector(".more");
let selectedFilter = mergedData
let filterValue = document.getElementById("filterValue");
let min = 0;
let max = 16;
let add = 0;
let sub = 0;
let count = 0;
let dataFilter = mergedData;
const collapseBtn = document.querySelector(".collapseBtn");

createPokemonGrid(min, max,dataFilter);

let num = {};

filterValue.addEventListener("change", function () {
  switch (filterValue.value) {
    case "default":
      dataFilter = mergedData;
      break;
    case "atoz":
      dataFilter = sortByA_Z();
      break;
    case "ztoa":
      dataFilter = sortByZ_A();
      break;
    case "height":
      dataFilter = sortByHeight();
      break;
    case "weigth":
      dataFilter = sortByWeigth();
      break;
    case "highest":
      dataFilter = sortByHighestNumber();
      break;
  }
  add = 0;
  sub = 0;
  // count = 0;
  pokemonGrid.innerHTML = "";
  collapseBtn.style.display = "none";
  displaySearchedPokemon(searchbar.value,filterValue.value,dataFilter)
});

function createPokemonGrid(min, max,selectedFilter) {
  if(max<selectedFilter.length){
    displayPokemonGrid(min,max,selectedFilter)
    more.style.display = "block"
  }
  else if (selectedFilter.length == 0) {
    noResult.style.display = "block";
     more.style.display = "none";
  } 
  else if(max >= selectedFilter.length){
    displayPokemonGrid(min,max,selectedFilter)
     more.style.display = "none";
    
  }
  else {
    displayPokemonGrid(min,max,selectedFilter)
  }
}
searchbar.addEventListener("input", function () {
  displaySearchedPokemon(searchbar.value,filterValue.value,dataFilter);
  add = 0
  sub = 0
}); 

function displaySearchedPokemon(searchBarValue,filterValue,dataFilter) {
  min = 0
  max = 16
  collapseBtn.style.display = "none"
  pokemonGrid.innerHTML = "";
  if((searchBarValue == "" && filterValue == 'default'))
  {
    selectedFilter =  mergedData
     createPokemonGrid(min, max,selectedFilter);
  }
  else if(searchBarValue == "" && filterValue != "default"){
    selectedFilter = dataFilter
    createPokemonGrid(min,max,selectedFilter)
  }
  else if (searchBarValue !== "" || filterValue !== "default") {
    if (/^[a-zA-Z]+$/.test(searchBarValue)) {
        selectedFilter = dataFilter.filter(item => item.name.startsWith(searchBarValue.charAt(0).toUpperCase() + searchBarValue.slice(1).toLowerCase()));
    } else if (/^\d+$/.test(searchBarValue)) {
        selectedFilter = dataFilter.filter(item => item.number.includes(searchBarValue));
    }
   
    createPokemonGrid(min, max, selectedFilter);
    if(max >= selectedFilter.length){
      more.style.display = "none"
    }
    else{
      more.style.display = "block"
    }
    // lengthOfData(selectedFilter);
}

}
function displayPokemonGrid(min,max,selectedFilter){
  noResult.style.display = "none";
  const row = document.createElement("div");
  row.className = "eachRow row";
  selectedFilter.slice(min, max).forEach((item) => {

    const col = document.createElement("div");
    col.className = "pokemonCard m-1 my-2";

    const pokNameNum = document.createElement("div")
    pokNameNum.classList = "pokNameNum col-12 d-flex" 

    const pokemonNames = document.createElement("div");
    pokemonNames.className = "pokemonName col-10";
    pokemonNames.innerText = item.name;

    const pokemonNumber = document.createElement("div")
    pokemonNumber.classList = "pokemonNum col-2"
    pokemonNumber.innerHTML ="#"+ item.number

    pokNameNum.append(pokemonNames,pokemonNumber)

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
    pokemonType.className =
      "typeOfPokemon col-6 d-flex justify-content-start";
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

    col.append(pokNameNum, heightWeigth, typeImage);
    row.append(col);
  });
  pokemonGrid.append(row);
}
function addMore(){
  add++

  if(min <10 && max <14){
    min = min +16
    max = max + 16
  }
  else{
    min = min + 17
    max = max + 17
  }
  
  createPokemonGrid(min,max,selectedFilter)
  collapseBtn.style.display = "block"

}
function collapse(){
  more.style.display = "block"
  console.log(add)
  console.log(sub)
  sub++
  if(min <10 && max <14){
    min = min -16
    max = max - 16
  }
  else{
    min = min - 17
    max = max - 17
  }
 if(sub<=add){
  pokemonGrid.removeChild(pokemonGrid.lastChild);
  if(sub == add){
    collapseBtn.style.display = "none"
  }
 }
}


// function lengthOfData(data){
//   if(data.length<16){
//     more.style.display="none"
//     collapseBtn.style.display="none"
//   }
//   else{
//     more.style.display="block"
//   }
// }
// function addMore() {
//   console.log(selectedFilter.length)
//   console.log('max in add :',max)
//   if(max>= selectedFilter.length){
//     more.style.display = "none";
//   }
//   else{
//     add++;
//     console.log("min:",min,"max",max)
//     min = max + 1;
//     max = max + 17;
//     console.log(selectedFilter)
//     createPokemonGrid(min, max,selectedFilter);
//     collapseBtn.style.display = "block";
//   }
 
// }
// function collapse() {
//   more.style.display = "block"
//   sub++;
//   if (sub == add + 1) {
//     collapseBtn.style.display = "none";
//     add = 0;
//     sub = 0;
   
  
//   } else {
//     count++;
//     pokemonGrid.removeChild(pokemonGrid.lastChild);
//     min = min - 16
//     max = max - 16
//     if (count == add) {
//       collapseBtn.style.display = "none";
//       more.style.display = "block"
//     }
//   }
// }

function sortByHighestNumber() {
  return [...mergedData].sort((a, b) => b.number - a.number);
}

function sortByHeight() {
  return [...mergedData].sort((a, b) => a.height - b.height);
}

function sortByWeigth() {
  return [...mergedData].sort((a, b) => a.weight - b.weight);
}

function sortByA_Z() {
  return [...mergedData].sort((a, b) => a.name.localeCompare(b.name));
}

function sortByZ_A() {
  return [...mergedData].sort((a, b) => b.name.localeCompare(a.name));
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
