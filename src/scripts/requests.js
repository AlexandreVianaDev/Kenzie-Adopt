import { callToastify } from "./toastify.js"

export const baseURL = "http://localhost:3333"


export const { token } = getUser()

export const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}` 
}

export const red = "#CE4646"
export const green = "#4BA036"

function getUser(){
    const user = localStorage.getItem('@KenziePets:tokenUser') || []
    return user
}

export async function getAllMyPets() {
    const pets = await fetch(`${baseURL}/pets/my_pets`, {
        method: "GET",
        headers: headers
    })

    const petsJSON = pets.json()

    if(!pets.ok) {
        callToastify("Erro ao requisitar meus pets", red)
    } else {
        callToastify("Pets requisitados com sucesso", green)
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
        callToastify("Failed", red)
    } else {
        callToastify("Sucess", green)
        localStorage.setItem('@KenziePets:tokenUser',`${userLogin.token}`)
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
    }

    return accountJSON
}