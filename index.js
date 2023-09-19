import {menuArray} from './data.js'
const itemsContainer = document.getElementById('items-container');
const checkoutContainer = document.getElementById('checkout-container');
const completeOrderBtn = document.getElementById('complete-order-btn');
const nameInputValue = document.getElementById('fullName')
const modal = document.getElementById('modal');
const payBtn = document.getElementById('pay-btn');
const myForm = document.getElementById('modal-form')
let totalPriceEl = document.getElementById('total-price')

let ordersArray = []
let totalPrice = 0




document.addEventListener('click', function(e) {
    if(e.target.dataset.pizza){
        handlePizzaClick(e.target.dataset.pizza)
    }
    if(e.target.dataset.hamburger){
        handleBurgerClick(e.target.dataset.hamburger)
    }
    if(e.target.dataset.beer){
        handleBeerClick(e.target.dataset.beer)
    }
    if(e.target.id) {
        const found = ordersArray.findLast((element) => element.id == e.target.id)
        const indexOfOrder = ordersArray.indexOf(found)
        removeOrder(indexOfOrder)
    }

})



//ITEM CLICK HANDLES
function handlePizzaClick(itemId) {
    const itemSelected = menuArray.filter(function(item){
        return parseInt(itemId) === item.id
    })[0]


    itemsContainer.innerHTML = ''


    ordersArray.push(itemSelected) 

    updatePrice()
    updateDisplay()
    renderOrders()
    
}

function handleBurgerClick(itemId) {
    const itemSelected = menuArray.filter(function(item){
        return parseInt(itemId) === item.id
    })[0]

    itemsContainer.innerHTML = ''

    ordersArray.push(itemSelected)

    updatePrice()
    updateDisplay()
    renderOrders()
    
}

function handleBeerClick(itemId) {
    const itemSelected = menuArray.filter(function(item){
        return parseInt(itemId) === item.id
    })[0]

    itemsContainer.innerHTML = ''

    ordersArray.push(itemSelected)

    updatePrice()
    updateDisplay()
    renderOrders()
    
}

//DISPLAY FUNCTION
function updateDisplay() {
    if(ordersArray.length >= 1) {
        checkoutContainer.style.display = 'block';
        
    } else {
        checkoutContainer.style.display = 'none'
        totalPrice = 0
    }
}

//REMOVE ORDER
function removeOrder(index){
    if(index > -1) {
        ordersArray.splice(index, 1);
    }
    
    updateDisplay()
    renderOrders()
    updatePrice()
}

//UPDATE PRICE
function updatePrice() {
    for(let i = 0; i < ordersArray.length; i++) {
        totalPrice += ordersArray[i].price
    }
    totalPriceEl.innerHTML = `$${totalPrice}`
    totalPrice = 0
}



//RENDER ORDER
function renderOrders() {
        itemsContainer.innerHTML = ''
        ordersArray.forEach(element => {
            itemsContainer.innerHTML += `<div class="checkout-items">
                                            <p class='order-item-text'>${element.name}</p>
                                            <button class="remove-btn" id='${element.id}'>remove</button>
                                            <p class="checkout-price">$${element.price}</p>
                                        </div>`
        });
}

function getMenuHtml(){
    const menuHmtl = menuArray.map(function(menuItem){
        return `<div class="order-container">
                    <img src="${menuItem.image}" alt="" class="order-item-img">
                    <div class="order-item-text-container">
                        <p class="order-item-text">${menuItem.name}</p>
                        <p class="order-item-ingredients">${menuItem.ingredients.join(', ')}</p>
                        <p class="order-item-price">$${menuItem.price}</p>
                    </div>
                    <button class="add-order-btn" data-${menuItem.name}="${menuItem.id}">+</button>
                </div>
                <div class="divider"></div>`
    }).join('')
    
    return menuHmtl
}




completeOrderBtn.addEventListener('click', function(){
    modal.style.display = 'block'
    
})


myForm.addEventListener('submit', function(e){
    e.preventDefault()
    modal.style.display = 'none'
    let endText = document.createElement('p')
    endText.textContent = `Thanks ${nameInputValue.value}! Your order is on its way!`
    endText.classList.add('ty-text')
    checkoutContainer.innerHTML = ''
    checkoutContainer.append(endText)
})


function renderMenu() {
    document.getElementById('orders-container').innerHTML = getMenuHtml()
}

renderMenu()