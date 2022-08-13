let pizza = [

    {
        "name": "Pizza Margherita",
        "info": [],
        "size": ["Wahl aus: 28cm, 32cm, 45cm"],
        "price": 6.60
    },
    {
        "name": "Pizza Salami",
        "info": [],
        "size": ["Wahl aus: 28cm, 32cm, 45cm"],
        "price": 7.20
    },
    {
        "name": "Pizza Hawai",
        "info": ["Mit Schinken und Ananas"],
        "size": ["Wahl aus: 28cm, 32cm, 45cm"],
        "price": 7.20
    },
    {
        "name": "Pizza Veggie",
        "info": ["Mit Spinat, Broccoli, roten Zwiebeln, Champignons und Paprika"],
        "size": ["Wahl aus: 28cm, 32cm, 45cm"],
        "price": 7.90
    },
    {
        "name": "Pizza Thunfisch",
        "info": ["Eine leckere Pizza"],
        "size": ["Wahl aus: 28cm, 32cm, 45cm"],
        "price": 7.70
    }

];


let snacks = [

    {
        "name": "Pizzabrötchen Normal",
        "info": "6x Pizzabrötchen gefüllt mit Käse",
        "size": [],
        "price": 4.99
    },
    {
        "name": "Pizzabrötchen Salami",
        "info": "6x Pizzabrötchen gefüllt mit Käse & Salami",
        "size": [],
        "price": 5.99
    },
    {
        "name": "Pizzabrötchen Schinken",
        "info": "6x Pizzabrötchen gefüllt mit Käse & Schinken",
        "size": [],
        "price": 5.99
    }

];


let = saucenAndDips = [

    {
        "name": "Knoblauchsauce",
        "info": [],
        "size": [],
        "price": 1.2
    },
    {
        "name": "Barbecuesauce",
        "info": [],
        "size": [],
        "price": 1.20
    },
    {
        "name": "Chilisauce",
        "info": [],
        "size": [],
        "price": 1.20
    },
    {
        "name": "Sauce Hollandaise",
        "info": [],
        "size": [],
        "price": 1.20
    },

];


let getraenke = [

    {
        "name": "Coca-Cola 1,0l",
        "info": [],
        "size": [],
        "price": 2.40
    },
    {
        "name": "Fanta 1,0l",
        "info": [],
        "size": [],
        "price": 2.40
    },
    {
        "name": "Sprite 1,0l",
        "info": [],
        "size": [],
        "price": 2.40
    },
    {
        "name": "Mezzo Mix 1,0l",
        "info": [],
        "size": [],
        "price": 2.40
    },
    {
        "name": "Mineralwasser 1,0l",
        "info": [],
        "size": [],
        "price": 1.90
    }

];


let basketQuantity = [];
let basketName = [];
let basketPrice = [];
let remarkList = [];
let counterBasket = [];


/*####################################################################################################################################################################################################################*/


loadFromLocalStorage();


/**
 * Rendert alle Functionen.
 */
function render() {
    renderPizza();
    renderSnacks();
    renderSaucenAndDips();
    renderGetraenke();
    counter();
    renderBasket();
}


/*####################################################################################################################################################################################################################*/


/**
 * render all JSON-Objects
 * @param {*} menuList - JSON Objekt
 * @returns 
 * 
 */
function renderAll(menuList) {
    let menuPrice = menuList['price'];
    let newMenuPrice = menuPrice.toFixed(2).replace('.', ',');

    return /*html*/ `
        <div onclick="addToBasket('${menuList['name']}', '${menuList['price']}')"class="footContainer">
            <div class="addImage">
                <img src="img/plus.png" alt="">
            </div>
            <div>
                <h1>${menuList['name']}</h1>
                <span>${menuList['info']}</span>
                <p>${menuList['size']}</p>
                <h2>${newMenuPrice} €</h2>
            </div>
        </div>`
}


function renderPizza() {
    let pizzaContent = document.getElementById('pizzaContent');
    pizzaContent.innerHTML = "";

    for (let i = 0; i < pizza.length; i++) {
        const pizzaList = pizza[i];
        pizzaContent.innerHTML += renderAll(pizzaList);
    }
}


function renderSnacks() {
    let snacksContent = document.getElementById('snacksContent');
    snacksContent.innerHTML = "";

    for (let i = 0; i < snacks.length; i++) {
        const snackList = snacks[i];
        snacksContent.innerHTML += renderAll(snackList);
    }
}


function renderSaucenAndDips() {
    let snacksContent = document.getElementById('extraContent');
    snacksContent.innerHTML = "";

    for (let i = 0; i < saucenAndDips.length; i++) {
        const saucenAndDipsList = saucenAndDips[i];
        snacksContent.innerHTML += renderAll(saucenAndDipsList);
    }
}


function renderGetraenke() {
    let snacksContent = document.getElementById('getraenkeContent');
    snacksContent.innerHTML = "";

    for (let i = 0; i < getraenke.length; i++) {
        const getraenkeList = getraenke[i];
        snacksContent.innerHTML += renderAll(getraenkeList);
    }
}


/*####################################################################################################################################################################################################################*/


/** 
 *  render the basket
 * 
 */
function renderBasket() {
    let basketTable = document.getElementById("basket");
    basketTable.innerHTML = "";
    for (let i = 0; i < basketName.length; i++) {
        basketTable.innerHTML += showBasket(i);
    }

    showBasketInfo();
    if (basketName.length > 0) {
        finishSum();
    }
    counter();
}


/**
 * generate the basket HTML-Content.
 * @param {*} i
 * @returns 
 * 
 */
function showBasket(i) {
    let subtotalResult = basketPrice[i] * basketQuantity[i];
    let subtotal = subtotalResult.toFixed(2).replace('.', ',');

    return /*html*/ `
    <div class="showBasketmainFlex">
        <div class="showBasketMenuFlex">
            <div class="counter">
                <span>${basketQuantity[i]}x</span>
            </div>
            <div>
                <span>${basketName[i]}</span>  
            </div>
            <div>
                <span>${subtotal} €</span>  
            </div>
        </div>
        <div class="showBasketAddTextFlex">
            <span onclick="openRemark(${i})">Anmerkungen hinzufügen</span>
            <div class="showBasketAddDeleteImgFlex">
                <img onclick="deleteOne(${i})" src="img/minus.png" alt="">
                <img onclick="addOne(${i})" src="img/plus.png" alt="">
            </div>
        </div>
        <div class="showRemarkOnFlex">
            <span>${remarkList[i]}</span>
        </div>
        <div id="inputs${i}" class="dNone" >
            <div class="inputFieldDesign">
                <input type="text" placeholder="Anmerkungen hinzufügen" id="inputField${i}">
            </div>
            <div class="inputBtn">
                <button class="inputBtnDesign" onclick="addRemark(${i})">Hinzufügen</button>
                <button class="inputBtnDesign" onclick="removeRemark(${i})">Löschen</button>
            </div>
        </div>
    </div>
    <div class="showBasketBorderEndline"></div>
    `
}


/*####################################################################################################################################################################################################################*/


/**
 * show the shopping cart.
 * 
 */
function showBasketInfo() {
    let basketInfo = document.getElementById("basketInfo");
    if (basketName.length == 0) {
        basketInfo.innerHTML = generateBasketInfoHTMLIf();
    } else {
        basketInfo.innerHTML = generateBasketInfoHTMLElse();
    }
}


function generateBasketInfoHTMLIf() {
    return /*html*/ `
    <div class="basketSecondStage">
        <img src="img/fresh.png" alt="">
        <h2>Fülle deinen Warenkorb<br>
        <span class="underText">Bestelle bequem dein Essen.</span>
        </h2>
    </div>`
}


function generateBasketInfoHTMLElse() {
    return /*html*/ `
    <div id="showBasketText">
        <div class="showBasketBox" >
            <div>
                <span>Sie müssen den Mindestbestellwert<br>erreichen, um bestellen zu können.</span>
            </div>
            <div>
                <span>9,00 €</span>
            </div>
        </div>
        <div class="showBasketBoxChild" id="">
           <span>Leider können Sie noch nicht bestellen, 
            da Shadowpizza erst bei einem Mindestbestellwert von 9,00 € liefert (exkl. Lieferkosten).</span>
        </div>
    </div>

    <div id="subtotalSum"></div>
    <div id="deliveryPrice"></div>
    <div id="totalSum"></div>
    <div id="totalSumToPay"></div>`;
}


/*####################################################################################################################################################################################################################*/


/** 
 *  show the finsh sum in the basket.
 * 
 */
function finishSum() {
    let subtotalPrice = 0;
    for (let i = 0; i < basketPrice.length; i++) {
        subtotalPrice += basketPrice[i] * basketQuantity[i];
    }

    dynamicChange(subtotalPrice);
}


/**
 *  changed the price variation.
 * @param {*} subtotalPrice
 * 
 */
function dynamicChange(subtotalPrice) {
    let deliveryCosts = 2.00;
    let finishPrice = subtotalPrice + deliveryCosts // finish sum with delivery costs

    if (subtotalPrice >= 9) {
        document.getElementById("showBasketText").style.display = "none";
        document.getElementById("totalSumToPay").classList.add("totalPriceFieldBlue");
        priceRender(subtotalPrice, deliveryCosts, finishPrice);

    } else {
        priceRender(subtotalPrice, deliveryCosts, finishPrice);
        document.getElementById("totalSumToPay").classList.add("totalPriceFieldGrey");
    }
}


/**
 * generate and render all prices.
 * @param {*} subtotalPrice
 * @param {*} deliveryCosts
 * @param {*} finishPrice
 * 
 */
function priceRender(subtotalPrice, deliveryCosts, finishPrice) {
    let subtotalSum = document.getElementById("subtotalSum");
    let deliveryPrice = document.getElementById("deliveryPrice");
    let totalSumToPay = document.getElementById("totalSumToPay");
    let totalSum = document.getElementById("totalSum");

    renderSubtotalSum(subtotalSum, subtotalPrice);
    renderDeliveryPrice(deliveryPrice, deliveryCosts);
    renderTotalSum(totalSum, finishPrice);
    renderTotalSumToPay(totalSumToPay, finishPrice);
}


function renderSubtotalSum(subtotalSum, subtotalPrice) {
    return subtotalSum.innerHTML = /*html*/ `  
    <div class="totalPriceFlex" >
        <span>Zwischensumme:</span>
        <span>${subtotalPrice.toFixed(2).replace('.', ',')} €</span>
    </div>`;
}


function renderDeliveryPrice(deliveryPrice, deliveryCosts) {
    return deliveryPrice.innerHTML = /*html*/ `            
    <div class="totalPriceFlex">
        <span>Lieferkosten:</span>
        <span>${deliveryCosts.toFixed(2).replace('.', ',')} €</span>
    </div>`;
}


function renderTotalSum(totalSum, finishPrice) {
    return totalSum.innerHTML = /*html*/ `
    <div class="totalPriceFlex">
        <span><b>Gesamt:</b></span>
        <span><b>${finishPrice.toFixed(2).replace('.', ',')} €</b></span>
    </div>`;
}


function renderTotalSumToPay(totalSumToPay, finishPrice) {
    return totalSumToPay.innerHTML = /*html*/ `
    <span>Bezahlen (${finishPrice.toFixed(2).replace('.', ',')}) €</span>`;
}


/*####################################################################################################################################################################################################################*/


/**
 * push the new object into basket.
 * @param {*} name 
 * @param {*} price
 */
function addToBasket(name, price) {
    let match = basketName.includes(name); // Array no longer returns duplicate values. (Examp. 1x Pizza Margherita 6.60€) (1x Pizza Margherita 6.60€)

    if (!match) { 
        basketName.push(name); 
        basketPrice.push(price);
        basketQuantity.push(1);
        counterBasket.push(1);
        remarkList.push([]);

    } else {
        let index = basketName.indexOf(name); // Zugriff auf ein einzige Stelle im Array
        counterBasket.push(1);
        basketQuantity[index]++;
    }

    counter();
    saveToLocalStorage();
    renderBasket();
}


/*####################################################################################################################################################################################################################*/


/**
 * Put the "+" in the shopping cart and push the price and quantity.
 * @param {*} i
 * 
 */
function addOne(i) {
    basketQuantity[i]++;
    counterBasket.push(1);

    counter();
    saveToLocalStorage();
    renderBasket();
}


/**
 * Put the "-" in the shopping cart and splice the price and quantity.
 * @param {*} i
 */
function deleteOne(i) {
    let index = basketQuantity[i]; // Defines the current count of the basketQuantity array.
    if (index == 1) {
        basketName.splice(i, 1);
        basketPrice.splice(i, 1);
        basketQuantity.splice(i, 1);
        counterBasket.splice(i, 1);
        remarkList.splice(i, 1);

    } else {
        counterBasket.splice(i, 1);
        basketQuantity[i]--;
        renderBasket();
    }

    counter();
    saveToLocalStorage();
    renderBasket();

}


/*####################################################################################################################################################################################################################*/


/**
 * Clicking on "Add comment" opens another option for action.
 * @param {*} i
 * 
 */
function openRemark(i) {
    document.getElementById(`inputs${i}`).classList.remove("dNone");
}


/**
 * Adds an annotation of each rendered thing in the cart.
 * @param {*} i
 * 
 */
function addRemark(i) {
    let inputField = document.getElementById(`inputField${i}`).value;
    inputField.innerHTML = "";

    if (inputField == "") {
        alert("Um eine Anmerkungen hinzuzufügen, muss das Feld befüllt sein.")
    } else {
        remarkList[i].push(inputField);
        document.getElementById(`inputs${i}`).classList.add("dNone");
    }

    saveToLocalStorage();
    renderBasket();
}


/**
 * Deletes the annotation.
 * @param {*} i
 * 
 */
function removeRemark(i) {
    remarkList.splice(i, 1);
    remarkList.push([]);

    saveToLocalStorage();
    renderBasket();
}


/*####################################################################################################################################################################################################################*/


/**
 * Like und Disslike Function
 * 
 */
function likeImageLike() {
    document.getElementById("likeImage2").classList.remove("dNone");
    document.getElementById("likeImage").classList.add("dNone");
}

function likeImageDislike() {
    document.getElementById("likeImage2").classList.add("dNone");
    document.getElementById("likeImage").classList.remove("dNone");
}


/*####################################################################################################################################################################################################################*/


/**
 * OpenResonsive Menu
 * 
 */
function showBasketResponsive() {
    document.getElementById("completeBasket").classList.add("basketFlexResponsive");
    document.getElementById("scrollline").classList.add("scrollineResponsive");
}

function closeBasketResponsive() {
    document.getElementById("completeBasket").classList.remove("basketFlexResponsive");
    document.getElementById("scrollline").classList.remove("scrollineResponsive");
}


/*####################################################################################################################################################################################################################*/


/**
 * Counter Function
 * 
 */
function counter() {
    let counterElement = document.getElementById("counter");
    let counterElementLength = counterBasket.length;

    if (counterElementLength == 0) {
        counterElement.style.display = "none";
    } else {
        counterElement.style.display = "unset";
        counterElement.innerHTML = counterElementLength;
    }
}


/*####################################################################################################################################################################################################################*/


/**
 * Localstorage
 * 
 */
function saveToLocalStorage() {
    let basketNameAsText = JSON.stringify(basketName);
    let basketPriceAsText = JSON.stringify(basketPrice);
    let basketQuantityAsText = JSON.stringify(basketQuantity);
    let remarkListAsText = JSON.stringify(remarkList);
    let counterBasketAsText = JSON.stringify(counterBasket);

    localStorage.setItem('basketNameAsText', basketNameAsText);
    localStorage.setItem('basketPriceAsText', basketPriceAsText);
    localStorage.setItem('basketQuantityAsText', basketQuantityAsText);
    localStorage.setItem('remarkListAsText', remarkListAsText);
    localStorage.setItem('counterBasketAsText', counterBasketAsText);

}

function loadFromLocalStorage() {
    let basketNameAsText = localStorage.getItem('basketNameAsText');
    let basketPriceAsText = localStorage.getItem('basketPriceAsText');
    let basketQuantityAsText = localStorage.getItem('basketQuantityAsText');
    let remarkListAsText = localStorage.getItem('remarkListAsText');
    let counterBasketAsText = localStorage.getItem('counterBasketAsText');

    if (basketNameAsText && basketPriceAsText && basketQuantityAsText && remarkListAsText && counterBasketAsText) {
        basketName = JSON.parse(basketNameAsText);
        basketPrice = JSON.parse(basketPriceAsText);
        basketQuantity = JSON.parse(basketQuantityAsText);
        remarkList = JSON.parse(remarkListAsText);
        counterBasket = JSON.parse(counterBasketAsText);
    }
}