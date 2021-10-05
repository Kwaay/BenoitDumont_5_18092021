let orderId = JSON.parse(localStorage.getItem("orderId"))
let panier = JSON.parse(localStorage.getItem("panier"))

if (orderId.length >= 1 && panier.length >= 1) {
    let orderConfirm = document.createElement("section");
    orderConfirm.id = "confirm";
    orderConfirm.innerHTML = /*HTML*/ `
        <h1>Merci pour votre achat!</h1>
        <h2>Voici votre numéro de commande: <br /> ${orderId} </h2>
        <br />
        Voilà un récapitulatif :
        <br /><br />
        <div class="list">
        </div>
        <div class="total">
            <p>Votre total à payer sera de : <br /> <span>0</span> €</p>
        </div>
        
    `
    let orderContainer = document.querySelector('main');
    orderContainer.appendChild(orderConfirm);
    panier.forEach((product, index) => {
        let productIdentifier = `#product-${product.id}-${product.color.split(" ").join("_")}`;
        fetch("http://localhost:3000/api/teddies/" + panier[index].id)
			.then(function (res) {
				if (res.ok) {
					return res.json();
				}
			})
			.then(function (value) {
                let object = document.createElement("div");
                object.id = productIdentifier;
                object.classList.add("item");
                object.innerHTML = /*HTML*/ `
                    <img src="${value.imageUrl}" alt="${value.name}">
                    <p>${value.name}</p>
                    <p class="price">Prix total: <span>${value.price / 100 * panier[index].quantity}</span>€</p>
                    <p>Quantité : ${panier[index].quantity}</p>
                    `;
                    let objectContainer = document.querySelector("div.list");
                    objectContainer.appendChild(object);

                    function totalPrice() {
                        let subTotalContainers = document.querySelectorAll(`p.price span`);
                        let total = 0;
                        subTotalContainers.forEach((subTotal) => {
                            total = (total + Number(subTotal.innerText));
                        });
                        const totalContainer = document.querySelector("div.total span");
                        totalContainer.innerText = total;
                    }
                totalPrice();
                localStorage.removeItem("panier");
                localStorage.removeItem("orderId");
            })
    })
}