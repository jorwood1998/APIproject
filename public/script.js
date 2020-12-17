const pokedex = document.getElementById('pokedex');
const pokemonamount = 150;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

var allTypes = Object.keys(colors);
console.log(allTypes)
var pokemonfetch = async () => {
    for(let i = 1; i <= pokemonamount; i++){
        await getPokemon(i);
    }
}

var getPokemon = async id => {
    var url = `https://pokeapi.co/api/v2/pokemon/${id}`
    // var url = `https://api.pokemontcg.io/v1/cards?setCode=base1`;
        // var result = await 
        fetch(url)
        .then((result)=>{
            return result.json();
        })  
        .then((pokemon)=> {
            pokedexSlot(pokemon);
        })
}

function pokedexSlot(pokemon) {
    var pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');
    var pokeTypes = pokemon.types.map(element => element.type.name)
    var type = allTypes.find(type => pokeTypes.indexOf(type)> -1)
    var name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    var pokeInnerHtml = `
    <div class="img-container">
    <img src="https://pokeres.bastionbot.org/images/pokemon/${
                    pokemon.id
                }.png" alt="${name}" />
</div>
<div class="info">
    <span class="number">#${pokemon.id
                    .toString()
                    .padStart(3, '0')}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span></small>
</div>
`;

    pokemonElement.innerHTML = pokeInnerHtml;

    pokedex.appendChild(pokemonElement);
}

pokemonfetch();