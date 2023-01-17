import { callToastify } from "./toastify.js"

export const baseURL = "http://localhost:3333"

// export const { token } = getUser()

// token usado enquanto não tenho o token de login, substituir pelo token da sua maquina
export const fakeToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzM5MDQxOTYsImV4cCI6MTY3NDUwODk5Niwic3ViIjoiZWYxM2YyYTEtOTBkNy00Y2Q1LWI2ZTAtNGUwM2NhOTU5MzE3In0.-9mrtW7eyMKDAKvNDGxvQkxxGZBoZW2AlVH0TlJDQDU"

export const headers = {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}` // essa aqui é a forma ideal, a de baixo só estava usando o fakeToken pois nao tinha a função de login
    Authorization: `Bearer ${fakeToken}`
}

export const red = "#CE4646"
export const green = "#4BA036"

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

export async function adopt(petId) {
    const data = {
        pet_id: petId
    }

    const pet = await fetch(`${baseURL}/adoptions`, {
        method: "POST",
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