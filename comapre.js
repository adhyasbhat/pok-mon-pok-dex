const dropDown1 = document.querySelector(".dropDown1")
const dropDown2 = document.querySelector(".dropDown2")
const pokemon1Details = document.querySelector(".pokemon1Details")
const pokemon2Details = document.querySelector(".pokemon2Details")
const compareBtn = document.querySelector('.compareBtn')
const winningPokemon = document.querySelector('.winningPokemon')
const vs = document.querySelector('vs')
function pokemonDropdown(num){
  mergedData.forEach((item) =>{
    const pokemonList = document.createElement('option')
    pokemonList.className = 'pokemonName'
    pokemonList.textContent = item.name
    if(num ==1){
      dropDown1.add(pokemonList)
    }
    else if(num ==2){
      dropDown2.add(pokemonList)
    }
    
  })
}
function pokemonDropdownValueCheck(num){
  console.log("valeed")
  if(num == 1){
    pokemon1Details.innerHTML = ""
    pokemon1Details.style.display = "block"
    displaySelectedPokemon(dropDown1.value,num)
  }
  else if(num == 2){
    pokemon2Details.innerHTML = ""
    pokemon2Details.style.display = "block"
    displaySelectedPokemon(dropDown2.value,num)
  }
}
function displaySelectedPokemon(value,num){
  const wholeDetails = document.createElement('div')
  wholeDetails.className = "wholeDetails"

  selected = mergedData.filter((items) => {
    return items.name.includes(value);
  });
  console.log(selected);
  
  selected.forEach((item)=>{
   
    const imgDiv = document.createElement('div')
    imgDiv.className = "selectedImgDiv col-12 d-flex justify-content-center"

    const selectedpokemonImg = document.createElement('img')
    selectedpokemonImg.className = "selectedImg"
    selectedpokemonImg.src = item.ThumbnailImage;
    imgDiv.append(selectedpokemonImg)

    const nameDiv = document.createElement('div')
    nameDiv.className = "nameDiv col-12 d-flex justify-content-center"
    nameDiv.innerHTML = item.name

    const heightWeigth = document.createElement("div");
    heightWeigth.className = "heightWeigthCol col-12 d-flex";

    const pokemonHeight = document.createElement("div");
    pokemonHeight.className = "pokeHeight col-6";
    pokemonHeight.innerHTML = "H : " + item.height + "m";

    const pokemonWeight = document.createElement("div");
    pokemonWeight.className = "pokeWeigth col-6";
    pokemonWeight.innerHTML = "W : " + item.weight + "kg";
    heightWeigth.append(pokemonHeight, pokemonWeight);

    const pokemonType = document.createElement("div");
    pokemonType.className =
      "typeOfPokemon col-12 d-flex justify-content-start";
    const pokeType = document.createElement("div");
    pokeType.className = "pokeType d-flex";
    type = document.createElement("div")
    type.className = "type my-1"
    type.innerHTML = "Type: "
    item.type.forEach((types) => {
      const eachType = document.createElement("div");
      eachType.className = "eachTypeeach m-1";
      // styleForType(eachType, types);
      eachType.innerText = types;
      pokeType.append(eachType);
    });
    pokemonType.append(type,pokeType);

    const pokemonweakness = document.createElement("div");
    pokemonweakness.className =
      "weekness col-12 d-flex justify-content-start";
    const pokeWeakness = document.createElement("div");
    pokeWeakness.className = "pokeWeekness d-flex";
    const weak = document.createElement("div")
    weak.className = "weak my-1"
    weak.innerHTML = "Weekness: "
    item.weakness.forEach((weak) => {
      const eachWeak = document.createElement("div");
      eachWeak.className = "eachWeak m-1";
      // styleForType(eachType, types);
      eachWeak.innerText = weak.toLowerCase();
      pokeWeakness.append(eachWeak);
    });
    pokemonweakness.append(weak,pokeWeakness);
    wholeDetails.append(imgDiv,nameDiv,heightWeigth,pokemonType,pokemonweakness)

  })
if (num == 1){
  pokemon1Details.append(wholeDetails)
}
else{
  pokemon2Details.append(wholeDetails)
}
if (pokemon1Details.innerHTML.trim() != '' && pokemon2Details.innerHTML.trim() != '' )
{
  compareBtn.style.display = "block"
  vs.style.display = "block"
}
}
function compare(){
  winningPokemon.style.display = "block"
  compareBtn.style.display = "none"
}