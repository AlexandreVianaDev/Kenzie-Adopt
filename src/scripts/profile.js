import { getAllMyPets, deleteAccount, getProfileInfos, updateUser, registerPet, getMypet } from "./requests.js"

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
            // chama função que abre modal de atualizar pet
        })

        div.append(ulCardInfos, updateBtn)
        liItem.append(img,div)

        ulCardList.appendChild(liItem)
    })
    updatePet()
    
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

    if(!token)
        window.location.href = '../../index.html'
    else
    console.log('')
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

function modalRegisterpet(){
    const modal = document.querySelector('.modal')
    const buttonOpen = document.querySelector('#registerPet')

    buttonOpen.addEventListener('click',()=>{
        let div_1 = document.createElement('div')
        let div_2 = document.createElement('div')
        let div_3 = document.createElement('div')
        let form = document.createElement('form')
        let h1_1 = document.createElement('h1')
        let input_1 = document.createElement('input')
        let input_2 = document.createElement('input')
        let input_3 = document.createElement('input')
        let button_1 = document.createElement('button')
        let button_2 = document.createElement('button')
        let i = document.createElement('i')
        
        div_1.classList.add('modal__div')
        div_2.classList.add('box_top')
        div_3.classList.add('box_bottom')
    
        i.classList = 'fa-regular fa-circle-xmark'
        form.classList.add('form')
    
        button_1.classList.add('btn_closeModal')
        button_2.classList.add('btn_enter')
    
    
        h1_1.classList.add('title')
    
        input_1.setAttribute('id','name')
        input_1.setAttribute('type','name')
        input_1.setAttribute('autocomplete','name')
        input_1.setAttribute('placeholder','Nome')
    
        input_2.setAttribute('id','breed')
        input_2.setAttribute('type','name')
        input_2.setAttribute('autocomplete','name')
        input_2.setAttribute('placeholder','Raça')

        input_3.setAttribute('id','avatar')
        input_3.setAttribute('type','url')
        input_3.setAttribute('autocomplete','name')
        input_3.setAttribute('placeholder','Avatar')

        h1_1.innerText = 'Cadastrar Pet'
        button_2.innerText = 'Cadastrar'
       
        div_1.append(div_2, form, div_3)
        div_2.appendChild(button_1)
        button_1.appendChild(i)
        form.append(h1_1, input_1, input_2, input_3,button_2)
        
        modal.innerHTML = ''
        modal.appendChild(div_1)    
        modal.showModal()
        closeModal()
        register()
    })


}

function prepareBtnDeleteProfile() {
    const button = document.querySelector("#deleteProfile__btn")

    button.addEventListener("click", (event) => {
        event.preventDefault()
        modalDeleteProfile()
    })
}

function updatePet(){
    let buttons = document.querySelectorAll('[data-id]')
    let idDog = ''
    buttons.forEach( button =>{
        button.addEventListener('click',(e)=>{
            let name = e.srcElement.parentElement.children[0].childNodes[0].childNodes[1].data
           idDog = e.srcElement.dataset.id
        //    getMypet(idDog)

        // Abrir modal
            let div_1 = document.querySelector('.modal')
            let div_2 = createElementWithClass('div','box_top','','')
            let div_3 = createElementWithClass('div','box_bottom','','')
            let form = createElementWithClass('form','form','','')
            let h1 = createElementWithClass('h1','title','','Atualziar')
            let input = document.createElement('input')
            let button_1 = createElementWithClass('button','btn_closeModal','','')
            let button_2 = createElementWithClass('button','btn_regis','','Cadastrar')
            let i = createElementWithClass('i','fa-regular fa-circle-xmark','','')

            input.setAttribute('id','avatar')
            input.setAttribute('type','url')
            input.setAttribute('autocomplete','name')
            input.setAttribute('placeholder','Avatar')

            div_1.append(div_2, form, div_3)
            div_2.appendChild(button_1)
            button_1.appendChild(i)
            form.append(h1, input, button_1, button_2)
            ShowModal(div_1)

        // Coletar dado
            button_2.addEventListener('click',(e)=>{
                e.preventDefault()
                let data = {
                        "name": `${name}`,
                        "bread": "SRD",
                        "species": "Cachorro",
                        "avatar_url": `${input.value}`
        
                }
                getMypet(data)
            })
          
        })
    })
    console.log(buttons)
}

function ShowModal(Modal){
    Modal.showModal()
}
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

function closeModal(){
    const button = document.querySelector('.btn_closeModal')
    const modal = document.querySelector('.modal')


    button.addEventListener('click',()=>{
        modal.close()
    })
}

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
