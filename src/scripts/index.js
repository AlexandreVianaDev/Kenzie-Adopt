import { loginUser, getUser, token, registerUser } from "./requests.js"

export function logout(){
     localStorage.clear()
     window.location.replace('/ProjetoGrupo/m2-projeto-em-equipe_Bruno120Ab/index.html')
}

function modalLogin(){
     const modal= document.querySelector('.modal')
     const btn_open = document.querySelector('.btn_login')
    
     btn_open.addEventListener('click',()=>{
          let div_1 = createElementWithClass('div','modal__div','','')
          let div_2 = createElementWithClass('div','box_top','','')
          let div_3 = createElementWithClass('div','box_bottom','','')
          let form = createElementWithClass('form',"form",'','')
          let h1_1 = createElementWithClass('h1',"title",'','Login')
          let h1_2 = createElementWithClass('h1',"text",'',`Não tem cadastro?  <span class="register">Clique aqui</span>  para se cadastrar.`)
          let button_1 = createElementWithClass('button','btn_closeModal','','')
          let button_2 = createElementWithClass('button','btn_enter','','Login')
          let i = createElementWithClass('i',"fa-regular fa-circle-xmark",'','')
          let input_1 = document.createElement('input')
          let input_2 = document.createElement('input')
        
          input_1.setAttribute('id','email')
          input_1.setAttribute('type','email')
          input_1.setAttribute('autocomplete','email')
          input_1.setAttribute('placeholder','Seu e-mail')
          input_2.setAttribute('id','pass')
          input_2.setAttribute('type','password')
          input_2.setAttribute('autocomplete','current-password')
          input_2.setAttribute('placeholder','Sua senha')

          div_1.append(div_2, form, div_3)
          div_2.appendChild(button_1)
          form.append(h1_1, input_1, input_2, button_2, h1_2)
          button_1.appendChild(i)
         
          modalClean()
          modal.appendChild(div_1)

          closeModal()
          ShowModal(modal)
          logInto()
          redirectRegister()
     })   
}

function redirectLogin(){
     const modal = document.querySelector('dialog')
     const button = document.querySelector('.login')

     const loginButton = document.querySelector('.btn_login')

     button.addEventListener('click',(e)=>{
          e.preventDefault()
          modal.close()
          loginButton.click()     
     })
}

function redirectRegister(){
     const modal = document.querySelector('dialog')
     const button = document.querySelector('.register')

     const loginButton = document.querySelector('.btn_register')

     button.addEventListener('click',(e)=>{
          e.preventDefault()
          modal.close()
          loginButton.click()     
     })
}

function modalRegister(){
     const modal= document.querySelector('.modal')
     const btn_open = document.querySelector('.btn_register')
    

     btn_open.addEventListener('click',()=>{
          let div_1 = createElementWithClass('div','modal__div','','')
          let div_2 = createElementWithClass('div','box_top','','')
          let div_3 = createElementWithClass('div','box_bottom','','')
          let form = createElementWithClass('form','form','','')
          let h1_1 = createElementWithClass('h1','title','','Cadastrar')
          let h1_2 = createElementWithClass('h1','text','','Já tem cadastro?  <span class="login">Clique aqui</span>')
          let input_1 = document.createElement('input')
          let input_2 = document.createElement('input')
          let input_3 = document.createElement('input')
          let input_4 = document.createElement('input')
          let button_1 = createElementWithClass('button','btn_closeModal','','')
          let button_2 = createElementWithClass('button','btn_regis','','Cadastrar')
          let i = createElementWithClass('i','fa-regular fa-circle-xmark','','')

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

          div_1.append(div_2, form, div_3)
          div_2.appendChild(button_1)
          button_1.appendChild(i)
          form.append(h1_1, input_1, input_2, input_3, input_4, button_2, h1_2)
          
          modalClean()
          modal.appendChild(div_1)

          closeModal()
          ShowModal(modal)
          register()
          redirectLogin()     
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

function modalClean(){
     const modal= document.querySelector('.modal')
     modal.innerHTML = ''

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
               logout()
          })
     }
}

function createElementWithClass( elem, classe, id ,inner ){

     let elemento = document.createElement(`${elem}`)
     elemento.classList = `${classe}`
     elemento.setAttribute('id',`${id}`)
     elemento.innerHTML = `${inner}` 
    
     return elemento  
   
}




checkToken()
modalLogin()
modalRegister()
modButton()
