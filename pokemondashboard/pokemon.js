// const { response } = require("express");

const authentication = localStorage.getItem("authenticate");
if (authentication != "allowed") {
  window.location.href = "/";
}

const searchbar = document.querySelector(".searchbar");
const pokemonGrid = document.querySelector("#pokemonGrid");
const noResult = document.querySelector(".noResult");
const more = document.querySelector(".more");
const userID = document.querySelector(".userID");
var selectedFilter = [];
var dataFilter = mergedData;
var filteredData = mergedData;
var advanceFilter = mergedData;
var combinedFilter = [];
var filterValue = document.getElementById("filterValue");
var calledBy = "";
var advanceCalledBy = "";
var selectedAbility = "";
var min = 0;
var max = 16;
var add = 0;
var sub = 0;
var count = 0;
const collapseBtn = document.querySelector(".collapseBtn");
var shuffelPokemon = [];
var num = {};
var small = [];
var large = [];
var lightWeight = [];
var heavyWeight = [];
var heigthWeightAdvanceFilter = [];
var height = [];
var checkboxFilter = [];
var heigthWeightAdvanceFilter = [];
var ability = [];
var weight = [];
var count = 0;
var listOfLikedPokemon = [];
var completeUsername;

filterValue.addEventListener("change", function () {
  switch (filterValue.value) {
    case "lowest":
      dataFilter = sortByLowestNumber();
      break;
    case "atoz":
      dataFilter = sortByA_Z();
      break;
    case "ztoa":
      dataFilter = sortByZ_A();
      console.log(dataFilter);
      break;
    case "height":
      dataFilter = sortByHeight();
      console.log(dataFilter);
      break;
    case "weigth":
      dataFilter = sortByWeigth();
      console.log(dataFilter);
      break;
    case "highest":
      dataFilter = sortByHighestNumber();
      break;
  }
  add = 0;
  sub = 0;
  pokemonGrid.innerHTML = "";
  collapseBtn.style.display = "none";
  displaySearchedPokemon(searchbar.value, dataFilter);
});

function createPokemonGrid(min, max, selectedFilter) {
  calledBy = createPokemonGrid.caller;
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
  displaySearchedPokemon(searchbar.value, combinedFilter);
  add = 0;
  sub = 0;
});
function displaySearchedPokemon(searchBarValue, filterValue) {
  min = 0;
  max = 16;
  collapseBtn.style.display = "none";
  pokemonGrid.innerHTML = "";
  advanceCalledBy = displaySearchedPokemon.caller;
  if (advanceCalledBy === combinedAdvanceFilter && filterValue.length == 0) {
    selectedFilter = filterValue;
    createPokemonGrid(min, max, selectedFilter);
  } else if (searchBarValue == "" && filterValue == "") {
    createPokemonGrid(min, max, mergedData);
  } else if (searchBarValue != "" && filterValue == "") {
    selectedFilter = filterBySearch(searchBarValue, mergedData);
    createPokemonGrid(min, max, selectedFilter);
  } else if (searchBarValue != "" && filterValue != "") {
    selectedFilter = filterBySearch(searchBarValue, filterValue);
    createPokemonGrid(min, max, selectedFilter);
  } else {
    selectedFilter = filterValue;
    createPokemonGrid(min, max, selectedFilter);
  }
}

function filterBySearch(searchBarValue, dataFilter) {
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
  console.log(selectedFilterForSearch);
  return selectedFilterForSearch;
}

function handleMore(max, selectedFilter) {
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
  selectedFilter.slice(min, max).forEach((item, index) => {
    const col = document.createElement("div");
    col.className = "pokemonCard m-1 my-2";

    const likeCol = document.createElement("div");
    likeCol.classList = "likeCol col-12 d-flex";

    const like = document.createElement("img");

    const isInLiked = listOfLikedPokemon[0]?.pokemonData?.some(
      (liked) => liked.name === item.name
    );

    like.classList = "likeBtn";
    like.src = isInLiked ? "../img/heart.png" : "../img/emptyheart.png";

    likeCol.append(like);

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

    like.addEventListener("click", function () {
      event.stopPropagation(); // Prevents the click event from bubbling up
      count = count + 1;
      console.log(count);
      const regex = /^(https?:\/\/[^\/]+\/)([^\/]+)(.*)$/;
      const updatedURL = like.src.replace(regex, "../$2$3");
      const currentSrc = updatedURL;
      const emptyHeart = "../img/emptyheart.png";
      const filledHeart = "../img/heart.png";
      like.src = currentSrc === emptyHeart ? filledHeart : emptyHeart;
      if (currentSrc == emptyHeart) {
        const likedPokemonName = item;
        handleLikedDislikePokemon(1, likedPokemonName);
      } else if (currentSrc == filledHeart) {
        const dislikedPokemonName = item;
        handleLikedDislikePokemon(2, dislikedPokemonName);
      }
    });
    col.append(likeCol, pokNameNum, heightWeigth, typeImage);

    pokemonImage.addEventListener("click", function () {
      const modalTitle = document.querySelector("#pokemonModal .modal-title");
      modalTitle.classList.add("bolder");
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
      plotChart(item.height, item.weight, index);

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
  if (calledBy === SurpriseMe) {
    console.log("addMore SurpriseMe");
    SurpriseMe("addMore");
  } else {
    if (selectedFilter == "") {
      createPokemonGrid(min, max, mergedData);
    } else {
      createPokemonGrid(min, max, selectedFilter);
    }
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
function sortByLowestNumber() {
  if (combinedFilter.length == 0) {
    return [...mergedData].sort((a, b) => a.number - b.number);
  } else {
    return [...combinedFilter].sort((a, b) => a.number - b.number);
  }
}
function sortByHighestNumber() {
  if (combinedFilter.length == 0) {
    return [...mergedData].sort((a, b) => b.number - a.number);
  } else {
    return [...combinedFilter].sort((a, b) => b.number - a.number);
  }
}

function sortByHeight() {
  if (combinedFilter.length == 0) {
    return [...mergedData].sort((a, b) => b.height - a.height);
  } else {
    return [...combinedFilter].sort((a, b) => b.height - a.height);
  }
}
function sortByHeightAscending() {
  if (combinedFilter.length == 0) {
    return [...mergedData].sort((a, b) => a.height - b.height);
  } else {
    return [...combinedFilter].sort((a, b) => a.height - b.height);
  }
}
function sortByWeigth() {
  if (combinedFilter.length == 0) {
    number = [...mergedData].sort((a, b) => b.number - a.number);
  } else {
    number = [...combinedFilter].sort((a, b) => b.number - a.number);
  }
  return [...number].sort((a, b) => b.weight - a.weight);
}
function sortByWeightAscending() {
  if (combinedFilter.length == 0) {
    return [...mergedData].sort((a, b) => a.weight - b.weight);
  } else {
    return [...combinedFilter].sort((a, b) => a.weight - b.weight);
  }
}
function sortByA_Z() {
  if (combinedFilter.length == 0) {
    return [...mergedData].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    return [...combinedFilter].sort((a, b) => a.name.localeCompare(b.name));
  }
}

function sortByZ_A() {
  if (combinedFilter.length == 0) {
    return [...mergedData].sort((a, b) => b.name.localeCompare(a.name));
  } else {
    return [...combinedFilter].sort((a, b) => b.name.localeCompare(a.name));
  }
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
  if (val === "addMore") {
    console.log("addMoreeee surprise create ");
    const nextSet = shuffelPokemon.slice(0, 16);
    shuffel(nextSet);
    shuffelPokemon = shuffelPokemon.slice(16);
    createPokemonGrid(min, max, shuffelPokemon);
  } else {
    shuffelPokemon = mergedData;
    shuffel(shuffelPokemon);
    add = 0;
    sub = 0;
    searchInput.value = "";
    Array.from(checkboxes).forEach((checkbox) => {
      checkbox.checked = false;
    });
    document.querySelector(".maxHeight").style.backgroundColor = "";
    document.querySelector(".minWeight").style.backgroundColor = "";
    document.querySelector(".maxWeight").style.backgroundColor = "";
    document.querySelector(".minWeight").style.backgroundColor = "";
    combinedFilter = "";
    searchbar.value = "";
    filterValue.value = "default";
    searchbar.disabled = false;
    filterValue.disabled = false;
    searchbar.classList.remove("disableField");
    filterValue.classList.remove("disableField");
    min = 0;
    max = 16;
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
fetch("/user")
  .then((response) => response.json())
  .then((data) => {
    // Access the username from the response and update the frontend
    completeUsername = data.userDeatils;
    console.log("data got", data);
    const name = data.userDeatils.replace(/@.*/, "");
    userID.innerHTML = name;
    getDataFromDB();
  })
  .catch((error) => console.error("Error:", error));

async function handleLikedDislikePokemon(num, pokemon) {
  if (num == 1) {
    // listOfLikedPokemon.push(pokemon)
    // console.log(completeUsername)
    const username = completeUsername;
    const pokemonData = pokemon;
    const pokemonID = pokemon.id;
    console.log("pokemonData in front end", pokemonData);
    try {
      console.log(
        "/user/ >> response",
        `/user/${username}/addpokemon/${pokemonID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pokemonSet: pokemonData }),
        }
      );
      const response = await fetch(
        `/user/${username}/addpokemon/${pokemonID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pokemonSet: pokemonData }),
        }
      );

      if (response.ok) {
        console.log("pokemon added");
      } else {
        console.log("couldn't add");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else if (num == 2) {
    //  listOfLikedPokemon =  listOfLikedPokemon.filter(item => item.id !== pokemon.id)
    const username = completeUsername;
    const pokemonData = pokemon.id;
    try {
      await fetch(`/user/${username}/removepokemon/${pokemonData}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

function getDataFromDB() {
  const username = completeUsername;
  console.log(username);
  fetch(`/getLikedPokemon/${username}`)
    .then((response) => response.json())
    .then((data) => {
      listOfLikedPokemon = data;
      console.log(listOfLikedPokemon);
      createPokemonGrid(min, max, dataFilter);
    });
}
function logout() {
  localStorage.setItem("authenticate", "notallowed");
  window.location.href = "/";
}
function redirectCompare() {
  window.location.href = "/compare.html";
}
