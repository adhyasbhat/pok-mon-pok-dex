// const abilityFilter = document.querySelector("#abilityFilter")
const advanceTypeAndWeakness = document.querySelector('.advanceTypeAndWeekness')
// sortByAbilities()
// function sortByAbilities(valueSelected) {
//   ability = mergedData.filter((item) => item.abilities.includes(valueSelected));
//   add = 0;
//   sub = 0;
//   searchbar.value = "";
//   filterValue.value = "default";
//   console.log(ability)
//   displaySearchedPokemon(null, null,ability);
// }
// function listOfAbilities(){
//   console.log("called")
//   uniqueAbility = new Set();
//   mergedData.forEach((item) => item.abilities.forEach((items)=>{uniqueAbility.add(items)}))
//   abilityListArray = Array.from(uniqueAbility)
//   abilityListArray.forEach((item)=>{
//     const abilityList = document.createElement('option')
//     abilityList.className = 'pokemonName'
//     abilityList.textContent = item
//     abilityFilter.add(abilityList)
//   })
// }
// function abilitySelected(){
//   sortByAbilities(abilityFilter.value)
// }





const abilityOptions = document.getElementById('abilityOptions');
const customDropdown = document.querySelector('.custom-dropdown');

function sortByAbilities(valueSelected,dataFilter) {
  console.log(valueSelected)
  ability = dataFilter.filter((item) => item.abilities.includes(valueSelected));
  add = 0;
  sub = 0;
  console.log(ability);
  // displaySearchedPokemon(null, null, ability);
  return ability
}

function listOfAbilities() {
  console.log("called");
  uniqueAbility = new Set();
  mergedData.forEach((item) => item.abilities.forEach((items) => uniqueAbility.add(items)));
  abilityListArray = Array.from(uniqueAbility);
  abilityOptions.innerHTML = '';
  abilityListArray.forEach((item) => {
    const abilityListItem = document.createElement('li');
    abilityListItem.textContent = item;
    abilityListItem.className = 'option';
    abilityOptions.appendChild(abilityListItem);
  });

  abilityOptions.addEventListener('click', function (e) {
     selectedAbility = e.target.textContent;
    customDropdown.querySelector('.selected-option').textContent = selectedAbility;
    console.log(selectedAbility)
    // sortByAbilities(selectedAbility);
    displaySearchedPokemon(searchbar.value, filterValue.value, dataFilter,selectedAbility);
    abilityOptions.style.display = 'none';
  });
}





customDropdown.addEventListener('click', function () {
  abilityOptions.style.display = abilityOptions.style.display === "block" ? "none" : "block";
});

document.addEventListener('click', function (e) {
  if (!customDropdown.contains(e.target)) {
    abilityOptions.style.display = 'none';
  }
});

customDropdown.addEventListener('blur', function () {
  abilityOptions.style.display = 'none';
});

listOfAbilities();

function openAdvanceFilter(){
  document.getElementById("mySidenav").style.width = "450px";
}
function closeAdvanveFilter(){
  document.getElementById("mySidenav").style.width = "0";
}
listOfTypes()

function listOfTypes() {
  const typeList = document.createElement('div');
  typeList.classList.add('listOfTypes');
  typeList.innerHTML = `
    <div class='row'>
      <div class='col-3'></div>
      <div class='col-9 d-flex justify-content-evenly'>
        <div class='checkbox-heading mx-1'>Type</div>
        <div class='checkbox-heading mx-1'>Weakness</div>
      </div>
    </div>
  `;
  advanceTypeAndWeakness.appendChild(typeList);

  uniqueType = new Set();
  mergedData.forEach((item) =>
    item.type.forEach((items) => {
      uniqueType.add(items);
    })
  );
  typeListArray = Array.from(uniqueType);
  typeListArray.forEach((item, index) => {
    const typeList = document.createElement('div');
    typeList.classList.add('listOfTypes');
    typeList.innerHTML = `
      <div class='row m-2'>
        <div class='col-3 typeWeekness'>${item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}</div>
        <div class='col-9 d-flex justify-content-around'>
          <input type="checkbox" class="checkbox mx-1" name="question${index + 1}[]" value="Type">
          <input type="checkbox" class="checkbox mx-1" name="question${index + 1}[]" value="Weakness">
        </div>
      </div>
    `;

    advanceTypeAndWeakness.appendChild(typeList);
  });
}
function search(){
  const result = {}
  document.querySelectorAll(".listOfTypes").forEach(function (typeList,index){
    const type = typeListArray[index]
    const checkboxs = []

    typeList.querySelectorAll('input.checkbox:checked').forEach(function(checkbox){
      checkboxs.push(checkbox.value)
    })

    checkboxs.forEach(function (value) {
      if(!result[value]){
        result[value] = [type]

      }
      else{
        result[value].push(type)
      }
    })
  })
  console.log(result,"result")
}