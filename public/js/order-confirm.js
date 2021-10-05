let orderId = JSON.parse(localStorage.getItem("orderId"))
let panier = JSON.parse(localStorage.getItem("panier"))

if (orderId.length >= 1 && panier.length >= 1) {
    let orderConfirm = document.createElement("section");
    orderConfirm.id = "confirm";
    orderConfirm.innerHTML = /*HTML*/ `
        <h1>Merci pour votre achat!</h1>
        <h2>Voici votre numéro de commande: <br /> ${orderId} </h2>
        
    `
    let orderContainer = document.querySelector('main');
    orderContainer.appendChild(orderConfirm);
    
}