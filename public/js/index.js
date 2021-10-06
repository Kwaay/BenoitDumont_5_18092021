fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  
  .then(function(teddies) {
    
    if (teddies == null || teddies == "undefined") {
      let empty = document.createElement("div");
      let emptyContainer =  document.querySelector("main");
      emptyContainer.classList.add("max");
      empty.classList.add('empty')
      empty.innerHTML = /*HTML*/ `<p>Aucun produit récupéré</p>`
      emptyContainer.appendChild(empty);  
    }
    else {
      let index =  document.createElement('section');
        index.id = "presentation";
        index.innerHTML = /*HTML*/ `
          <section id="presentation">
              <h1>Bienvenue sur le site d'Orinoco !</h1>
              <p>Nous sommes spécialisés dans la vente d'ours en peluche <br />Voici nos produits :</p>
          </section>
          <section id="products">      
          </section>
        `
        let indexContainer =  document.querySelector('main');
        indexContainer.appendChild(index);

        for (const teddy of teddies) {
          let teddyCard = document.createElement("a");
          teddyCard.href = "product.html?id="+ teddy._id
          teddyCard.classList.add('border-gradient');
          teddyCard.innerHTML = /*HTML*/ `
            <div class="module">
              <img src="${teddy.imageUrl}" alt="${teddy.name}">
            </div>
            <div class="specs">
              <p>${teddy.name}</p>
              <span>Prix : ${teddy.price / 100} €</span>
            </div>
          `;
          let teddyContainer = document.getElementById("products");
          teddyContainer.appendChild(teddyCard);
        }

    }
  })
    
      
  
  
    
