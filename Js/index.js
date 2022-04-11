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

const Storage = {
    get() {
      return JSON.parse(localStorage.getItem("dev.finance:transaction")) || []
    },

    set(transactions) {
       localStorage.setItem("dev.finance:transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction)
        
        App.reload()
    },

    remove(index) {
       Transaction.all.splice(index, 1)

       App.reload()
    },

    incomes() {
       let income = 0;

       Transaction.all.forEach(transaction => {

        if( transaction.amount > 0 ) {

            income += transaction.amount;
        }

       })

       return income;
    },

    expanses() {
        let expanse = 0;

        Transaction.all.forEach(transaction => {
 
         if( transaction.amount < 0 ) {
 
             expanse += transaction.amount;
         }
 
        })
 
        return expanse;
    },

    total() {
        return Transaction.incomes() + Transaction.expanses();
    }
}

const Dom = {
    transactionsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = Dom.innerHtmlTransaction(transaction, index)
        tr.dataset.index = index

       Dom.transactionsContainer.appendChild(tr)
    },
    innerHtmlTransaction(transactions, index) { 
         const CSSclass = transactions.amount > 0 ? "income" : "expense"

         const amount = Utils.formatCurrency(transactions.amount) 
                   
      const html = `
      <td class="description">${transactions.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class"date">${transactions.date}</td>
      <td>
          <img onclick="Transaction.remove(${index})" src="assets/minus.svg" alt="Remover transação">
      </td>
      `
      return html;
    },

    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())

        document.getElementById('expanseDisplay').innerHTML = Utils.formatCurrency(Transaction.expanses())

        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransaction() {
        Dom.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value) {
       value = Number(value) * 100

       return value
    },

    formatDate(date) {
      const splittedDate = date.split("-")

      return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },
    
    formatCurrency(value) {
       const signal = Number(value) < 0 ? "-" : ""

       value = String(value).replace(/\,?\,?/g, "")

       value = Number(value) / 100

       value = value.toLocaleString("pt-BR", {
           style: "currency",
           currency: "BRL"
       })

       return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
       return {
           description: Form.description.value,
           amount: Form.amount.value,
           date: Form.date.value
       }
    },

  

   validateField() {
       const { description, amount, date} = Form.getValues()
       
       if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
           throw new Error("Por favor preencha todos os campos")
       }
   },

   formatValues() {
    let { description, amount, date} = Form.getValues()
     amount = Utils.formatAmount(amount)

     date = Utils.formatDate(date)

     return {
         description,
         amount,
         date
     }
     
   },

   saveTransaction() {
     
   },

   clearFields () {
       Form.description.value = ""
       Form.amount.value = ""
       Form.date.value = ""
   },

   submit(event) {
     event.preventDefault()

     try {
       Form.validateField()

       const transaction = Form.formatValues()
       
       Transaction.add(transaction)
       Form.saveTransaction(transaction)

       Form.clearFields()

       Modal.close()

       App.reload()

     } catch (error) {
       alert(error.message)  
     }


 }
    
}



const App = {
    init() {
        Transaction.all.forEach((transaction, index) => {
            Dom.addTransaction(transaction, index)
        })
        
        Dom.updateBalance()

        Storage.set(Transaction.all)
    },
    reload() {
        Dom.clearTransaction()
        App.init()
    },
}

App.init()


