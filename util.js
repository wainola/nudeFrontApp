window.renderPokemon = function(DOMNode){
    const {store} = window
    // SI TIEMPO 0
    if(store.prevState && !store.currentState.length){
        return store.prevState.map(function(item) {
            const subtitle = document.createElement('h3')
            const paragraph = document.createElement('p')
            const unorderedList = document.createElement('ul')
            const image = document.createElement('img')
            const container = document.createElement('div')
            container.classList.add('pokemon-container')
            subtitle.innerHTML = item.name
            image.src = item.img
            const { type } = item
            for(let i = 0; i < type.length; i++){
                const li = document.createElement('li')
                li.innerHTML = type[i]
                unorderedList.appendChild(li)
            }
            paragraph.appendChild(unorderedList)
            container.appendChild(image)
            container.appendChild(subtitle)
            container.appendChild(paragraph)
            DOMNode.appendChild(container)
        })
    } else if(store.currentState.length){
        DOMNode.innerHTML = ""
        return store.currentState.map(function(item) {
            const subtitle = document.createElement('h3')
            const paragraph = document.createElement('p')
            const unorderedList = document.createElement('ul')
            const image = document.createElement('img')
            const container = document.createElement('div')
            container.classList.add('pokemon-container')
            subtitle.innerHTML = item.name
            image.src = item.img
            const { type } = item
            for(let i = 0; i < type.length; i++){
                const li = document.createElement('li')
                li.innerHTML = type[i]
                unorderedList.appendChild(li)
            }
            paragraph.appendChild(unorderedList)
            container.appendChild(image)
            container.appendChild(subtitle)
            container.appendChild(paragraph)
            DOMNode.appendChild(container)
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

window.createOrderOptions = function(DOMNode) {
    const myOptions = [
        "Ordernar por id",
        "Ordenar por nombre",
        "Frecuencia (rareza)"
    ]

    return myOptions.map(function(item, idx){
        if(idx !== 0){
            const option = document.createElement('option')
            option.value = item
            option.innerHTML = item
            return option
        }

        const firstOption = document.createElement('option')
        firstOption.value = ""
        firstOption.innerHTML = "Ordenar por"
        const option = document.createElement('option')
        option.value = item
        option.innerHTML = item
        return [ firstOption, option ]
        
    }).map(function(opt) {
        if(Array.isArray(opt)){
            const [optionTitle, firstOption]  = opt
            DOMNode.appendChild(optionTitle)
            DOMNode.appendChild(firstOption)
            return
        } else {
            DOMNode.appendChild(opt)
            return
        }
    })
}

window.filterBy = function(optionToFilterBy, DOMNode) {
    let { store: {
        prevState,
        currentState
    }} = window

    const sortedCollection = toFilter(optionToFilterBy, currentState, prevState)
    
    if(currentState.length){
        currentState = sortedCollection
    } else {
        prevState = sortedCollection
    }
    return renderPokemon(DOMNode)

}

const toFilter = function(optionTofilter, currentState, prevState){
    switch(optionTofilter){
        case "Ordernar por id":
            if(currentState.length) {
                return currentState.sort(function(a,b) {
                    if(a.id < b.id) return -1
                    if(a.id > b.id) return 1
                    return 0
                }) 
            } else {
                return prevState.sort(function(a,b) {
                    if(a.id < b.id) return -1
                    if(a.id > b.id) return 1
                    return 0
                })
            }

        case "Ordenar por nombre":
            if(currentState.length) {
                return currentState.sort(function(a,b) {
                    if(a.name < b.name) return -1
                    if(a.name > b.name) return 1
                    return 0
                }) 
            } else {
                return prevState.sort(function(a,b) {
                    if(a.name < b.name) return -1
                    if(a.name > b.name) return 1
                    return 0
                })
            }
        case "Frecuencia (rareza)":
            if(currentState.length) {
                return currentState.sort(function(a,b) {
                    if(a.avg_spawns < b.avg_spawns) return -1
                    if(a.avg_spawns > b.avg_spawns) return 1
                    return 0
                }) 
            } else {
                return prevState.sort(function(a,b) {
                    if(a.avg_spawns < b.avg_spawns) return -1
                    if(a.avg_spawns > b.avg_spawns) return 1
                    return 0
                })
            }
        default:
            return null

    }
}