import { getAllMyPets, deleteAccount, getProfileInfos, updateUser } from "./requests.js"

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

    modalContent.setAttribute("class","modal--delete")

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
    buttonLogout()
    buttonHome()
}

// função de controle, só serve para chamar e organizar todas as funções que são chamadas assim que a página carrega
function start () {
    renderProfile()
    renderAllMyPets()
    prepareBtnUpdateProfile()
    // modalDeleteProfile()
    // deleteProfile()
}

function acessControl(){
    const token = localStorage.getItem('@KenziePets:tokenUser');

    if(!token)
        window.location.href = '../../index.html'
    else
    console.log('logado')
}

function buttonLogout(){
    const button = document.querySelector('#btn_logout')

    button.addEventListener('click',()=>{
        localStorage.clear()
        window.location.replace('/ProjetoGrupo/m2-projeto-em-equipe_Bruno120Ab/index.html')
    })
}

function buttonHome(){
    const button = document.querySelector('#btn_home')

    button.addEventListener('click',()=>{
        window.location.replace('/ProjetoGrupo/m2-projeto-em-equipe_Bruno120Ab/index.html')
    })
}
// Vou construir uma função logout

function prepareBtnUpdateProfile() {
    const button = document.querySelector("#updateProfile__btn")

    button.addEventListener("click", (event) => {
        event.preventDefault()
        modalUpdateProfile()
    })
}

async function modalUpdateProfile() {

    const modal = document.querySelector("dialog")
    const modalContent = document.querySelector("#modal__content")

    modalContent.setAttribute("class","modal--updateProfile")
    modalContent.innerHTML = ""

    const h2 = document.createElement("h2")
    h2.classList.add("title-1")
    h2.innerText = "Atualizar Perfil"

    const form = document.createElement("form")
    form.classList.add("form")

    const inputName = document.createElement("input")
    inputName.placeholder = "Nome"
    inputName.type = "name"
    inputName.id = "name"

    const inputAvatar = document.createElement("input")
    inputAvatar.placeholder = "Avatar"
    inputAvatar.type = "url"
    inputAvatar.id = "avatar_url"

    const updateBtn = document.createElement("button")

    form.append(inputName,inputAvatar, updateBtn)
    
    updateBtn.classList.add("button-purple")
    updateBtn.innerText = "Atualizar"
    updateBtn.addEventListener("click", (event) => {
        event.preventDefault()
        const inputs = document.querySelectorAll("form > input")
        console.log(inputs)
        const data = {}

        inputs.forEach(input => {
            if(input.value.length > 0) {
                data[input.id] = input.value
            }
        })         
         updateUser(data)
        modal.close()
    })

    const closeModalBtn = document.querySelector(".btn_closeModal")
    closeModalBtn.addEventListener("click", (event) => {
        event.preventDefault()
        modal.close()
    })

    modalContent.append(h2,form)

    modal.showModal()
}

acessControl()
start()
