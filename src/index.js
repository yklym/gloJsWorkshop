console.log("I'm in!");



// checkbox

function toggleCheckbox() {
    const checkbox = document.getElementById("discount-checkbox");
    console.log(checkbox);

    checkbox.addEventListener("change", function (event) {
        if (this.checked) {
            this.nextElementSibling.classList.add("checked");
        } else {
            this.nextElementSibling.classList.remove("checked");
        }
        console.log(event.target.checked);
    });
}

// checkbox end

// Cart
function toggleCart() {

    const btnCart = document.getElementById("cart");
    const modalCart = document.querySelector(".cart");
    const closeBtn = document.querySelector(".cart-close")

    btnCart.addEventListener("click", function (event) {
        modalCart.style.display = "flex";
        document.body.style.overflow = "hidden";
    });

    closeBtn.addEventListener("click", function (event) {
        modalCart.style.display = "";
        document.body.style.overflow = "";
    });
}



function addCart() {
    const cards = document.querySelectorAll(".goods .card"),
        cardWrapper = document.querySelector(".cart-wrapper"),
        cardEmpty = document.getElementById("cart-empty"),
        countGoods = document.querySelector(".counter");




    cards.forEach(function (card) {
        const btn = card.querySelector("button");
        btn.addEventListener("click", function () {
            const cardClone = card.cloneNode(true);
            cardWrapper.appendChild(cardClone);
            showData();

            const removeBtn = cardClone.querySelector(".btn");
            removeBtn.textContent = "Remove from cart";
            removeBtn.addEventListener("click", function (event) {
                cardClone.remove();
                showData();
            });
        });
    });


    function showData() {
        const cardsCart = cardWrapper.querySelectorAll(".card"),
            cardPrice = cardWrapper.querySelectorAll(".card-price"),
            cardTotal = document.querySelector(".cart-total span");
        countGoods.textContent = cardsCart.length;
        let summ = 0;
        cardPrice.forEach(function (elem) {
            let price = parseFloat(elem.textContent);
            summ += price;
            console.log(summ);
        });
        cardTotal.textContent = summ;
        // console.log(cardPrice)
        if (cardsCart.length !== 0) {
            cardEmpty.remove();
        } else {
            cardWrapper.appendChild(cardEmpty);
        }
    }
}

function actionPage() {
    const cards = document.querySelectorAll(".goods .card"),
        discountCheckbox = document.getElementById("discount-checkbox"),
        goods = document.querySelector(".goods"),
        min = document.getElementById("min"),
        max = document.getElementById("max"),
        search = document.querySelector(".search-wrapper_input"),
        searchBtn = document.querySelector(".search-btn");

    function addTmpStyleClass(className, classPropertiesList) {
        let style = document.createElement('style');
        let classPropertiesString = classPropertiesList.join(";");
        classPropertiesString += ";";
        style.type = 'text/css';
        style.innerHTML = `.${className} {${classPropertiesString}}`;
        console.log(`.${className} {${classPropertiesString}}`);
        document.getElementsByTagName('head')[0].appendChild(style);

        // document.getElementById('someElementId').className = 'cssClass';
    }

    addTmpStyleClass("hiddenByDiscount", ["display : none"]);
    addTmpStyleClass("hiddenByPrice", ["display : none"]);


    // DISCOUNT
    discountCheckbox.addEventListener("click", function () {
        cards.forEach(function (card) {
            if (discountCheckbox.checked) {
                if (!card.querySelector(".card-sale")) {
                    card.parentNode.style.display = "none";
                }
            } else {
                card.parentNode.style.display = "";
            }
        });
    });
    // MIN-MAX
    min.addEventListener("change", filterPrice);
    max.addEventListener("change", filterPrice);

    function filterPrice() {
        cards.forEach(function (card) {
            const cardPrice = card.querySelector(".card-price"),
                price = parseFloat(cardPrice.textContent);

            console.log(price);

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                // card.parentNode.style.display = "none";
                card.parentNode.classList.add("hiddenByPrice");
            } else {
                // card.parentNode.style.display = "";
                card.parentNode.classList.remove("hiddenByPrice");
            }
        });
    }
    // SEARCH
    searchBtn.addEventListener("click", function () {
        const searchText = new RegExp(search.value.trim(), "i");
        cards.forEach(function (card) {
            const title = card.querySelector(".card-title");
            if (!searchText.test(title.textContent)) {
                card.parentNode.classList.add("hiddenByDiscount");
                // card.parentNode.style.display = "none";
            } else {
                card.parentNode.classList.remove("hiddenByDiscount");
                // card.parentNode.style.display = "";
            }
        });
        search.value = "";

        console.log('search.value: ', search.value);
    });
}





addCart();
toggleCart();
toggleCheckbox();
actionPage();


// sales filter



// end sales filter