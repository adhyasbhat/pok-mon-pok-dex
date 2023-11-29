const advanceTypeAndWeakness = document.querySelector(
  ".advanceTypeAndWeekness"
);
const abilityOptions = document.getElementById("abilityOptions");
const customDropdown = document.querySelector(".custom-dropdown");
const labelTitle = document.querySelector(".labelTitle");
const heightFilter = document.querySelectorAll(".heightFilter");
const weightFilter = document.querySelectorAll(".weightFilter");
const searchInput = document.getElementById("abilitySearch");
let typeWeekness = {};
var selectedTypes = []
var selectedWeaknesses =[]
var checkBoxesSelected = 0
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
function sortByAbilities(valueSelected) {
  ability = advanceFilter.filter((item) => item.abilities.includes(valueSelected));
  add = 0;
  sub = 0;
  console.log("ability",ability)
}


function listOfAbilities() {
  uniqueAbility = new Set();
  mergedData.forEach((item) =>
    item.abilities.forEach((items) => uniqueAbility.add(items))
  );
  abilityListArray = Array.from(uniqueAbility);
  

  const defaultOption = document.createElement("li");
  defaultOption.textContent = "Select all";
  defaultOption.className = "option";
  abilityOptions.appendChild(defaultOption);

  abilityListArray.forEach((item) => {
    const abilityListItem = document.createElement("li");
    abilityListItem.textContent = item;
    abilityListItem.className = "option";
    abilityOptions.appendChild(abilityListItem);
  });

  abilityOptions.addEventListener("click", function (e) {
    selectedAbility = e.target.textContent;
    customDropdown.querySelector(".ability-search").value =
      selectedAbility;
    sortByAbilities(selectedAbility);
    abilityOptions.style.display = "none";
  });
  const abilitySearch = document.getElementById("abilitySearch");
  abilitySearch.addEventListener("input", filterAbilities);
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
function filterAbilities() {
  
  const filter = searchInput.value.toLowerCase();
  const options = document.querySelectorAll(".option");

  options.forEach((option) => {
    const text = option.textContent.toLowerCase();
    if (text.indexOf(filter) > -1) {
      option.style.display = "";
    } else {
      option.style.display = "none";
    }
  });
}
listOfAbilities();

function openAdvanceFilter() {
  document.getElementById("mySidenav").style.width = "100%";
}
function closeAdvanveFilter() {
  document.getElementById("mySidenav").style.width = "0";
}

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

const checkboxes = document.getElementsByClassName("checkbox");

Array.from(checkboxes).forEach((checkbox) => {
  checkbox.addEventListener("click", function () {
     selectedTypes = getSelectedCheckboxes("typeCheckboxes");
     selectedWeaknesses = getSelectedCheckboxes("weaknessCheckboxes");
    selectedWeaknesses = selectedWeaknesses.map(
      (weakness) => weakness.charAt(0).toUpperCase() + weakness.slice(1)
    );
    checkboxFilter = advanceFilter.filter((item) => {
      const typesMatch = selectedTypes.length === 0 || selectedTypes.every((type) => item.type.includes(type));
      const weaknessesMatch =
        selectedWeaknesses.length === 0 ||
        selectedWeaknesses.every((weakness) =>
          item.weakness.includes(weakness)
        );
      return typesMatch && weaknessesMatch;
    });
    console.log("weakness type filter", checkboxFilter);
    checkBoxesSelected = selectedTypes.length+selectedWeaknesses.length
    console.log()
   
  });
});

function getSelectedCheckboxes(containerId) {
  const checkboxes = document.querySelectorAll(
    `#${containerId} input[type="checkbox"]:checked`
  );
  console.log(checkboxes)
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
        lightWeight = advanceFilter.filter((value) => {
          document.querySelector(".minWeight").style.backgroundColor =
            "#306cb4";
          return value.weight <= 54;
        });
      } else if (val === 2) {
        document.querySelector(".maxWeight").style.backgroundColor =
          "#306cb4";
          heavyWeight = advanceFilter.filter((value) => {
          return value.weight > 54;
        });
      }
      weight = findHeightWeight(lightWeight,heavyWeight)
    } 
    else {
      if (val === 1) {
        document.querySelector('.minWeight').style.backgroundColor = '';
        lightWeight = []
    } else if (val === 2) {
        document.querySelector('.maxWeight').style.backgroundColor = '';
        heavyWeight = []
    }
    weight = findHeightWeight(lightWeight,heavyWeight)
    }
    weightFilterToggle[val] = !weightFilterToggle[val];
  } else if (filterType === "height") {
    if (!heightFilterToggle[val]) {
      if (val === 1) {
        small = advanceFilter.filter((value) => {
          document.querySelector(".minHeight").style.backgroundColor =
            "#306cb4";
          return value.height <= 35;
        });
      } else if (val === 2) {
        document.querySelector(".maxHeight").style.backgroundColor =
          "#306cb4";
        large = advanceFilter.filter((value) => {
          return value.height > 35;
        });
      }
      height = findHeightWeight(small,large)
      
    } else {
      if (val === 1) {
        document.querySelector('.minHeight').style.backgroundColor = '';
        small = []
    } else if (val === 2) {
        document.querySelector('.maxHeight').style.backgroundColor = '';
        large = []
    }
    height = findHeightWeight(small,large)
    }
    heightFilterToggle[val] = !heightFilterToggle[val];
  }
  if(height.length != 0 && weight.length != 0)
  {
    
    heigthWeightAdvanceFilter = height.filter((value) => weight.includes(value));
  }
  else {
    heigthWeightAdvanceFilter = finalFilter(weight,height)
  }
  console.log("height weight filter",advanceFilter)
}

function filterByWeight(val) {
  toggleFilter("weight", val);
}

function filterByheight(val) {
  toggleFilter("height", val);
}

function findHeightWeight(val1,val2){
  if(val1.length !=0 && val2.length !=0){
    finalResult = val1.concat(val2)
  }
  else{
    finalResult = finalFilter(val1,val2)
  }
  return finalResult
}
function finalFilter(value1,value2){
  if(value1.length !=0 && value2.length ==0){
    finalResult = value1
  }
  else if(value1.length ==0 && value2.length !=0){
    finalResult = value2
  }
  else{
    finalResult = []
  }
 return finalResult
}
function combinedAdvanceFilter() {
   combinedFilter = advanceFilter.filter((item) => {
    let result = true;
    if(checkboxFilter.length == 0 && checkBoxesSelected !=0){
      result = false
    }
    if (ability.length !== 0 && !arraysEqual(ability, advanceFilter)) {
      result = result && ability.includes(item);
    }
   console.log(checkboxFilter.length)
    if (checkboxFilter.length !== 0 && !arraysEqual(checkboxFilter, advanceFilter)) {
      result = result && checkboxFilter.includes(item);
    }
    if (heigthWeightAdvanceFilter.length !== 0 && !arraysEqual(heigthWeightAdvanceFilter, advanceFilter)) {
      result = result && heigthWeightAdvanceFilter.includes(item);
    }
    return result;
  });
  console.log(combinedFilter);
  add = 0;
  sub = 0;
  pokemonGrid.innerHTML = "";
  collapseBtn.style.display = "none";
  filterValue.value = "default";
  closeAdvanveFilter()
  if (combinedFilter.length == 0){
    searchbar.disabled = true
    filterValue.disabled = true
    searchbar.classList.add("disableField")
    filterValue.classList.add("disableField")
  }
  else{
    searchbar.disabled = false
    filterValue.disabled = false
    searchbar.classList.remove("disableField")
    filterValue.classList.remove("disableField")
  }
 displaySearchedPokemon(searchbar.value,combinedFilter)
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
}
function clearAdvanceFilter()
{
  searchInput.value = ""
  Array.from(checkboxes).forEach((checkbox) => {
    checkbox.checked = false
  })
  document.querySelector('.maxHeight').style.backgroundColor = '';
  document.querySelector('.minWeight').style.backgroundColor = '';
  document.querySelector('.maxWeight').style.backgroundColor = '';
  document.querySelector('.minWeight').style.backgroundColor = '';
  combinedFilter = ""
  searchbar.value = "";
  filterValue.value = "default";
  displaySearchedPokemon(searchbar.value,combinedFilter)
}


