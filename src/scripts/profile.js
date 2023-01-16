import { getAllMyPets } from "./requests.js"

async function renderAllMyPets() {
    const pets = await getAllMyPets()

    const ulCardList = document.querySelector("#cards__list")

    pets.forEach(pet => {
        const { name, species, available_for_adoption, avatar_url } = pet

        let liItem = document.createElement("li")

        let img = document.createElement("img")
        img.src = `${avatar_url}`

        let div = document.createElement("div")

        let ulCardInfos = document.createElement("ul")
        ulCardInfos.classList.add("card__infos")

        let liName = document.createElement("li")
        let spanName = document.createElement("span")
        spanName.innerText = "Nome: "
        let spanNameValue = document.createElement("span")
        spanNameValue = `${name}`
        liName.append(spanName,spanNameValue)

        let liSpecie = document.createElement("li")
        let spanSpecie = document.createElement("span")
        spanSpecie.innerText = "Espécie: "
        let spanSpecieValue = document.createElement("span")
        spanSpecieValue = `${species}`
        liSpecie.append(spanSpecie,spanSpecieValue)

        let liAvailable = document.createElement("li")
        let spanAvailable = document.createElement("span")
        spanAvailable.innerText = "Adotável: "
        let spanAvailableValue = document.createElement("span")
        if (available_for_adoption) {
            spanAvailableValue = `Sim`
        } else {
            spanAvailableValue = `Não`
        }
        liAvailable.append(spanAvailable,spanAvailableValue)

        ulCardInfos.append(liName, liSpecie, liAvailable)
        div.appendChild(ulCardInfos)
        liItem.append(img,div)

        ulCardList.appendChild(liItem)

        let updateBtn = document.createElement("button")
        updateBtn.addEventListener("click", (event) => {
            event.preventDefault()
            console.log(event.target)
            // chama função que abre modal de atualizar pet
        })
    })
}

// função de controle, só serve para chamar e organizar todas as funções que são chamadas assim que a página carrega
function start () {
    renderAllMyPets()
}

start ()