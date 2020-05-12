window.renderPokemon = function(DOMNode){
    const {store} = window
    console.log(store)
    // SI TIEMPO 0
    if(store.prevState && !store.currentState.length){
        return store.prevState.map(function(item) {
            const subtitle = document.createElement('h3')
            const paragraph = document.createElement('p')
            const unorderedList = document.createElement('ul')
            subtitle.innerHTML = item.name.english
            const { type } = item
            for(let i = 0; i < type.length; i++){
                const li = document.createElement('li')
                li.innerHTML = type[i]
                unorderedList.appendChild(li)
            }
            paragraph.appendChild(unorderedList)
            DOMNode.appendChild(subtitle)
            DOMNode.appendChild(paragraph)
        })
    } else if(store.currentState.length){
        DOMNode.innerHTML = ""
        return store.currentState.map(function(item) {
            const subtitle = document.createElement('h3')
            const paragraph = document.createElement('p')
            const unorderedList = document.createElement('ul')
            subtitle.innerHTML = item.name.english
            const { type } = item
            for(let i = 0; i < type.length; i++){
                const li = document.createElement('li')
                li.innerHTML = type[i]
                unorderedList.appendChild(li)
            }
            paragraph.appendChild(unorderedList)
            DOMNode.appendChild(subtitle)
            DOMNode.appendChild(paragraph)
        })
    }
}

window.renderTypeOfPokemonOptions = function(collectionPokemons, DOMNode) {
    const types = filterTypes(collectionPokemons)
    return types.map(function(item, idx){
        const option = document.createElement('option')
        if(idx === 0){
            const firstOption = document.createElement('option')
            firstOption.innerHTML = "Tipos"
            firstOption.value = ""
            DOMNode.appendChild(firstOption)
            option.innerHTML = item
            option.value = item
            DOMNode.appendChild(option)
        } else if (idx !== 0) {
            option.innerHTML = item
            option.value = item
            DOMNode.appendChild(option)
        }
        
    })
}

const filterTypes = function(collectionPokemons){
    let types = []

    for(let i = 0; i < collectionPokemons.length; i++){
        for(let y = 0; y < collectionPokemons[i].type.length; y++){
            let currentType = collectionPokemons[i].type[y]
            if(i === 0){
                types.push(currentType)
            } else {
                if(!types.includes(currentType)){
                    types.push(currentType)
                }
            }
        }
    }

    return types
}

window.applyFilter = function(currentOption, DOMNode){
    const {store} = window
    if(currentOption !== ""){
        const filteredPokemons = store.prevState.filter(function(item){
            return item.type.includes(currentOption)
        })
        console.log(filteredPokemons)
        store.currentState = filteredPokemons
        return renderPokemon(DOMNode)
    }

    return null
    }