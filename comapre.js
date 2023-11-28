const dropDown1 = document.querySelector(".dropDown1");
const dropDown2 = document.querySelector(".dropDown2");
const pokemon1Details = document.querySelector(".pokemon1Details");
const pokemon2Details = document.querySelector(".pokemon2Details");
const compareBtn = document.querySelector(".compareBtn");
const winningPokemon = document.querySelector(".winningPokemon");
const vs = document.querySelector(".vs");
const winner = document.querySelector(".winner");
const searchBox2 = document.querySelector(".searchBox2");
const searchBox1 = document.querySelector(".searchBox1");
var firstPokemon = {};
var secondPokemon = {};
const mergedDataNames = mergedData.map((item) => item.name.toLowerCase());
function pokemonDropdown(num) {
  const searchBox = document.querySelector(`.searchBox${num}`);
  const searchText = searchBox.value.toLowerCase();
  const dropDown = document.querySelector(`.dropDown${num}`);
  dropDown.innerHTML = "";

  mergedData.forEach((item) => {
    if (item.name.toLowerCase().startsWith(searchText)) {
      const listItem = document.createElement("li");
      listItem.textContent = item.name;
      listItem.className = "pokemonName";
      listItem.onclick = function () {
        dropDown.style.display = "none";
        displaySelectedPokemon(item.name, num);
      };
      dropDown.appendChild(listItem);
    }
  });
  dropDown.style.display = "block";
}
function closeDropdowns() {
  const dropDowns = document.querySelectorAll(".dropDown1, .dropDown2");
  dropDowns.forEach((dropDown) => {
    dropDown.style.display = "none";
  });
}

document.body.addEventListener("click", function (event) {
  const isDropDownClick = event.target.classList.contains("pokemonName");
  if (!isDropDownClick) {
    closeDropdowns();
  }
});
function displaySelectedPokemon(value, num) {
  const selected = mergedData.find((item) => item.name === value);
  selectedPokemon(selected, num);
  const detailsElement = document.querySelector(`.pokemon${num}Details`);
  detailsElement.innerHTML = `
    <div class="wholeDetails">
      <div class="selectedImgDiv col-12 d-flex justify-content-center">
        <img class="selectedImg" src="${selected.ThumbnailImage}">
      </div>
      <div class="nameDiv col-12 d-flex justify-content-center">${
        selected.name
      }</div>
      <div class="heightWeigthCol col-12 d-flex">
        <div class="pokeHeight col-6">H : ${selected.height}m</div>
        <div class="pokeWeigth col-6">W : ${selected.weight}kg</div>
      </div>
      <div class="typeOfPokemon col-12 d-flex justify-content-start pokemonTypeCompare">
        <div class="type my-1">Type: ${selected.type.join(", ")}</div>
      </div>
      <div class="weekness col-12 d-flex justify-content-start">
        <div class="weak my-1">Weakness: ${selected.weakness
          .join(", ")
          .toLowerCase()}</div>
      </div>
    </div>`;
  detailsElement.style.display = "block";
  if (
    pokemon1Details.innerHTML.trim() != "" &&
    pokemon2Details.innerHTML.trim() != ""
  ) {
    compareBtn.style.display = "block";
    vs.style.display = "block";
  }
}
function compare() {
  winningPokemon.style.display = "block";
  winner.style.display = "block";
  compareBtn.style.display = "none";
  vs.classList.add("rotate");
  setTimeout(calculate, 2000);
}
function selectedPokemon(pokemon, num) {
  if (num == 1) {
    firstPokemon = pokemon;
    console.log(firstPokemon.name);
    searchBox1.value = firstPokemon.name;
  } else {
    secondPokemon = pokemon;
    searchBox2.value = secondPokemon.name;
  }
}
function calculate() {
  vs.classList.remove("rotate");
  console.log(secondPokemon);
  const first = firstPokemon.type.filter((type) =>
    secondPokemon.weakness.some(
      (weakness) => weakness.toLowerCase() === type.toLowerCase()
    )
  );

  const second = secondPokemon.type.filter((type) =>
    firstPokemon.weakness.some(
      (weakness) => weakness.toLowerCase() === type.toLowerCase()
    )
  );

  if (first.length > second.length) {
    winner.innerHTML = firstPokemon.name;
    console.log();
  } else if (first.length < second.length) {
    winner.innerHTML = secondPokemon.name;
  } else if (
    first.length == secondPokemon.length ||
    (first == "" && second == "")
  ) {
    firstAvg = (firstPokemon.height + firstPokemon.weight) / 2;
    secondAvg = (secondPokemon.height + secondPokemon.weight) / 2;
    if (firstAvg > secondAvg) {
      winner.innerHTML = firstPokemon.name;
    } else if (firstAvg < secondAvg) {
      winner.innerHTML = secondPokemon.name;
    } else {
      winner.innerHTML = "DRAW";
    }
  }
}
