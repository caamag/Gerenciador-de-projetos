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

    function getRandomNumber(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }

    const coinObj = {
        id: (coins.length) + getRandomNumber(1, 9999),
        name: name,
        price: price,
        customerName: customerName,
        details: details
    }

    coins.push(coinObj)
    localStorage.setItem('coins', JSON.stringify(coins))
    window.location.reload()
})
console.log(coins);
//localStorage.clear();

//handle coins
const coinsContainer = document.querySelector('.coins')
if (coins.length === 0) {
    const coinsEmpty = document.createElement('h1')
    coinsEmpty.innerHTML = 'Pasta vazia até o momento...'
    coinsContainer.appendChild(coinsEmpty)
}

coins.map((item) => {
    let coinContent = `
    <div class="coin">
        <h3>${item.name}</h3>
        <p>Cliente: ${item.customerName}</p>
        <p>Preço: R$${item.price}.00</p>
        <p>ID:<span id="ID-Project"> ${item.id}</span></p>
        <button class="details-project">Detalhes</button>
        <button class="delete"><img src="./assets/cross.png" alt=""></button>
    </div>
    `;

    coinsContainer.insertAdjacentHTML('afterbegin', coinContent)
})



//delete coin
const deleteBtn = document.querySelectorAll('.delete')
const cancelDeleteBtn = document.querySelector('.cancel-delete-btn')
const confirmDeleteBtn = document.querySelector('.confirm-delete-btn')
const deleConfirm = document.querySelector('.delete-confirm')
deleteBtn.forEach((btn) => {

    btn.addEventListener('click', (e) => {
        const divParent = e.target.closest('.coin')
        const idToRemoveString = divParent.querySelector('p span').innerText
        const idToRemove = parseInt(idToRemoveString)
        deleConfirm.style.display = 'block'

        cancelDeleteBtn.addEventListener('click', () => { deleConfirm.style.display = 'none' })
        confirmDeleteBtn.addEventListener('click', () => {

            coins = coins.filter(coin => coin.id !== idToRemove)
            divParent.remove()
            //updating localStorage
            localStorage.setItem('coins', JSON.stringify(coins));
            deleConfirm.style.display = 'none'

        })
    })
})



//edit coin 
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