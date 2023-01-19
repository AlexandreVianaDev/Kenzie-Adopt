import { callToastify } from "./toastify.js"

export const baseURL = "http://localhost:3333"


export const  token  = getUser()

export const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}` 
}

export const red = "#CE4646"
export const green = "#4BA036"

export function getUser(){
    const user = localStorage.getItem('@KenziePets:tokenUser') || {}
    return user
}

export async function getAllMyPets() {
    const pets = await fetch(`${baseURL}/pets/my_pets`, {
        method: "GET",
        headers: headers
    })

    const petsJSON = pets.json()

    if(!pets.ok) {
        callToastify("Erro ao carregar meus pets", red)
    } 

    return petsJSON
}


export async function loginUser(data){
    const user = await fetch(`${baseURL}/session/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })

    const userLogin = await user.json()
   
    if(!user.ok) {
        callToastify("Erro ao realizar login, verifique os campos", red)
    } else {
        callToastify("Login realizado", green)
        localStorage.setItem('@KenziePets:tokenUser',`${userLogin.token}`)
        const modal = document.querySelector("dialog")
        modal.close()
        setTimeout(()=>{
            window.location.replace("/m2-projeto-em-equipe_Bruno120Ab/index.html")
        },1000)
    }

    return userLogin
}

export async function showPets(){
    const petsNames = await fetch(`${baseURL}/pets`, {
        method: "GET",
        headers: headers
    });
    const petsNamesJSON = await petsNames.json();
    
    const ul = document.querySelector('#petsCards');
    ul.classList.add('cardsAdoption')
    
    petsNamesJSON.forEach(pet => {
        if(pet.available_for_adoption){
        
            const li = document.createElement('li');
            li.classList.add('card')

            const petName = document.createElement('h2');
            petName.innerText = `${pet.name}`
            petName.classList = "title-1"
            
            const petSpecie = document.createElement ('span')
            petSpecie.innerText = `${pet.species}`
            petSpecie.classList = "text-1"
            
            const petImage = document.createElement('img');
            petImage.src = `${pet.avatar_url}`;

            ul.append(li);
            li.append(petImage, petName, petSpecie);
            if(token.length){
                const button = document.createElement("button")
                button.classList.add("button-green")
                button.innerText = "Me adota?"
                li.appendChild(button)

                button.addEventListener("click", (event) => {
                    event.preventDefault()
                    adopt(pet.id)
                })
            }
        }
    });
}

export async function registerUser(data){
    const user = await fetch(`${baseURL}/users`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })

    const userLogin = await user.json()
   
    if(!user.ok) {
        callToastify(`Veja se todos campos estão completos`, red)
    } else {
        callToastify("Cadastro realizado com sucesso", green)
        const modal = document.querySelector("dialog")
        modal.close()
        setTimeout(()=>{
            window.location.replace("/m2-projeto-em-equipe_Bruno120Ab/index.html")
        },2000)
    }

    return userLogin
}

export async function registerPet(data){
    const user = await fetch(`${baseURL}/pets`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    })

    const userLogin = await user.json()
   
    if(!user.ok) {
        callToastify(`Erro ao cadastrar Pet, preencha todos os campos corretamente`, red)
    } else {
        callToastify("Pet cadastrado com sucesso", green)
        const modal = document.querySelector("dialog")
        modal.close()
        setTimeout(()=>{
            window.location.replace("/m2-projeto-em-equipe_Bruno120Ab/src/pages/profile.html")
        },2000)
    }

    return userLogin
}

export async function adopt(petId) {
    const data = {
        pet_id: petId
    }

    const pet = await fetch(`${baseURL}/adoptions`, {
        method:"POST",
        headers: headers,
        body: JSON.stringify(data)
    })

    const petJSON = await pet.json()

    if(!pet.ok) {
        callToastify("Erro ao adotar o pet", red)
    } else {
        callToastify("Pet adotado com sucesso", green)
        setTimeout(()=>{
            window.location.replace("/m2-projeto-em-equipe_Bruno120Ab/index.html")
        },2000)
    }

    return petJSON
}

export async function deleteAccount() {
    const account = await fetch(`${baseURL}/users/profile`, {
        method: "DELETE",
        headers: headers
    })

    const accountJSON = account.json()

    if(!account.ok) {
        callToastify("Houve um erro ao deletar a conta", red)
    } else {
        callToastify("Conta deletada", green)
        localStorage.clear()
        const modal = document.querySelector("dialog")
        modal.close()
        setTimeout(()=>{
            window.location.replace("/m2-projeto-em-equipe_Bruno120Ab/index.html")
        },2000)
    }

    return accountJSON
}

export async function getProfileInfos() {
    const profile = await fetch(`${baseURL}/users/profile`, {
        method: "GET",
        headers:headers
    })

    const profileJSON = await profile.json()

    if(!profile.ok) {
        callToastify("Houve um erro ao carregar dados do usuário", red)
    } 

    return profileJSON
}

export async function updateUser(data) {
    const user = await fetch(`${baseURL}/users/profile`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(data)
    })

    const userJSON = await user.json()

    if(!user.ok) {
        callToastify("Houve um erro ao atualizar o perfil", red)
    } else {
        callToastify("Perfil atualizado", green)
        const modal = document.querySelector("dialog")
        modal.close()
        setTimeout(()=>{
            window.location.replace("/m2-projeto-em-equipe_Bruno120Ab/src/pages/profile.html")
        },2000)
    }

    return userJSON
}

export async function updateMyPet(id, data){
    const pets = await fetch(`${baseURL}/pets/${id}`, {
        method: "PATCH",
        headers: headers,
        body:JSON.stringify(data)
    })

    const petsJSON = pets.json()

    if(!pets.ok) {
        callToastify("Erro ao atualizar meu pet", red)
    } else {
        callToastify("Pet atualizado", green)
        const modal = document.querySelector("dialog")
        modal.close()
        setTimeout(()=>{
            window.location.replace("/m2-projeto-em-equipe_Bruno120Ab/src/pages/profile.html")
        },2000)
    }

    return petsJSON
}

