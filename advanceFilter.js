const advanceTypeAndWeakness = document.querySelector(
  ".advanceTypeAndWeekness"
);
const abilityOptions = document.getElementById("abilityOptions");
const customDropdown = document.querySelector(".custom-dropdown");
const labelTitle = document.querySelector(".labelTitle");
const heightFilter = document.querySelectorAll(".heightFilter");
const weightFilter = document.querySelectorAll(".weightFilter");
let typeWeekness = {};
function sortByAbilities(valueSelected, dataFilter) {
  console.log(valueSelected);
  ability = dataFilter.filter((item) => item.abilities.includes(valueSelected));
  add = 0;
  sub = 0;
  console.log(ability);
  return ability;
}

function listOfAbilities() {
  uniqueAbility = new Set();
  mergedData.forEach((item) =>
    item.abilities.forEach((items) => uniqueAbility.add(items))
  );
  abilityListArray = Array.from(uniqueAbility);
  abilityOptions.innerHTML = "";
  abilityListArray.forEach((item) => {
    const abilityListItem = document.createElement("li");
    abilityListItem.textContent = item;
    abilityListItem.className = "option";
    abilityOptions.appendChild(abilityListItem);
  });

  abilityOptions.addEventListener("click", function (e) {
    selectedAbility = e.target.textContent;
    customDropdown.querySelector(".selected-option").textContent =
      selectedAbility;
    displaySearchedPokemon(
      searchbar.value,
      filterValue.value,
      dataFilter,
      selectedAbility
    );
    abilityOptions.style.display = "none";
  });
}
customDropdown.addEventListener("click", function () {
  abilityOptions.style.display =
    abilityOptions.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function (e) {
  if (!customDropdown.contains(e.target)) {
    abilityOptions.style.display = "none";
  }
});

customDropdown.addEventListener("blur", function () {
  abilityOptions.style.display = "none";
});

listOfAbilities();

function openAdvanceFilter() {
  document.getElementById("mySidenav").style.width = "100%";
}
function closeAdvanveFilter() {
  document.getElementById("mySidenav").style.width = "0";
}

const types = [
  "grass",
  "poison",
  "fire",
  "flying",
  "water",
  "bug",
  "normal",
  "dark",
  "electric",
  "psychic",
  "ice",
  "steel",
  "ground",
  "fairy",
  "fighting",
  "rock",
  "ghost",
  "dragon",
];

function createCheckboxes(containerId, options) {
  const checkboxesContainer = document.getElementById(containerId);

  options.forEach((option) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = option.toLowerCase();
    checkbox.value = option;
    checkbox.name = containerId === "typeCheckboxes" ? "type" : "weakness";
    checkbox.className = "checkbox mx-1";

    checkboxesContainer.appendChild(checkbox);
  });
}
function createLabel(item) {
  item.forEach((option) => {
    const label = document.createElement("label");
    label.htmlFor = option.toLowerCase();
    label.textContent = option;
    label.className = "label";
    labelTitle.appendChild(label);
  });
}
createLabel(types);
createCheckboxes("typeCheckboxes", types);

createCheckboxes("weaknessCheckboxes", types);
function searchTypeWeakness() {
  const selectedTypes = getSelectedCheckboxes("typeCheckboxes");
  let selectedWeaknesses = getSelectedCheckboxes("weaknessCheckboxes");
  selectedWeaknesses = selectedWeaknesses.map(
    (weakness) => weakness.charAt(0).toUpperCase() + weakness.slice(1)
  );
  console.log("Types:", selectedTypes);
  console.log("Weaknesses:", selectedWeaknesses);

  filteredData = ability.filter((item) => {
    const typesMatch =
      selectedTypes.length === 0 ||
      selectedTypes.some((type) => item.type.includes(type));
    const weaknessesMatch =
      selectedWeaknesses.length === 0 ||
      selectedWeaknesses.some((weakness) => item.weakness.includes(weakness));
    return typesMatch && weaknessesMatch;
  });

  console.log(filteredData);
}

function getSelectedCheckboxes(containerId) {
  const checkboxes = document.querySelectorAll(
    `#${containerId} input[type="checkbox"]:checked`
  );
  const selectedValues = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );
  return selectedValues;
}

let weightFilterToggle = { 1: false, 2: false };
let heightFilterToggle = { 1: false, 2: false };

function toggleFilter(filterType, val) {
  if (filterType === "weight") {
    if (!weightFilterToggle[val]) {
      if (val === 1) {
        lightWeight = ability.filter((value) => {
          document.querySelector(".minWeight").style.backgroundColor =
            "#306cb4";
          return value.weight < 4999;
        });
        console.log(lightWeight);
      } else if (val === 2) {
        document.querySelector(".maxWeight").style.backgroundColor = "#306cb4";
        heavyWeight = ability.filter((value) => {
          return value.weight > 4999;
        });
        console.log(heavyWeight);
      }
      weight = findHeightWeight(lightWeight, heavyWeight);
    } else {
      if (val === 1) {
        document.querySelector(".minWeight").style.backgroundColor = "";
        lightWeight = [];
      } else if (val === 2) {
        document.querySelector(".maxWeight").style.backgroundColor = "";
        heavyWeight = [];
      }
      weight = findHeightWeight(lightWeight, heavyWeight);
    }
    weightFilterToggle[val] = !weightFilterToggle[val];
  } else if (filterType === "height") {
    if (!heightFilterToggle[val]) {
      if (val === 1) {
        small = ability.filter((value) => {
          document.querySelector(".minHeight").style.backgroundColor =
            "#306cb4";
          return value.height < 1478;
        });
        console.log(small);
      } else if (val === 2) {
        document.querySelector(".maxHeight").style.backgroundColor = "#306cb4";
        large = ability.filter((value) => {
          return value.height > 1478;
        });
        console.log(large);
      }
      height = findHeightWeight(small, large);
    } else {
      if (val === 1) {
        document.querySelector(".minHeight").style.backgroundColor = "";
        small = [];
      } else if (val === 2) {
        document.querySelector(".maxHeight").style.backgroundColor = "";
        large = [];
      }
      height = findHeightWeight(small, large);
    }
    heightFilterToggle[val] = !heightFilterToggle[val];
  }
  if (height.length != 0 && weight.length != 0) {
    console.log(weight, "weight");
    console.log(height, "height");
    heigthWeightAdvanceFilter = height.filter((value) =>
      weight.includes(value)
    );
    console.log("combo of both", heigthWeightAdvanceFilter);
  } else {
    heigthWeightAdvanceFilter = finalFilter(height, weight);
  }
  console.log(heigthWeightAdvanceFilter);
}

function filterByWeight(val) {
  toggleFilter("weight", val);
}

function filterByheight(val) {
  toggleFilter("height", val);
}
function searchAdvanceFilter() {}

function findHeightWeight(val1, val2) {
  if (val1.length != 0 && val2.length != 0) {
    finalResult = val1.concat(val2);
    console.log("all finalResult", finalResult);
  } else {
    finalResult = finalFilter(val1, val2);
  }
  return finalResult;
}
function finalFilter(val1, val2) {
  if (val1.length != 0 && val2.length == 0) {
    finalResult = val1;
    console.log("val2", finalResult);
  } else if (val1.length == 0 && val2.length != 0) {
    finalResult = val2;
    console.log("val1", finalResult);
  } else {
    finalResult = ability;
    console.log("none finalResult", finalResult);
  }
  return finalResult;
}
