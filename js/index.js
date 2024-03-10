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

    function getFormattedDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês começa do zero, então adicionamos 1
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const coinObj = {
        id: (coins.length) + getRandomNumber(1, 99999),
        name: name,
        price: price,
        customerName: customerName,
        details: details,
        created_at: getFormattedDate()
    }

    coins.push(coinObj)
    localStorage.setItem('coins', JSON.stringify(coins))
    window.location.reload()
})
console.log(coins);
//localStorage.clear()

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
        <h3 id='project-title'>${item.name}</h3>
        <p>Cliente: <span class='customer-name'>${item.customerName}</span></p>
        <p>Preço: R$<span class='price-number'>${item.price}</span>.00</p>
        <p>ID:<span id="ID-Project"> ${item.id}</span></p>
        <button class="details-project-btn">Detalhes</button>
        <button class="delete"><img src="./assets/cross.png" alt=""></button>
        <button class="edit"><img src="./assets/pen.png" alt=""></button>
        <div class='details-content'>${item.details}</div>
        <div class='coin-decoration1'></div>
        <div class='coin-decoration2'></div>
    </div>
    `;

    coinsContainer.insertAdjacentHTML('afterbegin', coinContent)
})

//delete coin
const deleteBtn = document.querySelectorAll('.delete')
const cancelDeleteBtn = document.querySelector('.cancel-delete-btn')
const confirmDeleteBtn = document.querySelector('.confirm-delete-btn')
const projectNameConfirm = document.querySelector('.project-name-confirm')
const deleConfirm = document.querySelector('.delete-confirm')
deleteBtn.forEach((btn) => {

    btn.addEventListener('click', (e) => {
        const divParent = e.target.closest('.coin')
        const title = divParent.querySelector('#project-title').innerText;
        projectNameConfirm.innerHTML = ` "${title}"`
        const idToRemoveString = divParent.querySelector('#ID-Project').innerText;
        const idToRemove = parseInt(idToRemoveString);

        deleConfirm.style.display = 'block'

        cancelDeleteBtn.addEventListener('click', () => {
            deleConfirm.style.display = 'none'
            location.reload()
        })

        confirmDeleteBtn.addEventListener('click', () => {
            coins = coins.filter(coin => coin.id !== idToRemove)
            divParent.remove()
            //updating localStorage
            localStorage.setItem('coins', JSON.stringify(coins));
            deleConfirm.style.display = 'none'
            location.reload()
        })
    })
})



//edit coin 
const projectID = document.querySelector('#projectID')
const newProjectName = document.querySelector('#newprojectName')
const newPrice = document.querySelector('#newprice')
const newCustomerName = document.querySelector('#newcustomerName')
const newDetailsProject = document.querySelector('#newdetailsProject')

const editCoinBtn = document.querySelectorAll('.edit')
editCoinBtn.forEach((btn) => {

    btn.addEventListener('click', (e) => {
        const editCoinContainer = document.querySelector('.edit-coin-container')
        editCoinContainer.style.display = 'block'

        const closeEditContainerBtn = document.querySelector('.close-edit-section')
        closeEditContainerBtn.addEventListener('click', () => {
            editCoinContainer.style.display = 'none'
        })

        const editedCoin = e.target.closest('.coin')
        console.log(editedCoin)

        projectID.value = parseInt(editedCoin.querySelector('#ID-Project').innerText)
        newProjectName.value = editedCoin.querySelector('#project-title').innerText
        newPrice.value = editedCoin.querySelector('.price-number').innerText
        newCustomerName.value = editedCoin.querySelector('.customer-name').innerText
        newDetailsProject.value = editedCoin.querySelector('.details-content').innerText
    })

})

const editForm = document.querySelector('.edit-coin-container form')
const editContainer = document.querySelector('.edit-coin-container')
editForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const editedID = parseInt(projectID.value);

    coins.forEach((coin) => {
        if (coin.id === editedID) {
            coin.name = newProjectName.value;
            coin.customerName = newCustomerName.value;
            coin.price = newPrice.value;
            coin.details = newDetailsProject.value;
        }
    })
    localStorage.setItem('coins', JSON.stringify(coins));
    location.reload()
})




//show details
const detailsBtn = document.querySelectorAll('.details-project-btn')
const detailsContainer = document.querySelector('.details-container')
const detailsText = document.querySelector('.details-text p')

detailsBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        detailsContainer.style.display = 'block'
        const divParent = e.target.closest('.coin')
        const detailsContent = divParent.querySelector('.details-content').innerText
        detailsText.innerHTML = detailsContent
    })
})

const closeDetails = document.querySelector('.close-details')
closeDetails.addEventListener('click', () => {
    detailsContainer.style.display = 'none'
})

//total projects
const totalProjects = document.querySelector('.total-projects span')
totalProjects.innerHTML = coins.length
const totalProjectsPrice = document.querySelector('.total-projects-price span')
let currentTotalPrice = 0;
for (let p = 0; p < coins.length; p++) {
    currentTotalPrice += parseInt(coins[p].price)
}

totalProjectsPrice.innerHTML = `R$${currentTotalPrice}.00`;



//search coin
const searchForm = document.querySelector('.search-form')

const searchInput = document.querySelector('#search')
const notFoundContent = document.querySelector('.not-found-content')

const returnToMenuBtn = document.querySelector('.return-menu')
returnToMenuBtn.addEventListener('click', () => {
    returnToMenuBtn.style.display = 'none'
    location.reload()
})

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = searchInput.value.trim().toLowerCase();
    let noResultSearch = true;

    const coins = document.querySelectorAll('.coin')
    coins.forEach((coin) => {
        const coinId = parseInt(coin.querySelector('#ID-Project').innerText.trim())
        const customerName = coin.querySelector('.customer-name').innerText.trim().toLowerCase()
        const projectName = coin.querySelector('#project-title').innerText.trim().toLowerCase()

        if (coinId.toString() === searchTerm || customerName.includes(searchTerm) || projectName.includes(searchTerm)) {
            coin.classList.remove('invisible')
        } else {
            coin.classList.add('invisible')
            coinsContainer.style.justifyContent = 'center';
            returnToMenuBtn.style.display = 'block';
        }

        if (!coin.classList.contains('invisible')) {
            noResultSearch = false;
        }

        searchInput.addEventListener('input', () => {
            if (searchInput.value === '') {
                coinsContainer.style.justifyContent = 'left';
                returnToMenuBtn.style.display = 'none';
                coin.classList.remove('invisible')
                notFoundContent.style.display = 'none';
            }
        })
    })

    if (noResultSearch) {
        notFoundContent.style.display = 'block';
    } else {
        notFoundContent.style.display = 'none';
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
currentDate.innerHTML = dateText;



//open report page
const openReportBtn = document.querySelector('.create-report-icon')
const reportPage = document.querySelector('.report-page')
openReportBtn.addEventListener('click', () => {
    reportPage.style.display = 'block'
})