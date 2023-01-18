import { loginUser, getUser, token, registerUser } from "./requests.js"



function modalLogin(){
     const modal= document.querySelector('.modal')
     const btn_open = document.querySelector('.btn_login')
    

     btn_open.addEventListener('click',()=>{
          let div_1 = document.createElement('div')
          let div_2 = document.createElement('div')
          let div_3 = document.createElement('div')
          let form = document.createElement('form')
          let h1_1 = document.createElement('h1')
          let h1_2 = document.createElement('h1')
          let input_1 = document.createElement('input')
          let input_2 = document.createElement('input')
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
          h1_2.classList.add('text')

          input_1.setAttribute('id','email')
          input_1.setAttribute('type','email')
          input_1.setAttribute('autocomplete','email')
          input_1.setAttribute('placeholder','Seu e-mail')

          input_2.setAttribute('id','pass')
          input_2.setAttribute('type','password')
          input_2.setAttribute('autocomplete','current-password')
          input_2.setAttribute('placeholder','Sua senha')

          h1_1.innerText = 'Login'
          button_2.innerText = 'Entrar'
          h1_2.innerHTML = `Não tem cadastro?  <span class="register">Clique aqui</span>  para se cadastrar.`

          div_1.append(div_2, form, div_3)
          div_2.appendChild(button_1)
          button_1.appendChild(i)
          form.append(h1_1, input_1, input_2, button_2, h1_2)
          
          modal.innerHTML = ''
          modal.appendChild(div_1)

          closeModal()
          ShowModal(modal)
          logInto()
     })   
     
}

function modalRegister(){
     const modal= document.querySelector('.modal')
     const btn_open = document.querySelector('.btn_register')
    

     btn_open.addEventListener('click',()=>{
          let div_1 = document.createElement('div')
          let div_2 = document.createElement('div')
          let div_3 = document.createElement('div')
          let form = document.createElement('form')
          let h1_1 = document.createElement('h1')
          let h1_2 = document.createElement('h1')
          let input_1 = document.createElement('input')
          let input_2 = document.createElement('input')
          let input_3 = document.createElement('input')
          let input_4 = document.createElement('input')
          let button_1 = document.createElement('button')
          let button_2 = document.createElement('button')
          let i = document.createElement('i')
          
          div_1.classList.add('modal__div')
          div_2.classList.add('box_top')
          div_3.classList.add('box_bottom')

          i.classList = 'fa-regular fa-circle-xmark'
          form.classList.add('form')

          button_1.classList.add('btn_closeModal')
          button_2.classList.add('btn_regis')


          h1_1.classList.add('title')
          h1_2.classList.add('text')

          input_1.setAttribute('id','name')
          input_1.setAttribute('type','name')
          input_1.setAttribute('autocomplete','name')
          input_1.setAttribute('placeholder','Nome')

          input_2.setAttribute('id','email')
          input_2.setAttribute('type','email')
          input_2.setAttribute('autocomplete','email')
          input_2.setAttribute('placeholder','Seu e-mail')

          input_3.setAttribute('id','pass')
          input_3.setAttribute('type','password')
          input_3.setAttribute('autocomplete','current-password')
          input_3.setAttribute('placeholder','Sua senha')

          input_4.setAttribute('id','avatar')
          input_4.setAttribute('type','url')
          input_4.setAttribute('placeholder','Seu avatar')

          h1_1.innerText = 'Cadastrar'
          button_2.innerText = 'Entrar'
          h1_2.innerHTML = `Já tem cadastro?  <span class="login">Clique aqui</span>.`

          div_1.append(div_2, form, div_3)
          div_2.appendChild(button_1)
          button_1.appendChild(i)
          form.append(h1_1, input_1, input_2, input_3, input_4, button_2, h1_2)
          
          modal.innerHTML = ''
          modal.appendChild(div_1)

          closeModal()
          ShowModal(modal)
          register()
          
     })

}

function closeModal(){
     const modal= document.querySelector('.modal')
     const btn_close = document.querySelector('.btn_closeModal')

     btn_close.addEventListener('click',()=>{
          modal.innerHTML = ''
          modal.close()
     })
}

function ShowModal(Modal){
     Modal.showModal()
}

function logInto() {
     const modal= document.querySelector('.modal')
     const btn_enter = document.querySelector('.btn_enter')
     const email = document.querySelector('#email')
     const pass = document.querySelector('#pass')

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

function register(){
     const modal= document.querySelector('.modal')
     const btn_enter = document.querySelector('.btn_regis')
     const name = document.querySelector('#name')
     const email = document.querySelector('#email')
     const pass = document.querySelector('#pass')
     const ava = document.querySelector('#avatar')

     btn_enter.addEventListener('click',(e)=>{
          e.preventDefault()
          let data = {
               "name": `${name.value}`,
               "email": `${email.value}`,
               "password": `${pass.value}`,
               "avatar_url": `${ava.value}`
          }
          registerUser(data)   
          modal.close()
     })
}

async function checkToken(){
     const  token  = await getUser()
     if(token.length > 1){
          return true
     }else{
          return false
     }
        
}

async function modButton(){
     const buttons = document.querySelector('.buttons')

     if(await checkToken()){
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



checkToken()
modalLogin()
modalRegister()
modButton()
