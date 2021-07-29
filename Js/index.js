const Modal = {
    open() {
     document.querySelector('.modal-overlay')
     .classList.add('active');
    },
    close() {
     document.querySelector('.modal-overlay')
     .classList.remove('active');

    }
}

const transactions = [
    {
        id: 1,
        description:'Energia',
        amount: -100000,
        date: '08/04/2021',
    },

    {
        id: 2,
        description: 'Website',
        amount: +300000,
        date: '08/04/2021',
    },

    {
        id: 3,
        description: 'Aguá',
        amount: -10000,
        date: '08/04/2021',
    },

    {
        id: 4,
        description: 'Gás',
        amount: -10000,
        date: '08/04/2021',
    },

    {
        id: 5,
        description: 'Mercado',
        amount: -40000,
        date: '08/04/2021',
    },
]

const Transaction = {
    incomes() {

    },
    expanses() {

    },
    total() {

    }
}

const Dom = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = Dom.innerHtmlTransaction(transaction)

       Dom.transactionsContainer.appendChild(tr)
    },
    innerHtmlTransaction(transactions) { 
         const CSSclass = transactions.amount > 0 ? "income" : "expense"
                   
      const html = `
      <td class="description">${transactions.description}</td>
      <td class="${CSSclass}">${transactions.amount}</td>
      <td class"date">${transactions.date}</td>
      <td>
          <img src="/assets/minus.svg" alt="Remover transação">
      </td>
      `
      return html;
    }
}


transactions.forEach(function(transaction){
    Dom.addTransaction(transaction)
})

