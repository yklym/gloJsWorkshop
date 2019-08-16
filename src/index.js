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

    // DISCOUNT
    discountCheckbox.addEventListener("click", filterPrice);
    // MIN-MAX
    min.addEventListener("input", filterPrice);
    max.addEventListener("input", filterPrice);


    function filterPrice() {
        cards.forEach(function (card) {
            const cardPrice = card.querySelector(".card-price"),
                price = parseFloat(cardPrice.textContent);

            console.log(price);

            if ((min.value && price < min.value) || (max.value && price > max.value)) {
                card.parentNode.style.display = "none";
            } else {
                card.parentNode.style.display = "";

                if (discountCheckbox.checked) {
                    if (!card.querySelector(".card-sale")) {
                        card.parentNode.style.display = "none";
                    }
                } else {
                    card.parentNode.style.display = "";
                }
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


// receiving data from server

function getData() {
    const goodsWrapper = document.querySelector(".goods");
    return fetch("../db/db.json ").then(function (responce) {
            if (responce.ok) {
                // console.log(responce);
                return responce.json();
            } else {
                throw new Error(responce.status);
            }
        }).then(function (data) {
            return data;
        })
        .catch(function (err) {
            console.warn(err);
            goodsWrapper.innerHTML = "<div><h1>Oops, something got wrong!</h1></div>";

        });


    // console.log(fetch("../db/db.json "));

}

function renderCards(data) {
    const goodsWrapper = document.querySelector(".goods");
    data.goods.forEach(function (good) {
        const card = document.createElement("div");
        card.className = "col-12 col-md-6 col-lg-4 col-xl-3";
        card.innerHTML = `
        <div class="card" data-category = "${good.category}">
            ${good.sale ? '<div class="card-sale">🔥Hot Sale🔥</div>' : "" }
            <div class="card-img-wrapper">
                <span class="card-img-top"
                    style="background-image: url(${good.img})"></span>
            </div>
            <div class="card-body justify-content-between">
                <div class="card-price">${good.price} ₽</div>
                <h5 class="card-title">${good.title}</h5>
                <button class="btn btn-primary">В корзину</button>
            </div>
        </div>
        `;
        goodsWrapper.appendChild(card);
    });
}

function renderCatalog() {
    const cards = document.querySelectorAll(".goods .card");
    const catalogList = document.querySelector(".catalog-list");
    const categories = new Set();
    const catalogBtn = document.querySelector(".catalog-button");
    const catalogWrapper = document.querySelector(".catalog");
    cards.forEach(function (card) {
        categories.add(card.dataset.category);
    });

    categories.forEach(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        catalogList.appendChild(li);
    });

    catalogBtn.addEventListener("click", function (event) {
        if (catalogWrapper.style.display) {
            catalogWrapper.style.display = "";
        } else {
            catalogWrapper.style.display = "block";
        }
        if (event.target.tagName === "LI") {
            cards.forEach(card => {
                if (card.dataset.category !== event.target.textContent) {
                    card.parentNode.style.display = "none";
                } else {
                    card.parentNode.style.display = "";
                }
            });
        }
    });
}

getData().then(function (data) {
    renderCards(data);
    addCart();
    toggleCart();
    toggleCheckbox();
    actionPage();
    renderCatalog();
});



// sales filter



// end sales filter