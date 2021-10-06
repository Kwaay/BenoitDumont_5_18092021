//Récupération de l'orderId et du panier //
let orderId = JSON.parse(localStorage.getItem("orderId"))
let panier = JSON.parse(localStorage.getItem("panier"))

// Si la panier ou l'orderId est soit null ou "undefined" ou leurs longueurs == 0, mettre un message d'erreur "Vous n'avez pas passé de commandes" //
if(panier == null || panier == "undefined" || panier.length == 0 && orderId == null || orderId == "undefined" || panier.length == 0) {
    let empty = document.createElement("div");
    let emptyContainer =  document.querySelector("main");
    emptyContainer.classList.add("max");
    empty.classList.add('empty')
    empty.innerHTML = /*HTML*/ `<p>Vous n'avez pas passé de commandes</p>`
    emptyContainer.appendChild(empty);
}
// Sinon, créer une section avec l'id "confirm" et comme contenu le restant de la page //
else {
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
        //Pour chaque élement dans le panier, faire un appel API + l'id du panier sur l'index actuel, et stocker les données dans la variable value //
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
                    // Suppression des données du panier et de l'orderId dans le localStorage //
                    localStorage.removeItem("panier");
                    localStorage.removeItem("orderId");
                })
        })
    }