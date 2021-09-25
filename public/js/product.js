// get id in url //

let url_link = window.location.href;
let url =  new URL(url_link);
let search_params = url.searchParams;
let id = search_params.get('id');

// récupération des données API + génération de l'HTML
fetch("http://localhost:3000/api/teddies/" + id)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(teddy) {
        console.log(teddy);
        let prixTotal = parseInt(teddy.price / 100);
        let product = document.createElement("section");
        product.id = 'details';
        product.innerHTML = /*HTML*/`
            <div class="title">
                <h1>${teddy.name}</h1>
                <img src="${teddy.imageUrl}" alt="${teddy.name}">
            </div>
            <div class="infos">
                <form>
                    <select id="color-select" required>
                        <option selected disabled hidden>--Choisissez une couleur--</option>
                    </select>
                    <br />
                    <label>Quantité</label>
                    <div class="range">
                        <i class="fas fa-minus" id="less"></i>
                        <input type="text" id="nb" value="1" min="0" max="99" pattern="^[0-9]*$">
                        <i class="fas fa-plus" id="plus"></i>
                    </div>
                </form>
                <div class="prix">
                    <p>Prix: <span>${teddy.price / 100} €</span> /u</p>
                </div>
                <div class="total">
                    <p>Votre total à payer sera de : <span>${prixTotal}</span> €</p>
                </div>
                <div class="add">
                    <input type="submit" value="Ajouter au panier" class="btn-add" id="add-to-cart">
                </div>
            </div>`
        let productContainer = document.querySelector("main");
        productContainer.appendChild(product);

        // Système pour diminuer ou incrémenter le nombre de l'input "Quantité"
        let down = document.querySelector(".range #less")
        let up = document.querySelector(".range #plus")
        let quantityInput = document.getElementById("nb")
        down.addEventListener("click", () => {
            if (quantityInput.value <= Number(quantityInput.min)) {
                return;
            }
            quantityInput.value--;
            let total = (teddy.price / 100) * quantityInput.value;
            let newPrice = document.querySelector('div.total span');
            newPrice.innerText = total;
        });
        up.addEventListener("click", () => {
            if(quantityInput.value >= Number(quantityInput.max)) {
                return;
            }
            quantityInput.value++;
            let total = (teddy.price / 100) * quantityInput.value;
            let newPrice = document.querySelector('div.total span');
            newPrice.innerText = total;
        });

        // Système de génération des options par rapport au nombre de couleurs définies pour le teddy dans l'API
        let optionsContainer = document.getElementById('color-select');
        teddy.colors.forEach((option) => {
            let optionElement = document.createElement('option');
            optionElement.innerText = option;
            optionsContainer.appendChild(optionElement);           
        });

        //Système de récupération de l'option choisie + return si la couleur est pas choisie
        let cart = document.getElementById('add-to-cart');
        cart.addEventListener('click', () => {
            let colorSelected = optionsContainer.value;
            if(colorSelected === "--Choisissez une couleur--") {
                alert("Vous n'avez pas choisi une couleur, veuillez le faire avant de continuer")
                return;
            }
            let quantitySelected = parseInt(quantityInput.value);
            let product = {
                id: id,
                price: teddy.price / 100,
                color: colorSelected,
                quantity: quantitySelected
            };
            // Système pour ajouter l'object product avec les données du teddy dans le localStorage
            let localPanier = JSON.parse(localStorage.getItem('panier'))
            console.log(localPanier);
            if (!localPanier) {
                localPanier = [product];
                console.log(JSON.stringify(localPanier));
            }
            else {
                localPanier.push(product);
            }
            localStorage.setItem('panier',JSON.stringify(localPanier));
            // Redirection vers la page du panier avec un délai de 1s / 1000ms
            window.setTimeout(() => {
                document.location.href="./shopping-cart.html";
            },1000);
            
            
        })
    });        


// get teddy for api //
// create element based on data //
// add in cart //