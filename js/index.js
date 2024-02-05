//login
const inputUser = document.querySelector('#userName')
const passInput = document.querySelector('#pass')
const errorLogin = document.querySelector('.login span')

const form = document.querySelector('.login-form')

const container = document.querySelector('.container')

form.addEventListener('submit', (e) => {

    e.preventDefault()
    const user = inputUser.value; 
    const pass = passInput.value;

    if (user === "florence" && pass === "@florence123") {
        form.style.display = 'none'
        errorLogin.style.display = 'none'
        container.style.display = 'block'
    }else{
        errorLogin.style.display = 'block'
    }

})