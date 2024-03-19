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

    coins.map(coin => {
        let currentCoins = `
            <p>Nome do projeto: ${coin.customerName}</p>
            <p>Valor cobrado: ${coin.price}</p><br><br>
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
    window.exportFromJSON({ data, FileName, exportType })

})



//retroactive content
const reportByMonthBtn = document.querySelector('.report-by-month-btn');
reportByMonthBtn.addEventListener('click', () => {
    currentData.style.width = '25%';
    currentData.style.height = '25vh';
    currentData.style.overflowY = 'hidden';
    reportDataContainer.style.display = 'block';

    const monthSelectedForm = document.querySelector('.month-selected-form')
    monthSelectedForm.style.display = 'block';
})

const createPDFBtn = document.querySelector('.create-pdf-btn');
createPDFBtn.addEventListener('click', (e) => {

    e.preventDefault();

    let month = document.querySelector('.month-selected-form select').value
    const year = document.querySelector('#yearPDF').value

    switch (month) {
        case 'Janeiro':
            month = '01'
            break;
        case 'Fevereiro':
            month = '02'
            break;
        case 'Março':
            month = '03'
            break;
        case 'Abril':
            month = '04'
            break;
        case 'Maio':
            month = '05'
            break;
        case 'Junho':
            month = '06'
            break;
        case 'Julho':
            month = '07'
            break;
        case 'Agosto':
            month = '08'
            break;
        case 'Setembro':
            month = '09'
            break;
        case 'Outubro':
            month = '10'
            break
        case 'Novembro':
            month = '11'
            break
        case 'Dezembro':
            month = '12'
            break
    }

    const coins = document.querySelectorAll('.coin');
    const noResult = document.querySelector('.no-result');

    const retroactiveContent = document.querySelector('.retroactive-content')
    const filename = document.querySelector('#filename-pdf').value
    const totalMonthSelected = document.createElement('h1')
    totalMonthSelected.innerHTML = `Total faturado neste mês -  R$${currentTotalPrice}.00 `;

    if (filename === '') {
        noResult.style.display = 'block'
        noResult.querySelector('h1').innerHTML = 'Inserir dados completamente!';

        setTimeout(() => {
            noResult.style.display = 'none';
        }, 1500)

        return;
    }

    //pdf settings
    const options = {
        margin: [10, 10, 10, 10],
        filename: `${filename}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }


    coins.forEach(coin => {

        const coinMonth = coin.querySelector('.created-at-txt').innerText.slice(3, 5)
        const coinYear = coin.querySelector('.created-at-txt').innerText.slice(6, 10)

        const coinName = coin.querySelector('#project-title').innerText;
        const customerName = coin.querySelector('.customer-name').innerText;
        const price = coin.querySelector('.price-number').innerText;
        const createdAt = coin.querySelector('.created-at-txt').innerText;

        if (month === coinMonth && year === coinYear) {

            let content = `
                <p>Nome do projeto - ${coinName}</p>
                <p>Nome do cliente - ${customerName}</p>
                <p>Valor Cobrado - ${price}</p>
                <p>Data de criação do projeto - ${createdAt}</p><br>
            `;

            retroactiveContent.insertAdjacentHTML('afterbegin', content);

        } else {
            noResult.style.display = 'block';
            setTimeout(() => {
                noResult.style.display = 'none';
            }, 1500)
        }

    })

    retroactiveContent.appendChild(totalMonthSelected)
    console.log(retroactiveContent);

})