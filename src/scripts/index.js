import { loginUser } from "./requests.js"

// adopt("10bce529-4ca6-4d56-8b5b-79afdfb2497d")


function login(){
     const modal= document.querySelector('.modal')
     const btn_open = document.querySelector('.btn_login')
     const btn_close = document.querySelector('.btn_closeModal')
     const btn_enter = document.querySelector('.btn_enter')
     const email = document.querySelector('#email')
     const pass = document.querySelector('#pass')

     btn_open.addEventListener('click',()=>{
          modal.showModal()
     })
     btn_close.addEventListener('click',()=>{
          modal.close()
     })
     btn_enter.addEventListener('click',(e)=>{
          e.preventDefault()
          let data = {
               "email": `${email.value}`,
               "password": `${pass.value}`
          }
          loginUser(data)
     })

}

          



login()
