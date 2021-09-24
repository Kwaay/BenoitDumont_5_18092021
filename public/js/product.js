// get id in url //

let url_link = window.location.href;
let url =  new URL(url_link);
let search_params = url.searchParams;
let id = search_params.get('id');

console.log(id);

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
                    <input type="submit" value="Ajouter au panier" class="btn-add">
                </div>
            </div>`
        let productContainer = document.querySelector("main");
        productContainer.appendChild(product);

        let down = document.querySelector(".range #less")
        down.addEventListener("click", () => {
            let moins = document.getElementById("nb")
            if (moins.value <= Number(moins.min)) {
                return;
            }
            moins.value--;
            let total = (teddy.price / 100) * moins.value;
            let newPrice = document.querySelector('div.total span');
            newPrice.innerText = total;
        });
        let up = document.querySelector(".range #plus")
        up.addEventListener("click", () => {
            let plus = document.getElementById("nb")
            if(plus.value >= Number(plus.max)) {
                return;
            }
            plus.value++;
            let total = (teddy.price / 100) * plus.value;
            let newPrice = document.querySelector('div.total span');
            newPrice.innerText = total;
        });
        
        let optionsContainer = document.getElementById('color-select');
        teddy.colors.forEach((option) => {
            let optionElement = document.createElement('option');
            optionElement.innerText = option;
            optionsContainer.appendChild(optionElement);
                    
        });
    });        




// get teddy for api //
// create element based on data //
// add in cart //