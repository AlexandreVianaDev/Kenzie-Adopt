import { loginUser, getUser, token } from "./requests.js"



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
          modal.close()

     })
}

async function checkUser(){
     const  token  = await getUser()
     if(token.length > 1){
          console.log(token)
          return true
     }else{
          console.log(token)
          return false
     }
        
}

async function modButton(){
     const buttons = document.querySelector('.buttons')

     if(await checkUser()){
          buttons.innerHTML = ''
          let  btn_profile = document.createElement('button')
          let btn_logout = document.createElement('button')

          btn_profile.innerText = 'Perfil'
          btn_logout.innerText = 'Logout'

          btn_profile.classList.add('btn_profile')
          btn_logout.classList.add('btn_logout')

          buttons.append(btn_profile,btn_logout)
          btn_profile.addEventListener('click',()=>{
               window.location.replace("/ProjetoGrupo/m2-projeto-em-equipe_Bruno120Ab/src/pages/profile.html") 
          })
          btn_logout.addEventListener('click',()=>{
               localStorage.clear()
               window.location.replace('/ProjetoGrupo/m2-projeto-em-equipe_Bruno120Ab/index.html')
          })
     }
}

checkUser()
modalLogin()
modButton()
