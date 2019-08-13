console.log("I'm in!");



// checkbox


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

// checkbox end

// Cart


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

// Cart end

const cards = document.querySelectorAll(".goods .card"),
      cardWrapper = document.querySelector(".cart-wrapper"),
      cardEmpty = document.getElementById("cart-empty"),
      countGoods = document.querySelector(".counter");


cards.forEach(function (card) {
    const btn = card.querySelector("button");
    btn.addEventListener("click", function() {
        const cardClone = card.cloneNode(true);
        cardWrapper.appendChild(cardClone);
        cardEmpty.remove();
        showData();
    });
});


function showData() {
    const cardsCart = cardWrapper.querySelectorAll(".card");
    countGoods.textContent = cardsCart.length;
}