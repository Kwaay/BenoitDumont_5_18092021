fetch("http://localhost:3000/api/teddies")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(teddies) {
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
          <span>Prix : ${teddy.price} €</span>
        </div>
      `;
      let teddyContainer = document.getElementById("products");
      teddyContainer.appendChild(teddyCard);
    }
  })
  .catch(function(err) {
    // Une erreur est survenue                                                                                                   
  });
    
