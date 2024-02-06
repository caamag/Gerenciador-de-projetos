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
    } else {
        errorLogin.style.display = 'block'
    }

})




//current date
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()

//format
const dayFormat = day < 10 ? '0' + day : day
const monthFormat = month < 10 ? '0' + month : month
const dateText = `${dayFormat}/${monthFormat}/${year}`

const currentDate = document.querySelector('.date')
currentDate.innerHTML = dateText
