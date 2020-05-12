document.addEventListener('DOMContentLoaded', () => {
    const { pokemones, renderPokemon, renderTypeOfPokemonOptions } = window

    // DECLARAMOS ESTADO
    const store = {
        prevState: pokemones,
        currentState: []
    }

    window.store = store

    console.log("renderPokemon" in window)
    const mainDiv = document.getElementById('pokemonList')
    const mainSelect = document.getElementById('typesOfPokemons')
    renderPokemon(mainDiv)
    renderTypeOfPokemonOptions(pokemones, mainSelect)

    // FILTRANDO POKEMONES
    mainSelect.addEventListener('click', function(event){
        window.applyFilter(event.target.value, mainDiv)
    })
})