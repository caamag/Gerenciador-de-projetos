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

//create coin
const createBtn = document.querySelector('.create-coin')
createBtn.addEventListener('click', () => {
    const createSection = document.querySelector('.create-coin-container')
    createSection.style.display = 'block'; 

    const closeCreateSectionBtn = document.querySelector('.close-create-section')
    closeCreateSectionBtn.addEventListener('click', () => {
        createSection.style.display = 'none'
    })
})


let coins = JSON.parse(localStorage.getItem('coins')) || []; 
const createForm = document.querySelector('.create-coin-container form')
createForm.addEventListener('submit', (e) => {

    e.preventDefault()
    //inputs
    const name = document.querySelector('#projectName').value
    const price = document.querySelector('#price').value
    const customerName = document.querySelector('#customerName').value
    const details = document.querySelector('#detailsProject').value

    const coinObj = {
        name: name, 
        price: price, 
        customerName: customerName, 
        details: details
    }

    coins.push(coinObj)
    localStorage.setItem('coins', JSON.stringify(coins))
})

console.log(coins);
//localStorage.clear();


//edite coin 
const editCoinBtn = document.querySelector('.edit-coin')
editCoinBtn.addEventListener('click', () => {

    const editCoinContainer = document.querySelector('.edit-coin-container')
    editCoinContainer.style.display = 'block'

    const closeEditContainerBtn = document.querySelector('.close-edit-section')
    closeEditContainerBtn.addEventListener('click', () => {
        editCoinContainer.style.display = 'none'
    })

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