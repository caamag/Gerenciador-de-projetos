//close report page
const closeReportPageBtn = document.querySelector('.close-report-btn')
closeReportPageBtn.addEventListener('click', () => {
    reportPage.style.display = 'none'
})


//show current coins
const reportDataContainer = document.querySelector('.report-data-container')

const currentReportBtn = document.querySelector('.current-report-btn')
currentReportBtn.addEventListener('click', () => {
    reportDataContainer.style.display = 'block'

    // coins.map((coin) => {
    //     let currentCoins = `

    //         <h1>Projetos atuais</h1>
    //         <p>Quantidade total de projetos ainda abertos: <span class=''>${}</span></p>
    //         <p>Valor faturado até o momento: <span class=''>${}</span></p>
    //         <p>Total clientes: <span class=''>${}</span></p>

    //     `;
    // })
})

const closeDataBtn = document.querySelector('.close-data-btn')
closeDataBtn.addEventListener('click', () => {
    reportDataContainer.style.display = 'none'
})
