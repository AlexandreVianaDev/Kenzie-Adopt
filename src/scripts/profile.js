import { getAllMyPets, deleteAccount, getProfileInfos } from "./requests.js"

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

        let updateBtn = document.createElement("button")
        updateBtn.innerText = "Atualizar"
        updateBtn.classList.add("button-purple")
        updateBtn.addEventListener("click", (event) => {
            event.preventDefault()
            console.log(event.target)
            // chama função que abre modal de atualizar pet
        })

        div.append(ulCardInfos, updateBtn)
        liItem.append(img,div)

        ulCardList.appendChild(liItem)
    })
    
}



async function modalDeleteProfile() {
    const modal = document.querySelector("dialog")
    const modalContent = document.querySelector("#modal__content")

    modalContent.classList.add("modal--delete")

    const h2 = document.createElement("h2")
    h2.classList.add("title-1")
    h2.innerText = "Deseja mesmo deletar sua conta?"

    const noDeleteBtn = document.createElement("button")
    noDeleteBtn.classList.add("button-purple")
    noDeleteBtn.innerText = "Não desejo deletar minha conta"
    noDeleteBtn.addEventListener("click", (event) => {
        event.preventDefault()
        modal.close()
    })

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("button-white-red")
    deleteBtn.innerText = "Quero deletar minha conta"
    deleteBtn.addEventListener("click", (event) => {
        event.preventDefault()
        deleteAccount()
    })

    const closeModalBtn = document.querySelector(".btn_closeModal")
    closeModalBtn.addEventListener("click", (event) => {
        event.preventDefault()
        modal.close()
    })

    modalContent.append(h2,noDeleteBtn,deleteBtn)

    modal.showModal()
}

async function renderProfile() {
    const profile = await getProfileInfos()

    const { name, email, avatar_url } = profile

    const profileImg = document.querySelector("#profile__img")
    profileImg.src = avatar_url

    const nameSpan = document.querySelector("#profile__name")
    nameSpan.innerText = `${name}`

    const emailSpan = document.querySelector("#profile__email")
    emailSpan.innerText = `${email}`
    
    console.log(profile)
}

// função de controle, só serve para chamar e organizar todas as funções que são chamadas assim que a página carrega
function start () {
    renderProfile()
    renderAllMyPets()
    // modalDeleteProfile()
    // deleteProfile()
}

start ()