let panier = JSON.parse(localStorage.getItem('panier'));
if(panier) {
    let cart = document.createElement('section');
    cart.id = "panier";
    cart.innerHTML = /*HTML*/ `
    <div class="title">
    <h1>Panier</h1>
    <p class="total">Vous avez ${panier.length} articles dans votre panier</p>
    </div>
    <div class="article">
    </div>
    <div class="total">
    <p>Votre total à payer sera de : <span></span> €</p>
    </div>
    <div class="buy">
    <input type="button" value="Acheter" class="btn-buy">
    </div>`;
    
    let cartContainer = document.querySelector("main");
    cartContainer.appendChild(cart);
    
    panier.forEach((product,index) => {
        fetch("http://localhost:3000/api/teddies/" + product.id)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {  
            let object = document.createElement('div');
            object.id =  "product-" + product.id + "-" + product.color.split(' ').join('_');
            object.classList.add("card");
            object.innerHTML = /*HTML*/ `
            <img src="${value.imageUrl}" alt="${value.name}">
            <div class="content">
            <h3>${value.name}</h3>
            <p>${product.color}</p>
            <form>
            <label>Quantité<label>
            <div class="range">
            <i class="fas fa-minus" id="less"></i>
            <input type="text" id="nb" value="${product.quantity}" min="1" max="99" pattern="^[0-9]*$">
            <i class="fas fa-plus" id="plus"></i>
            </div>
            </form>
            <div class="prix">
            <p>Prix : ${value.price / 100} € /u</p>
            <p>Prix total : <span>${value.price / 100 * product.quantity}</span> €</p>
            </div>
            </div> `
            let objectContainer = document.querySelector('.article');
            objectContainer.appendChild(object);
            totalPrice();
            
            let down = document.querySelector(`#product-${product.id}-${product.color.split(' ').join('_')} .range #less`)
            let up = document.querySelector(`#product-${product.id}-${product.color.split(' ').join('_')} .range #plus`)
            let quantityInput = document.querySelector(`#product-${product.id}-${product.color.split(' ').join('_')} #nb`)
            down.addEventListener("click", () => {
                if (quantityInput.value <= Number(quantityInput.min)) {
                    panier.splice(index,1);
                    localStorage.setItem('panier',JSON.stringify(panier));
                    window.location.reload();
                    return;
                }
                quantityInput.value--;
                let total = (value.price / 100) * Number(quantityInput.value);
                let newPrice = document.querySelector(`#product-${product.id}-${product.color.split(' ').join('_')} div.prix span`);
                newPrice.innerText = total;
                totalPrice();
            });
            up.addEventListener("click", () => {
                if(quantityInput.value >= Number(quantityInput.max)) {
                    return;
                }
                quantityInput.value++;
                let total = (value.price / 100) * Number(quantityInput.value);
                let newPrice = document.querySelector(`#product-${product.id}-${product.color.split(' ').join('_')} div.prix span`);
                newPrice.innerText = total;
                totalPrice();
                
            });
        });
    });
    function totalPrice() {
        const subTotalContainers = document.querySelectorAll('div.prix span');
        let total = 0;
        subTotalContainers.forEach((subTotal) => {
            total = total + Number(subTotal.innerText);
        })
        const totalContainer = document.querySelector('div.total span');
        totalContainer.innerText = total;
    }
}