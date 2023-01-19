import { getAllMyPets, deleteAccount, getProfileInfos, updateUser, registerPet, updateMyPet } from "./requests.js"

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
        updateBtn.setAttribute('data-id',`${pet.id}`)
        updateBtn.classList.add("button-purple")
        updateBtn.addEventListener("click", (event) => {
            event.preventDefault()
            modalUpdatePet(pet.id)
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
    modalContent.innerHTML = ""

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
    
    buttonLogout()
    buttonHome()
}

// função de controle, só serve para chamar e organizar todas as funções que são chamadas assim que a página carrega
function start () {
    renderProfile()
    renderAllMyPets()
    prepareBtnUpdateProfile()
    prepareBtnDeleteProfile()
    // modalDeleteProfile()
    // deleteProfile()
    
}

function acessControl(){
    const token = localStorage.getItem('@KenziePets:tokenUser');

    if(!token){
        // window.location.href = '../../index.html'
        window.location.replace("/")
    }
}

function buttonLogout(){
    const button = document.querySelector('#btn_logout')

    button.addEventListener('click',()=>{
        localStorage.clear()
        window.location.replace('/')
    })
}

function buttonHome(){
    const button = document.querySelector('#btn_home')

    button.addEventListener('click',()=>{
        window.location.replace('/')
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

    form.append(h2, inputName,inputAvatar, updateBtn)
    
    updateBtn.classList.add("button-purple")
    updateBtn.innerText = "Atualizar"
    updateBtn.addEventListener("click", (event) => {
        event.preventDefault()
        const inputs = document.querySelectorAll("form > input")
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

    modalContent.append(form)

    modal.showModal()
}

function modalRegisterpet(){
    const modal = document.querySelector('dialog')
    const modalContent = document.querySelector("#modal__content")
    const buttonOpen = document.querySelector('#registerPet')

    buttonOpen.addEventListener('click',()=>{
        modalContent.setAttribute("class","")
        modalContent.innerHTML = ""
        // let div_1 = document.createElement('div')
        // let div_2 = document.createElement('div')
        // let div_3 = document.createElement('div')
        let form = document.createElement('form')
        let h1_1 = document.createElement('h1')
        let input_1 = document.createElement('input')
        let input_2 = document.createElement('input')
        let input_3 = document.createElement('input')
        // let button_1 = document.createElement('button')
        let button_2 = document.createElement('button')
        // let i = document.createElement('i')
        
        // div_1.classList.add('modal__div')
        // div_2.classList.add('box_top')
        // div_3.classList.add('box_bottom')
    
        // i.classList = 'fa-regular fa-circle-xmark'
        form.classList.add('form')
    
        // button_1.classList.add('btn_closeModal')
        button_2.classList.add('btn_enter')
    
    
        h1_1.classList.add('title')
    
        input_1.setAttribute('id','name')
        input_1.setAttribute('type','name')
        input_1.setAttribute('autocomplete','name')
        input_1.setAttribute('placeholder','Nome')
    
        input_2.setAttribute('id','breed')
        input_2.setAttribute('type','name')
        input_2.setAttribute('autocomplete','name')
        input_2.setAttribute('placeholder','Espécie')

        input_3.setAttribute('id','avatar')
        input_3.setAttribute('type','url')
        input_3.setAttribute('autocomplete','name')
        input_3.setAttribute('placeholder','Avatar')

        h1_1.innerText = 'Cadastrar Pet'
        button_2.innerText = 'Cadastrar'
       
        // div_1.append(div_2, form, div_3)
        // div_2.appendChild(button_1)
        // button_1.appendChild(i)
        form.append(h1_1, input_1, input_2, input_3,button_2)
        
        // modal.innerHTML = ''
        modalContent.appendChild(form)    
        modal.showModal()
        // closeModal()
        register()
    })

    const closeModalBtn = document.querySelector(".btn_closeModal")
    closeModalBtn.addEventListener("click", (event) => {
        event.preventDefault()
        modal.close()
    })
}

function prepareBtnDeleteProfile() {
    const button = document.querySelector("#deleteProfile__btn")

    button.addEventListener("click", (event) => {
        event.preventDefault()
        modalDeleteProfile()
    })
}

function modalUpdatePet(id){
    const modal = document.querySelector('dialog')
    
    const modalContent = document.querySelector("#modal__content")

    modalContent.innerHTML = ""
    modalContent.setAttribute("class","")

    let h1 = createElementWithClass('h1','title','','Atualizar')
    let form = createElementWithClass('form','form','','')
    let input = document.createElement('input')
    input.setAttribute('id','avatar')
    input.setAttribute('type','url')
    input.setAttribute('autocomplete','name')
    input.setAttribute('placeholder','Avatar')
    let button = createElementWithClass('button','btn_regis','','Atualizar')
    button.addEventListener("click", async (event) => {
        event.preventDefault()
        const pets = await getAllMyPets()
        const pet = pets.find(pet => pet.id === id)
        const data = {
            "name": `${pet.name}`,
            "bread": "SRD",
            "species": "Cachorro",
            "avatar_url": `${input.value}`
        }
        updateMyPet(id, data)
    })

    form.append(h1, input, button)
    modalContent.append(form)

    const closeModalBtn = document.querySelector(".btn_closeModal")
    closeModalBtn.addEventListener("click", (event) => {
        event.preventDefault()
        modal.close()
    })

    modal.showModal()
}

// function ShowModal(){
//     const modal = document.querySelector('.modal')
//     modal.showModal()
// }
function register() {
    const button = document.querySelector('.btn_enter')
    let name = document.querySelector('#name')
    let breed = document.querySelector('#breed')
    let ava = document.querySelector('#avatar')

    button.addEventListener('click',(e)=>{
        e.preventDefault()
        let data = {
            "name": `${name.value}`,
            "bread": `${breed.value}`,
            "species": "Cachorro",
            "avatar_url": `${ava.value}`
        }
        registerPet(data)
    })

}

// function closeModal(){
//     const button = document.querySelector('.btn_closeModal')
//     const modal = document.querySelector('.modal')


//     button.addEventListener('click',()=>{
//         modal.close()
//     })
// }

function createElementWithClass( elem, classe, id ,inner ){

    let elemento = document.createElement(`${elem}`)
    elemento.classList = `${classe}`
    elemento.setAttribute('id',`${id}`)
    elemento.innerHTML = `${inner}` 
   
    return elemento  
  
}


acessControl()
start()
modalRegisterpet()
