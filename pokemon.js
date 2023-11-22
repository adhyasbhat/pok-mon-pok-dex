
const searchbar = document.querySelector(".searchbar");
const pokemonGrid = document.querySelector("#pokemonGrid");
const noResult = document.querySelector(".noResult");
const more = document.querySelector(".more");
let selectedFilter, ability = mergedData;
let filterValue = document.getElementById("filterValue");
let calledBy = "";
let selectedAbility = ""
let min = 0;
let max = 16;
let add = 0;
let sub = 0;
let count = 0;
let dataFilter = mergedData;
const collapseBtn = document.querySelector(".collapseBtn");
let shuffelPokemon = [];
createPokemonGrid(min, max, dataFilter);
let num = {};

filterValue.addEventListener("change", function () {
  switch (filterValue.value) {
    case "lowest":
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
  pokemonGrid.innerHTML = "";
  collapseBtn.style.display = "none";
  displaySearchedPokemon(searchbar.value, filterValue.value, dataFilter,selectedAbility);
});

function createPokemonGrid(min, max, selectedFilter) {

  calledBy  = createPokemonGrid.caller
  if (max < selectedFilter.length) {
    displayPokemonGrid(min, max, selectedFilter);
    more.style.display = "block";
  } else if (selectedFilter.length == 0) {
    noResult.style.display = "block";
    more.style.display = "none";
  } else if (max >= selectedFilter.length) {
    displayPokemonGrid(min, max, selectedFilter);
    more.style.display = "none";
  } else {
    displayPokemonGrid(min, max, selectedFilter);
  }
}
searchbar.addEventListener("input", function () {
  displaySearchedPokemon(searchbar.value, filterValue.value, dataFilter,selectedAbility);
  add = 0;
  sub = 0;
});
console.log(selectedAbility)
function displaySearchedPokemon(searchBarValue, filterValue, dataFilter,abilityFilterValue) {

  min = 0;
  max = 16;
  collapseBtn.style.display = "none";
  pokemonGrid.innerHTML = "";
if (searchBarValue == "" && filterValue == "default" && abilityFilterValue == "") {
    selectedFilter = mergedData;
    createPokemonGrid(min, max, selectedFilter);

  } else if (searchBarValue == "" && filterValue == "default" && abilityFilterValue != "") {
    selectedFilter = sortByAbilities(abilityFilterValue,dataFilter)
    createPokemonGrid(min, max, selectedFilter);
    handleMore(max,selectedFilter)

  } 
  else if (searchBarValue == "" && filterValue != "default" && abilityFilterValue ==""){
    selectedFilter = dataFilter
    createPokemonGrid(min, max, selectedFilter);
  }
  else if(searchBarValue == "" && filterValue != "default" && abilityFilterValue != ""){
    selectedFilter = sortByAbilities(abilityFilterValue,dataFilter)
    createPokemonGrid(min, max, selectedFilter);
    handleMore(max,selectedFilter)
  }
  else if(searchBarValue != "" && filterValue == "default" && abilityFilterValue == ""){
    selectedFilter = filterBySearch(searchBarValue,dataFilter)
    createPokemonGrid(min, max, selectedFilter);
    handleMore(max,selectedFilter)
  }
  else if(searchBarValue != "" && filterValue == "default" && abilityFilterValue != ""){
    firstFilter = sortByAbilities(abilityFilterValue,dataFilter)
    selectedFilter = filterBySearch(searchBarValue,firstFilter)
    createPokemonGrid(min, max, selectedFilter);
    handleMore(max,selectedFilter)
  }
  else if (searchBarValue != "" && filterValue != "default" && abilityFilterValue == "") {
    selectedFilter = filterBySearch(searchBarValue,dataFilter)
      createPokemonGrid(min, max, selectedFilter);
      handleMore(max,selectedFilter)
    }
  else if(searchBarValue != "" && filterValue != "default" && abilityFilterValue !=""){
    firstFilter = sortByAbilities(abilityFilterValue,dataFilter)
    selectedFilter = filterBySearch(searchBarValue,firstFilter)
    createPokemonGrid(min, max, selectedFilter);
    handleMore(max,selectedFilter)
  }
}

function filterBySearch(searchBarValue,dataFilter){
  if (/^[a-zA-Z]+$/.test(searchBarValue)) {
    selectedFilterForSearch = dataFilter.filter((item) =>
      item.name.startsWith(
        searchBarValue.charAt(0).toUpperCase() +
          searchBarValue.slice(1).toLowerCase()
      )
    );
  } else if (/^\d+$/.test(searchBarValue)) {
    selectedFilterForSearch = dataFilter.filter((item) =>
      item.number.includes(searchBarValue)
    );
  }
  return selectedFilterForSearch
}

function handleMore(max,selectedFilter){
  if (max >= selectedFilter.length) {
    more.style.display = "none";
  } else {
    more.style.display = "block";
  }
}

function displayPokemonGrid(min, max, selectedFilter) {
  noResult.style.display = "none";
  const row = document.createElement("div");
  row.className = "eachRow row";
  selectedFilter.slice(min, max).forEach((item,index) => {
    const col = document.createElement("div");
    col.className = "pokemonCard m-1 my-2";

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

    col.append(pokNameNum, heightWeigth, typeImage);

    col.addEventListener("click", function () {
      const modalTitle = document.querySelector("#pokemonModal .modal-title");
      modalTitle.classList.add('bolder')
      modalTitle.innerText = item.name;

      const modalBody = document.querySelector("#pokemonModal .modal-body");
      modalBody.innerHTML = `
      <p class = 'd-flex justify-content-center'> <img src="${
        item.ThumbnailImage
      }" alt="${item.name}" class="modal-image"></p>
        <p> <span class='bold'>Number:</span> #${item.number}</p>
        <div class = 'bold '>Height and Weigth: <div class = 'pieChart' id = "heightAndWeigth${index}" > 
        </div></div>
        <p><span class = 'bold'>Ability:</span> ${item.abilities.join(", ")}</p>
        <p><span class = 'bold'>Types:</span> ${item.type.join(", ")}</p>
        <p> <span class ='bold'>Weekness:</span> ${item.weakness.join(", ")}</p>
        
      `;
      plotChart(item.height,item.weight,index)
      const myModal = new bootstrap.Modal(
        document.getElementById("pokemonModal")
      );
      myModal.show();
    });

    
    
    
    row.append(col);
  });
  pokemonGrid.append(row);
}
function addMore() {
  add++;
  if (min < 10 && max < 14) {
    min = min + 16;
    max = max + 16;
  } else {
    min = min + 17;
    max = max + 17;
  }
  if (calledBy === SurpriseMe)
  {
    console.log("addMore SurpriseMe")
    SurpriseMe('addMore')

  }
  else{
    createPokemonGrid(min, max, selectedFilter);
  }

  collapseBtn.style.display = "block";
}
function collapse() {
  more.style.display = "block";
  sub++;
  if (min < 10 && max < 14) {
    min = min - 16;
    max = max - 16;
  } else {
    min = min - 17;
    max = max - 17;
  }
  if (sub <= add) {
    pokemonGrid.removeChild(pokemonGrid.lastChild);
    if (sub == add) {
      collapseBtn.style.display = "none";
    }
  }
}

function sortByHighestNumber() {
  return [...mergedData].sort((a, b) => b.number - a.number);
}

function sortByHeight() {
  return [...mergedData].sort((a, b) => b.height - a.height);
}

function sortByWeigth() {
  number = [...mergedData].sort((a, b) => b.number - a.number)
  return [...number].sort((a, b) => b.weight - a.weight);
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




function SurpriseMe(val) {
  if (val === 'addMore') {
    console.log("addMoreeee surprise create ")
    const nextSet = shuffelPokemon.slice(0, 16);
    shuffel(nextSet);
    shuffelPokemon = shuffelPokemon.slice(16);
    createPokemonGrid(min, max, shuffelPokemon);
  } else {
    shuffelPokemon = [...mergedData];
    shuffel(shuffelPokemon);
    add = 0;
    sub = 0;

    searchbar.value = "";
    filterValue.value = "default";
    min = 0
    max =16
    collapseBtn.style.display = "none";
  pokemonGrid.innerHTML = "";
    createPokemonGrid(min, max, shuffelPokemon);
  }
}

function shuffel(pokemonShuffel) {
  for (let i = pokemonShuffel.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pokemonShuffel[i], pokemonShuffel[j]] = [
      pokemonShuffel[j],
      pokemonShuffel[i],
    ];
  }
}
