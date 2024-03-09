//close report page
const closeReportPageBtn = document.querySelector('.close-report-btn')
closeReportPageBtn.addEventListener('click', () => {
    reportPage.style.display = 'none'
})


//show current coins
const reportDataContainer = document.querySelector('.report-data-container')
const currentData = document.querySelector('.data')

const currentReportBtn = document.querySelector('.current-report-btn')
currentReportBtn.addEventListener('click', () => {
    reportDataContainer.style.display = 'block';

    coins.map((coin) => {
        let currentCoins = `
            <p>Quantidade total de projetos: ${coin.customerName}</p>
            <p>Valor faturado até o momento: ${coin.price}</p><br><br>
        `;
        currentData.insertAdjacentHTML('beforeend', currentCoins)
    })
})

const closeDataBtn = document.querySelector('.close-data-btn')
closeDataBtn.addEventListener('click', () => {
    reportDataContainer.style.display = 'none'
    window.location.reload();
})



//create a csv document with current data
const currentCSVBtn = document.querySelector('.current-csv')
currentCSVBtn.addEventListener('click', () => {

    const totalPriceColumn = {
        'Nome do projeto': '-',
        'Nome do cliente': '-',
        'Valor cobrado': '-',
        'Detalhes do projeto': '-',
        "Total faturado": totalProjectsPrice.innerText
    }

    const data = [
        totalPriceColumn,
        ...coins.map((coin) => {
            return {
                'Nome do projeto': coin.name,
                'Nome do cliente': coin.customerName,
                'Valor cobrado': coin.price,
                'Detalhes do projeto': coin.details,
                "Total faturado": ''
            }
        })
    ]

    const FileName = 'Projetos Atuais'
    const exportType = 'csv'
    window.exportFromJSON({ data, FileName: FileName, exportType })

})



//showing retroactive data 
let retroactiveData = JSON.parse(localStorage.getItem('retroactiveData')) || [];
