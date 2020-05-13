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
    const orderSelect = document.getElementById('order')
    renderPokemon(mainDiv)
    renderTypeOfPokemonOptions(pokemones, mainSelect)
    createOrderOptions(orderSelect)

    // FILTRANDO POKEMONES
    mainSelect.addEventListener('click', function(event){
        window.applyFilter(event.target.value, mainDiv)
    })

    // FILTRANDO POR OPCIONES
    orderSelect.addEventListener('click', function(event) {
        window.filterBy(event.target.value, mainDiv)
    })
})