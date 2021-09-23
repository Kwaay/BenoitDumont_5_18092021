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
        let product = document.createElement("section");
        product.id = 'details';
        product.innerHTML = /*HTML*/`
            <div class="title">
                <h1>${teddy.name}</h1>
                <img src="${teddy.imageUrl}" alt="${teddy.name}">
            </div>
            <div class="infos">
                <form>
                    <select name="color" id="color-select" required>
                        <option value="">--Choisissez une couleur--</option>
                        <option value="color1">Bleu</option>
                        <option value="color2">Blanc</option>
                        <option value="color3">Gris</option>
                    </select>
                    <br />
                    <label>Quantité</label>
                    <div class="range">
                        <i class="fas fa-minus" id="less"></i>
                        <input type="number" id="nb" value="1" min="0" max="99">
                        <i class="fas fa-plus" id="plus"></i>
                    </div>
                </form>
                <div class="prix">
                    <p>Prix: <span>${teddy.price} €</span> /u</p>
                </div>
                <div class="total">
                    <p>Votre total à payer sera de : <span>X</span> €</p>
                </div>
                <div class="add">
                    <input type="submit" value="Ajouter au panier" class="btn-add">
                </div>
            </div>`
        let productContainer = document.querySelector("main");
        productContainer.appendChild(product);
    });





// get teddy for api //
// create element based on data //
// add in cart //